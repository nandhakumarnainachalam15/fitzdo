import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
       
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(savedCart);
    }, []);

    const updateCart = (newCart) => {
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const removeItem = (index) => {
        const newCart = cartItems.filter((_, i) => i !== index);
        updateCart(newCart);
    };

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;
        const newCart = [...cartItems];
        newCart[index].quantity = newQuantity;
        updateCart(newCart);
    };

    const clearCart = () => {
        updateCart([]);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <>
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">{getTotalItems()} items in your cart</p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <svg
                            className="w-24 h-24 mx-auto text-gray-300 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">Add some products to get started!</p>
                        <Link
                            to="/products"
                            className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
                                >
                                    
                                    <Link
                                        to={`/products/${item.product._id}`}
                                        className="w-full sm:w-32 h-32 flex-shrink-0"
                                    >
                                        <img
                                            src={item.product.images?.[0] || 'https://via.placeholder.com/150'}
                                            alt={item.product.title}
                                            className="w-full h-full object-contain rounded"
                                        />
                                    </Link>

                                    
                                    <div className="flex-1">
                                        <Link to={`/products/${item.product._id}`}>
                                            <h3 className="font-semibold text-lg mb-1 hover:text-orange-600">
                                                {item.product.title}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-gray-500 mb-2">{item.product.brand}</p>

                                        <div className="text-sm text-gray-600 space-y-1 mb-3">
                                            {item.color && <p>Color: <span className="font-medium">{item.color}</span></p>}
                                            {item.size && <p>Size: <span className="font-medium">{item.size}</span></p>}
                                            {item.model && <p>Model: <span className="font-medium">{item.model}</span></p>}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4">
                                            
                                            <div className="flex items-center border border-gray-300 rounded">
                                                <button
                                                    onClick={() => updateQuantity(index, item.quantity - 1)}
                                                    className="px-3 py-1 hover:bg-gray-100 transition"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    −
                                                </button>
                                                <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                                    className="px-3 py-1 hover:bg-gray-100 transition"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            
                                            <div className="flex-1">
                                                <p className="text-xl font-bold">
                                                    ₹{(item.product.price * item.quantity).toLocaleString()}
                                                </p>
                                                {item.quantity > 1 && (
                                                    <p className="text-sm text-gray-500">
                                                        ₹{item.product.price.toLocaleString()} each
                                                    </p>
                                                )}
                                            </div>

                                            
                                            <button
                                                onClick={() => removeItem(index)}
                                                className="text-red-600 hover:text-red-700 font-medium text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            
                            <button
                                onClick={clearCart}
                                className="w-full sm:w-auto text-red-600 hover:text-red-700 font-medium text-sm border border-red-600 rounded px-4 py-2 hover:bg-red-50 transition"
                            >
                                Clear Cart
                            </button>
                        </div>

                        
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                                        <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium text-green-600">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax (included)</span>
                                        <span className="font-medium">₹0</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-lg font-bold mb-6">
                                    <span>Total</span>
                                    <span>₹{getTotalPrice().toLocaleString()}</span>
                                </div>

                                <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition mb-3">
                                    Proceed to Checkout
                                </button>

                                <Link
                                    to="/products"
                                    className="block w-full text-center border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                                >
                                    Continue Shopping
                                </Link>

                                
                                <div className="mt-6 p-4 bg-gray-50 rounded text-sm">
                                    <div className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div>
                                            <p className="font-medium">FREE delivery on this order</p>
                                            <p className="text-gray-600 text-xs mt-1">Estimated delivery: 3-5 business days</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
