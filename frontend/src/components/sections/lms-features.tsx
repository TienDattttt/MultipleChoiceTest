import { FileText } from 'lucide-react';
import React from 'react';

// A small component for the colored metric tags, as per instructions.
interface FeatureMetricTagProps {
  text: string;
  className: string;
}

const FeatureMetricTag: React.FC<FeatureMetricTagProps> = ({ text, className }) => (
  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${className}`}>
    {text}
  </span>
);

const LmsFeatures = () => {
  const features = [
    {
      title: "Chuẩn cấu trúc PT2018",
      description: "Khung nội dung được xây dựng bám sát chương trình SGK và yêu cầu cần đạt của CT2018, đảm bảo tính chuẩn mực.",
      metrics: [],
      colors: '',
    },
    {
      title: "Kho nội dung chất lượng",
      description: "Hàng trăm nghìn câu hỏi chất lượng đủ mọi mức độ, đầy đủ lời giải chi tiết, đáp án cho giáo viên tham khảo.",
      metrics: ["500K+ câu hỏi"],
      colors: 'bg-light-pink-background text-pink-700',
    },
    {
      title: "Công nghệ AI theo dõi tiến trình",
      description: "Giáo viên có thể theo dõi tiến trình học của từng học sinh hoặc cả lớp chi tiết, đánh giá sự chủ động, năng lực, hiệu quả của từng học sinh.",
      metrics: ["Real-time tracking", "AI analysis"],
      colors: 'bg-light-orange-background text-orange-700',
    },
    {
      title: "Thống kê đánh giá chi tiết",
      description: "Đánh giá năng lực tổng quan và chi tiết từng học sinh trong quá trình học tập, từ đó có biện pháp ôn tập phù hợp, nâng cao trải nghiệm cá nhân hóa.",
      metrics: ["360° assessment"],
      colors: 'bg-light-cyan-background text-cyan-700',
    },
  ];

  return (
    <section id="lms" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
            Hệ thống Quản lý học tập thông minh
          </h2>
          <div className="w-20 h-1 bg-gray-300 mx-auto mt-4 mb-6"></div>
          <p className="text-base lg:text-lg text-text-secondary">
            Quản lý khóa học, giao bài theo nhóm, theo dõi tiến độ và kết quả theo lớp/khóa.
          </p>
          <p className="text-base lg:text-lg text-text-secondary mt-2">
            Đào tạo nội bộ, kiểm tra kỹ năng, gắn nội dung theo phòng ban, xuất báo cáo hiệu quả đào tạo nhân sự.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="bg-accent rounded-3xl p-8 lg:p-12 border border-blue-200">
            <div className="flex flex-col h-full">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-text-primary">
                Chuẩn cấu trúc PT2018
              </h3>
              <p className="mt-3 text-text-secondary flex-grow">
                Khung nội dung được xây dựng bám sát chương trình SGK và yêu cầu cần đạt của CT2018, đảm bảo tính chuẩn mực.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-blue-200">
                <div className="bg-white/60 rounded-lg p-4 text-center border border-blue-100">
                  <div className="text-2xl font-bold text-blue-stat-text">100%</div>
                  <div className="text-sm text-text-tertiary mt-1">Chuẩn SGK</div>
                </div>
                <div className="bg-white/60 rounded-lg p-4 text-center border border-blue-100">
                  <div className="text-2xl font-bold text-blue-stat-text">CT2018</div>
                  <div className="text-sm text-text-tertiary mt-1">Tiêu chuẩn</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10 mt-8 lg:mt-0">
            {features.map((feature, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute left-0 top-1 w-1 h-full bg-blue-100 rounded-full" aria-hidden="true" />
                <div className="absolute left-0 top-1 w-1 h-5 bg-primary rounded-full" aria-hidden="true" />
                <h4 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h4>
                <p className="text-text-secondary">{feature.description}</p>
                {feature.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {feature.metrics.map((metric, metricIndex) => (
                      <FeatureMetricTag key={metricIndex} text={metric} className={feature.colors} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LmsFeatures;