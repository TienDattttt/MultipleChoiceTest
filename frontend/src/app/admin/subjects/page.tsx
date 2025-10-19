"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Save,
  X,
  Search,
  FileText,
} from "lucide-react";

interface Section {
  id: number;
  name: string;
  questionCount: number;
}

interface Chapter {
  id: number;
  name: string;
  sections: Section[];
  isExpanded: boolean;
}

interface Subject {
  id: number;
  name: string;
  code: string;
  chapters: Chapter[];
  isExpanded: boolean;
  totalQuestions: number;
}

export default function SubjectManagementPage() {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 1,
      name: "Toán học",
      code: "MATH",
      isExpanded: false,
      totalQuestions: 450,
      chapters: [
        {
          id: 1,
          name: "Chương 1: Hàm số",
          isExpanded: false,
          sections: [
            { id: 1, name: "Phần 1: Khái niệm hàm số", questionCount: 45 },
            { id: 2, name: "Phần 2: Tính chất hàm số", questionCount: 38 },
            { id: 3, name: "Phần 3: Đồ thị hàm số", questionCount: 52 },
          ],
        },
        {
          id: 2,
          name: "Chương 2: Phương trình",
          isExpanded: false,
          sections: [
            { id: 4, name: "Phần 1: Phương trình bậc nhất", questionCount: 30 },
            { id: 5, name: "Phần 2: Phương trình bậc hai", questionCount: 42 },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Vật lý",
      code: "PHYS",
      isExpanded: false,
      totalQuestions: 320,
      chapters: [
        {
          id: 3,
          name: "Chương 1: Động học",
          isExpanded: false,
          sections: [
            { id: 6, name: "Phần 1: Chuyển động thẳng", questionCount: 35 },
            { id: 7, name: "Phần 2: Chuyển động cong", questionCount: 28 },
          ],
        },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"subject" | "chapter" | "section">("subject");
  const [selectedParent, setSelectedParent] = useState<{ subjectId?: number; chapterId?: number }>({});
  const [editingItem, setEditingItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });

  const toggleSubject = (subjectId: number) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId ? { ...subject, isExpanded: !subject.isExpanded } : subject
      )
    );
  };

  const toggleChapter = (subjectId: number, chapterId: number) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              chapters: subject.chapters.map((chapter) =>
                chapter.id === chapterId ? { ...chapter, isExpanded: !chapter.isExpanded } : chapter
              ),
            }
          : subject
      )
    );
  };

  const openAddDialog = (type: "subject" | "chapter" | "section", parent?: any) => {
    setDialogType(type);
    setSelectedParent(parent || {});
    setEditingItem(null);
    setFormData({ name: "", code: "" });
    setShowAddDialog(true);
  };

  const openEditDialog = (type: "subject" | "chapter" | "section", item: any, parent?: any) => {
    setDialogType(type);
    setSelectedParent(parent || {});
    setEditingItem(item);
    setFormData({ name: item.name, code: item.code || "" });
    setShowAddDialog(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    if (editingItem) {
      // Edit existing item
      if (dialogType === "subject") {
        setSubjects(
          subjects.map((subject) =>
            subject.id === editingItem.id
              ? { ...subject, name: formData.name, code: formData.code }
              : subject
          )
        );
      } else if (dialogType === "chapter") {
        setSubjects(
          subjects.map((subject) =>
            subject.id === selectedParent.subjectId
              ? {
                  ...subject,
                  chapters: subject.chapters.map((chapter) =>
                    chapter.id === editingItem.id ? { ...chapter, name: formData.name } : chapter
                  ),
                }
              : subject
          )
        );
      } else if (dialogType === "section") {
        setSubjects(
          subjects.map((subject) =>
            subject.id === selectedParent.subjectId
              ? {
                  ...subject,
                  chapters: subject.chapters.map((chapter) =>
                    chapter.id === selectedParent.chapterId
                      ? {
                          ...chapter,
                          sections: chapter.sections.map((section) =>
                            section.id === editingItem.id ? { ...section, name: formData.name } : section
                          ),
                        }
                      : chapter
                  ),
                }
              : subject
          )
        );
      }
    } else {
      // Add new item
      if (dialogType === "subject") {
        const newSubject: Subject = {
          id: Date.now(),
          name: formData.name,
          code: formData.code,
          chapters: [],
          isExpanded: false,
          totalQuestions: 0,
        };
        setSubjects([...subjects, newSubject]);
      } else if (dialogType === "chapter") {
        const newChapter: Chapter = {
          id: Date.now(),
          name: formData.name,
          sections: [],
          isExpanded: false,
        };
        setSubjects(
          subjects.map((subject) =>
            subject.id === selectedParent.subjectId
              ? { ...subject, chapters: [...subject.chapters, newChapter] }
              : subject
          )
        );
      } else if (dialogType === "section") {
        const newSection: Section = {
          id: Date.now(),
          name: formData.name,
          questionCount: 0,
        };
        setSubjects(
          subjects.map((subject) =>
            subject.id === selectedParent.subjectId
              ? {
                  ...subject,
                  chapters: subject.chapters.map((chapter) =>
                    chapter.id === selectedParent.chapterId
                      ? { ...chapter, sections: [...chapter.sections, newSection] }
                      : chapter
                  ),
                }
              : subject
          )
        );
      }
    }

    setShowAddDialog(false);
    setFormData({ name: "", code: "" });
  };

  const handleDelete = (type: "subject" | "chapter" | "section", ids: any) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa ${type === "subject" ? "môn học" : type === "chapter" ? "chương" : "phần"} này?`)) {
      return;
    }

    if (type === "subject") {
      setSubjects(subjects.filter((subject) => subject.id !== ids.subjectId));
    } else if (type === "chapter") {
      setSubjects(
        subjects.map((subject) =>
          subject.id === ids.subjectId
            ? { ...subject, chapters: subject.chapters.filter((chapter) => chapter.id !== ids.chapterId) }
            : subject
        )
      );
    } else if (type === "section") {
      setSubjects(
        subjects.map((subject) =>
          subject.id === ids.subjectId
            ? {
                ...subject,
                chapters: subject.chapters.map((chapter) =>
                  chapter.id === ids.chapterId
                    ? { ...chapter, sections: chapter.sections.filter((section) => section.id !== ids.sectionId) }
                    : chapter
                ),
              }
            : subject
        )
      );
    }
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <span className="text-[#4a5568] font-semibold">Quản lý môn học</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/admin/dashboard" className="text-[#4a5568] hover:text-[#0052cc]">
                Dashboard
              </Link>
              <Link href="/admin/testbank/document-management/0/0/1" className="text-[#4a5568] hover:text-[#0052cc]">
                Đề thi
              </Link>
              <Link href="/admin/question-library/dashboard" className="text-[#4a5568] hover:text-[#0052cc]">
                Câu hỏi
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Quản lý môn học</h1>
          <p className="text-[#4a5568]">Quản lý môn học, chương và phần học theo cấu trúc CT2018</p>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm môn học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
            />
          </div>
          <button
            onClick={() => openAddDialog("subject")}
            className="ml-4 flex items-center gap-2 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Thêm môn học
          </button>
        </div>

        {/* Subject Tree */}
        <div className="bg-white rounded-xl shadow-sm border border-[#dfe3e8]">
          {filteredSubjects.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-[#718096] mx-auto mb-4" />
              <p className="text-[#4a5568] font-semibold">Chưa có môn học nào</p>
            </div>
          ) : (
            <div className="divide-y divide-[#e8ebf0]">
              {filteredSubjects.map((subject) => (
                <div key={subject.id}>
                  {/* Subject Level */}
                  <div className="p-4 hover:bg-[#f5f7fa] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          onClick={() => toggleSubject(subject.id)}
                          className="p-1 hover:bg-[#e8ebf0] rounded transition-colors"
                        >
                          {subject.isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-[#718096]" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-[#718096]" />
                          )}
                        </button>
                        <div className="w-10 h-10 bg-[#e3f2fd] rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-[#0052cc]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[#1a1a1a]">{subject.name}</h3>
                            <span className="px-2 py-1 bg-[#e8ebf0] text-[#718096] text-xs font-semibold rounded">
                              {subject.code}
                            </span>
                          </div>
                          <p className="text-sm text-[#718096]">
                            {subject.chapters.length} chương • {subject.totalQuestions} câu hỏi
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openAddDialog("chapter", { subjectId: subject.id })}
                          className="p-2 text-[#0052cc] hover:bg-[#e3f2fd] rounded-lg transition-colors"
                          title="Thêm chương"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openEditDialog("subject", subject)}
                          className="p-2 text-[#718096] hover:bg-[#e8ebf0] rounded-lg transition-colors"
                          title="Sửa môn học"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete("subject", { subjectId: subject.id })}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa môn học"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Chapters Level */}
                  {subject.isExpanded && (
                    <div className="bg-[#f5f7fa]">
                      {subject.chapters.map((chapter) => (
                        <div key={chapter.id}>
                          <div className="pl-16 pr-4 py-3 hover:bg-[#e8ebf0] transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <button
                                  onClick={() => toggleChapter(subject.id, chapter.id)}
                                  className="p-1 hover:bg-[#dfe3e8] rounded transition-colors"
                                >
                                  {chapter.isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-[#718096]" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-[#718096]" />
                                  )}
                                </button>
                                <FileText className="w-5 h-5 text-[#718096]" />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-[#1a1a1a]">{chapter.name}</h4>
                                  <p className="text-xs text-[#718096]">{chapter.sections.length} phần</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    openAddDialog("section", { subjectId: subject.id, chapterId: chapter.id })
                                  }
                                  className="p-2 text-[#0052cc] hover:bg-[#e3f2fd] rounded-lg transition-colors"
                                  title="Thêm phần"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    openEditDialog("chapter", chapter, { subjectId: subject.id })
                                  }
                                  className="p-2 text-[#718096] hover:bg-[#dfe3e8] rounded-lg transition-colors"
                                  title="Sửa chương"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDelete("chapter", { subjectId: subject.id, chapterId: chapter.id })
                                  }
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Xóa chương"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Sections Level */}
                          {chapter.isExpanded && (
                            <div className="bg-white">
                              {chapter.sections.map((section) => (
                                <div
                                  key={section.id}
                                  className="pl-28 pr-4 py-3 hover:bg-[#f5f7fa] transition-colors"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                      <div className="w-2 h-2 bg-[#0052cc] rounded-full" />
                                      <div className="flex-1">
                                        <p className="text-sm font-semibold text-[#1a1a1a]">{section.name}</p>
                                        <p className="text-xs text-[#718096]">{section.questionCount} câu hỏi</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() =>
                                          openEditDialog("section", section, {
                                            subjectId: subject.id,
                                            chapterId: chapter.id,
                                          })
                                        }
                                        className="p-2 text-[#718096] hover:bg-[#e8ebf0] rounded-lg transition-colors"
                                        title="Sửa phần"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDelete("section", {
                                            subjectId: subject.id,
                                            chapterId: chapter.id,
                                            sectionId: section.id,
                                          })
                                        }
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Xóa phần"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">
              {editingItem ? "Chỉnh sửa" : "Thêm mới"}{" "}
              {dialogType === "subject" ? "môn học" : dialogType === "chapter" ? "chương" : "phần"}
            </h3>

            <div className="space-y-4">
              {dialogType === "subject" && (
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Mã môn học
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="VD: MATH"
                    className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                  Tên {dialogType === "subject" ? "môn học" : dialogType === "chapter" ? "chương" : "phần"}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={`VD: ${
                    dialogType === "subject"
                      ? "Toán học"
                      : dialogType === "chapter"
                      ? "Chương 1: Hàm số"
                      : "Phần 1: Khái niệm hàm số"
                  }`}
                  className="w-full px-4 py-3 border border-[#dfe3e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddDialog(false)}
                className="flex-1 px-6 py-3 border-2 border-[#dfe3e8] text-[#4a5568] font-semibold rounded-full hover:border-[#0052cc] hover:text-[#0052cc] transition-colors"
              >
                <X className="w-5 h-5 inline mr-2" />
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.name.trim()}
                className="flex-1 px-6 py-3 bg-[#0052cc] text-white font-semibold rounded-full hover:bg-[#003d99] transition-colors disabled:opacity-50"
              >
                <Save className="w-5 h-5 inline mr-2" />
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}