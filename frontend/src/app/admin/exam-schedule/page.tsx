"use client";

import { useState } from "react";
import { Calendar, Clock, Users, FileText, Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ExamSchedule {
  id: string;
  examName: string;
  subject: string;
  classes: string[];
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalStudents: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  examType: "online" | "offline" | "both";
}

export default function AdminExamSchedulePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamSchedule | null>(null);

  // Mock data
  const examSchedules: ExamSchedule[] = [
    {
      id: "1",
      examName: "Kiểm tra giữa kỳ I - Toán 10",
      subject: "Toán học",
      classes: ["10A1", "10A2", "10A3"],
      date: "2025-01-15",
      startTime: "08:00",
      endTime: "09:30",
      duration: 90,
      totalStudents: 120,
      status: "upcoming",
      examType: "online",
    },
    {
      id: "2",
      examName: "Kiểm tra 15 phút - Vật lý 11",
      subject: "Vật lý",
      classes: ["11A1", "11A2"],
      date: "2025-01-12",
      startTime: "14:00",
      endTime: "14:15",
      duration: 15,
      totalStudents: 80,
      status: "upcoming",
      examType: "offline",
    },
    {
      id: "3",
      examName: "Thi cuối kỳ I - Hóa học 12",
      subject: "Hóa học",
      classes: ["12A1", "12A2", "12A3", "12A4"],
      date: "2025-01-10",
      startTime: "08:00",
      endTime: "10:00",
      duration: 120,
      totalStudents: 160,
      status: "completed",
      examType: "both",
    },
    {
      id: "4",
      examName: "Kiểm tra định kỳ - Tiếng Anh 10",
      subject: "Tiếng Anh",
      classes: ["10A1", "10A4"],
      date: "2025-01-18",
      startTime: "15:00",
      endTime: "16:00",
      duration: 60,
      totalStudents: 70,
      status: "upcoming",
      examType: "online",
    },
  ];

  const subjects = ["Toán học", "Vật lý", "Hóa học", "Tiếng Anh", "Ngữ văn", "Lịch sử", "Địa lý"];
  const classes = ["10A1", "10A2", "10A3", "10A4", "11A1", "11A2", "11A3", "12A1", "12A2", "12A3", "12A4"];

  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabels = {
    upcoming: "Sắp diễn ra",
    ongoing: "Đang diễn ra",
    completed: "Đã hoàn thành",
    cancelled: "Đã hủy",
  };

  const examTypeLabels = {
    online: "Trực tuyến",
    offline: "Giấy",
    both: "Cả hai",
  };

  const filteredSchedules = examSchedules.filter((schedule) => {
    const matchesSearch = schedule.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || schedule.status === filterStatus;
    const matchesSubject = filterSubject === "all" || schedule.subject === filterSubject;
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const handleAddExam = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditExam = (exam: ExamSchedule) => {
    setSelectedExam(exam);
    setIsEditDialogOpen(true);
  };

  const handleDeleteExam = (examId: string) => {
    console.log("Delete exam:", examId);
  };

  const handleViewDetails = (exam: ExamSchedule) => {
    console.log("View exam details:", exam);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lịch Thi</h1>
              <p className="text-sm text-gray-600 mt-1">Quản lý lịch thi và kỳ thi</p>
            </div>
            <Button onClick={handleAddExam} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Tạo Lịch Thi Mới
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm kỳ thi..."
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
                <SelectItem value="cancelled">Đã hủy</SelectItem>
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng số kỳ thi</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{examSchedules.length}</p>
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
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {examSchedules.filter(e => e.status === "upcoming").length}
                </p>
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
                <p className="text-3xl font-bold text-gray-600 mt-2">
                  {examSchedules.filter(e => e.status === "completed").length}
                </p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng thí sinh</p>
                <p className="text-3xl font-bold text-primary mt-2">
                  {examSchedules.reduce((sum, e) => sum + e.totalStudents, 0)}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Exam Schedule Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Tên kỳ thi
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Môn học
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Lớp học
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Thời gian
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Thí sinh
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Hình thức
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{schedule.examName}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{schedule.subject}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {schedule.classes.slice(0, 2).map((cls) => (
                          <span key={cls} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {cls}
                          </span>
                        ))}
                        {schedule.classes.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{schedule.classes.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{schedule.date}</div>
                      <div className="text-xs text-gray-500">
                        {schedule.startTime} - {schedule.endTime} ({schedule.duration} phút)
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{schedule.totalStudents}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {examTypeLabels[schedule.examType]}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[schedule.status]}`}>
                        {statusLabels[schedule.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewDetails(schedule)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditExam(schedule)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteExam(schedule.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        setIsAddDialogOpen(open);
        setIsEditDialogOpen(open);
        if (!open) setSelectedExam(null);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isAddDialogOpen ? "Tạo Lịch Thi Mới" : "Chỉnh Sửa Lịch Thi"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tên kỳ thi *</Label>
                <Input placeholder="Nhập tên kỳ thi" defaultValue={selectedExam?.examName} />
              </div>
              <div className="space-y-2">
                <Label>Môn học *</Label>
                <Select defaultValue={selectedExam?.subject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn môn học" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Lớp học *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn lớp học (có thể chọn nhiều)" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Ngày thi *</Label>
                <Input type="date" defaultValue={selectedExam?.date} />
              </div>
              <div className="space-y-2">
                <Label>Giờ bắt đầu *</Label>
                <Input type="time" defaultValue={selectedExam?.startTime} />
              </div>
              <div className="space-y-2">
                <Label>Thời lượng (phút) *</Label>
                <Input type="number" placeholder="90" defaultValue={selectedExam?.duration} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Hình thức thi *</Label>
              <Select defaultValue={selectedExam?.examType}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn hình thức" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Trực tuyến</SelectItem>
                  <SelectItem value="offline">Giấy</SelectItem>
                  <SelectItem value="both">Cả hai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false);
              setIsEditDialogOpen(false);
              setSelectedExam(null);
            }}>
              Hủy
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              {isAddDialogOpen ? "Tạo Lịch Thi" : "Lưu Thay Đổi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}