"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Users,
  BookOpen,
  TrendingUp,
  Settings,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  UserPlus,
} from "lucide-react";

export default function ManageClassroomPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");

  const classrooms = [
    {
      id: 2472846,
      name: "Toán 12A1",
      subject: "Toán học",
      grade: "12",
      students: 45,
      averageScore: 8.2,
      completionRate: 93,
      teacher: "Nguyễn Văn A",
      createdDate: "2023-09-01",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2472847,
      name: "Toán 12A2",
      subject: "Toán học",
      grade: "12",
      students: 42,
      averageScore: 7.8,
      completionRate: 88,
      teacher: "Nguyễn Văn A",
      createdDate: "2023-09-01",
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 2472848,
      name: "Toán 11A1",
      subject: "Toán học",
      grade: "11",
      students: 40,
      averageScore: 7.5,
      completionRate: 85,
      teacher: "Nguyễn Văn A",
      createdDate: "2023-09-01",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 2472849,
      name: "Toán 10A1",
      subject: "Toán học",
      grade: "10",
      students: 48,
      averageScore: 8.0,
      completionRate: 90,
      teacher: "Nguyễn Văn A",
      createdDate: "2023-09-01",
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
              <span className="text-[#4a5568] font-semibold">Quản lý lớp học</span>
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
            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Quản lý lớp học</h1>
            <p className="text-[#4a5568]">Quản lý học sinh và theo dõi tiến độ học tập</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors">
            <Plus className="w-5 h-5" />
            Tạo lớp học mới
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{classrooms.length}</p>
                <p className="text-sm text-[#718096]">Tổng lớp học</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {classrooms.reduce((sum, c) => sum + c.students, 0)}
                </p>
                <p className="text-sm text-[#718096]">Tổng học sinh</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {(
                    classrooms.reduce((sum, c) => sum + c.averageScore, 0) / classrooms.length
                  ).toFixed(1)}
                </p>
                <p className="text-sm text-[#718096]">Điểm trung bình</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {Math.round(
                    classrooms.reduce((sum, c) => sum + c.completionRate, 0) / classrooms.length
                  )}
                  %
                </p>
                <p className="text-sm text-[#718096]">Tỷ lệ hoàn thành</p>
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
                  placeholder="Tìm kiếm lớp học..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                />
              </div>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
              >
                <option value="all">Tất cả khối</option>
                <option value="10">Khối 10</option>
                <option value="11">Khối 11</option>
                <option value="12">Khối 12</option>
              </select>
              <button className="p-3 border border-[#dfe3e8] rounded-lg hover:bg-[#f5f7fa] transition-colors">
                <Filter className="w-5 h-5 text-[#4a5568]" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-3 border-2 border-[#0052cc] text-[#0052cc] font-semibold rounded-full hover:bg-[#e3f2fd] transition-colors">
                <Upload className="w-5 h-5" />
                Nhập danh sách
              </button>
              <button className="flex items-center gap-2 px-4 py-3 border-2 border-[#0052cc] text-[#0052cc] font-semibold rounded-full hover:bg-[#e3f2fd] transition-colors">
                <Download className="w-5 h-5" />
                Xuất báo cáo
              </button>
            </div>
          </div>
        </div>

        {/* Classroom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <Link
              key={classroom.id}
              href={`/admin/student/classroom-details/${classroom.id}/0`}
              className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] hover:shadow-lg transition-shadow overflow-hidden group"
            >
              {/* Card Header */}
              <div className={`${classroom.color} p-6 pb-12 relative`}>
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-16 h-16 rounded-full ${classroom.color} border-4 border-white flex items-center justify-center ${classroom.iconColor}`}
                  >
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <button
                    className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <MoreVertical className="w-5 h-5 text-[#4a5568]" />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-1 group-hover:text-[#0052cc] transition-colors">
                  {classroom.name}
                </h3>
                <p className="text-[#4a5568] text-sm">{classroom.subject}</p>
              </div>

              {/* Card Body */}
              <div className="p-6 -mt-6 bg-white rounded-t-xl relative z-10">
                <div className="flex items-center gap-2 text-[#4a5568] mb-4">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-semibold">{classroom.students} học sinh</span>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#e8ebf0]">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#718096]">Điểm TB</span>
                    <span className="font-bold text-[#10b981]">{classroom.averageScore}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#718096]">Tỷ lệ hoàn thành</span>
                    <span className="font-bold text-[#0052cc]">{classroom.completionRate}%</span>
                  </div>
                  <div className="pt-3 border-t border-[#e8ebf0]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#718096]">Tiến độ học tập</span>
                      <span className="text-xs font-semibold text-[#1a1a1a]">
                        {classroom.completionRate}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#e8ebf0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0052cc] rounded-full"
                        style={{ width: `${classroom.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#e8ebf0]">
                  <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {classrooms.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-12 text-center">
            <div className="w-24 h-24 bg-[#e3f2fd] rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-[#0052cc]" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Chưa có lớp học nào</h3>
            <p className="text-[#4a5568] mb-6">Tạo lớp học đầu tiên của bạn</p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors">
              <Plus className="w-5 h-5" />
              Tạo lớp học mới
            </button>
          </div>
        )}
      </div>
    </div>
  );
}