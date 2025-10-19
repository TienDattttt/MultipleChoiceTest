"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  Plus,
  Trash2,
  Settings,
  FileText,
  Clock,
  Users,
  Lock,
} from "lucide-react";

export default function CreateNewDocumentPage() {
  const [documentTitle, setDocumentTitle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [duration, setDuration] = useState("45");
  const [totalPoints, setTotalPoints] = useState("100");
  const [documentType, setDocumentType] = useState("online");

  const classes = [
    { id: 1, name: "Toán 12A1" },
    { id: 2, name: "Toán 12A2" },
    { id: 3, name: "Toán 12A3" },
  ];

  const [questions, setQuestions] = useState([
    { id: 1, content: "", type: "multiple-choice", points: 10, options: ["", "", "", ""] },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, content: "", type: "multiple-choice", points: 10, options: ["", "", "", ""] },
    ]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
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
              <span className="text-[#4a5568] font-semibold">Tạo đề thi mới</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-[#0052cc] text-[#0052cc] font-semibold rounded-full hover:bg-[#e3f2fd] transition-colors">
                <Eye className="w-5 h-5" />
                Xem trước
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors">
                <Save className="w-5 h-5" />
                Lưu đề thi
              </button>
            </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Info */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Thông tin đề thi</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Tên đề thi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    placeholder="VD: Kiểm tra 15 phút - Chương 1: Hàm số"
                    className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Lớp học <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                    >
                      <option value="">Chọn lớp học</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Loại đề thi
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                    >
                      <option value="online">Thi online</option>
                      <option value="offline">Thi offline</option>
                      <option value="hybrid">Kết hợp</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Thời gian (phút)
                    </label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Tổng điểm
                    </label>
                    <input
                      type="number"
                      value={totalPoints}
                      onChange={(e) => setTotalPoints(e.target.value)}
                      className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Câu hỏi</h2>
                <button
                  onClick={addQuestion}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Thêm câu hỏi
                </button>
              </div>

              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="p-4 border-2 border-[#e8ebf0] rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-[#1a1a1a]">Câu {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={question.points}
                          onChange={(e) => {
                            const newQuestions = [...questions];
                            newQuestions[index].points = parseInt(e.target.value);
                            setQuestions(newQuestions);
                          }}
                          className="w-20 px-2 py-1 border border-[#dfe3e8] rounded text-sm"
                          placeholder="Điểm"
                        />
                        <span className="text-sm text-[#718096]">điểm</span>
                        <button
                          onClick={() => removeQuestion(question.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      placeholder="Nhập nội dung câu hỏi..."
                      value={question.content}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].content = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent mb-3"
                      rows={3}
                    />
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <input type="radio" name={`question-${question.id}`} className="w-4 h-4" />
                          <input
                            type="text"
                            placeholder={`Đáp án ${String.fromCharCode(65 + optionIndex)}`}
                            value={option}
                            onChange={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[index].options[optionIndex] = e.target.value;
                              setQuestions(newQuestions);
                            }}
                            className="flex-1 px-3 py-2 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Import from File */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Hoặc nhập từ file</h3>
              <div className="border-2 border-dashed border-[#dfe3e8] rounded-lg p-8 text-center hover:border-[#0052cc] transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-[#718096] mx-auto mb-3" />
                <p className="text-[#4a5568] font-semibold mb-2">Kéo thả file hoặc click để chọn</p>
                <p className="text-sm text-[#718096]">Hỗ trợ: DOCX, PDF, XLSX</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Thống kê</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#4a5568]">
                    <FileText className="w-5 h-5" />
                    <span>Số câu hỏi</span>
                  </div>
                  <span className="font-bold text-[#1a1a1a]">{questions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#4a5568]">
                    <Clock className="w-5 h-5" />
                    <span>Thời gian</span>
                  </div>
                  <span className="font-bold text-[#1a1a1a]">{duration} phút</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#4a5568]">
                    <Settings className="w-5 h-5" />
                    <span>Tổng điểm</span>
                  </div>
                  <span className="font-bold text-[#1a1a1a]">{totalPoints}</span>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Cài đặt</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-sm text-[#4a5568]">Xáo trộn câu hỏi</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-sm text-[#4a5568]">Xáo trộn đáp án</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-[#4a5568]">Hiển thị đáp án sau khi nộp</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-sm text-[#4a5568]">Chống gian lận bằng AI</span>
                </label>
              </div>
            </div>

            {/* Templates */}
            <div className="bg-[#e3f2fd] rounded-xl border border-[#0052cc] border-opacity-20 p-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Mẫu đề thi</h3>
              <p className="text-sm text-[#4a5568] mb-4">Sử dụng mẫu có sẵn để tạo đề nhanh hơn</p>
              <button className="w-full px-4 py-2 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors">
                Xem mẫu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}