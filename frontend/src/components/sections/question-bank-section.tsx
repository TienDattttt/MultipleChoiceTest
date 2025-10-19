import React from 'react';
import { BrainCircuit, CopyX, ClipboardCheck, BarChart3, Bot } from 'lucide-react';

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  bgColor: string;
  iconBgColor: string;
  iconColor: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description, bgColor, iconBgColor, iconColor }) => {
  return (
    <div className={`p-6 rounded-xl shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${bgColor}`}>
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg ${iconBgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <h4 className="font-semibold text-base text-dark-text">{title}</h4>
          <p className="text-sm text-body-text mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: BrainCircuit,
    title: "AI Phân loại thông minh",
    description: "Thuật toán AI phân loại chính xác 95%, xử lý 1000+ câu hỏi/phút",
    bgColor: "bg-secondary",
    iconBgColor: "bg-blue-100",
    iconColor: "text-primary"
  },
  {
    icon: CopyX,
    title: "Lọc câu trùng lặp",
    description: "Nhận diện và loại bỏ câu hỏi trùng lặp với độ chính xác 99.2%",
    bgColor: "bg-[#FFF0F6]",
    iconBgColor: "bg-pink-100",
    iconColor: "text-accent-pink"
  },
  {
    icon: ClipboardCheck,
    title: "Chuẩn cấu trúc CT2018",
    description: "Tuân thủ 100% chương trình GDPT 2018, đầy đủ tất cả môn học",
    bgColor: "bg-[#E6FAF5]",
    iconBgColor: "bg-teal-100",
    iconColor: "text-accent-teal"
  },
  {
    icon: BarChart3,
    title: "Phân tích thống kê trực quan",
    description: "Báo cáo thời gian thực, dashboard trực quan theo khung năng lực",
    bgColor: "bg-muted",
    iconBgColor: "bg-gray-200",
    iconColor: "text-body-text"
  },
];

const QuestionBankSection = () => {
  return (
    <section id="question-bank" className="bg-white py-16 lg:py-24">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-text">Số hoá ngân hàng câu hỏi</h2>
          <div className="mt-4 w-20 h-1 bg-gray-800 mx-auto"></div>
          <p className="mt-6 text-lg text-body-text">
            Số hoá hàng nghìn câu hỏi các định dạng chỉ trong 1 phút với AI thông minh. Phân loại tự động theo khung năng lực, đơn vị kiến thức và mức độ theo chương trình GDPT 2018.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col space-y-6">
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#e6fff5] to-[#dcfce7] rounded-2xl p-8 lg:p-12 shadow-lg border border-green-200/50 flex flex-col items-center text-center h-full">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md mb-6">
              <Bot className="w-10 h-10 text-accent-green" />
            </div>
            <h3 className="text-2xl font-bold text-dark-text">
              AI Phân loại thông minh
            </h3>
            <p className="mt-4 text-body-text max-w-md">
              Thuật toán AI được train trên dữ liệu lớn với 3 bộ sách phổ dụng nhất, phân loại chính xác mức độ khó, dễ và đơn vị kiến thức.
            </p>
            <div className="mt-8 flex justify-center items-start space-x-12 w-full">
              <div className="text-center">
                <p className="text-4xl font-bold text-accent-green">95%</p>
                <p className="text-sm text-body-text mt-2">Độ chính xác</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-accent-green">1000+</p>
                <p className="text-sm text-body-text mt-2">Câu hỏi/phút</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionBankSection;