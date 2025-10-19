"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Users,
  FileText,
  Settings,
  Download,
  Upload,
  Plus,
  Search,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Edit,
  Trash2,
  UserPlus,
  BookOpen,
} from "lucide-react";

export default function ClassroomDetailsPage() {
  const params = useParams();
  const classroomId = params.classroomId as string;
  const currentTab = parseInt(params.tab as string) || 0;
  
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: 0, label: "Tổng quan", icon: BookOpen },
    { id: 1, label: "Danh sách học sinh", icon: Users },
    { id: 2, label: "Bài tập & Kiểm tra", icon: FileText },
    { id: 10, label: "Báo cáo", icon: TrendingUp },
    { id: 11, label: "Cài đặt", icon: Settings },
  ];

  const students = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "an.nguyen@example.com",
      phone: "0123456789",
      averageScore: 8.5,
      completionRate: 95,
      totalAssignments: 20,
      submittedAssignments: 19,
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      email: "binh.tran@example.com",
      phone: "0123456788",
      averageScore: 7.8,
      completionRate: 88,
      totalAssignments: 20,
      submittedAssignments: 18,
      status: "active",
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      email: "cuong.le@example.com",
      phone: "0123456787",
      averageScore: 9.0,
      completionRate: 100,
      totalAssignments: 20,
      submittedAssignments: 20,
      status: "active",
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Kiểm tra 15 phút - Chương 1",
      type: "quiz",
      dueDate: "2024-01-25",
      submitted: 42,
      total: 45,
      averageScore: 8.2,
      status: "active",
    },
    {
      id: 2,
      title: "Bài tập về nhà - Chương 2",
      type: "homework",
      dueDate: "2024-01-28",
      submitted: 38,
      total: 45,
      averageScore: 7.5,
      status: "active",
    },
    {
      id: 3,
      title: "Kiểm tra giữa kỳ",
      type: "exam",
      dueDate: "2024-01-20",
      submitted: 45,
      total: 45,
      averageScore: 8.0,
      status: "completed",
    },
  ];

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">45</p>
                    <p className="text-sm text-[#718096]">Học sinh</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">20</p>
                    <p className="text-sm text-[#718096]">Bài tập</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">8.2</p>
                    <p className="text-sm text-[#718096]">Điểm TB</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">93%</p>
                    <p className="text-sm text-[#718096]">Hoàn thành</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Hoạt động gần đây</h3>
              <div className="space-y-4">
                {assignments.slice(0, 3).map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 border border-[#e8ebf0] rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1a1a1a] mb-1">{assignment.title}</h4>
                      <p className="text-sm text-[#718096]">
                        {assignment.submitted}/{assignment.total} bài nộp • Điểm TB: {assignment.averageScore}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      assignment.status === "active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      {assignment.status === "active" ? "Đang diễn ra" : "Đã kết thúc"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Students */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Học sinh xuất sắc</h3>
              <div className="space-y-4">
                {students.slice(0, 3).map((student, index) => (
                  <div key={student.id} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-600"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1a1a1a]">{student.name}</h4>
                      <p className="text-sm text-[#718096]">{student.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#10b981]">{student.averageScore}</p>
                      <p className="text-xs text-[#718096]">Điểm TB</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm học sinh..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-3 border-2 border-[#0052cc] text-[#0052cc] font-semibold rounded-full hover:bg-[#e3f2fd] transition-colors">
                    <Upload className="w-5 h-5" />
                    Nhập danh sách
                  </button>
                  <button className="flex items-center gap-2 px-4 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors">
                    <UserPlus className="w-5 h-5" />
                    Thêm học sinh
                  </button>
                </div>
              </div>
            </div>

            {/* Students List */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f5f7fa] border-b border-[#dfe3e8]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">Học sinh</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">Liên hệ</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-[#1a1a1a]">Điểm TB</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-[#1a1a1a]">Hoàn thành</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-[#1a1a1a]">Trạng thái</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-[#1a1a1a]">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-[#e8ebf0] hover:bg-[#f5f7fa] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#0052cc] rounded-full flex items-center justify-center text-white font-semibold">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-[#1a1a1a]">{student.name}</p>
                              <p className="text-sm text-[#718096]">ID: {student.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-[#4a5568]">
                              <Mail className="w-4 h-4" />
                              <span>{student.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#4a5568]">
                              <Phone className="w-4 h-4" />
                              <span>{student.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-2xl font-bold text-[#10b981]">{student.averageScore}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div>
                            <p className="font-semibold text-[#1a1a1a] mb-1">{student.completionRate}%</p>
                            <div className="w-24 h-2 bg-[#e8ebf0] rounded-full overflow-hidden mx-auto">
                              <div
                                className="h-full bg-[#0052cc]"
                                style={{ width: `${student.completionRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                            Đang học
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 text-[#0052cc] hover:bg-[#e3f2fd] rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-[#4a5568] hover:bg-[#f5f7fa] rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài tập..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                  />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors ml-4">
                  <Plus className="w-5 h-5" />
                  Tạo bài tập mới
                </button>
              </div>
            </div>

            {/* Assignments */}
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-[#1a1a1a]">{assignment.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          assignment.status === "active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                        }`}>
                          {assignment.status === "active" ? "Đang diễn ra" : "Đã kết thúc"}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                          {assignment.type === "quiz" ? "Kiểm tra" : assignment.type === "homework" ? "Bài tập" : "Thi"}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-[#4a5568]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Hạn: {assignment.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{assignment.submitted}/{assignment.total} bài nộp</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          <span>Điểm TB: {assignment.averageScore}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                  <div className="pt-4 border-t border-[#e8ebf0]">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-[#718096]">Tiến độ nộp bài</span>
                          <span className="font-semibold text-[#1a1a1a]">
                            {Math.round((assignment.submitted / assignment.total) * 100)}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-[#e8ebf0] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0052cc]"
                            style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <button className="ml-6 px-6 py-2 border-2 border-[#0052cc] text-[#0052cc] font-semibold rounded-full hover:bg-[#e3f2fd] transition-colors">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Báo cáo thống kê</h3>
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-[#718096] mx-auto mb-4" />
                <p className="text-[#718096]">Chức năng báo cáo đang được phát triển</p>
              </div>
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Cài đặt lớp học</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Tên lớp học</label>
                  <input
                    type="text"
                    defaultValue="Toán 12A1"
                    className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Mô tả</label>
                  <textarea
                    rows={4}
                    defaultValue="Lớp học Toán học khối 12"
                    className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-end gap-4">
                  <button className="px-6 py-3 border-2 border-[#dfe3e8] text-[#4a5568] font-semibold rounded-full hover:bg-[#f5f7fa] transition-colors">
                    Hủy
                  </button>
                  <button className="px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors">
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Tab không tồn tại</div>;
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
              <span className="text-[#4a5568] font-semibold">Chi tiết lớp học</span>
            </div>
            <Link
              href="/admin/student/manage-classroom/0"
              className="px-6 py-2 border-2 border-[#0052cc] text-[#0052cc] font-semibold rounded-full hover:bg-[#e3f2fd] transition-colors"
            >
              Quay lại
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Classroom Info */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 mb-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Toán 12A1</h1>
              <p className="text-blue-100 mb-4">Lớp 12 - Toán học</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>45 học sinh</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span>20 bài tập</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Tạo: 01/09/2023</span>
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-[#0052cc] font-semibold rounded-full hover:bg-blue-50 transition-colors">
              Chỉnh sửa
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] mb-6">
          <div className="flex border-b border-[#e8ebf0] overflow-x-auto">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={`/admin/student/classroom-details/${classroomId}/${tab.id}`}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                  currentTab === tab.id
                    ? "text-[#0052cc] border-b-2 border-[#0052cc]"
                    : "text-[#718096] hover:text-[#4a5568]"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}