"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Users,
  BookOpen,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Calendar,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      label: "Tổng số học sinh",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Đề thi đã tạo",
      value: "156",
      change: "+8%",
      icon: FileText,
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Lớp học",
      value: "24",
      change: "+3%",
      icon: BookOpen,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Bài thi hoàn thành",
      value: "892",
      change: "+15%",
      icon: CheckCircle,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  const recentTests = [
    {
      id: 1,
      title: "Kiểm tra 15 phút - Chương 1: Hàm số",
      class: "Toán 12A1",
      date: "2024-01-25",
      submissions: 42,
      total: 45,
      status: "active",
    },
    {
      id: 2,
      title: "Bài tập về nhà - Phương trình lượng giác",
      class: "Toán 12A2",
      date: "2024-01-24",
      submissions: 38,
      total: 40,
      status: "active",
    },
    {
      id: 3,
      title: "Kiểm tra giữa kỳ - Học kỳ I",
      class: "Toán 12A1",
      date: "2024-01-23",
      submissions: 45,
      total: 45,
      status: "completed",
    },
  ];

  const upcomingTests = [
    {
      id: 1,
      title: "Kiểm tra cuối chương 2",
      class: "Toán 12A1",
      date: "2024-01-28",
      time: "8:00 AM",
    },
    {
      id: 2,
      title: "Bài tập tuần 5",
      class: "Toán 12A2",
      date: "2024-01-29",
      time: "10:00 AM",
    },
  ];

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
              <span className="text-[#4a5568] font-semibold">Giáo viên</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent w-64"
                />
              </div>
              <button className="relative p-2 hover:bg-[#f5f7fa] rounded-lg transition-colors">
                <Bell className="w-6 h-6 text-[#4a5568]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-full bg-[#0052cc] flex items-center justify-center text-white font-semibold">
                GV
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-[#dfe3e8] min-h-screen">
          <nav className="p-4 space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-white bg-[#0052cc] rounded-lg font-semibold"
            >
              <LayoutDashboard className="w-5 h-5" />
              Tổng quan
            </Link>
            <Link
              href="/admin/testbank/document-management/0/0/1"
              className="flex items-center gap-3 px-4 py-3 text-[#4a5568] hover:bg-[#f5f7fa] rounded-lg font-semibold transition-colors"
            >
              <FileText className="w-5 h-5" />
              Ngân hàng đề
            </Link>
            <Link
              href="/admin/student/manage-classroom/0"
              className="flex items-center gap-3 px-4 py-3 text-[#4a5568] hover:bg-[#f5f7fa] rounded-lg font-semibold transition-colors"
            >
              <Users className="w-5 h-5" />
              Quản lý học sinh
            </Link>
            <Link
              href="/admin/question-library/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-[#4a5568] hover:bg-[#f5f7fa] rounded-lg font-semibold transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Thư viện câu hỏi
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-[#4a5568] hover:bg-[#f5f7fa] rounded-lg font-semibold transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              Báo cáo thống kê
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-[#4a5568] hover:bg-[#f5f7fa] rounded-lg font-semibold transition-colors"
            >
              <Settings className="w-5 h-5" />
              Cài đặt
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Chào mừng trở lại, Giáo viên!</h1>
            <p className="text-[#4a5568]">Đây là tổng quan về hoạt động giảng dạy của bạn</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-[#1a1a1a] mb-1">{stat.value}</p>
                <p className="text-sm text-[#718096]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Link
              href="/admin/testbank/create-new-document/0"
              className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-xl font-bold mb-2">Tạo đề thi mới</h3>
                  <p className="text-blue-100 text-sm">Bắt đầu tạo đề thi hoặc bài kiểm tra</p>
                </div>
                <Plus className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
            </Link>

            <Link
              href="/admin/student/manage-classroom/0"
              className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-xl font-bold mb-2">Quản lý lớp học</h3>
                  <p className="text-purple-100 text-sm">Xem và quản lý học sinh của bạn</p>
                </div>
                <Users className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
            </Link>

            <Link
              href="/admin/question-library/dashboard"
              className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-xl font-bold mb-2">Thư viện câu hỏi</h3>
                  <p className="text-green-100 text-sm">Truy cập và quản lý câu hỏi</p>
                </div>
                <BookOpen className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Tests */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Bài kiểm tra gần đây</h2>
                <Link href="/admin/testbank/document-management/0/0/1" className="text-[#0052cc] text-sm font-semibold hover:underline">
                  Xem tất cả
                </Link>
              </div>
              <div className="space-y-4">
                {recentTests.map((test) => (
                  <div key={test.id} className="p-4 border border-[#e8ebf0] rounded-lg hover:border-[#0052cc] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#1a1a1a] mb-1">{test.title}</h3>
                        <p className="text-sm text-[#718096]">{test.class}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          test.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {test.status === "active" ? "Đang diễn ra" : "Đã kết thúc"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#4a5568]">{test.date}</span>
                      <span className="text-[#0052cc] font-semibold">
                        {test.submissions}/{test.total} bài nộp
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tests */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Lịch kiểm tra sắp tới</h2>
                <Link href="#" className="text-[#0052cc] text-sm font-semibold hover:underline">
                  Xem lịch
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingTests.map((test) => (
                  <div key={test.id} className="p-4 border border-[#e8ebf0] rounded-lg hover:border-[#0052cc] transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#1a1a1a] mb-1">{test.title}</h3>
                        <p className="text-sm text-[#718096] mb-2">{test.class}</p>
                        <div className="flex items-center gap-2 text-sm text-[#4a5568]">
                          <Clock className="w-4 h-4" />
                          <span>{test.date} - {test.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {upcomingTests.length === 0 && (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-[#718096] mx-auto mb-3" />
                    <p className="text-[#718096]">Không có lịch kiểm tra sắp tới</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}