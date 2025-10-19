import Image from "next/image";

interface AudienceCardProps {
  imageSrc: string;
  title: string;
  features: string[];
}

const audienceData: AudienceCardProps[] = [
  {
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/actor_1-7.png?",
    title: "Giáo viên cá nhân",
    features: [
      "Giao bài, chấm điểm tự động, theo dõi tiến độ học sinh chuyên nghiệp.",
      "Tiết kiệm thời gian giao bài và chấm bài.",
      "Quản lý khóa học, giao bài theo nhóm, theo dõi tiến độ và kết quả theo lớp/khóa.",
    ],
  },
  {
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/actor_2-8.png?",
    title: "Trung tâm ngoại ngữ",
    features: [
      "Giao bài tập online, kiểm tra định kỳ, chấm điểm nhanh – phù hợp luyện 4 kỹ năng.",
      "Theo dõi tiến độ học viên, thống kê kết quả theo lớp/khóa.",
      "Quản lý khóa học, giao bài theo nhóm, theo dõi tiến độ và kết quả theo lớp/khóa.",
    ],
  },
  {
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/actor_3-9.png?",
    title: "Trường K-12",
    features: [
      "Tổ chức kiểm tra, thi thử đồng loạt, chấm điểm tự động, thống kê kết quả toàn trường.",
      "Quản lý học sinh, giáo viên, dữ liệu điểm số tập trung – hỗ trợ báo cáo nhanh và chính xác.",
      "Quản lý khóa học, giao bài theo nhóm, theo dõi tiến độ và kết quả theo lớp/khóa.",
    ],
  },
  {
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/actor_4-10.png?",
    title: "Trung tâm ngoại ngữ",
    features: [
      "Giao bài tập online, kiểm tra định kỳ, chấm điểm nhanh – phù hợp luyện 4 kỹ năng.",
      "Theo dõi tiến độ học viên, thống kê kết quả theo lớp/khóa.",
      "Quản lý khóa học, giao bài theo nhóm, theo dõi tiến độ và kết quả theo lớp/khóa.",
    ],
  },
  {
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/actor_5-11.png?",
    title: "Đào tạo doanh nghiệp",
    features: [
      "Tạo bài kiểm tra, đánh giá kỹ năng, nhận thức nhân viên sau đào tạo.",
      "Quản lý học viên theo phòng ban, theo dõi tiến độ học – tiết kiệm thời gian, chuyên nghiệp hóa quy trình.",
      "Xây dựng khoá học, gắn nội dung theo phòng ban, xuất báo cáo hiệu quả đào tạo nhân sự.",
    ],
  },
];

const AudienceCard = ({ imageSrc, title, features }: AudienceCardProps) => {
  return (
    <div className="bg-card rounded-2xl shadow-md p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col">
      <div className="relative w-full aspect-[300/160] mb-4">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 20vw"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-muted-foreground">
              <span className="mr-2 mt-0.5">–</span>
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AudienceCardsSection = () => {
  return (
    <section className="bg-gray-50 py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Phù Hợp Cho Mọi Đối Tượng
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-foreground"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {audienceData.map((card, index) => (
            <AudienceCard
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              features={card.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceCardsSection;