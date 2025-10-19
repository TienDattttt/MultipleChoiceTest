"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Mock login - replace with actual API call later
    setTimeout(() => {
      console.log("Login data:", formData);
      // Mock successful login
      localStorage.setItem("user", JSON.stringify({
        email: formData.email,
        role: "student",
        name: "Học sinh"
      }));
      router.push("/student/classroom");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#dfe3e8]">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl font-bold text-[#0052cc]">Azota</span>
            <span className="px-3 py-1 bg-[#e3f2fd] text-[#0052cc] text-xs font-semibold rounded-full">
              MAKE IN VIETNAM
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#dfe3e8] p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#e3f2fd] rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-[#0052cc]" />
              </div>
              <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">Đăng nhập</h1>
              <p className="text-[#4a5568]">Chào mừng bạn quay trở lại Azota</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.email ? "border-red-500" : "border-[#dfe3e8]"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    autoComplete="off"
                    className={`w-full pl-10 pr-12 py-3 border ${
                      errors.password ? "border-red-500" : "border-[#dfe3e8]"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#718096] hover:text-[#0052cc]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#0052cc] border-[#dfe3e8] rounded focus:ring-[#0052cc]"
                  />
                  <span className="text-sm text-[#4a5568]">Ghi nhớ đăng nhập</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang đăng nhập...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Đăng nhập
                  </>
                )}
              </button>

              {/* Role Selection Quick Access */}
              <div className="pt-4 border-t border-[#e8ebf0]">
                <p className="text-sm text-[#718096] text-center mb-3">Hoặc đăng nhập với vai trò</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ email: "student@azota.vn", password: "123456", rememberMe: false });
                    }}
                    className="px-4 py-2 border-2 border-[#dfe3e8] text-[#4a5568] font-semibold rounded-lg hover:border-[#0052cc] hover:text-[#0052cc] transition-colors"
                  >
                    Học sinh
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ email: "teacher@azota.vn", password: "123456", rememberMe: false });
                    }}
                    className="px-4 py-2 border-2 border-[#dfe3e8] text-[#4a5568] font-semibold rounded-lg hover:border-[#0052cc] hover:text-[#0052cc] transition-colors"
                  >
                    Giáo viên
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-[#4a5568]">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="text-[#0052cc] font-semibold hover:text-[#003d99]">
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-[#e3f2fd] border border-[#0052cc] border-opacity-20 rounded-xl">
            <p className="text-sm font-semibold text-[#1a1a1a] mb-2">🎯 Demo Credentials:</p>
            <div className="text-xs text-[#4a5568] space-y-1">
              <p><strong>Học sinh:</strong> student@azota.vn / 123456</p>
              <p><strong>Giáo viên:</strong> teacher@azota.vn / 123456</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#dfe3e8] py-6">
        <div className="container mx-auto px-6 text-center text-sm text-[#718096]">
          <p>&copy; 2025 Azota. Made in Vietnam 🇻🇳</p>
        </div>
      </footer>
    </div>
  );
}