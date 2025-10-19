"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, UserPlus, Mail, Search } from "lucide-react";

export default function AddTeacherPage() {
  const [teacherCode, setTeacherCode] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle teacher code submission
    console.log("Teacher code:", teacherCode);
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle teacher email submission
    console.log("Teacher email:", teacherEmail);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#dfe3e8]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-[#0052cc]">
                Azota
              </Link>
              <span className="text-[#718096]">|</span>
              <span className="text-[#4a5568] font-semibold">Học sinh</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/student/classroom" className="text-[#4a5568] hover:text-[#0052cc]">
                Lớp học
              </Link>
              <Link href="/student/course" className="text-[#4a5568] hover:text-[#0052cc]">
                Khóa học
              </Link>
              <Link href="/student/add-teacher" className="text-[#0052cc] font-semibold">
                Thêm giáo viên
              </Link>
              <div className="w-10 h-10 rounded-full bg-[#0052cc] flex items-center justify-center text-white font-semibold">
                HS
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          href="/student/classroom"
          className="inline-flex items-center gap-2 text-[#0052cc] hover:text-[#003d99] mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại lớp học
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-[#e3f2fd] rounded-full flex items-center justify-center mx-auto mb-6">
            <UserPlus className="w-10 h-10 text-[#0052cc]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Thêm giáo viên</h1>
          <p className="text-[#4a5568]">Nhập mã giáo viên hoặc email để tham gia lớp học</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Method 1: Teacher Code */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a]">Phương pháp 1: Mã giáo viên</h2>
                <p className="text-sm text-[#718096]">Nhập mã do giáo viên cung cấp</p>
              </div>
            </div>

            <form onSubmit={handleSubmitCode} className="space-y-4">
              <div>
                <label htmlFor="teacherCode" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                  Mã giáo viên
                </label>
                <input
                  id="teacherCode"
                  type="text"
                  value={teacherCode}
                  onChange={(e) => setTeacherCode(e.target.value)}
                  placeholder="Nhập mã giáo viên (VD: AZOTA123456)"
                  className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                  required
                />
                <p className="text-xs text-[#718096] mt-2">
                  Mã giáo viên thường có định dạng: AZOTA + 6 chữ số
                </p>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors"
              >
                Tìm kiếm giáo viên
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#e8ebf0]"></div>
            <span className="text-[#718096] font-semibold">HOẶC</span>
            <div className="flex-1 h-px bg-[#e8ebf0]"></div>
          </div>

          {/* Method 2: Email */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a]">Phương pháp 2: Email giáo viên</h2>
                <p className="text-sm text-[#718096]">Nhập email đã đăng ký trên Azota</p>
              </div>
            </div>

            <form onSubmit={handleSubmitEmail} className="space-y-4">
              <div>
                <label htmlFor="teacherEmail" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                  Email giáo viên
                </label>
                <input
                  id="teacherEmail"
                  type="email"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  placeholder="Nhập email giáo viên"
                  className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors"
              >
                Tìm kiếm giáo viên
              </button>
            </form>
          </div>

          {/* Instructions */}
          <div className="bg-[#e3f2fd] p-6 rounded-xl border border-[#0052cc] border-opacity-20">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Hướng dẫn</h3>
            <ul className="space-y-2 text-sm text-[#4a5568]">
              <li className="flex items-start gap-2">
                <span className="text-[#0052cc] font-bold">1.</span>
                <span>Yêu cầu giáo viên cung cấp mã giáo viên hoặc email đã đăng ký</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0052cc] font-bold">2.</span>
                <span>Nhập thông tin vào một trong hai phương pháp trên</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0052cc] font-bold">3.</span>
                <span>Hệ thống sẽ hiển thị thông tin giáo viên để bạn xác nhận</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0052cc] font-bold">4.</span>
                <span>Gửi yêu cầu tham gia và đợi giáo viên chấp nhận</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}