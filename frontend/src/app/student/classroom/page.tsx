"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Plus, Users, Clock, FileText, Search } from "lucide-react";

export default function StudentClassroomPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const classrooms = [
    {
      id: 1,
      name: "Toán 12A1",
      teacher: "Nguyễn Văn A",
      subject: "Toán học",
      students: 45,
      assignments: 12,
      nextClass: "Thứ 2, 8:00 AM",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      name: "Vật Lý 12A1",
      teacher: "Trần Thị B",
      subject: "Vật lý",
      students: 42,
      assignments: 8,
      nextClass: "Thứ 3, 10:00 AM",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      name: "Hóa Học 12A1",
      teacher: "Lê Văn C",
      subject: "Hóa học",
      students: 40,
      assignments: 10,
      nextClass: "Thứ 4, 2:00 PM",
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 4,
      name: "Tiếng Anh 12A1",
      teacher: "Phạm Thị D",
      subject: "Tiếng Anh",
      students: 48,
      assignments: 15,
      nextClass: "Thứ 5, 9:00 AM",
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
              <span className="text-[#4a5568] font-semibold">Học sinh</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/student/classroom" className="text-[#0052cc] font-semibold">
                Lớp học
              </Link>
              <Link href="/student/course" className="text-[#4a5568] hover:text-[#0052cc]">
                Khóa học
              </Link>
              <Link href="/student/add-teacher" className="text-[#4a5568] hover:text-[#0052cc]">
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Lớp học của tôi</h1>
          <p className="text-[#4a5568]">Quản lý và theo dõi các lớp học bạn đang tham gia</p>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center justify-between mb-6">
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
          <Link
            href="/student/add-teacher"
            className="ml-4 flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Thêm giáo viên
          </Link>
        </div>

        {/* Classroom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {classrooms.map((classroom) => (
            <Link
              key={classroom.id}
              href={`/student/course?classId=${classroom.id}`}
              className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] hover:shadow-lg transition-shadow overflow-hidden group"
            >
              {/* Card Header */}
              <div className={`${classroom.color} p-6 pb-12 relative`}>
                <div className={`w-16 h-16 rounded-full ${classroom.color} border-4 border-white flex items-center justify-center ${classroom.iconColor} mb-3`}>
                  <BookOpen className="w-8 h-8" />
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
                  <span className="text-sm font-semibold">{classroom.teacher}</span>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#e8ebf0]">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#718096]">Học sinh</span>
                    <span className="font-semibold text-[#1a1a1a]">{classroom.students}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#718096]">Bài tập</span>
                    <span className="font-semibold text-[#1a1a1a]">{classroom.assignments}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm pt-3 border-t border-[#e8ebf0]">
                    <Clock className="w-4 h-4 text-[#0052cc]" />
                    <span className="text-[#4a5568]">{classroom.nextClass}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {classrooms.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-[#e3f2fd] rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-[#0052cc]" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Chưa có lớp học nào</h3>
            <p className="text-[#4a5568] mb-6">Thêm giáo viên để tham gia các lớp học</p>
            <Link
              href="/student/add-teacher"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Thêm giáo viên
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}