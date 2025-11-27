import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import API from "../api/api";

export default function Profile() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState("profile");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India"
    });

    const [orders] = useState([
        {
            id: "ORD-001",
            date: "2025-11-20",
            status: "Delivered",
            total: 2599,
            items: 2,
            products: ["Nike Air Max 270", "Adidas Ultraboost"]
        },
        {
            id: "ORD-002",
            date: "2025-11-15",
            status: "Shipped",
            total: 1899,
            items: 1,
            products: ["Puma RS-X"]
        },
        {
            id: "ORD-003",
            date: "2025-11-10",
            status: "Processing",
            total: 3499,
            items: 3,
            products: ["New Balance 574", "Reebok Classic", "Converse All Star"]
        }
    ]);

    useEffect(() => {
        try {
            const userData = localStorage.getItem("user");
            if (!userData || userData === "undefined") {
                navigate("/");
                return;
            }

            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setFormData({
                name: parsedUser.name || "",
                email: parsedUser.email || "",
                phone: parsedUser.phone || "",
                street: parsedUser.address?.street || "",
                city: parsedUser.address?.city || "",
                state: parsedUser.address?.state || "",
                zipCode: parsedUser.address?.zipCode || "",
                country: parsedUser.address?.country || "India"
            });
            setLoading(false);

            
            const tab = searchParams.get("tab");
            if (tab && ["profile", "orders", "settings"].includes(tab)) {
                setActiveTab(tab);
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            
            localStorage.removeItem("user");
            navigate("/");
        }
    }, [navigate, searchParams]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.put("/auth/profile", {
                name: formData.name,
                phone: formData.phone,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country
                }
            });

            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);

            
            window.dispatchEvent(new Event('userLoggedIn'));

            alert("Profile updated successfully!");
        } catch (err) {
            alert(err.response?.data?.msg || "Failed to update profile");
        }
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered": return "text-green-600 bg-green-50";
            case "Shipped": return "text-blue-600 bg-blue-50";
            case "Processing": return "text-yellow-600 bg-yellow-50";
            case "Cancelled": return "text-red-600 bg-red-50";
            default: return "text-gray-600 bg-gray-50";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center h-96">
                    <div className="text-xl text-gray-600">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                            <span className="text-3xl font-bold text-white">{getInitials(user?.name)}</span>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-bold mb-2">{user?.name || "User"}</h1>
                            <p className="text-orange-100 text-lg mb-1">{user?.email}</p>
                            <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                                {user?.role || "Customer"}
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="border-b border-gray-200">
                        <div className="flex overflow-x-auto">
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all ${activeTab === "profile"
                                    ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/50"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                📝 Personal Information
                            </button>
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all ${activeTab === "orders"
                                    ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/50"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                📦 Order History
                            </button>
                            <button
                                onClick={() => setActiveTab("settings")}
                                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all ${activeTab === "settings"
                                    ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/50"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                ⚙️ Account Settings
                            </button>
                        </div>
                    </div>

                    
                    <div className="p-6 md:p-8">
                        {activeTab === "profile" && (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-600 cursor-not-allowed"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+91 XXXXX XXXXX"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            value={user?.role || "Customer"}
                                            disabled
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-600 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="border-t pt-6 mt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Street Address
                                            </label>
                                            <input
                                                type="text"
                                                name="street"
                                                value={formData.street}
                                                onChange={handleInputChange}
                                                placeholder="123 Main Street, Apt 4B"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    placeholder="Mumbai"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    State
                                                </label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    placeholder="Maharashtra"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    ZIP Code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                    placeholder="400001"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-medium shadow-md hover:shadow-lg"
                                    >
                                        💾 Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/products")}
                                        className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab === "orders" && (
                            <div className="space-y-4">
                                {orders.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">📦</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
                                        <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                                        <button
                                            onClick={() => navigate("/products")}
                                            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-medium"
                                        >
                                            Start Shopping
                                        </button>
                                    </div>
                                ) : (
                                    orders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all bg-white"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                        Order #{order.id}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Placed on {new Date(order.date).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric"
                                                        })}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-100 pt-4 space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Items:</span>
                                                    <span className="font-medium text-gray-900">{order.items}</span>
                                                </div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-600">Products:</span>
                                                    <span className="font-medium text-gray-900 text-right">
                                                        {order.products.join(", ")}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-base font-semibold pt-2 border-t">
                                                    <span className="text-gray-900">Total:</span>
                                                    <span className="text-orange-600">₹{order.total.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex gap-3">
                                                <button className="flex-1 px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-all font-medium text-sm">
                                                    View Details
                                                </button>
                                                {order.status === "Delivered" && (
                                                    <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-medium text-sm">
                                                        Buy Again
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === "settings" && (
                            <div className="space-y-8">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        🔐 Security Settings
                                    </h3>
                                    <div className="space-y-4">
                                        <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium">
                                            Change Password
                                        </button>
                                        <p className="text-sm text-gray-600">
                                            Last password change: Never
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        🔔 Notification Preferences
                                    </h3>
                                    <div className="space-y-4">
                                        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-all">
                                            <div>
                                                <div className="font-medium text-gray-900">Email Notifications</div>
                                                <div className="text-sm text-gray-600">Receive updates about your orders</div>
                                            </div>
                                            <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500" />
                                        </label>
                                        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-all">
                                            <div>
                                                <div className="font-medium text-gray-900">Promotional Emails</div>
                                                <div className="text-sm text-gray-600">Get special offers and deals</div>
                                            </div>
                                            <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500" />
                                        </label>
                                        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-all">
                                            <div>
                                                <div className="font-medium text-gray-900">SMS Notifications</div>
                                                <div className="text-sm text-gray-600">Text alerts for order updates</div>
                                            </div>
                                            <input type="checkbox" className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500" />
                                        </label>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        ⚠️ Danger Zone
                                    </h3>
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-700">
                                            Once you delete your account, there is no going back. Please be certain.
                                        </p>
                                        <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
