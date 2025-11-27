import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";
import Header from "../components/Header";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductOptions from "../components/ProductOptions";
import ProductActions from "../components/ProductActions";
import ProductSpecifications from "../components/ProductSpecifications";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Product options state
  const [selectedColor, setSelectedColor] = useState("Any Size");
  const [selectedModel, setSelectedModel] = useState("Four - 4.5HP");
  const [selectedMotor, setSelectedMotor] = useState("Import - 4.5HP");
  const [selectedSize, setSelectedSize] = useState("M");
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState("");

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setP(res.data))
      .catch(() => { });
  }, [id]);

  // Handler functions
  const handleAddToCart = () => {
    if (!p) {
      alert("Product is still loading. Please wait...");
      return;
    }

    const cartItem = {
      product: p,
      color: selectedColor,
      model: selectedModel,
      motor: selectedMotor,
      size: selectedSize,
      quantity: 1
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    alert(`Added to cart!\nProduct: ${p.title}\nColor: ${selectedColor}\nSize: ${selectedSize}`);
  };

  const handleBuyNow = () => {
    if (!p) {
      alert("Product is still loading. Please wait...");
      return;
    }

    alert(`Proceeding to checkout...\n\nProduct: ${p.title}\nPrice: ₹${p.price.toLocaleString()}\nColor: ${selectedColor}\nSize: ${selectedSize}`);
  };

  const handleCheckPincode = () => {
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      alert("Please enter a valid 6-digit pincode");
      return;
    }

    setPincodeResult(`Delivery available to ${pincode} by Tomorrow 10pm`);

    setTimeout(() => {
      setPincodeResult("");
    }, 5000);
  };

  if (!p) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  const images = p.images || ["https://via.placeholder.com/500"];
  const originalPrice = p.originalPrice || Math.floor(p.price * 1.4);
  const discount = Math.round(((originalPrice - p.price) / originalPrice) * 100);

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Breadcrumb - Hide on mobile */}
        <div className="hidden sm:block text-sm text-gray-600 mb-6">
          <Link to="/products" className="hover:text-orange-600">Store</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-orange-600">Fitness & Sports</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-orange-600">Exercise & Fitness</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-orange-600">Cardio & Equipments</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{p.brand || 'Product'}</span>
        </div>

        {/* Mobile Back Button */}
        <div className="sm:hidden mb-4">
          <Link to="/products" className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
        </div>

        {/* Grid: 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left Column - Images */}
          <div className="order-1">
            <ProductImageGallery
              images={images}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              productTitle={p.title}
            />

            {/* Specifications - Show after product details on mobile, after images on desktop */}
            <div className="hidden lg:block">
              <ProductSpecifications product={p} />
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="order-2">
            <p className="text-sm text-gray-500 mb-2">{p.brand || "FITZDO"}</p>
            <h1 className="text-xl sm:text-2xl font-bold mb-3">{p.title}</h1>

            {/* Ratings */}
            {p.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(p.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium">{p.rating}</span>
                <span className="text-sm text-gray-500">({p.reviewsCount || 0} reviews)</span>
              </div>
            )}

            {/* Description */}
            {p.description && (
              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">{p.description}</p>
              </div>
            )}

            {/* Price */}
            <div className="mb-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <span className="text-2xl sm:text-3xl font-bold">₹{p.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500">Inclusive</span>
                <span className="badge-discount text-sm sm:text-base px-2 sm:px-3 py-1">{discount}%</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Colour:</span>
                <span className="font-medium">{selectedColor}</span>
              </div>
            </div>

            <ProductOptions
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              selectedMotor={selectedMotor}
              setSelectedMotor={setSelectedMotor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            <ProductActions
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              pincode={pincode}
              setPincode={setPincode}
              onCheckPincode={handleCheckPincode}
              pincodeResult={pincodeResult}
            />
          </div>

          
          <div className="lg:hidden order-3">
            <ProductSpecifications product={p} />
          </div>
        </div>
      </div>
    </>
  );
}
