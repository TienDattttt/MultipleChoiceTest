import { Settings, BookOpen, Wifi, Users, ShieldCheck, MousePointerClick } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import React from 'react';

const features = [
  {
    icon: <Settings size={40} strokeWidth={1.5} />,
    bgColor: "bg-[#E8F1FE]",
    iconColor: "text-[#0D5EF4]",
    title: "Hỗ trợ kỹ thuật",
    description: ["14/7", "(8:00 - 22:00)"],
  },
  {
    icon: <BookOpen size={40} strokeWidth={1.5} />,
    bgColor: "bg-pink-100",
    iconColor: "text-pink-500",
    title: "Hỗ trợ đào tạo",
    description: ["Tổ chức đào tạo chuyên", "sâu từ đội ngũ sáng lập"],
  },
  {
    icon: <Wifi size={40} strokeWidth={1.5} />,
    bgColor: "bg-green-100",
    iconColor: "text-green-500",
    title: "Kết nối ổn định",
    description: ["Hạ tầng lớn, thi online đồng", "thời trên 200.000 cùng lúc"],
  },
  {
    icon: <Users size={40} strokeWidth={1.5} />,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500",
    title: "Cộng đồng sử dụng lớn",
    description: ["Hơn 400.000 giáo viên", "Hơn 9000 trường học và tổ chức", "giáo dục"],
  },
  {
    icon: <ShieldCheck size={40} strokeWidth={1.5} />,
    bgColor: "bg-red-100",
    iconColor: "text-red-500",
    title: "Bảo mật cao",
    description: ["Mã hoá dữ liệu đầu cuối,", "chống gian lận bằng AI"],
  },
  {
    icon: <MousePointerClick size={40} strokeWidth={1.5} />,
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-500",
    title: "Dễ sử dụng",
    description: ["Giao diện thân thiện, tương", "thích tốt với các nghiệp vụ", "đào tạo"],
  },
];

const WhyChooseSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-text">Tại Sao Lựa Chọn Azota</h2>
          <div className="mt-4 w-20 h-1 bg-gray-800 mx-auto rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-none rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] overflow-hidden">
              <CardContent className="p-8 text-center flex flex-col items-center h-full">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${feature.bgColor}`}>
                  <div className={feature.iconColor}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-dark-text h-[56px] flex items-center justify-center">
                  {feature.title}
                </h3>
                <div className="mt-2 text-body-text text-base leading-relaxed">
                  {feature.description.map((line, i) => (
                    <p key={i} className="m-0">{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;