export default function ProductOptions({
    selectedColor,
    setSelectedColor,
    selectedModel,
    setSelectedModel,
    selectedMotor,
    setSelectedMotor,
    selectedSize,
    setSelectedSize
}) {
    return (
        <div className="mb-6">
            
            <div className="grid grid-cols-5 gap-2 mb-4">
                {["Any Size", "Snarazer", "Metallic", "Celestia", "Platinum"].map((variant) => (
                    <button
                        key={variant}
                        onClick={() => setSelectedColor(variant)}
                        className={`border rounded px-3 py-2 text-xs transition ${selectedColor === variant
                                ? "border-orange-600 bg-orange-50 text-orange-700 font-semibold"
                                : "border-gray-300 hover:border-orange-400"
                            }`}
                    >
                        {variant}
                    </button>
                ))}
            </div>

            
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Model: Import Ultra / Massager</label>
                <div className="flex gap-2">
                    {["Four - 4.5HP", "Focus Plus - N..."].map((model) => (
                        <button
                            key={model}
                            onClick={() => setSelectedModel(model)}
                            className={`rounded px-4 py-2 text-sm font-medium transition ${selectedModel === model
                                    ? "border-2 border-orange-600 bg-orange-50 text-orange-700"
                                    : "border border-gray-300 hover:border-orange-400"
                                }`}
                        >
                            {model}
                        </button>
                    ))}
                </div>
            </div>

            
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Motor Type: 9880Ultra - Massager</label>
                <div className="flex gap-2">
                    <button
                        onClick={() => setSelectedMotor("Import - 4.5HP")}
                        className="border-2 border-orange-600 bg-orange-50 rounded px-4 py-2 text-sm font-medium text-orange-700"
                    >
                        Import - 4.5HP
                    </button>
                </div>
            </div>

            
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">QTY</label>
                <div className="flex items-center gap-2">
                    {["M", "L", "XL", "XXL", "3XL"].map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`border rounded px-4 py-2 text-lg transition ${selectedSize === size
                                    ? "border-orange-600 bg-orange-50 text-orange-700 font-semibold"
                                    : "border-gray-300 hover:bg-gray-50"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
