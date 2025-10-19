"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Copy,
  BookOpen,
  FileText,
  Tag,
  TrendingUp,
  BarChart3,
  Star,
  Clock,
} from "lucide-react";

export default function QuestionLibraryDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const libraries = [
    {
      id: 1,
      name: "Thư viện câu hỏi Toán 12 - Chương 1",
      subject: "Toán học",
      grade: "12",
      chapter: "1",
      totalQuestions: 150,
      difficulty: {
        easy: 60,
        medium: 60,
        hard: 30,
      },
      tags: ["Hàm số", "Đạo hàm", "Giới hạn"],
      createdDate: "2024-01-15",
      usageCount: 45,
    },
    {
      id: 2,
      name: "Thư viện câu hỏi Toán 12 - Chương 2",
      subject: "Toán học",
      grade: "12",
      chapter: "2",
      totalQuestions: 120,
      difficulty: {
        easy: 40,
        medium: 50,
        hard: 30,
      },
      tags: ["Lượng giác", "Phương trình"],
      createdDate: "2024-01-10",
      usageCount: 38,
    },
    {
      id: 3,
      name: "Thư viện câu hỏi Toán 11 - Tổng hợp",
      subject: "Toán học",
      grade: "11",
      chapter: "Tổng hợp",
      totalQuestions: 200,
      difficulty: {
        easy: 80,
        medium: 80,
        hard: 40,
      },
      tags: ["Đại số", "Hình học"],
      createdDate: "2024-01-05",
      usageCount: 52,
    },
  ];

  const stats = [
    {
      label: "Tổng thư viện",
      value: libraries.length,
      icon: BookOpen,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Tổng câu hỏi",
      value: libraries.reduce((sum, lib) => sum + lib.totalQuestions, 0),
      icon: FileText,
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Đã sử dụng",
      value: libraries.reduce((sum, lib) => sum + lib.usageCount, 0),
      icon: TrendingUp,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Yêu thích",
      value: 12,
      icon: Star,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
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
              <span className="text-[#4a5568] font-semibold">Thư viện câu hỏi</span>
            </div>
            <Link
              href="/admin/dashboard"
              className="px-6 py-2 border-2 border-[#0052cc] text-[#0052cc] font-semibold rounded-full hover:bg-[#e3f2fd] transition-colors"
            >
              Trang chủ
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Thư viện câu hỏi</h1>
            <p className="text-[#4a5568]">Quản lý và tổ chức các bộ câu hỏi của bạn</p>
          </div>
          <Link
            href="/admin/question-library/add-new-question-library"
            className="flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Tạo thư viện mới
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1a1a1a]">{stat.value}</p>
                  <p className="text-sm text-[#718096]">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm thư viện câu hỏi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
              />
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
            >
              <option value="all">Tất cả môn học</option>
              <option value="math">Toán học</option>
              <option value="physics">Vật lý</option>
              <option value="chemistry">Hóa học</option>
              <option value="english">Tiếng Anh</option>
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
            >
              <option value="all">Tất cả độ khó</option>
              <option value="easy">Dễ</option>
              <option value="medium">Trung bình</option>
              <option value="hard">Khó</option>
            </select>
            <button className="p-3 border border-[#dfe3e8] rounded-lg hover:bg-[#f5f7fa] transition-colors">
              <Filter className="w-5 h-5 text-[#4a5568]" />
            </button>
          </div>
        </div>

        {/* Libraries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {libraries.map((library) => (
            <div
              key={library.id}
              className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{library.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-[#4a5568] mb-3">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {library.subject} - Lớp {library.grade}
                    </span>
                    <span>Chương {library.chapter}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {library.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#e3f2fd] text-[#0052cc] text-xs font-semibold rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-[#0052cc] hover:bg-[#e3f2fd] rounded-lg transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-[#0052cc] hover:bg-[#e3f2fd] rounded-lg transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-[#0052cc] hover:bg-[#e3f2fd] rounded-lg transition-colors">
                    <Copy className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#e8ebf0]">
                <div>
                  <p className="text-sm text-[#718096] mb-2">Số câu hỏi</p>
                  <p className="text-2xl font-bold text-[#1a1a1a]">{library.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-sm text-[#718096] mb-2">Đã sử dụng</p>
                  <p className="text-2xl font-bold text-[#0052cc]">{library.usageCount} lần</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e8ebf0] mt-4">
                <p className="text-sm text-[#718096] mb-3">Phân bố độ khó</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-green-600 w-16">Dễ</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${(library.difficulty.easy / library.totalQuestions) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-[#1a1a1a] w-12 text-right">
                      {library.difficulty.easy}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-yellow-600 w-16">Trung bình</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{
                          width: `${(library.difficulty.medium / library.totalQuestions) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-[#1a1a1a] w-12 text-right">
                      {library.difficulty.medium}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-red-600 w-16">Khó</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500"
                        style={{
                          width: `${(library.difficulty.hard / library.totalQuestions) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-[#1a1a1a] w-12 text-right">
                      {library.difficulty.hard}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#e8ebf0] mt-4">
                <div className="flex items-center gap-2 text-sm text-[#718096]">
                  <Clock className="w-4 h-4" />
                  <span>{library.createdDate}</span>
                </div>
                <button className="px-4 py-2 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors">
                  Sử dụng
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {libraries.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-12 text-center">
            <div className="w-24 h-24 bg-[#e3f2fd] rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-[#0052cc]" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Chưa có thư viện câu hỏi nào</h3>
            <p className="text-[#4a5568] mb-6">Tạo thư viện câu hỏi đầu tiên của bạn</p>
            <Link
              href="/admin/question-library/add-new-question-library"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Tạo thư viện mới
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}