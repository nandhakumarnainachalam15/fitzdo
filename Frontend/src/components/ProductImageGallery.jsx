export default function ProductImageGallery({ images, selectedImage, onImageSelect, productTitle }) {
    return (
        <div>
            {/* Main Image */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <div className="relative group">
                    <img
                        src={images[selectedImage]}
                        className="w-full h-[450px] object-contain"
                        alt={productTitle}
                    />
                    {/* Icon buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-50">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-50">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => onImageSelect(idx)}
                        className={`flex-shrink-0 w-24 h-24 border-2 rounded-lg overflow-hidden ${selectedImage === idx ? "border-orange-600" : "border-gray-200 hover:border-gray-300"
                            }`}
                    >
                        <img src={img} className="w-full h-full object-contain p-2" alt="" />
                    </button>
                ))}
            </div>
        </div>
    );
}
