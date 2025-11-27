export default function ProductActions({
    onAddToCart,
    onBuyNow,
    pincode,
    setPincode,
    onCheckPincode,
    pincodeResult
}) {
    return (
        <div>
            
            <div className="flex gap-3 mb-6">
                <button
                    onClick={onAddToCart}
                    className="flex-1 border border-gray-300 rounded px-6 py-3 font-semibold hover:bg-gray-50 transition"
                >
                    Add to Cart
                </button>
                <button
                    onClick={onBuyNow}
                    className="flex-1 bg-black text-white rounded px-6 py-3 font-semibold hover:bg-gray-800 transition"
                >
                    Buy Now
                </button>
            </div>

            
            <div className="mb-6">
                <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter pincode to check delivery"
                    className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-orange-600"
                    maxLength="6"
                />
                <button
                    onClick={onCheckPincode}
                    className="mt-2 bg-black text-white rounded px-6 py-2 text-sm font-medium hover:bg-gray-800 transition"
                >
                    Check
                </button>
                {pincodeResult && (
                    <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {pincodeResult}
                    </p>
                )}
            </div>

            
            <div className="mb-6 p-4 bg-gray-50 rounded">
                <div className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                        <p className="font-medium">FREE delivery by Tomorrow 10pm</p>
                        <p className="text-gray-600 text-xs">Fastest delivery for non-equipment purchases.</p>
                    </div>
                </div>
            </div>

            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-orange-600 text-white p-1.5 rounded">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="font-semibold">Offers & Discounts</h3>
                    <button className="ml-auto text-blue-600 text-sm hover:underline">See All</button>
                </div>

                <div className="space-y-2">
                    <div className="flex items-start gap-3 text-sm">
                        <div className="bg-gray-100 p-1 rounded flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium">Flat ₹200 OFF on FITZDO Credit (Discounts on ICICI Credit Cards)</p>
                            <p className="text-xs text-gray-500 mt-0.5">Valid on orders above ₹5000 only</p>
                        </div>
                        <button className="ml-auto">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
