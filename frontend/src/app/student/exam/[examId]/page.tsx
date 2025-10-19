"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react";

interface Question {
  id: number;
  content: string;
  options: string[];
  answered: boolean;
  selectedAnswer: number | null;
  flagged: boolean;
}

export default function ExamTakingPage({ params }: { params: Promise<{ examId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes = 2700 seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Mock exam data
  const [examData] = useState({
    id: resolvedParams.examId,
    title: "Kiểm tra 45 phút - Toán 12 - Chương 1: Hàm số",
    subject: "Toán học",
    duration: 45, // minutes
    totalQuestions: 20,
    totalPoints: 100,
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      content: "Cho hàm số y = x² - 2x + 1. Đỉnh của parabol có tọa độ là:",
      options: ["(1, 0)", "(0, 1)", "(-1, 4)", "(2, 1)"],
      answered: false,
      selectedAnswer: null,
      flagged: false,
    },
    {
      id: 2,
      content: "Tập xác định của hàm số y = √(x - 1) là:",
      options: ["[1, +∞)", "(-∞, 1]", "(1, +∞)", "R"],
      answered: false,
      selectedAnswer: null,
      flagged: false,
    },
    {
      id: 3,
      content: "Hàm số y = 1/x đồng biến trên khoảng nào?",
      options: ["(-∞, 0)", "(0, +∞)", "(-∞, 0) và (0, +∞)", "Không đồng biến"],
      answered: false,
      selectedAnswer: null,
      flagged: false,
    },
    {
      id: 4,
      content: "Giá trị lớn nhất của hàm số y = -x² + 4x - 3 trên R là:",
      options: ["1", "2", "3", "4"],
      answered: false,
      selectedAnswer: null,
      flagged: false,
    },
    {
      id: 5,
      content: "Đồ thị hàm số y = x³ đi qua điểm nào sau đây?",
      options: ["(1, 1)", "(2, 6)", "(-1, 1)", "(0, 1)"],
      answered: false,
      selectedAnswer: null,
      flagged: false,
    },
    // Add more questions to reach 20
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 6,
      content: `Câu hỏi ${i + 6}: Nội dung câu hỏi mẫu về hàm số...`,
      options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      answered: false,
      selectedAnswer: null,
      flagged: false,
    })),
  ]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        
        // Show warning at 5 minutes
        if (prev === 300 && !showWarning) {
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 5000);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].selectedAnswer = answerIndex;
    newQuestions[currentQuestion].answered = true;
    setQuestions(newQuestions);
  };

  const toggleFlag = () => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].flagged = !newQuestions[currentQuestion].flagged;
    setQuestions(newQuestions);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleAutoSubmit = () => {
    console.log("Auto-submitting exam...");
    submitExam();
  };

  const handleManualSubmit = () => {
    setShowConfirmDialog(true);
  };

  const submitExam = () => {
    setIsSubmitting(true);
    
    // Mock submission
    setTimeout(() => {
      console.log("Exam submitted:", questions);
      router.push(`/student/results/${examData.id}`);
    }, 1500);
  };

  const answeredCount = questions.filter((q) => q.answered).length;
  const flaggedCount = questions.filter((q) => q.flagged).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#dfe3e8] sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#1a1a1a]">{examData.title}</h1>
              <p className="text-sm text-[#718096]">{examData.subject}</p>
            </div>
            
            {/* Timer */}
            <div className="flex items-center gap-6">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeLeft <= 300 ? "bg-red-100 text-red-700" : "bg-[#e3f2fd] text-[#0052cc]"
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-bold text-lg">{formatTime(timeLeft)}</span>
              </div>
              
              <button
                onClick={handleManualSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2 bg-[#10b981] text-white font-semibold rounded-full hover:bg-[#059669] transition-colors disabled:opacity-50"
              >
                <CheckCircle className="w-5 h-5" />
                Nộp bài
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#e8ebf0]">
          <div
            className="h-full bg-[#0052cc] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Warning Banner */}
      {showWarning && (
        <div className="bg-yellow-50 border-b border-yellow-200 py-3">
          <div className="container mx-auto px-6 flex items-center gap-2 text-yellow-800">
            <AlertCircle className="w-5 h-5" />
            <p className="font-semibold">Cảnh báo: Còn 5 phút nữa bài thi sẽ tự động nộp!</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[#e3f2fd] text-[#0052cc] text-sm font-semibold rounded-full">
                      Câu {currentQuestion + 1}/{questions.length}
                    </span>
                    {questions[currentQuestion].flagged && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full flex items-center gap-1">
                        <Flag className="w-4 h-4" />
                        Đánh dấu
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-[#1a1a1a] leading-relaxed">
                    {questions[currentQuestion].content}
                  </h2>
                </div>
                
                <button
                  onClick={toggleFlag}
                  className={`p-2 rounded-lg transition-colors ${
                    questions[currentQuestion].flagged
                      ? "bg-red-100 text-red-700"
                      : "bg-[#f5f7fa] text-[#718096] hover:bg-[#e8ebf0]"
                  }`}
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      questions[currentQuestion].selectedAnswer === index
                        ? "border-[#0052cc] bg-[#e3f2fd] text-[#0052cc]"
                        : "border-[#e8ebf0] hover:border-[#0052cc] hover:bg-[#f5f7fa]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          questions[currentQuestion].selectedAnswer === index
                            ? "border-[#0052cc] bg-[#0052cc]"
                            : "border-[#dfe3e8]"
                        }`}
                      >
                        {questions[currentQuestion].selectedAnswer === index && (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="font-semibold">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="flex-1">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-6 py-3 border-2 border-[#dfe3e8] text-[#4a5568] font-semibold rounded-lg hover:border-[#0052cc] hover:text-[#0052cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                Câu trước
              </button>

              <button
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-lg hover:bg-[#003d99] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Câu sau
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6 sticky top-24">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Thống kê</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#718096]">Đã trả lời</span>
                  <span className="font-bold text-[#10b981]">
                    {answeredCount}/{questions.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#718096]">Đánh dấu</span>
                  <span className="font-bold text-red-600">{flaggedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#718096]">Chưa làm</span>
                  <span className="font-bold text-[#718096]">
                    {questions.length - answeredCount}
                  </span>
                </div>
              </div>

              {/* Question Grid */}
              <div className="mt-6 pt-6 border-t border-[#e8ebf0]">
                <p className="text-sm font-semibold text-[#1a1a1a] mb-3">Danh sách câu hỏi</p>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => goToQuestion(index)}
                      className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                        currentQuestion === index
                          ? "bg-[#0052cc] text-white ring-2 ring-[#0052cc] ring-offset-2"
                          : question.answered
                          ? "bg-[#10b981] text-white hover:opacity-80"
                          : question.flagged
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-[#f5f7fa] text-[#718096] hover:bg-[#e8ebf0]"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-[#e8ebf0] space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-4 rounded bg-[#10b981]" />
                  <span className="text-[#718096]">Đã trả lời</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-4 rounded bg-red-100 border border-red-300" />
                  <span className="text-[#718096]">Đánh dấu</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-4 rounded bg-[#f5f7fa] border border-[#e8ebf0]" />
                  <span className="text-[#718096]">Chưa làm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">Xác nhận nộp bài</h3>
              <p className="text-[#4a5568]">
                Bạn có chắc chắn muốn nộp bài? Bạn sẽ không thể chỉnh sửa sau khi nộp.
              </p>
            </div>

            <div className="bg-[#f5f7fa] rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-[#718096]">Tổng số câu:</span>
                <span className="font-bold text-[#1a1a1a]">{questions.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-[#718096]">Đã trả lời:</span>
                <span className="font-bold text-[#10b981]">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#718096]">Chưa trả lời:</span>
                <span className="font-bold text-red-600">{questions.length - answeredCount}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 border-2 border-[#dfe3e8] text-[#4a5568] font-semibold rounded-full hover:border-[#0052cc] hover:text-[#0052cc] transition-colors"
              >
                Kiểm tra lại
              </button>
              <button
                onClick={submitExam}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-[#10b981] text-white font-semibold rounded-full hover:bg-[#059669] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang nộp...
                  </div>
                ) : (
                  "Nộp bài"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}