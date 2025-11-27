import ExpandableSection from "./ExpandableSection";

export default function ProductSpecifications({ product }) {
    return (
        <div>
            
            <ExpandableSection title="What's in the Box?" defaultOpen={false}>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 mt-3">
                    <li>1x {product.title}</li>
                    <li>User Manual</li>
                    <li>Warranty Card</li>
                    {product.title?.toLowerCase().includes('treadmill') && (
                        <>
                            <li>Assembly Tools</li>
                            <li>Safety Key</li>
                        </>
                    )}
                    {product.title?.toLowerCase().includes('protein') && <li>Measuring Scoop</li>}
                    {product.title?.toLowerCase().includes('band') && <li>Carry Pouch</li>}
                </ul>
            </ExpandableSection>

            
            <ExpandableSection title="Additional Information" defaultOpen={false}>
                <div className="space-y-3 text-sm text-gray-700 mt-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Country of Origin:</span>
                        <span className="font-medium">India</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Manufacturer:</span>
                        <span className="font-medium">{product.brand || 'FITZDO'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Warranty:</span>
                        <span className="font-medium">1 Year</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Customer Care:</span>
                        <span className="font-medium">1800-XXX-XXXX</span>
                    </div>
                </div>
            </ExpandableSection>

            
            <ExpandableSection title="Product Specification" defaultOpen={true}>
                {product.specs && (
                    <table className="w-full text-sm mt-3">
                        <tbody>
                            {Object.entries(product.specs).map(([key, value]) => (
                                <tr key={key} className="border-b border-gray-100 last:border-0">
                                    <td className="py-3 text-gray-600 font-medium">{key}</td>
                                    <td className="py-3 text-gray-900">{String(value)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </ExpandableSection>

            {/* Delivery & Returns */}
            <ExpandableSection title="Delivery & Returns" defaultOpen={false}>
                <div className="space-y-4 text-sm text-gray-700 mt-3">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Delivery Information</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            <li>FREE delivery available on orders above ₹500</li>
                            <li>Standard delivery: 3-5 business days</li>
                            <li>Express delivery: 1-2 business days (additional charges apply)</li>
                            <li>Cash on Delivery available</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Return Policy</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            <li>7 days return policy from delivery date</li>
                            <li>Product must be unused and in original packaging</li>
                            <li>Free return pickup available</li>
                            <li>Refund processed within 5-7 business days</li>
                        </ul>
                    </div>
                </div>
            </ExpandableSection>
        </div>
    );
}
