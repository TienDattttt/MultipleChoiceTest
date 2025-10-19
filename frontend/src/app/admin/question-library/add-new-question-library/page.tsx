"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Upload,
  BookOpen,
  Tag,
  FileText,
  Settings,
  Eye,
} from "lucide-react";

export default function AddNewQuestionLibraryPage() {
  const [libraryName, setLibraryName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const [questions, setQuestions] = useState([
    {
      id: 1,
      content: "",
      type: "multiple-choice",
      difficulty: "medium",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        content: "",
        type: "multiple-choice",
        difficulty: "medium",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
      },
    ]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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
              <span className="text-[#4a5568] font-semibold">Tạo thư viện câu hỏi mới</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-[#0052cc] text-[#0052cc] font-semibold rounded-full hover:bg-[#e3f2fd] transition-colors">
                <Eye className="w-5 h-5" />
                Xem trước
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors">
                <Save className="w-5 h-5" />
                Lưu thư viện
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          href="/admin/question-library/dashboard"
          className="inline-flex items-center gap-2 text-[#0052cc] hover:text-[#003d99] mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại thư viện câu hỏi
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Library Info */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Thông tin thư viện</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Tên thư viện <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={libraryName}
                    onChange={(e) => setLibraryName(e.target.value)}
                    placeholder="VD: Thư viện câu hỏi Toán 12 - Chương 1"
                    className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Môn học <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                    >
                      <option value="">Chọn môn học</option>
                      <option value="math">Toán học</option>
                      <option value="physics">Vật lý</option>
                      <option value="chemistry">Hóa học</option>
                      <option value="english">Tiếng Anh</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Khối lớp
                    </label>
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                    >
                      <option value="">Chọn khối</option>
                      <option value="10">Khối 10</option>
                      <option value="11">Khối 11</option>
                      <option value="12">Khối 12</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Chương
                    </label>
                    <input
                      type="text"
                      value={selectedChapter}
                      onChange={(e) => setSelectedChapter(e.target.value)}
                      placeholder="VD: 1, 2, 3"
                      className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Mô tả
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Nhập mô tả về thư viện câu hỏi..."
                    rows={3}
                    className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Thẻ tag
                  </label>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                      placeholder="Nhập tag và nhấn Enter"
                      className="flex-1 px-4 py-2 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2 bg-[#0052cc] text-white font-semibold rounded-lg hover:bg-[#003d99] transition-colors"
                    >
                      Thêm
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-[#e3f2fd] text-[#0052cc] text-sm font-semibold rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
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

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="p-6 border-2 border-[#e8ebf0] rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-[#1a1a1a] text-lg">Câu {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <select
                          value={question.difficulty}
                          onChange={(e) => {
                            const newQuestions = [...questions];
                            newQuestions[index].difficulty = e.target.value;
                            setQuestions(newQuestions);
                          }}
                          className="px-3 py-1 border border-[#dfe3e8] rounded-lg text-sm"
                        >
                          <option value="easy">Dễ</option>
                          <option value="medium">Trung bình</option>
                          <option value="hard">Khó</option>
                        </select>
                        <button
                          onClick={() => removeQuestion(question.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                          Nội dung câu hỏi
                        </label>
                        <textarea
                          placeholder="Nhập nội dung câu hỏi..."
                          value={question.content}
                          onChange={(e) => {
                            const newQuestions = [...questions];
                            newQuestions[index].content = e.target.value;
                            setQuestions(newQuestions);
                          }}
                          className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                          Các đáp án
                        </label>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center gap-3">
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                checked={question.correctAnswer === optionIndex}
                                onChange={() => {
                                  const newQuestions = [...questions];
                                  newQuestions[index].correctAnswer = optionIndex;
                                  setQuestions(newQuestions);
                                }}
                                className="w-5 h-5"
                              />
                              <input
                                type="text"
                                placeholder={`Đáp án ${String.fromCharCode(65 + optionIndex)}`}
                                value={option}
                                onChange={(e) => {
                                  const newQuestions = [...questions];
                                  newQuestions[index].options[optionIndex] = e.target.value;
                                  setQuestions(newQuestions);
                                }}
                                className="flex-1 px-4 py-2 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-[#718096] mt-2">
                          Chọn nút radio để đánh dấu đáp án đúng
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                          Giải thích (tùy chọn)
                        </label>
                        <textarea
                          placeholder="Nhập lời giải thích cho câu hỏi..."
                          value={question.explanation}
                          onChange={(e) => {
                            const newQuestions = [...questions];
                            newQuestions[index].explanation = e.target.value;
                            setQuestions(newQuestions);
                          }}
                          className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Import from File */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">
                Hoặc nhập câu hỏi từ file
              </h3>
              <div className="border-2 border-dashed border-[#dfe3e8] rounded-xl p-8 text-center hover:border-[#0052cc] transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-[#718096] mx-auto mb-3" />
                <p className="text-[#4a5568] font-semibold mb-2">
                  Kéo thả file hoặc click để chọn
                </p>
                <p className="text-sm text-[#718096]">
                  Hỗ trợ: DOCX, PDF, XLSX, JSON
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
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
                    <Tag className="w-5 h-5" />
                    <span>Số tag</span>
                  </div>
                  <span className="font-bold text-[#1a1a1a]">{tags.length}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#e8ebf0]">
                <p className="text-sm text-[#718096] mb-3">Phân bố độ khó</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600">Dễ</span>
                    <span className="font-semibold text-[#1a1a1a]">
                      {questions.filter((q) => q.difficulty === "easy").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-600">Trung bình</span>
                    <span className="font-semibold text-[#1a1a1a]">
                      {questions.filter((q) => q.difficulty === "medium").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-600">Khó</span>
                    <span className="font-semibold text-[#1a1a1a]">
                      {questions.filter((q) => q.difficulty === "hard").length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-[#e3f2fd] rounded-xl border border-[#0052cc] border-opacity-20 p-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Mẹo hữu ích</h3>
              <ul className="space-y-2 text-sm text-[#4a5568]">
                <li className="flex items-start gap-2">
                  <span className="text-[#0052cc] font-bold">•</span>
                  <span>Đặt tên thư viện rõ ràng, dễ tìm kiếm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0052cc] font-bold">•</span>
                  <span>Sử dụng tag để phân loại câu hỏi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0052cc] font-bold">•</span>
                  <span>Cân bằng độ khó của các câu hỏi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0052cc] font-bold">•</span>
                  <span>Thêm lời giải thích để học sinh hiểu rõ hơn</span>
                </li>
              </ul>
            </div>

            {/* Templates */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Mẫu có sẵn</h3>
              <p className="text-sm text-[#4a5568] mb-4">
                Sử dụng mẫu có sẵn để tạo nhanh hơn
              </p>
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