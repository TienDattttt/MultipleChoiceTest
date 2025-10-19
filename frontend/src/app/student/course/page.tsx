"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookOpen, Clock, CheckCircle, AlertCircle, FileText, ArrowLeft, Calendar } from "lucide-react";

export default function StudentCoursePage() {
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId");
  
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">("all");

  const assignments = [
    {
      id: 1,
      title: "Kiểm tra 15 phút - Chương 1: Hàm số",
      subject: "Toán học",
      dueDate: "2024-01-25",
      status: "pending",
      type: "quiz",
      duration: "15 phút",
      questions: 10,
      className: "Toán 12A1",
    },
    {
      id: 2,
      title: "Bài tập về nhà - Phương trình lượng giác",
      subject: "Toán học",
      dueDate: "2024-01-28",
      status: "pending",
      type: "homework",
      duration: "60 phút",
      questions: 20,
      className: "Toán 12A1",
    },
    {
      id: 3,
      title: "Kiểm tra giữa kỳ - Học kỳ I",
      subject: "Toán học",
      dueDate: "2024-01-20",
      status: "completed",
      type: "exam",
      duration: "90 phút",
      questions: 30,
      score: 8.5,
      className: "Toán 12A1",
    },
    {
      id: 4,
      title: "Bài tập tuần 3 - Đạo hàm",
      subject: "Toán học",
      dueDate: "2024-01-18",
      status: "completed",
      type: "homework",
      duration: "45 phút",
      questions: 15,
      score: 9.0,
      className: "Toán 12A1",
    },
  ];

  const filteredAssignments = assignments.filter((assignment) => {
    if (activeTab === "all") return true;
    return assignment.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    if (status === "pending") return "text-orange-600 bg-orange-100";
    if (status === "completed") return "text-green-600 bg-green-100";
    return "text-gray-600 bg-gray-100";
  };

  const getTypeLabel = (type: string) => {
    if (type === "quiz") return "Kiểm tra";
    if (type === "homework") return "Bài tập";
    if (type === "exam") return "Thi";
    return type;
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
              <Link href="/student/course" className="text-[#0052cc] font-semibold">
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
        {/* Back Button */}
        <Link
          href="/student/classroom"
          className="inline-flex items-center gap-2 text-[#0052cc] hover:text-[#003d99] mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại lớp học
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Khóa học & Bài tập</h1>
          <p className="text-[#4a5568]">Danh sách bài tập và kiểm tra của bạn</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{assignments.length}</p>
                <p className="text-[#718096] text-sm">Tổng bài tập</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {assignments.filter((a) => a.status === "pending").length}
                </p>
                <p className="text-[#718096] text-sm">Chưa hoàn thành</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {assignments.filter((a) => a.status === "completed").length}
                </p>
                <p className="text-[#718096] text-sm">Đã hoàn thành</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] mb-6">
          <div className="flex border-b border-[#e8ebf0]">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-4 font-semibold transition-colors relative ${
                activeTab === "all"
                  ? "text-[#0052cc] border-b-2 border-[#0052cc]"
                  : "text-[#718096] hover:text-[#4a5568]"
              }`}
            >
              Tất cả ({assignments.length})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-6 py-4 font-semibold transition-colors relative ${
                activeTab === "pending"
                  ? "text-[#0052cc] border-b-2 border-[#0052cc]"
                  : "text-[#718096] hover:text-[#4a5568]"
              }`}
            >
              Chưa hoàn thành ({assignments.filter((a) => a.status === "pending").length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-6 py-4 font-semibold transition-colors relative ${
                activeTab === "completed"
                  ? "text-[#0052cc] border-b-2 border-[#0052cc]"
                  : "text-[#718096] hover:text-[#4a5568]"
              }`}
            >
              Đã hoàn thành ({assignments.filter((a) => a.status === "completed").length})
            </button>
          </div>
        </div>

        {/* Assignment List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8] hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        assignment.status
                      )}`}
                    >
                      {assignment.status === "pending" ? "Chưa hoàn thành" : "Đã hoàn thành"}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                      {getTypeLabel(assignment.type)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{assignment.title}</h3>
                  <p className="text-[#718096] mb-4">{assignment.className}</p>
                  <div className="flex items-center gap-6 text-sm text-[#4a5568]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Hạn nộp: {assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{assignment.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{assignment.questions} câu hỏi</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {assignment.status === "completed" && assignment.score && (
                    <div className="mb-4">
                      <p className="text-3xl font-bold text-[#10b981]">{assignment.score}</p>
                      <p className="text-sm text-[#718096]">Điểm số</p>
                    </div>
                  )}
                  {assignment.status === "pending" ? (
                    <button className="px-6 py-2 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors">
                      Làm bài
                    </button>
                  ) : (
                    <button className="px-6 py-2 border-2 border-[#0052cc] text-[#0052cc] font-semibold rounded-full hover:bg-[#e3f2fd] transition-colors">
                      Xem chi tiết
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}