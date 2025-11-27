import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  // Calculate discount percentage
  const originalPrice = product.originalPrice || Math.floor(product.price * 1.4);
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);
  const reviewCount = product.reviewCount || Math.floor(Math.random() * 10000) + 100;

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-500">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-500">
          ★
        </span>
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="relative bg-gray-50 p-4">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          className="w-full h-48 object-contain"
          alt={product.title}
        />
        <div className="absolute bottom-2 left-2 badge-sponsored">Fitzdo Sponsored</div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs text-gray-500 uppercase mb-1">{product.brand || "FITZDO"}</p>

        {/* Title */}
        <h2 className="font-semibold text-sm line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-sm">{renderStars(product.rating || 4.5)}</div>
          <span className="text-xs text-gray-600">
            {product.rating || 4.5} ({reviewCount.toLocaleString()})
          </span>
          <span className="badge-discount">{discount}%</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          <span className="text-sm text-gray-400 line-through">
            M.R.P: ₹{originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Delivery Info */}
        <div className="text-xs text-gray-600">
          <span className="font-medium text-green-600">FREE delivery</span> by Tomorrow 10pm
        </div>
      </div>
    </Link>
  );
}
