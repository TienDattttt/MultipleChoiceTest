import Image from 'next/image';

interface AudienceCard {
  image: string;
  title: string;
  features: string[];
}

const audienceData: AudienceCard[] = [
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/actor_1-7.png",
    title: "Giáo viên cá nhân",
    features: [
      "- Giao bài, chấm điểm tự động, theo dõi tiến độ học sinh chuyên nghiệp.",
      "- Tiết kiệm thời gian giao bài và chấm bài.",
      "- Quản lý khóa học, giao bài theo nhóm, theo dõi tiến độ và kết quả theo lớp/khóa.",
    ],
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/actor_2-8.png",
    title: "Trung tâm luyện thi",
    features: [
      "- Giao bài tập online, kiểm tra định kỳ, chấm điểm nhanh – phù hợp luyện 4 kỹ năng.",
      "- Theo dõi tiến độ học viên, thống kê kết quả theo lớp/khóa.",
      "- Quản lý khóa học, giao bài theo nhóm, theo dõi tiến độ và kết quả theo lớp/khóa.",
    ],
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/actor_3-9.png",
    title: "Trường K-12",
    features: [
      "- Tổ chức kiểm tra, thi thử đồng loạt, chấm điểm tự động, thống kê kết quả toàn trường.",
      "- Quản lý học sinh, giáo viên, dữ liệu điểm số tập trung – hỗ trợ báo cáo nhanh và chính xác.",
      "- Quản lý khóa học, giao bài theo nhóm, theo dõi tiến độ và kết quả theo lớp/khóa.",
    ],
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/actor_4-10.png",
    title: "Trung tâm ngoại ngữ",
    features: [
      "- Giao bài tập online, kiểm tra định kỳ, chấm điểm nhanh – phù hợp luyện 4 kỹ năng.",
      "- Theo dõi tiến độ học viên, thống kê kết quả theo lớp/khóa.",
      "- Quản lý khóa học, giao bài theo nhóm, theo dõi tiến độ và kết quả theo lớp/khóa.",
    ],
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/actor_5-11.png",
    title: "Đào tạo doanh nghiệp",
    features: [
      "- Tạo bài kiểm tra, đánh giá kỹ năng, nhận thức nhân viên sau đào tạo.",
      "- Quản lý học viên theo phòng ban, theo dõi tiến độ học – tiết kiệm thời gian, chuyên nghiệp hóa quy trình.",
      "- Xây dựng khoá học, gắn nội dung theo phòng ban, xuất báo cáo hiệu quả đào tạo nhân sự.",
    ],
  },
];

const TargetAudience = () => {
  return (
    <section className="bg-secondary py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
            Phù Hợp Cho Mọi Đối Tượng
          </h2>
          <div className="mt-6 w-20 h-1 bg-text-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {audienceData.map((card) => (
            <div
              key={card.title}
              className="bg-card border border-border-subtle rounded-2xl p-6 flex flex-col items-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative w-full h-32 mb-6">
                <Image
                  src={card.image}
                  alt={card.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-text-primary text-center mb-4 h-14 flex items-center justify-center">
                {card.title}
              </h3>
              <ul className="space-y-3 text-left w-full">
                {card.features.map((feature, fIndex) => (
                  <li key={fIndex} className="text-sm text-text-secondary">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;