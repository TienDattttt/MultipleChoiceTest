"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Download,
  Filter,
  Calendar,
  PieChart,
  Award,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ExamStats {
  examId: string;
  examName: string;
  subject: string;
  date: string;
  totalRegistered: number;
  totalAttended: number;
  attendanceRate: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  passRate: number;
}

interface ScoreDistribution {
  range: string;
  count: number;
  percentage: number;
}

export default function AdminReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");

  // Mock data
  const examStats: ExamStats[] = [
    {
      examId: "1",
      examName: "Kiểm tra giữa kỳ I - Toán 10",
      subject: "Toán học",
      date: "2025-01-15",
      totalRegistered: 120,
      totalAttended: 115,
      attendanceRate: 95.8,
      averageScore: 7.5,
      highestScore: 10,
      lowestScore: 3.5,
      passRate: 85.2,
    },
    {
      examId: "2",
      examName: "Kiểm tra 15 phút - Vật lý 11",
      subject: "Vật lý",
      date: "2025-01-12",
      totalRegistered: 80,
      totalAttended: 78,
      attendanceRate: 97.5,
      averageScore: 8.2,
      highestScore: 10,
      lowestScore: 5.0,
      passRate: 92.3,
    },
    {
      examId: "3",
      examName: "Thi cuối kỳ I - Hóa học 12",
      subject: "Hóa học",
      date: "2025-01-10",
      totalRegistered: 160,
      totalAttended: 155,
      attendanceRate: 96.9,
      averageScore: 6.8,
      highestScore: 9.5,
      lowestScore: 2.0,
      passRate: 78.1,
    },
    {
      examId: "4",
      examName: "Kiểm tra định kỳ - Tiếng Anh 10",
      subject: "Tiếng Anh",
      date: "2025-01-18",
      totalRegistered: 70,
      totalAttended: 68,
      attendanceRate: 97.1,
      averageScore: 7.8,
      highestScore: 10,
      lowestScore: 4.5,
      passRate: 88.2,
    },
  ];

  const scoreDistribution: ScoreDistribution[] = [
    { range: "9.0 - 10", count: 45, percentage: 10.9 },
    { range: "8.0 - 8.9", count: 82, percentage: 19.8 },
    { range: "7.0 - 7.9", count: 120, percentage: 29.1 },
    { range: "6.0 - 6.9", count: 95, percentage: 23.0 },
    { range: "5.0 - 5.9", count: 48, percentage: 11.6 },
    { range: "< 5.0", count: 23, percentage: 5.6 },
  ];

  const subjects = ["Toán học", "Vật lý", "Hóa học", "Tiếng Anh", "Ngữ văn", "Lịch sử", "Địa lý"];
  const classes = ["10A1", "10A2", "10A3", "11A1", "11A2", "12A1", "12A2"];

  const totalRegistered = examStats.reduce((sum, exam) => sum + exam.totalRegistered, 0);
  const totalAttended = examStats.reduce((sum, exam) => sum + exam.totalAttended, 0);
  const overallAttendanceRate = ((totalAttended / totalRegistered) * 100).toFixed(1);
  const overallAverageScore = (
    examStats.reduce((sum, exam) => sum + exam.averageScore, 0) / examStats.length
  ).toFixed(1);

  const handleExportReport = () => {
    console.log("Exporting report...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Thống Kê & Báo Cáo</h1>
              <p className="text-sm text-gray-600 mt-1">Phân tích chi tiết kết quả thi và học tập</p>
            </div>
            <Button onClick={handleExportReport} className="bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Xuất Báo Cáo
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Bộ Lọc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn kỳ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Tuần này</SelectItem>
                  <SelectItem value="month">Tháng này</SelectItem>
                  <SelectItem value="quarter">Quý này</SelectItem>
                  <SelectItem value="year">Năm này</SelectItem>
                  <SelectItem value="custom">Tùy chỉnh</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
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

              <Select value={selectedClass} onValueChange={setSelectedClass}>
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

              <div className="flex gap-2">
                <Input type="date" placeholder="Từ ngày" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng Số Đăng Ký
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{totalRegistered}</p>
                  <p className="text-xs text-gray-500 mt-1">thí sinh</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Số Người Dự Thi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-green-600">{totalAttended}</p>
                  <p className="text-xs text-gray-500 mt-1">thí sinh</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tỷ Lệ Tham Dự
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-primary">{overallAttendanceRate}%</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +2.5% so với tháng trước
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Điểm Trung Bình
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-orange-600">{overallAverageScore}</p>
                  <p className="text-xs text-gray-500 mt-1">/10 điểm</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Score Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Phân Bố Điểm Số
              </CardTitle>
              <CardDescription>Thống kê phân bổ điểm số các bài thi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreDistribution.map((dist, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{dist.range}</span>
                      <span className="text-sm text-gray-600">
                        {dist.count} ({dist.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${dist.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Kết Quả Theo Môn Học
              </CardTitle>
              <CardDescription>Điểm trung bình các môn học</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { subject: "Vật lý", score: 8.2, color: "bg-blue-600" },
                  { subject: "Tiếng Anh", score: 7.8, color: "bg-green-600" },
                  { subject: "Toán học", score: 7.5, color: "bg-purple-600" },
                  { subject: "Hóa học", score: 6.8, color: "bg-orange-600" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                      <span className="text-sm font-bold text-gray-900">{item.score}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full transition-all`}
                        style={{ width: `${(item.score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Exam Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Thống Kê Chi Tiết Từng Kỳ Thi
            </CardTitle>
            <CardDescription>Phân tích kết quả chi tiết các kỳ thi</CardDescription>
          </CardHeader>
          <CardContent>
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
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Đăng ký
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Dự thi
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Tỷ lệ
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      ĐTB
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Cao nhất
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Thấp nhất
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Tỷ lệ đạt
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {examStats.map((stat) => (
                    <tr key={stat.examId} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{stat.examName}</div>
                          <div className="text-xs text-gray-500">{stat.date}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{stat.subject}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">
                        {stat.totalRegistered}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">
                        {stat.totalAttended}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-medium text-primary">
                          {stat.attendanceRate}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold text-gray-900">{stat.averageScore}</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">
                        {stat.highestScore}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-red-600 font-medium">
                        {stat.lowestScore}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            stat.passRate >= 80
                              ? "bg-green-100 text-green-800"
                              : stat.passRate >= 60
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {stat.passRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
                <TrendingUp className="h-5 w-5" />
                Xu Hướng Tích Cực
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  Tỷ lệ tham dự tăng 2.5% so với tháng trước
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  Điểm trung bình môn Vật lý cao nhất (8.2/10)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  Tỷ lệ đạt môn Vật lý đạt 92.3%
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-orange-900">
                <AlertCircle className="h-5 w-5" />
                Cần Cải Thiện
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-orange-800">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  Môn Hóa học có điểm trung bình thấp nhất (6.8/10)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  Tỷ lệ đạt môn Hóa học cần cải thiện (78.1%)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  5.6% học sinh có điểm dưới 5.0 cần hỗ trợ thêm
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}