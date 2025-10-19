"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share2,
  FileText,
  Clock,
  Users,
  CheckCircle,
  MoreVertical,
} from "lucide-react";

export default function DocumentManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "online" | "offline">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const documents = [
    {
      id: 1,
      title: "Kiểm tra 15 phút - Chương 1: Hàm số",
      class: "Toán 12A1",
      type: "online",
      questions: 10,
      duration: 15,
      students: 45,
      submitted: 42,
      createdDate: "2024-01-25",
      status: "active",
    },
    {
      id: 2,
      title: "Bài tập về nhà - Phương trình lượng giác",
      class: "Toán 12A2",
      type: "online",
      questions: 20,
      duration: 60,
      students: 40,
      submitted: 38,
      createdDate: "2024-01-24",
      status: "active",
    },
    {
      id: 3,
      title: "Kiểm tra giữa kỳ - Học kỳ I",
      class: "Toán 12A1",
      type: "offline",
      questions: 30,
      duration: 90,
      students: 45,
      submitted: 45,
      createdDate: "2024-01-23",
      status: "completed",
    },
    {
      id: 4,
      title: "Đề thi thử THPT Quốc Gia 2024",
      class: "Toán 12A1",
      type: "online",
      questions: 50,
      duration: 90,
      students: 45,
      submitted: 0,
      createdDate: "2024-01-22",
      status: "draft",
    },
  ];

  const filteredDocuments = documents.filter((doc) => {
    if (selectedTab === "all") return true;
    return doc.type === selectedTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-600";
      case "completed":
        return "bg-blue-100 text-blue-600";
      case "draft":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Đang diễn ra";
      case "completed":
        return "Đã kết thúc";
      case "draft":
        return "Bản nháp";
      default:
        return status;
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
              <span className="text-[#4a5568] font-semibold">Ngân hàng đề</span>
            </div>
            <Link
              href="/admin/dashboard"
              className="px-6 py-2 border-2 border-[#0052cc] text-[#0052cc] font-semibold rounded-full hover:bg-[#e3f2fd] transition-colors"
            >
              Trang chủ
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Quản lý đề thi</h1>
            <p className="text-[#4a5568]">Quản lý và theo dõi các đề thi của bạn</p>
          </div>
          <Link
            href="/admin/testbank/create-new-document/0"
            className="flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Tạo đề thi mới
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{documents.length}</p>
                <p className="text-sm text-[#718096]">Tổng đề thi</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {documents.filter((d) => d.status === "active").length}
                </p>
                <p className="text-sm text-[#718096]">Đang diễn ra</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {documents.reduce((sum, d) => sum + d.submitted, 0)}
                </p>
                <p className="text-sm text-[#718096]">Bài nộp</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dfe3e8]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {documents.filter((d) => d.status === "draft").length}
                </p>
                <p className="text-sm text-[#718096]">Bản nháp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] mb-6">
          <div className="flex items-center justify-between border-b border-[#e8ebf0] p-4">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTab("all")}
                className={`px-6 py-2 font-semibold rounded-full transition-colors ${
                  selectedTab === "all"
                    ? "bg-[#0052cc] text-white"
                    : "text-[#718096] hover:bg-[#f5f7fa]"
                }`}
              >
                Tất cả ({documents.length})
              </button>
              <button
                onClick={() => setSelectedTab("online")}
                className={`px-6 py-2 font-semibold rounded-full transition-colors ${
                  selectedTab === "online"
                    ? "bg-[#0052cc] text-white"
                    : "text-[#718096] hover:bg-[#f5f7fa]"
                }`}
              >
                Online ({documents.filter((d) => d.type === "online").length})
              </button>
              <button
                onClick={() => setSelectedTab("offline")}
                className={`px-6 py-2 font-semibold rounded-full transition-colors ${
                  selectedTab === "offline"
                    ? "bg-[#0052cc] text-white"
                    : "text-[#718096] hover:bg-[#f5f7fa]"
                }`}
              >
                Offline ({documents.filter((d) => d.type === "offline").length})
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm đề thi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent w-64"
                />
              </div>
              <button className="p-2 border border-[#dfe3e8] rounded-lg hover:bg-[#f5f7fa] transition-colors">
                <Filter className="w-5 h-5 text-[#4a5568]" />
              </button>
              <Link
                href="/admin/testbank/matrix-list/0/1"
                className="px-4 py-2 border-2 border-[#0052cc] text-[#0052cc] font-semibold rounded-full hover:bg-[#e3f2fd] transition-colors"
              >
                Ma trận đề thi
              </Link>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-[#1a1a1a]">{doc.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        doc.status
                      )}`}
                    >
                      {getStatusLabel(doc.status)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        doc.type === "online" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {doc.type === "online" ? "Thi online" : "Thi offline"}
                    </span>
                  </div>
                  <p className="text-[#718096] mb-4">{doc.class}</p>
                  <div className="flex items-center gap-6 text-sm text-[#4a5568]">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{doc.questions} câu hỏi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{doc.duration} phút</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {doc.submitted}/{doc.students} bài nộp
                      </span>
                    </div>
                    <span>Tạo: {doc.createdDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-[#0052cc] hover:bg-[#e3f2fd] rounded-lg transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-[#0052cc] hover:bg-[#e3f2fd] rounded-lg transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-[#0052cc] hover:bg-[#e3f2fd] rounded-lg transition-colors">
                    <Copy className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-[#0052cc] hover:bg-[#e3f2fd] rounded-lg transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-[#0052cc] hover:bg-[#e3f2fd] rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-[#4a5568] hover:bg-[#f5f7fa] rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8] p-12 text-center">
            <div className="w-24 h-24 bg-[#e3f2fd] rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-[#0052cc]" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Chưa có đề thi nào</h3>
            <p className="text-[#4a5568] mb-6">Tạo đề thi đầu tiên của bạn</p>
            <Link
              href="/admin/testbank/create-new-document/0"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Tạo đề thi mới
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}