import { FileText } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

const featuresList: Feature[] = [
  {
    title: "Kho nội dung chất lượng",
    description: "Hàng trăm nghìn câu hỏi chất lượng đủ mọi mức độ, đầy đủ lời giải chi tiết, đáp án cho giáo viên tham khảo.",
  },
  {
    title: "Công nghệ AI theo dõi tiến trình",
    description: "Giáo viên có thể theo dõi tiến trình học của từng học sinh hoặc cả lớp chi tiết, đánh giá sự chủ động, năng lực, hiệu quả của từng học sinh.",
  },
  {
    title: "Thống kê đánh giá chi tiết",
    description: "Đánh giá năng lực tổng quan và chi tiết từng học sinh trong quá trình học tập, từ đó có biện pháp ôn tập phù hợp, nâng cao trải nghiệm cá nhân hóa.",
  },
];

const LmsSection = () => {
  return (
    <section id="lms" className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Hệ thống Quản lý học tập thông minh
          </h2>
          <div className="w-20 h-1 bg-foreground/80 mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Quản lý khóa học, giao bài theo nhóm, theo dõi tiến độ và kết quả theo lớp/khóa.
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            Đào tạo nội bộ, kiểm tra kỹ năng, gắn nội dung theo phòng ban, xuất báo cáo hiệu quả đào tạo nhân sự.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mt-16">
          <div className="bg-secondary p-8 lg:p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
            <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Chuẩn cấu trúc PT2018</h3>
            <p className="mt-3 text-muted-foreground">
              Khung nội dung được xây dựng bám sát chương trình SGK và yêu cầu cần đạt của CT2018, đảm bảo tính chuẩn mực.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-background/60 p-4 rounded-xl text-center">
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-foreground font-semibold mt-1">Chuẩn SGK</p>
              </div>
              <div className="bg-background/60 p-4 rounded-xl text-center">
                <p className="text-3xl font-bold text-primary">CT2018</p>
                <p className="text-sm text-foreground font-semibold mt-1">Tiêu chuẩn</p>
              </div>
            </div>
          </div>

          <div className="space-y-10 lg:pt-8">
            {featuresList.map((feature, index) => (
              <div key={index}>
                <h4 className="text-xl font-bold text-foreground">{feature.title}</h4>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LmsSection;