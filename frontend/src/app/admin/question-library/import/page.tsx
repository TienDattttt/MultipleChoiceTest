"use client";

import { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  FileSpreadsheet,
  File,
  X,
  Check,
  AlertCircle,
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ImportedQuestion {
  id: string;
  content: string;
  answers: string[];
  correctAnswer: number;
  difficulty: "easy" | "medium" | "hard";
  subject: string;
  chapter: string;
  section: string;
  status: "valid" | "error" | "warning";
  errorMessage?: string;
}

interface UploadedFile {
  file: File;
  name: string;
  size: number;
  type: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
  totalQuestions?: number;
  validQuestions?: number;
  errorQuestions?: number;
}

export default function ImportQuestionsPage() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [importedQuestions, setImportedQuestions] = useState<ImportedQuestion[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<ImportedQuestion | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const subjects = ["Toán học", "Vật lý", "Hóa học", "Tiếng Anh", "Ngữ văn", "Lịch sử", "Địa lý"];
  const chapters = ["Chương 1", "Chương 2", "Chương 3", "Chương 4"];
  const sections = ["Phần 1", "Phần 2", "Phần 3"];

  // Mock imported questions
  const mockQuestions: ImportedQuestion[] = [
    {
      id: "1",
      content: "Phương trình bậc hai ax² + bx + c = 0 có nghiệm khi nào?",
      answers: ["Δ > 0", "Δ ≥ 0", "Δ < 0", "Δ ≤ 0"],
      correctAnswer: 1,
      difficulty: "medium",
      subject: "Toán học",
      chapter: "Chương 1",
      section: "Phần 1",
      status: "valid",
    },
    {
      id: "2",
      content: "Định luật bảo toàn năng lượng được phát biểu như thế nào?",
      answers: [
        "Năng lượng không tự sinh ra và không tự mất đi",
        "Năng lượng luôn tăng",
        "Năng lượng luôn giảm",
        "Năng lượng không đổi",
      ],
      correctAnswer: 0,
      difficulty: "easy",
      subject: "Vật lý",
      chapter: "Chương 2",
      section: "Phần 1",
      status: "valid",
    },
    {
      id: "3",
      content: "",
      answers: ["A", "B", "C"],
      correctAnswer: 0,
      difficulty: "medium",
      subject: "Hóa học",
      chapter: "Chương 1",
      section: "Phần 1",
      status: "error",
      errorMessage: "Nội dung câu hỏi không được để trống",
    },
    {
      id: "4",
      content: "Công thức hóa học của nước là gì?",
      answers: ["H2O", "CO2", "O2"],
      correctAnswer: 0,
      difficulty: "easy",
      subject: "Hóa học",
      chapter: "Chương 1",
      section: "Phần 1",
      status: "warning",
      errorMessage: "Câu hỏi này đã tồn tại trong hệ thống",
    },
  ];

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "application/pdf",
    ];

    files.forEach((file) => {
      if (!validTypes.includes(file.type)) {
        alert(`File ${file.name} không đúng định dạng. Chỉ hỗ trợ DOCX, XLSX, PDF`);
        return;
      }

      const newFile: UploadedFile = {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        progress: 0,
      };

      setUploadedFiles((prev) => [...prev, newFile]);

      // Simulate upload and processing
      simulateFileProcessing(file.name);
    });
  };

  const simulateFileProcessing = (fileName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.name === fileName
            ? {
                ...f,
                progress,
                status: progress < 50 ? "uploading" : progress < 100 ? "processing" : "completed",
              }
            : f
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.name === fileName
              ? {
                  ...f,
                  status: "completed",
                  totalQuestions: mockQuestions.length,
                  validQuestions: mockQuestions.filter((q) => q.status === "valid").length,
                  errorQuestions: mockQuestions.filter((q) => q.status === "error").length,
                }
              : f
          )
        );
        setImportedQuestions(mockQuestions);
      }
    }, 300);
  };

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const handleEditQuestion = (question: ImportedQuestion) => {
    setSelectedQuestion(question);
    setIsEditDialogOpen(true);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setImportedQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const toggleQuestionExpand = (questionId: string) => {
    setExpandedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSaveQuestions = () => {
    const validQuestions = importedQuestions.filter((q) => q.status === "valid");
    console.log("Saving questions:", validQuestions);
    alert(`Đã lưu ${validQuestions.length} câu hỏi thành công!`);
  };

  const handleDownloadTemplate = () => {
    console.log("Downloading template...");
  };

  const getFileIcon = (type: string) => {
    if (type.includes("word")) return <FileText className="h-8 w-8 text-blue-600" />;
    if (type.includes("sheet") || type.includes("excel"))
      return <FileSpreadsheet className="h-8 w-8 text-green-600" />;
    return <File className="h-8 w-8 text-gray-600" />;
  };

  const statusColors = {
    valid: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
  };

  const statusLabels = {
    valid: "Hợp lệ",
    error: "Lỗi",
    warning: "Cảnh báo",
  };

  const difficultyLabels = {
    easy: "Dễ",
    medium: "Trung bình",
    hard: "Khó",
  };

  const validCount = importedQuestions.filter((q) => q.status === "valid").length;
  const errorCount = importedQuestions.filter((q) => q.status === "error").length;
  const warningCount = importedQuestions.filter((q) => q.status === "warning").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nạp File Câu Hỏi Hàng Loạt</h1>
              <p className="text-sm text-gray-600 mt-1">Import câu hỏi từ file Excel hoặc Word</p>
            </div>
            <Button
              onClick={handleDownloadTemplate}
              variant="outline"
              className="border-primary text-primary"
            >
              <Download className="h-4 w-4 mr-2" />
              Tải File Mẫu
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Subject Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Chọn Môn Học & Chương</CardTitle>
            <CardDescription>Xác định vị trí lưu trữ câu hỏi trong hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Môn học *</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
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

              <div className="space-y-2">
                <Label>Chương *</Label>
                <Select
                  value={selectedChapter}
                  onValueChange={setSelectedChapter}
                  disabled={!selectedSubject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn chương" />
                  </SelectTrigger>
                  <SelectContent>
                    {chapters.map((chapter) => (
                      <SelectItem key={chapter} value={chapter}>
                        {chapter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Phần</Label>
                <Select
                  value={selectedSection}
                  onValueChange={setSelectedSection}
                  disabled={!selectedChapter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phần (tùy chọn)" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section} value={section}>
                        {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Area */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Tải File Lên</CardTitle>
            <CardDescription>
              Hỗ trợ định dạng: DOCX, XLSX, PDF. Tối đa 10MB mỗi file.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging
                  ? "border-primary bg-blue-50"
                  : "border-gray-300 hover:border-primary hover:bg-gray-50"
              }`}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Kéo thả file vào đây hoặc click để chọn
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Hỗ trợ: .docx, .xlsx, .pdf (tối đa 10MB)
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".docx,.xlsx,.xls,.pdf"
                multiple
                onChange={handleFileInput}
                disabled={!selectedSubject || !selectedChapter}
              />
              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={!selectedSubject || !selectedChapter}
              >
                Chọn File
              </Button>
              {(!selectedSubject || !selectedChapter) && (
                <p className="text-xs text-red-600 mt-2">
                  Vui lòng chọn môn học và chương trước khi upload
                </p>
              )}
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    {getFileIcon(file.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveFile(file.name)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                      {file.status !== "completed" && (
                        <div className="space-y-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-600">
                            {file.status === "uploading" && "Đang tải lên..."}
                            {file.status === "processing" && "Đang xử lý..."}
                            {file.progress}%
                          </p>
                        </div>
                      )}
                      {file.status === "completed" && (
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-green-600 flex items-center gap-1">
                            <Check className="h-4 w-4" />
                            Hoàn thành
                          </span>
                          <span>Tổng: {file.totalQuestions} câu</span>
                          <span className="text-green-600">Hợp lệ: {file.validQuestions}</span>
                          {file.errorQuestions! > 0 && (
                            <span className="text-red-600">Lỗi: {file.errorQuestions}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Import Statistics */}
        {importedQuestions.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Tổng Câu Hỏi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900">{importedQuestions.length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Hợp Lệ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">{validCount}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Lỗi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-red-600">{errorCount}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Cảnh Báo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-yellow-600">{warningCount}</p>
                </CardContent>
              </Card>
            </div>

            {/* Questions Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Danh Sách Câu Hỏi Import</CardTitle>
                    <CardDescription>Xem trước và chỉnh sửa câu hỏi trước khi lưu</CardDescription>
                  </div>
                  <Button
                    onClick={handleSaveQuestions}
                    disabled={validCount === 0}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Lưu {validCount} Câu Hỏi
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {importedQuestions.map((question) => {
                    const isExpanded = expandedQuestions.has(question.id);
                    return (
                      <div
                        key={question.id}
                        className={`border rounded-lg p-4 ${
                          question.status === "error"
                            ? "border-red-200 bg-red-50"
                            : question.status === "warning"
                            ? "border-yellow-200 bg-yellow-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  statusColors[question.status]
                                }`}
                              >
                                {statusLabels[question.status]}
                              </span>
                              <span className="text-xs text-gray-600">
                                {question.subject} / {question.chapter} / {question.section}
                              </span>
                              <span className="text-xs text-gray-600">
                                Độ khó: {difficultyLabels[question.difficulty]}
                              </span>
                            </div>
                            <p
                              className={`font-medium mb-2 ${
                                question.content ? "text-gray-900" : "text-gray-400 italic"
                              }`}
                            >
                              {question.content || "[Nội dung câu hỏi trống]"}
                            </p>
                            {question.errorMessage && (
                              <div className="flex items-start gap-2 text-sm text-red-600 mb-2">
                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>{question.errorMessage}</span>
                              </div>
                            )}
                            {isExpanded && (
                              <div className="mt-3 space-y-2">
                                {question.answers.map((answer, index) => (
                                  <div
                                    key={index}
                                    className={`flex items-center gap-2 p-2 rounded ${
                                      index === question.correctAnswer
                                        ? "bg-green-100 border border-green-300"
                                        : "bg-gray-50"
                                    }`}
                                  >
                                    {index === question.correctAnswer && (
                                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                    )}
                                    <span className="text-sm">
                                      {String.fromCharCode(65 + index)}. {answer}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleQuestionExpand(question.id)}
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditQuestion(question)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteQuestion(question.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh Sửa Câu Hỏi</DialogTitle>
          </DialogHeader>
          {selectedQuestion && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nội dung câu hỏi *</Label>
                <Textarea
                  placeholder="Nhập nội dung câu hỏi..."
                  defaultValue={selectedQuestion.content}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Môn học</Label>
                  <Input value={selectedQuestion.subject} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Chương</Label>
                  <Input value={selectedQuestion.chapter} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Phần</Label>
                  <Input value={selectedQuestion.section} readOnly />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Độ khó</Label>
                <Select defaultValue={selectedQuestion.difficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Dễ</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="hard">Khó</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Các đáp án</Label>
                {selectedQuestion.answers.map((answer, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder={`Đáp án ${String.fromCharCode(65 + index)}`}
                      defaultValue={answer}
                    />
                    {index === selectedQuestion.correctAnswer && (
                      <Check className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Đáp án đúng</Label>
                <Select defaultValue={selectedQuestion.correctAnswer.toString()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedQuestion.answers.map((_, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        Đáp án {String.fromCharCode(65 + index)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button className="bg-primary hover:bg-primary/90">Lưu Thay Đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}