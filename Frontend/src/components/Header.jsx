import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Header({ searchQuery = "", onSearchChange = null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData && userData !== "undefined") {
          setUser(JSON.parse(userData));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
        setUser(null);
      }
    };

    
    loadUserData();

    
    const handleUserUpdate = () => {
      loadUserData();
    };

    window.addEventListener('userLoggedIn', handleUserUpdate);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserUpdate);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      
      <div className="px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          
          <Link to="/products" className="flex items-center gap-2">
            <span className="fitzdo-logo text-orange-600 text-xl sm:text-2xl">FITZDO</span>
          </Link>

          
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          
          <div className="hidden md:flex items-center gap-4">
            
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {(() => {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
                return itemCount > 0 ? (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                ) : null;
              })()}
            </Link>

            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-all"
              >
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{user?.name || "User"}</div>

                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-white">{getInitials(user?.name)}</span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-600 truncate">{user?.email || ""}</p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-all">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">My Profile</div>
                      <div className="text-xs text-gray-500">View and edit profile</div>
                    </div>
                  </Link>

                  <Link
                    to="/profile?tab=orders"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-all">
                      <span className="text-lg">📦</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">My Orders</div>
                      <div className="text-xs text-gray-500">Track your orders</div>
                    </div>
                  </Link>

                  <Link
                    to="/profile?tab=settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-all">
                      <span className="text-lg">⚙️</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Settings</div>
                      <div className="text-xs text-gray-500">Account preferences</div>
                    </div>
                  </Link>

                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-all">
                        <span className="text-lg">🚪</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-red-600">Logout</div>
                        <div className="text-xs text-gray-500">Sign out of your account</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      
        <div className="md:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

      
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
                <span className="text-base font-bold text-white">{getInitials(user?.name)}</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{user?.name || "User"}</div>

              </div>
            </div>

            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 hover:bg-orange-50 rounded-lg transition-all mb-1"
            >
              <span className="text-lg">👤</span>
              <span className="text-sm font-medium">My Profile</span>
            </Link>

            <Link
              to="/profile?tab=orders"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 hover:bg-orange-50 rounded-lg transition-all mb-1"
            >
              <span className="text-lg">📦</span>
              <span className="text-sm font-medium">My Orders</span>
            </Link>

            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 hover:bg-orange-50 rounded-lg transition-all mb-1"
            >
              <span className="text-lg">🛒</span>
              <span className="text-sm font-medium">Shopping Cart</span>
              {(() => {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
                return itemCount > 0 ? (
                  <span className="ml-auto bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {itemCount}
                  </span>
                ) : null;
              })()}
            </Link>

            <div className="border-t border-gray-200 mt-2 pt-2">
              <Link
                to="/"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-3 hover:bg-red-50 rounded-lg transition-all text-red-600"
              >
                <span className="text-lg">🚪</span>
                <span className="text-sm font-medium">Logout</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
