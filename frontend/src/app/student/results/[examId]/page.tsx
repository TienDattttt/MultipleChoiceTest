"use client";

import { use } from "react";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
  Award,
  Download,
  Share2,
  ArrowLeft,
  FileText,
  Target,
} from "lucide-react";

interface ResultQuestion {
  id: number;
  content: string;
  options: string[];
  correctAnswer: number;
  userAnswer: number | null;
  isCorrect: boolean;
  points: number;
  difficulty: "easy" | "medium" | "hard";
}

export default function ExamResultsPage({ params }: { params: Promise<{ examId: string }> }) {
  const resolvedParams = use(params);

  // Mock exam results data
  const examResult = {
    id: resolvedParams.examId,
    title: "Kiểm tra 45 phút - Toán 12 - Chương 1: Hàm số",
    subject: "Toán học",
    submittedAt: "14:30 - 15/01/2025",
    duration: "42 phút 35 giây",
    totalQuestions: 20,
    totalPoints: 100,
    score: 85,
    correctAnswers: 17,
    wrongAnswers: 3,
    skippedAnswers: 0,
    rank: 12,
    totalStudents: 45,
    averageScore: 72.5,
  };

  const questions: ResultQuestion[] = [
    {
      id: 1,
      content: "Cho hàm số y = x² - 2x + 1. Đỉnh của parabol có tọa độ là:",
      options: ["(1, 0)", "(0, 1)", "(-1, 4)", "(2, 1)"],
      correctAnswer: 0,
      userAnswer: 0,
      isCorrect: true,
      points: 5,
      difficulty: "easy",
    },
    {
      id: 2,
      content: "Tập xác định của hàm số y = √(x - 1) là:",
      options: ["[1, +∞)", "(-∞, 1]", "(1, +∞)", "R"],
      correctAnswer: 0,
      userAnswer: 2,
      isCorrect: false,
      points: 5,
      difficulty: "medium",
    },
    {
      id: 3,
      content: "Hàm số y = 1/x đồng biến trên khoảng nào?",
      options: ["(-∞, 0)", "(0, +∞)", "(-∞, 0) và (0, +∞)", "Không đồng biến"],
      correctAnswer: 3,
      userAnswer: 3,
      isCorrect: true,
      points: 5,
      difficulty: "hard",
    },
    {
      id: 4,
      content: "Giá trị lớn nhất của hàm số y = -x² + 4x - 3 trên R là:",
      options: ["1", "2", "3", "4"],
      correctAnswer: 0,
      userAnswer: 0,
      isCorrect: true,
      points: 5,
      difficulty: "medium",
    },
    {
      id: 5,
      content: "Đồ thị hàm số y = x³ đi qua điểm nào sau đây?",
      options: ["(1, 1)", "(2, 6)", "(-1, 1)", "(0, 1)"],
      correctAnswer: 0,
      userAnswer: 1,
      isCorrect: false,
      points: 5,
      difficulty: "easy",
    },
    // Add more questions
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 6,
      content: `Câu hỏi ${i + 6}: Nội dung câu hỏi mẫu về hàm số...`,
      options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      correctAnswer: Math.floor(Math.random() * 4),
      userAnswer: Math.floor(Math.random() * 4),
      isCorrect: Math.random() > 0.3,
      points: 5,
      difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)] as "easy" | "medium" | "hard",
    })),
  ];

  const scorePercentage = (examResult.score / examResult.totalPoints) * 100;
  const accuracyRate = (examResult.correctAnswers / examResult.totalQuestions) * 100;

  const difficultyStats = {
    easy: questions.filter((q) => q.difficulty === "easy"),
    medium: questions.filter((q) => q.difficulty === "medium"),
    hard: questions.filter((q) => q.difficulty === "hard"),
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[#10b981]";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-[#e6f9f4]";
    if (score >= 50) return "bg-yellow-50";
    return "bg-red-50";
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
              <span className="text-[#4a5568] font-semibold">Kết quả thi</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-[#dfe3e8] text-[#4a5568] font-semibold rounded-lg hover:border-[#0052cc] hover:text-[#0052cc] transition-colors">
                <Share2 className="w-5 h-5" />
                Chia sẻ
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#0052cc] text-white font-semibold rounded-lg hover:bg-[#003d99] transition-colors">
                <Download className="w-5 h-5" />
                Tải xuống
              </button>
            </div>
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

        {/* Score Card */}
        <div className={`${getScoreBgColor(examResult.score)} rounded-2xl border-2 border-current ${getScoreColor(examResult.score)} p-8 mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Score */}
            <div className="text-center md:col-span-1">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white shadow-lg mb-4">
                <div>
                  <div className={`text-5xl font-bold ${getScoreColor(examResult.score)}`}>
                    {examResult.score}
                  </div>
                  <div className="text-sm text-[#718096] font-semibold">
                    /{examResult.totalPoints}
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1">
                {examResult.score >= 80 ? "Xuất sắc!" : examResult.score >= 50 ? "Khá tốt!" : "Cần cố gắng thêm"}
              </h2>
              <p className="text-[#4a5568]">Điểm của bạn</p>
            </div>

            {/* Stats */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#e6f9f4] rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[#10b981]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">{examResult.correctAnswers}</p>
                    <p className="text-sm text-[#718096]">Câu đúng</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">{examResult.wrongAnswers}</p>
                    <p className="text-sm text-[#718096]">Câu sai</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#e3f2fd] rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#0052cc]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">{examResult.duration}</p>
                    <p className="text-sm text-[#718096]">Thời gian làm</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1a1a1a]">#{examResult.rank}</p>
                    <p className="text-sm text-[#718096]">Xếp hạng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Questions Review */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Chi tiết bài làm</h3>

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`p-6 rounded-xl border-2 ${
                      question.isCorrect
                        ? "border-[#10b981] bg-[#e6f9f4]"
                        : question.userAnswer === null
                        ? "border-[#e8ebf0] bg-[#f5f7fa]"
                        : "border-red-300 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          question.isCorrect
                            ? "bg-[#10b981] text-white"
                            : question.userAnswer === null
                            ? "bg-[#e8ebf0] text-[#718096]"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {question.isCorrect ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <XCircle className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-[#1a1a1a]">Câu {index + 1}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              question.difficulty === "easy"
                                ? "bg-green-100 text-green-700"
                                : question.difficulty === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {question.difficulty === "easy" ? "Dễ" : question.difficulty === "medium" ? "TB" : "Khó"}
                          </span>
                          <span className="text-sm text-[#718096]">({question.points} điểm)</span>
                        </div>
                        <p className="text-[#1a1a1a] leading-relaxed mb-4">{question.content}</p>

                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border-2 ${
                                optionIndex === question.correctAnswer
                                  ? "border-[#10b981] bg-[#e6f9f4] text-[#10b981]"
                                  : optionIndex === question.userAnswer && !question.isCorrect
                                  ? "border-red-500 bg-red-100 text-red-700"
                                  : "border-[#e8ebf0] bg-white"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {optionIndex === question.correctAnswer && (
                                  <CheckCircle className="w-5 h-5 text-[#10b981]" />
                                )}
                                {optionIndex === question.userAnswer && !question.isCorrect && (
                                  <XCircle className="w-5 h-5 text-red-600" />
                                )}
                                <span className="font-semibold">{String.fromCharCode(65 + optionIndex)}.</span>
                                <span className="flex-1">{option}</span>
                                {optionIndex === question.correctAnswer && (
                                  <span className="text-xs font-semibold text-[#10b981]">Đáp án đúng</span>
                                )}
                                {optionIndex === question.userAnswer && !question.isCorrect && (
                                  <span className="text-xs font-semibold text-red-600">Bạn chọn</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Performance Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6 sticky top-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Phân tích kết quả</h3>

              {/* Accuracy */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#718096]">Độ chính xác</span>
                  <span className="font-bold text-[#1a1a1a]">{accuracyRate.toFixed(1)}%</span>
                </div>
                <div className="w-full h-3 bg-[#e8ebf0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#10b981] rounded-full transition-all"
                    style={{ width: `${accuracyRate}%` }}
                  />
                </div>
              </div>

              {/* Comparison */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-[#0052cc]" />
                  <span className="font-semibold text-[#1a1a1a]">So sánh với lớp</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#718096]">Điểm của bạn</span>
                    <span className="font-bold text-[#0052cc]">{examResult.score}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#718096]">Điểm trung bình</span>
                    <span className="font-bold text-[#718096]">{examResult.averageScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#718096]">Xếp hạng</span>
                    <span className="font-bold text-yellow-600">
                      #{examResult.rank}/{examResult.totalStudents}
                    </span>
                  </div>
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="pt-6 border-t border-[#e8ebf0]">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-[#0052cc]" />
                  <span className="font-semibold text-[#1a1a1a]">Phân tích theo độ khó</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 font-semibold">Dễ</span>
                    <span className="text-sm text-[#718096]">
                      {difficultyStats.easy.filter((q) => q.isCorrect).length}/{difficultyStats.easy.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-600 font-semibold">Trung bình</span>
                    <span className="text-sm text-[#718096]">
                      {difficultyStats.medium.filter((q) => q.isCorrect).length}/{difficultyStats.medium.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-red-600 font-semibold">Khó</span>
                    <span className="text-sm text-[#718096]">
                      {difficultyStats.hard.filter((q) => q.isCorrect).length}/{difficultyStats.hard.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="pt-6 border-t border-[#e8ebf0] mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-[#718096]" />
                  <span className="font-semibold text-[#1a1a1a]">Thông tin bài thi</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-[#718096]">
                    <strong>Môn:</strong> {examResult.subject}
                  </p>
                  <p className="text-[#718096]">
                    <strong>Nộp lúc:</strong> {examResult.submittedAt}
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-[#e3f2fd] rounded-xl border border-[#0052cc] border-opacity-20 p-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Đề xuất</h3>
              {examResult.score >= 80 ? (
                <p className="text-sm text-[#4a5568] mb-4">
                  Bạn đã làm rất tốt! Hãy tiếp tục duy trì phong độ này và thử thách bản thân với các đề khó hơn.
                </p>
              ) : (
                <p className="text-sm text-[#4a5568] mb-4">
                  Bạn cần ôn tập thêm các kiến thức về hàm số. Hãy xem lại lý thuyết và làm thêm bài tập.
                </p>
              )}
              <Link
                href="/student/course"
                className="block w-full text-center px-4 py-2 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors"
              >
                Xem bài tập liên quan
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}