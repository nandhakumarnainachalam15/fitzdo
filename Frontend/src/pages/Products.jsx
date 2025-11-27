import { useEffect, useState, useMemo } from "react";
import API from "../api/api";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => { });
  }, []);

  
  const filteredAndSortedProducts = useMemo(() => {
    
    let filtered = products;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = products.filter((product) => {
        return (
          product.title?.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
        );
      });
    }

    const productsCopy = [...filtered];

    switch (sortBy) {
      case "price-low":
        return productsCopy.sort((a, b) => a.price - b.price);

      case "price-high":
        return productsCopy.sort((a, b) => b.price - a.price);

      case "rating":
        return productsCopy.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      case "recent":
      default:
        
        return productsCopy.reverse();
    }
  }, [products, sortBy, searchQuery]);

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto">
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Results for "Fitness & Training"'}
          </h1>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400 w-full sm:w-auto"
            >
              <option value="recent">Most Recent</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        
        <div className="text-right mb-4">
          <span className="text-sm text-gray-600">
            {filteredAndSortedProducts.length} Result{filteredAndSortedProducts.length !== 1 ? 's' : ''}
          </span>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredAndSortedProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

        
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {searchQuery ? (
              <>
                <p className="text-xl">No products found for "{searchQuery}"</p>
                <p className="text-sm mt-2">Try searching with different keywords</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <p className="text-xl">No products found</p>
                <p className="text-sm mt-2">Try adjusting your search or filters</p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
