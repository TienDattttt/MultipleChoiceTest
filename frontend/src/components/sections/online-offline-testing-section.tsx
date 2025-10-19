import React from 'react';
import { Database, ShieldAlert, ScanText, BarChartHorizontal } from 'lucide-react';

type Stat = {
  value: string;
  label: string;
};

type Feature = {
  icon: React.ElementType;
  iconBgClass: string;
  iconColorClass: string;
  title: string;
  stats: Stat[];
  description: string;
};

const features: Feature[] = [
  {
    icon: Database,
    iconBgClass: "bg-blue-100",
    iconColorClass: "text-blue-600",
    title: "Hạ tầng cao, thi online đồng thời số lượng lớn",
    stats: [
      { value: "99.9%", label: "Thời gian hoạt động" },
      { value: "300K+", label: "Người dùng đồng thời" },
    ],
    description: "Azota được xây dựng trên nền tảng công nghệ cao, hạ tầng lớn thi đồng thời hơn 300.000 học sinh cùng lúc, đảm bảo an toàn, bảo mật.",
  },
  {
    icon: ShieldAlert,
    iconBgClass: "bg-purple-100",
    iconColorClass: "text-purple-600",
    title: "Giám sát nâng cao, phân quyền chi tiết",
    stats: [
      { value: "AI", label: "Chống gian lận" },
      { value: "Thời gian thực", label: "Giám sát" },
    ],
    description: "Azota hỗ trợ đa dạng các tính năng giám sát khi kiểm tra, thi online, theo dõi lịch sử làm bài, phát hiện gian lận bằng công nghệ AI.",
  },
  {
    icon: ScanText,
    iconBgClass: "bg-cyan-100",
    iconColorClass: "text-cyan-600",
    title: "Chấm phiếu trắc nghiệm số lượng lớn, chính xác",
    stats: [
      { value: "99.9%", label: "Độ chính xác" },
      { value: "Đa dạng", label: "Định dạng" },
    ],
    description: "Azota hỗ trợ đa dạng các mẫu phiếu trắc nghiệm, tự luận, mẫu hỗn hợp theo chương trình mới, hỗ trợ chấm phiếu của BGD bằng điện thoại, máy scan.",
  },
  {
    icon: BarChartHorizontal,
    iconBgClass: "bg-orange-100",
    iconColorClass: "text-orange-600",
    title: "Thống kê kết quả chi tiết",
    stats: [
      { value: "Thời gian thực", label: "Giám sát" },
      { value: "Đa chiều", label: "Phân tích" },
    ],
    description: "Kết quả làm bài được thống kê theo chuẩn khung năng lực, biểu đồ điểm, phổ điểm, trung vị, bảng xếp hạng, thống kê câu sai nhiều,...",
  },
];

const FeatureCard = ({ icon: Icon, iconBgClass, iconColorClass, title, stats, description }: Feature) => {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconBgClass}`}>
        <Icon className={`w-7 h-7 ${iconColorClass}`} />
      </div>
      <h3 className="font-bold text-lg text-dark-text mt-4 mb-3 flex-grow">{title}</h3>
      <div className="flex items-start space-x-6 mb-3">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="text-body-text text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default function OnlineOfflineTestingSection() {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 lg:gap-24 items-center">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-text">Kiểm tra Online và Offline</h2>
            <div className="w-20 h-1 bg-primary my-6"></div>
            <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                Tạo đề kiểm tra trắc nghiệm hoặc tự luận nhanh chóng, có thể tạo từ Ngân hàng câu hỏi.
              </p>
              <p>
                Giao bài trực tiếp đến từng học sinh hoặc nhóm học sinh tự động thống kê kết quả.
              </p>
              <p>
                Nhận diện các định dạng đề thi trắc nghiệm, tự luận, các công thức toán học, hoá, vật lý, ngoại ngữ chính xác. Hỗ trợ đầy đủ các file docx, pdf, ảnh, excel, latex,...
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-8">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-md">DOCX</span>
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-md">PDF</span>
              <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-md">XLSX</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                iconBgClass={feature.iconBgClass}
                iconColorClass={feature.iconColorClass}
                title={feature.title}
                stats={feature.stats}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}