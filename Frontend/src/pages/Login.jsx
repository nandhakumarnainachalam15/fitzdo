import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      
      window.dispatchEvent(new Event('userLoggedIn'));

      nav("/products");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
    
      <header className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-end gap-1">
          <span className="fitzdo-logo">FITZDO</span>
          <span className="text-sm text-gray-600">& BUSINESS</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 text-lg">🇮🇳</span>
            <span className="text-sm font-medium">IN</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">🌐</span>
            <span className="text-sm font-medium">EN</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>Fitzdo Is Secure</span>
            <span className="text-gray-600">🔒</span>
          </div>
        </div>
      </header>

      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl mb-2">
              <span className="fitzdo-logo">FITZDO</span>
              <span className="fitzdo-circle text-3xl ml-2">Circle</span>
            </h1>
          </div>

          
          <div className="bg-white">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Login to your Account
            </h2>

            <form onSubmit={submit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email - ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email - ID"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Enter Your Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="input-field pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
