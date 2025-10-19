"use client";

import React from 'react';
import { CloudUpload, FileText, File as PdfIcon, Sheet, Image as ImageIcon, ShieldCheck, Eye, Crosshair, Layers3, Clock, BarChartHorizontal } from 'lucide-react';

interface FileTypeBadgeProps {
  icon: React.ReactNode;
  text: string;
  color: string;
  position: string;
}

const FileTypeBadge: React.FC<FileTypeBadgeProps> = ({ icon, text, color, position }) => (
  <div className={`absolute ${position} hidden lg:flex items-center space-x-2 px-4 py-2 rounded-lg shadow-lg text-white font-bold text-sm ${color} animate-fade-in`}>
    {icon}
    <span>{text}</span>
  </div>
);

interface StatBadgeProps {
  value: string;
  label: string;
}

const StatBadge: React.FC<StatBadgeProps> = ({ value, label }) => (
  <div className="bg-accent p-4 rounded-xl text-center">
    <p className="text-2xl font-bold text-blue-stat-text">{value}</p>
    <p className="mt-1 text-sm text-text-secondary">{label}</p>
  </div>
);

interface FeaturePillProps {
  icon: React.ReactNode;
  text: string;
  colorClasses: string;
}

const FeaturePill: React.FC<FeaturePillProps> = ({ icon, text, colorClasses }) => (
  <div className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full ${colorClasses}`}>
    {icon}
    <span>{text}</span>
  </div>
);


const OnlineOfflineTesting = () => {
  return (
    <section id="online-testing" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
            Kiểm tra Online và Offline
          </h2>
          <div className="mt-4 w-20 h-1 bg-primary mx-auto" />
          <p className="mt-6 text-base md:text-lg text-text-secondary max-w-3xl mx-auto">
            Tạo đề kiểm tra trắc nghiệm hoặc tự luận nhanh chóng, có thể tạo từ Ngân hàng câu hỏi. Giao bài trực tiếp đến từng học sinh hoặc nhóm học sinh tự động thống kê kết quả.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-border-subtle">
                <div className="border-2 border-dashed border-gray-300 rounded-xl px-8 py-12 flex flex-col items-center justify-center text-center">
                  <CloudUpload className="h-16 w-16 text-primary" strokeWidth={1.5} />
                  <p className="mt-6 text-sm text-text-secondary max-w-xs">
                    Nhận diện các định dạng đề thi trắc nghiệm, tự luận, các công thức toán học, hoá, vật lý, ngoại ngữ chính xác. Hỗ trợ đầy đủ các file docx, pdf, ảnh, excel, latex,...
                  </p>
                </div>
              </div>

              <FileTypeBadge icon={<FileText size={20} />} text="DOCX" color="bg-blue-600" position="top-12 -right-4" />
              <FileTypeBadge icon={<PdfIcon size={20} />} text="PDF" color="bg-red-600" position="top-32 -right-10" />
              <FileTypeBadge icon={<Sheet size={20} />} text="XLSX" color="bg-green-600" position="bottom-32 -right-10" />
              <FileTypeBadge icon={<ImageIcon size={20} />} text="Image" color="bg-purple-600" position="bottom-12 -right-4" />
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-bold text-text-primary">Hạ tầng cao, thi online đồng thời số lượng lớn</h3>
              <p className="mt-2 text-text-secondary">Azota được xây dựng trên nền tảng công nghệ cao, hạ tầng lớn thi đồng thời hơn 300.000 học sinh cùng lúc, đảm bảo an toàn, bảo mật.</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <StatBadge value="99.9%" label="Thời gian hoạt động" />
                <StatBadge value="300K+" label="Người dùng đồng thời" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary">Giám sát nâng cao, phân quyền chi tiết</h3>
              <p className="mt-2 text-text-secondary">Azota hỗ trợ đa dạng các tính năng giám sát khi kiểm tra, thi online, theo dõi lịch sử làm bài, phát hiện gian lận bằng công nghệ AI.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <FeaturePill icon={<ShieldCheck size={16} />} text="AI Chống gian lận" colorClasses="bg-success-background text-success-green" />
                <FeaturePill icon={<Eye size={16} />} text="Giám sát thời gian thực" colorClasses="bg-light-blue-background text-blue-stat-text" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary">Chấm phiếu trắc nghiệm số lượng lớn, chính xác</h3>
              <p className="mt-2 text-text-secondary">Azota hỗ trợ đa dạng các mẫu phiếu trắc nghiệm, tự luận, mẫu hỗn hợp theo chương trình mới, hỗ trợ chấm phiếu của BGD bằng điện thoại, máy scan.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                 <FeaturePill icon={<Crosshair size={16} />} text="99.9% Độ chính xác" colorClasses="bg-light-blue-background text-blue-stat-text" />
                 <FeaturePill icon={<Layers3 size={16} />} text="Đa dạng Định dạng" colorClasses="bg-light-orange-background text-orange-600" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-text-primary">Thống kê kết quả chi tiết</h3>
              <p className="mt-2 text-text-secondary">Kết quả làm bài được thống kê theo chuẩn khung năng lực, biểu đồ điểm, phổ điểm, trung vị, bảng xếp hạng, thống kê câu sai nhiều,...</p>
              <div className="mt-4 flex flex-wrap gap-3">
                 <FeaturePill icon={<Clock size={16} />} text="Báo cáo thời gian thực" colorClasses="bg-success-background text-success-green" />
                 <FeaturePill icon={<BarChartHorizontal size={16} />} text="Phân tích đa chiều" colorClasses="bg-light-pink-background text-pink-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineOfflineTesting;