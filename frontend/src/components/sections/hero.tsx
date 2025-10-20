import Image from "next/image";
import Link from "next/link";
import { CheckCircle, FileText, GraduationCap } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="about" className="bg-white py-12 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Awards */}
            <div className="flex items-center space-x-8 sm:space-x-10">
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/makeinvietnam-1.png"
                  alt="Made in Vietnam"
                  width={80}
                  height={80}
                  className="w-16 h-16 md:w-20 md:h-20"
                />
                <span className="text-xs md:text-sm font-bold text-primary uppercase mt-2">
                  make in vietnam
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/top50edtech-2.png"
                  alt="Top 50 EdTech Asia"
                  width={80}
                  height={80}
                  className="w-16 h-16 md:w-20 md:h-20"
                />
                <div className="text-xs md:text-sm font-semibold text-[#00796b]">
                  <p>TOP 50 EDTECH ASIA</p>
                  <p className="uppercase mt-1">DO HOLON BÌNH CHỌN NĂM 2022</p>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-text-primary !leading-tight tracking-tight">
              Nền Tảng Kiểm Tra Đánh Giá{" "}
              <span className="relative inline-block whitespace-nowrap">
                Toàn Diện
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/line-title-3.png"
                  alt="decorative line"
                  width={220}
                  height={15}
                  className="absolute -bottom-1 left-0 w-full"
                />
              </span>
              <br />
              Được Tin Dùng Bởi Phần Lớn Giáo Viên
            </h1>

            {/* Subtitle */}
            <p className="text-base lg:text-lg text-primary font-bold">
              Nâng cao chất lượng kiểm tra, đánh giá, trải nghiệm Giảng dạy và Học tập cùng AI
            </p>

            {/* Feature List */}
            <div className="space-y-6 pt-2">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-base">
                    Kiểm tra Online và Offline dễ dàng, chính xác
                  </h3>
                  <p className="text-text-secondary mt-1 text-sm">
                    Mô phỏng các dạng đề thi mới nhất hiện hành, số hoá nhanh chóng chính xác, đa dạng mẫu phiếu tô trắc nghiệm
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-base">Số hoá Ngân hàng câu hỏi nhanh chóng</h3>
                  <p className="text-text-secondary mt-1 text-sm">
                    Số hoá hàng nghìn câu hỏi các định dạng chỉ trong 1 phút. Nhận diện các định dạng đề thi trắc nghiệm, tự luận chính xác
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-base">Hệ thống Quản lý học tập thông minh</h3>
                  <p className="text-text-secondary mt-1 text-sm">
                    Quản lý khóa học, tạo bài giảng, giao bài tập, đánh giá, theo dõi tiến độ học tập tất cả trong một (LMS)
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
          </div>

          {/* Right Content */}
          <div className="relative hidden lg:flex justify-center items-center h-full">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/about_4-6.png"
              alt="decor-1"
              width={100}
              height={100}
              className="absolute -top-12 -left-12 opacity-50 z-0"
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/about_4-6.png"
              alt="decor-2"
              width={80}
              height={80}
              className="absolute -bottom-16 right-0 opacity-50 z-0"
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/about-4.png"
              alt="Education Platform"
              width={550}
              height={550}
              className="relative z-10"
              quality={100}
              priority
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/about_3-5.png"
              alt="chat bubble"
              width={200}
              height={150}
              className="absolute -top-12 right-0 z-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;