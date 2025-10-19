"use client";

import React, { useState } from "react";
import { BrainCircuit, CopySlash, FileCheck2, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

type Feature = {
  id: string;
  title: string;
  description: string;
  Icon: React.ElementType;
  cardContent: {
    heading: string;
    text: string;
    stats: { value: string; label: string }[];
  };
};

const features: Feature[] = [
  {
    id: "classification",
    title: "AI Phân loại thông minh",
    description: "Thuật toán AI phân loại chính xác 95%, xử lý 1000+ câu hỏi/phút",
    Icon: BrainCircuit,
    cardContent: {
      heading: "AI Phân loại thông minh",
      text: "Thuật toán AI được train trên dữ liệu lớn với 3 bộ sách phổ dụng nhất, phân loại chính xác mức độ khó, dễ và đơn vị kiến thức.",
      stats: [
        { value: "95%", label: "Độ chính xác" },
        { value: "1000+", label: "Câu hỏi/phút" },
      ],
    },
  },
  {
    id: "duplicate",
    title: "Lọc câu trùng lặp",
    description: "Nhận diện và loại bỏ câu hỏi trùng lặp với độ chính xác 99.2%",
    Icon: CopySlash,
    cardContent: {
      heading: "Lọc câu trùng lặp",
      text: "Nhận diện chính xác các câu đã có trong ngân hàng, giúp xây dựng ngân hàng câu hỏi chính xác, ít trùng lặp.",
      stats: [
        { value: "99.2%", label: "Tỷ lệ phát hiện" },
        { value: "Thông minh", label: "Thuật toán" },
      ],
    },
  },
  {
    id: "structure",
    title: "Chuẩn cấu trúc CT2018",
    description: "Tuân thủ 100% chương trình GDPT 2018, đầy đủ tất cả môn học",
    Icon: FileCheck2,
    cardContent: {
      heading: "Chuẩn cấu trúc CT2018",
      text: "Bám sát chương trình GDPT 2018 của tất cả các môn, khối lớp. Xây dựng khung dựa trên yêu cầu chuẩn khung kiến thức, năng lực.",
      stats: [
        { value: "100%", label: "Tuân thủ CT2018" },
        { value: "Tất cả", label: "Môn học" },
      ],
    },
  },
  {
    id: "analytics",
    title: "Phân tích thống kê trực quan",
    description: "Báo cáo thời gian thực, dashboard trực quan theo khung năng lực",
    Icon: BarChart3,
    cardContent: {
      heading: "Phân tích thống kê trực quan",
      text: "Thống kê số lượng câu hỏi theo đơn vị kiến thức, khung năng lực và các dạng thức: Trắc nghiệm 4 đáp án, đúng sai, trả lời ngắn.",
      stats: [
        { value: "Thời gian thực", label: "Thống kê" },
        { value: "Trực quan", label: "Bảng điều khiển" },
      ],
    },
  },
];

const FeatureCard = ({
  feature,
  isActive,
  onClick,
}: {
  feature: Feature;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full text-left p-6 rounded-xl border-l-4 transition-all duration-300",
      isActive
        ? "bg-accent border-primary shadow-lg scale-105"
        : "bg-white border-transparent hover:bg-accent/50"
    )}
  >
    <h4 className="font-semibold text-lg text-text-primary">{feature.title}</h4>
    <p className="text-sm text-text-secondary mt-1">{feature.description}</p>
  </button>
);

const QuestionBankSection = () => {
  const [activeFeatureId, setActiveFeatureId] = useState(features[0].id);

  const activeFeature = features.find(
    (feature) => feature.id === activeFeatureId
  );

  return (
    <section id="question-bank" className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl lg:text-[36px] font-bold text-text-primary font-display leading-tight">
            Số hoá ngân hàng câu hỏi
          </h2>
          <div className="w-16 h-1 bg-gray-800 mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-lg text-text-secondary max-w-3xl mx-auto">
            Số hoá hàng nghìn câu hỏi các định dạng chỉ trong 1 phút với AI
            thông minh. Phân loại tự động theo khung năng lực, đơn vị kiến thức
            và mức độ theo chương trình GDPT 2018.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                isActive={activeFeatureId === feature.id}
                onClick={() => setActiveFeatureId(feature.id)}
              />
            ))}
          </div>

          <div className="sticky top-28">
            {activeFeature && (
              <div className="bg-[#E6F9F4] p-8 lg:p-10 rounded-2xl shadow-lg transition-all duration-500 animate-fade-in">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full">
                  <activeFeature.Icon
                    className="w-8 h-8 text-[#10B981]"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-text-primary">
                  {activeFeature.cardContent.heading}
                </h3>
                <p className="mt-2 text-text-secondary">
                  {activeFeature.cardContent.text}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {activeFeature.cardContent.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-xl text-center"
                    >
                      <p className="text-2xl font-bold text-[#10B981]">
                        {stat.value}
                      </p>
                      <p className="text-sm text-text-secondary mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionBankSection;