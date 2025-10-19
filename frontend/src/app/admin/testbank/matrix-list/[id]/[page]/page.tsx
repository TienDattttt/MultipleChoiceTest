"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  FileText,
  BookOpen,
  Clock,
  Target,
} from "lucide-react";

export default function MatrixListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const matrices = [
    {
      id: 1,
      name: "Ma trận đề kiểm tra giữa kỳ - Học kỳ I",
      subject: "Toán học",
      grade: "12",
      chapters: "1, 2, 3",
      totalQuestions: 30,
      totalPoints: 100,
      difficulty: {
        easy: 40,
        medium: 40,
        hard: 20,
      },
      createdDate: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Ma trận kiểm tra 15 phút - Chương 1",
      subject: "Toán học",
      grade: "12",
      chapters: "1",
      totalQuestions: 10,
      totalPoints: 100,
      difficulty: {
        easy: 50,
        medium: 30,
        hard: 20,
      },
      createdDate: "2024-01-10",
      status: "active",
    },
    {
      id: 3,
      name: "Ma trận đề thi cuối kỳ - Học kỳ I",
      subject: "Toán học",
      grade: "12",
      chapters: "1, 2, 3, 4",
      totalQuestions: 50,
      totalPoints: 100,
      difficulty: {
        easy: 30,
        medium: 50,
        hard: 20,
      },
      createdDate: "2024-01-05",
      status: "draft",
    },
  ];

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy":
        return "bg-green-100 text-green-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "hard":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
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
              <span className="text-[#4a5568] font-semibold">Ma trận đề thi</span>
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
        {/* Back Button */}
        <Link
          href="/admin/testbank/document-management/0/0/1"
          className="inline-flex items-center gap-2 text-[#0052cc] hover:text-[#003d99] mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại ngân hàng đề
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Ma trận đề thi</h1>
          <p className="text-[#4a5568]">Quản lý và thiết lập ma trận cho các đề thi</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{matrices.length}</p>
                <p className="text-sm text-[#718096]">Tổng ma trận</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {matrices.filter((m) => m.status === "active").length}
                </p>
                <p className="text-sm text-[#718096]">Đang hoạt động</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">12</p>
                <p className="text-sm text-[#718096]">Môn học</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {matrices.filter((m) => m.status === "draft").length}
                </p>
                <p className="text-sm text-[#718096]">Bản nháp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm ma trận..."
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
              </select>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors">
              <Plus className="w-5 h-5" />
              Tạo ma trận mới
            </button>
          </div>
        </div>

        {/* Matrix List */}
        <div className="space-y-4">
          {matrices.map((matrix) => (
            <div
              key={matrix.id}
              className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-[#1a1a1a]">{matrix.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        matrix.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {matrix.status === "active" ? "Hoạt động" : "Bản nháp"}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-[#4a5568]">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {matrix.subject} - Lớp {matrix.grade}
                    </span>
                    <span>Chương: {matrix.chapters}</span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {matrix.createdDate}
                    </span>
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
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Matrix Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#e8ebf0]">
                <div>
                  <p className="text-sm text-[#718096] mb-2">Số câu hỏi</p>
                  <p className="text-2xl font-bold text-[#1a1a1a]">{matrix.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-sm text-[#718096] mb-2">Tổng điểm</p>
                  <p className="text-2xl font-bold text-[#1a1a1a]">{matrix.totalPoints}</p>
                </div>
                <div>
                  <p className="text-sm text-[#718096] mb-3">Độ khó</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-green-600 font-semibold">Dễ</span>
                        <span className="text-green-600 font-semibold">{matrix.difficulty.easy}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${matrix.difficulty.easy}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-yellow-600 font-semibold">TB</span>
                        <span className="text-yellow-600 font-semibold">{matrix.difficulty.medium}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500"
                          style={{ width: `${matrix.difficulty.medium}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-red-600 font-semibold">Khó</span>
                        <span className="text-red-600 font-semibold">{matrix.difficulty.hard}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500"
                          style={{ width: `${matrix.difficulty.hard}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {matrices.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-12 text-center">
            <div className="w-24 h-24 bg-[#e3f2fd] rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-12 h-12 text-[#0052cc]" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Chưa có ma trận nào</h3>
            <p className="text-[#4a5568] mb-6">Tạo ma trận đầu tiên để bắt đầu</p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors">
              <Plus className="w-5 h-5" />
              Tạo ma trận mới
            </button>
          </div>
        )}
      </div>
    </div>
  );
}