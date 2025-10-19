import React from 'react';
import { Cog, FileText, Wifi, Users, Shield, MousePointerClick, type LucideProps } from 'lucide-react';

interface Feature {
  Icon: React.FC<LucideProps>;
  bgColor: string;
  iconColor: string;
  title: string;
  description: string[];
}

const features: Feature[] = [
  {
    Icon: Cog,
    bgColor: "bg-[#e3f2fd]", // light-blue-background
    iconColor: "text-[#0066cc]", // blue-stat-text
    title: "Hỗ trợ kỹ thuật",
    description: ["14/7", "(8:00 - 22:00)"],
  },
  {
    Icon: FileText,
    bgColor: "bg-[#fce4ec]", // light-pink-background
    iconColor: "text-[#d81b60]", // A suitable darker pink
    title: "Hỗ trợ đào tạo",
    description: ["Tổ chức đào tạo chuyên", "sâu từ đội ngũ sáng lập"],
  },
  {
    Icon: Wifi,
    bgColor: "bg-[#e6f9f4]", // success-background
    iconColor: "text-[#10b981]", // success-green
    title: "Kết nối ổn định",
    description: ["Hạ tầng lớn, thi online đồng", "thời trên 200.000 cùng lúc"],
  },
  {
    Icon: Users,
    bgColor: "bg-[#fff3e0]", // light-orange-background
    iconColor: "text-[#f57c00]", // A suitable darker orange
    title: "Cộng đồng sử dụng lớn",
    description: ["Hơn 400.000 giáo viên", "Hơn 9000 trường học và tổ chức", "giáo dục"],
  },
  {
    Icon: Shield,
    bgColor: "bg-[#fce4ec]", // Using light-pink-background again as it is the closest reddish-pink defined
    iconColor: "text-[#d81b60]",
    title: "Bảo mật cao",
    description: ["Mã hoá dữ liệu đầu cuối,", "chống gian lận bằng AI"],
  },
  {
    Icon: MousePointerClick,
    bgColor: "bg-[#e0f7fa]", // light-cyan-background
    iconColor: "text-[#0097a7]", // A suitable darker cyan
    title: "Dễ sử dụng",
    description: ["Giao diện thân thiện, tương", "thích tốt với các nghiệp vụ", "đào tạo"],
  },
];

const WhyChooseSection: React.FC = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            Tại Sao Lựa Chọn Azota
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-gray-800" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-lg ${feature.bgColor}`}
              >
                <feature.Icon className={`h-10 w-10 ${feature.iconColor}`} strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 mb-2 font-display text-xl font-semibold text-text-primary">
                {feature.title}
              </h3>
              <div className="font-body text-[15px] text-text-secondary leading-snug">
                {feature.description.map((line, i) => (
                  <p key={i} className="m-0 p-0">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;