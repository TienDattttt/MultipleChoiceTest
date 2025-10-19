"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  Calendar,
  Award,
  FileText,
  TrendingUp,
  User,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Student {
  id: string;
  studentCode: string;
  name: string;
  email: string;
  phone: string;
  className: string;
  grade: string;
  dateOfBirth: string;
  gender: string;
  status: "active" | "inactive" | "graduated";
  enrollmentDate: string;
  totalExams: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  attendanceRate: number;
}

interface ExamHistory {
  examId: string;
  examName: string;
  subject: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  rank: number;
  totalStudents: number;
}

export default function AdminStudentSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterGrade, setFilterGrade] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Mock data
  const students: Student[] = [
    {
      id: "1",
      studentCode: "HS001",
      name: "Nguyễn Văn An",
      email: "nguyenvanan@gmail.com",
      phone: "0901234567",
      className: "10A1",
      grade: "10",
      dateOfBirth: "2008-05-15",
      gender: "Nam",
      status: "active",
      enrollmentDate: "2023-09-01",
      totalExams: 24,
      averageScore: 8.5,
      highestScore: 10,
      lowestScore: 6.5,
      attendanceRate: 95.8,
    },
    {
      id: "2",
      studentCode: "HS002",
      name: "Trần Thị Bình",
      email: "tranthibinh@gmail.com",
      phone: "0902345678",
      className: "10A1",
      grade: "10",
      dateOfBirth: "2008-03-20",
      gender: "Nữ",
      status: "active",
      enrollmentDate: "2023-09-01",
      totalExams: 24,
      averageScore: 9.2,
      highestScore: 10,
      lowestScore: 8.0,
      attendanceRate: 98.5,
    },
    {
      id: "3",
      studentCode: "HS003",
      name: "Lê Minh Châu",
      email: "leminhchau@gmail.com",
      phone: "0903456789",
      className: "10A2",
      grade: "10",
      dateOfBirth: "2008-07-10",
      gender: "Nữ",
      status: "active",
      enrollmentDate: "2023-09-01",
      totalExams: 22,
      averageScore: 7.8,
      highestScore: 9.5,
      lowestScore: 5.5,
      attendanceRate: 91.2,
    },
    {
      id: "4",
      studentCode: "HS004",
      name: "Phạm Văn Đức",
      email: "phamvanduc@gmail.com",
      phone: "0904567890",
      className: "11A1",
      grade: "11",
      dateOfBirth: "2007-11-25",
      gender: "Nam",
      status: "active",
      enrollmentDate: "2022-09-01",
      totalExams: 48,
      averageScore: 8.0,
      highestScore: 9.8,
      lowestScore: 6.0,
      attendanceRate: 93.5,
    },
    {
      id: "5",
      studentCode: "HS005",
      name: "Hoàng Thị Em",
      email: "hoangthiem@gmail.com",
      phone: "0905678901",
      className: "12A1",
      grade: "12",
      dateOfBirth: "2006-02-18",
      gender: "Nữ",
      status: "active",
      enrollmentDate: "2021-09-01",
      totalExams: 72,
      averageScore: 8.8,
      highestScore: 10,
      lowestScore: 7.5,
      attendanceRate: 97.2,
    },
  ];

  const examHistory: ExamHistory[] = [
    {
      examId: "1",
      examName: "Kiểm tra giữa kỳ I - Toán 10",
      subject: "Toán học",
      date: "2025-01-15",
      score: 9.0,
      totalQuestions: 40,
      correctAnswers: 36,
      rank: 3,
      totalStudents: 120,
    },
    {
      examId: "2",
      examName: "Kiểm tra 15 phút - Vật lý 10",
      subject: "Vật lý",
      date: "2025-01-12",
      score: 8.5,
      totalQuestions: 20,
      correctAnswers: 17,
      rank: 8,
      totalStudents: 118,
    },
    {
      examId: "3",
      examName: "Thi cuối kỳ I - Hóa học 10",
      subject: "Hóa học",
      date: "2025-01-10",
      score: 8.0,
      totalQuestions: 50,
      correctAnswers: 40,
      rank: 12,
      totalStudents: 120,
    },
  ];

  const classes = ["10A1", "10A2", "10A3", "11A1", "11A2", "12A1", "12A2"];
  const grades = ["10", "11", "12"];

  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    graduated: "bg-blue-100 text-blue-800",
  };

  const statusLabels = {
    active: "Đang học",
    inactive: "Tạm nghỉ",
    graduated: "Đã tốt nghiệp",
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || student.className === filterClass;
    const matchesGrade = filterGrade === "all" || student.grade === filterGrade;
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesClass && matchesGrade && matchesStatus;
  });

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailDialogOpen(true);
  };

  const handleExportData = () => {
    console.log("Exporting student data...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tìm Kiếm Thông Tin Thí Sinh</h1>
              <p className="text-sm text-gray-600 mt-1">
                Tra cứu và quản lý thông tin học sinh
              </p>
            </div>
            <Button onClick={handleExportData} className="bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Xuất Danh Sách
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Tìm Kiếm & Bộ Lọc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm theo tên, mã số, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Lớp học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả lớp</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Đang học</SelectItem>
                  <SelectItem value="inactive">Tạm nghỉ</SelectItem>
                  <SelectItem value="graduated">Đã tốt nghiệp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng Số Học Sinh
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-gray-900">{students.length}</p>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Đang Học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-green-600">
                  {students.filter((s) => s.status === "active").length}
                </p>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Điểm TB Chung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-primary">
                  {(
                    students.reduce((sum, s) => sum + s.averageScore, 0) / students.length
                  ).toFixed(1)}
                </p>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tỷ Lệ Tham Dự TB
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-orange-600">
                  {(
                    students.reduce((sum, s) => sum + s.attendanceRate, 0) / students.length
                  ).toFixed(1)}
                  %
                </p>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Danh Sách Học Sinh ({filteredStudents.length})
            </CardTitle>
            <CardDescription>Kết quả tìm kiếm thông tin học sinh</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Mã HS
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Họ và tên
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Lớp
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Liên hệ
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Số bài thi
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Điểm TB
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Tỷ lệ tham dự
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {student.studentCode}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.gender}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded font-medium">
                          {student.className}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Mail className="h-3 w-3" />
                            {student.email}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Phone className="h-3 w-3" />
                            {student.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">
                        {student.totalExams}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold text-primary">
                          {student.averageScore}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`text-sm font-medium ${
                            student.attendanceRate >= 90
                              ? "text-green-600"
                              : student.attendanceRate >= 75
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {student.attendanceRate}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[student.status]
                          }`}
                        >
                          {statusLabels[student.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(student)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Chi tiết
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy học sinh
                </h3>
                <p className="text-sm text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Thông Tin Chi Tiết Học Sinh</DialogTitle>
            <DialogDescription>Xem thông tin và lịch sử học tập của học sinh</DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6 py-4">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Thông Tin Cơ Bản</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Mã học sinh</p>
                      <p className="font-medium">{selectedStudent.studentCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Họ và tên</p>
                      <p className="font-medium">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ngày sinh</p>
                      <p className="font-medium">{selectedStudent.dateOfBirth}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Giới tính</p>
                      <p className="font-medium">{selectedStudent.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Lớp</p>
                      <p className="font-medium">{selectedStudent.className}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Khối</p>
                      <p className="font-medium">Khối {selectedStudent.grade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-sm">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Số điện thoại</p>
                      <p className="font-medium">{selectedStudent.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ngày nhập học</p>
                      <p className="font-medium">{selectedStudent.enrollmentDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Trạng thái</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusColors[selectedStudent.status]
                        }`}
                      >
                        {statusLabels[selectedStudent.status]}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kết Quả Học Tập</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Tổng số bài thi</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {selectedStudent.totalExams}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Điểm trung bình</p>
                      <p className="text-2xl font-bold text-green-600">
                        {selectedStudent.averageScore}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Điểm cao nhất</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {selectedStudent.highestScore}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Tỷ lệ tham dự</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {selectedStudent.attendanceRate}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exam History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Lịch Sử Thi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {examHistory.map((exam) => (
                      <div
                        key={exam.examId}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{exam.examName}</h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {exam.subject}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {exam.date}
                            </span>
                            <span>
                              {exam.correctAnswers}/{exam.totalQuestions} câu
                            </span>
                            <span>
                              Hạng {exam.rank}/{exam.totalStudents}
                            </span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-2xl font-bold text-primary">{exam.score}</p>
                          <p className="text-xs text-gray-500">điểm</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}