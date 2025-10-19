"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, UserCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { name: "", email: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Họ và tên phải có ít nhất 2 ký tự";
      isValid = false;
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
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

    // Mock registration - replace with actual API call later
    setTimeout(() => {
      console.log("Register data:", formData);
      // Mock successful registration
      localStorage.setItem("user", JSON.stringify({
        email: formData.email,
        role: formData.role,
        name: formData.name
      }));
      
      // Redirect based on role
      if (formData.role === "student") {
        router.push("/student/classroom");
      } else if (formData.role === "teacher") {
        router.push("/admin/dashboard");
      }
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
          {/* Register Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#dfe3e8] p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#e3f2fd] rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCircle className="w-8 h-8 text-[#0052cc]" />
              </div>
              <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">Đăng ký tài khoản</h1>
              <p className="text-[#4a5568]">Tạo tài khoản mới để bắt đầu sử dụng Azota</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.name ? "border-red-500" : "border-[#dfe3e8]"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

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

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                  Vai trò <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                >
                  <option value="student">Học sinh</option>
                  <option value="teacher">Giáo viên</option>
                  <option value="admin">Quản trị viên</option>
                </select>
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
                    placeholder="Ít nhất 6 ký tự"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                  Xác nhận mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    autoComplete="off"
                    className={`w-full pl-10 pr-12 py-3 border ${
                      errors.confirmPassword ? "border-red-500" : "border-[#dfe3e8]"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#718096] hover:text-[#0052cc]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
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
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <UserCircle className="w-5 h-5" />
                    Đăng ký
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-[#4a5568]">
              Đã có tài khoản?{" "}
              <Link href="/login" className="text-[#0052cc] font-semibold hover:text-[#003d99]">
                Đăng nhập ngay
              </Link>
            </p>
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