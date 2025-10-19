"use client";

import { useState } from "react";
import { Calendar, Clock, FileText, Search, Eye, AlertCircle, CheckCircle } from "lucide-react";
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
  DialogFooter,
} from "@/components/ui/dialog";

interface StudentExam {
  id: string;
  examName: string;
  subject: string;
  className: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  examType: "online" | "offline" | "both";
  status: "upcoming" | "ongoing" | "completed" | "missed";
  score?: number;
  totalQuestions?: number;
  registrationRequired: boolean;
  isRegistered: boolean;
}

export default function StudentSchedulePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [selectedExam, setSelectedExam] = useState<StudentExam | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Mock data
  const studentExams: StudentExam[] = [
    {
      id: "1",
      examName: "Kiểm tra giữa kỳ I - Toán 10",
      subject: "Toán học",
      className: "10A1",
      date: "2025-01-15",
      startTime: "08:00",
      endTime: "09:30",
      duration: 90,
      examType: "online",
      status: "upcoming",
      registrationRequired: true,
      isRegistered: true,
      totalQuestions: 40,
    },
    {
      id: "2",
      examName: "Kiểm tra 15 phút - Vật lý 10",
      subject: "Vật lý",
      className: "10A1",
      date: "2025-01-12",
      startTime: "14:00",
      endTime: "14:15",
      duration: 15,
      examType: "offline",
      status: "upcoming",
      registrationRequired: false,
      isRegistered: true,
    },
    {
      id: "3",
      examName: "Kiểm tra định kỳ - Tiếng Anh 10",
      subject: "Tiếng Anh",
      className: "10A1",
      date: "2025-01-18",
      startTime: "15:00",
      endTime: "16:00",
      duration: 60,
      examType: "online",
      status: "upcoming",
      registrationRequired: true,
      isRegistered: false,
    },
    {
      id: "4",
      examName: "Thi cuối kỳ I - Hóa học 10",
      subject: "Hóa học",
      className: "10A1",
      date: "2025-01-05",
      startTime: "08:00",
      endTime: "10:00",
      duration: 120,
      examType: "both",
      status: "completed",
      score: 8.5,
      totalQuestions: 50,
      registrationRequired: false,
      isRegistered: true,
    },
    {
      id: "5",
      examName: "Kiểm tra thường xuyên - Lịch sử 10",
      subject: "Lịch sử",
      className: "10A1",
      date: "2025-01-03",
      startTime: "09:00",
      endTime: "09:45",
      duration: 45,
      examType: "online",
      status: "missed",
      registrationRequired: false,
      isRegistered: true,
    },
  ];

  const subjects = ["Toán học", "Vật lý", "Hóa học", "Tiếng Anh", "Ngữ văn", "Lịch sử", "Địa lý"];

  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
    missed: "bg-red-100 text-red-800",
  };

  const statusLabels = {
    upcoming: "Sắp diễn ra",
    ongoing: "Đang diễn ra",
    completed: "Đã hoàn thành",
    missed: "Đã bỏ lỡ",
  };

  const statusIcons = {
    upcoming: AlertCircle,
    ongoing: Clock,
    completed: CheckCircle,
    missed: AlertCircle,
  };

  const examTypeLabels = {
    online: "Trực tuyến",
    offline: "Giấy",
    both: "Cả hai",
  };

  const filteredExams = studentExams.filter((exam) => {
    const matchesSearch = exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || exam.status === filterStatus;
    const matchesSubject = filterSubject === "all" || exam.subject === filterSubject;
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const upcomingExams = studentExams.filter(e => e.status === "upcoming");
  const completedExams = studentExams.filter(e => e.status === "completed");
  const missedExams = studentExams.filter(e => e.status === "missed");

  const handleViewDetails = (exam: StudentExam) => {
    setSelectedExam(exam);
    setIsDetailDialogOpen(true);
  };

  const handleStartExam = (examId: string) => {
    console.log("Start exam:", examId);
    // Navigate to exam page
  };

  const handleRegisterExam = (examId: string) => {
    console.log("Register for exam:", examId);
  };

  const handleViewResult = (examId: string) => {
    console.log("View result:", examId);
    // Navigate to result page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lịch Thi Của Tôi</h1>
            <p className="text-sm text-gray-600 mt-1">Xem lịch thi và kết quả các kỳ thi</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng số bài thi</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{studentExams.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sắp diễn ra</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{upcomingExams.length}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã hoàn thành</p>
                <p className="text-3xl font-bold text-gray-600 mt-2">{completedExams.length}</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã bỏ lỡ</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{missedExams.length}</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm bài thi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="upcoming">Sắp diễn ra</SelectItem>
                <SelectItem value="ongoing">Đang diễn ra</SelectItem>
                <SelectItem value="completed">Đã hoàn thành</SelectItem>
                <SelectItem value="missed">Đã bỏ lỡ</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Môn học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả môn học</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Exams List */}
        <div className="space-y-4">
          {filteredExams.map((exam) => {
            const StatusIcon = statusIcons[exam.status];
            return (
              <div
                key={exam.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{exam.examName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[exam.status]}`}>
                        {statusLabels[exam.status]}
                      </span>
                      {exam.registrationRequired && !exam.isRegistered && exam.status === "upcoming" && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Chưa đăng ký
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span>{exam.subject}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{exam.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{exam.startTime} - {exam.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">{examTypeLabels[exam.examType]}</span>
                        <span>• {exam.duration} phút</span>
                      </div>
                    </div>

                    {exam.status === "completed" && exam.score !== undefined && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Điểm số:</span>
                          <span className="text-2xl font-bold text-green-600">{exam.score}/10</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(exam)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Chi tiết
                    </Button>

                    {exam.status === "upcoming" && exam.isRegistered && (
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => handleStartExam(exam.id)}
                      >
                        Vào thi
                      </Button>
                    )}

                    {exam.status === "upcoming" && !exam.isRegistered && exam.registrationRequired && (
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleRegisterExam(exam.id)}
                      >
                        Đăng ký
                      </Button>
                    )}

                    {exam.status === "completed" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleViewResult(exam.id)}
                      >
                        Xem kết quả
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredExams.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy bài thi</h3>
              <p className="text-sm text-gray-600">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi Tiết Bài Thi</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về bài thi
            </DialogDescription>
          </DialogHeader>
          {selectedExam && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedExam.examName}</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[selectedExam.status]}`}>
                    {statusLabels[selectedExam.status]}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Môn học</p>
                  <p className="font-medium">{selectedExam.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lớp</p>
                  <p className="font-medium">{selectedExam.className}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày thi</p>
                  <p className="font-medium">{selectedExam.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Thời gian</p>
                  <p className="font-medium">{selectedExam.startTime} - {selectedExam.endTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Thời lượng</p>
                  <p className="font-medium">{selectedExam.duration} phút</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hình thức</p>
                  <p className="font-medium">{examTypeLabels[selectedExam.examType]}</p>
                </div>
                {selectedExam.totalQuestions && (
                  <div>
                    <p className="text-sm text-gray-600">Số câu hỏi</p>
                    <p className="font-medium">{selectedExam.totalQuestions} câu</p>
                  </div>
                )}
                {selectedExam.score !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600">Điểm số</p>
                    <p className="font-medium text-green-600 text-xl">{selectedExam.score}/10</p>
                  </div>
                )}
              </div>

              {selectedExam.registrationRequired && (
                <div className={`p-4 rounded-lg ${selectedExam.isRegistered ? 'bg-green-50' : 'bg-orange-50'}`}>
                  <div className="flex items-center gap-2">
                    {selectedExam.isRegistered ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Đã đăng ký thi</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        <span className="text-sm font-medium text-orange-900">Cần đăng ký để tham gia thi</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Đóng
            </Button>
            {selectedExam?.status === "upcoming" && selectedExam.isRegistered && (
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => {
                  setIsDetailDialogOpen(false);
                  handleStartExam(selectedExam.id);
                }}
              >
                Vào thi
              </Button>
            )}
            {selectedExam?.status === "completed" && (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setIsDetailDialogOpen(false);
                  handleViewResult(selectedExam.id);
                }}
              >
                Xem kết quả
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}