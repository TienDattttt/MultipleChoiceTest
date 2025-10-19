import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Library } from 'lucide-react';

const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-dark-text text-lg">{title}</h3>
      <p className="text-body-text mt-1 text-base leading-relaxed">{description}</p>
    </div>
  </div>
);

const HeroSection = () => {
  return (
    <section id="about" className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Awards */}
            <div className="flex items-end gap-x-10">
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/makeinvietnam-1.png?"
                  alt="Made in Vietnam"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="flex items-center gap-x-4">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/top50edtech-2.png?"
                  alt="Top 50 EdTech Asia"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
                <div className="text-accent-teal font-semibold text-sm">
                  <p>TOP 50 EDTECH ASIA</p>
                  <p className="mt-1 uppercase">DO HOLON BÌNH CHỌN NĂM 2022</p>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-text !leading-tight">
              <span className="relative">
                Nền Tảng Kiểm Tra Đánh Giá Toàn Diện
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/line-title-3.png?"
                  alt="decorative underline"
                  width={320}
                  height={12}
                  className="absolute -bottom-2.5 left-0 w-full max-w-[280px] sm:max-w-[320px]"
                />
              </span>
              <span className="block mt-4">
                Được Tin Dùng Bởi Phần Lớn Giáo Viên
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-primary font-bold">
              Nâng cao chất lượng kiểm tra, đánh giá, trải nghiệm Giảng dạy và Học tập cùng AI
            </p>

            {/* Feature List */}
            <div className="space-y-6 pt-2">
              <FeatureItem
                icon={<CheckCircle className="w-6 h-6 text-primary" />}
                title="Kiểm tra Online và Offline dễ dàng, chính xác"
                description="Mô phỏng các dạng đề thi mới nhất hiện hành, số hoá nhanh chóng chính xác, đa dạng mẫu phiếu tô trắc nghiệm"
              />
              <FeatureItem
                icon={<FileText className="w-6 h-6 text-primary" />}
                title="Số hoá Ngân hàng câu hỏi nhanh chóng"
                description="Số hoá hàng nghìn câu hỏi các định dạng chỉ trong 1 phút. Nhận diện các định dạng đề thi trắc nghiệm, tự luận chính xác"
              />
              <FeatureItem
                icon={<Library className="w-6 h-6 text-primary" />}
                title="Hệ thống Quản lý học tập thông minh"
                description="Quản lý khóa học, tạo bài giảng, giao bài tập, đánh giá, theo dõi tiến độ học tập tất cả trong một (LMS)"
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Button asChild className="w-full sm:w-auto h-12 text-base font-semibold px-8 rounded-lg">
                <a href="https://azota.vn/vi/auth/login?t=1760886393561">Đăng nhập</a>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto h-12 text-base font-semibold px-8 rounded-lg border-2 border-primary text-primary hover:bg-secondary hover:text-primary">
                <a href="https://azota.vn/vi/auth/register?t=1760886393561">Đăng ký</a>
              </Button>
            </div>
          </div>

          {/* Right Image content */}
          <div className="relative hidden lg:flex justify-center items-center">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/about-4.png?"
              alt="Decorative dots"
              width={100}
              height={100}
              className="absolute -top-10 -left-10 z-0 opacity-70"
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/about-4.png?"
              alt="Decorative dots"
              width={100}
              height={100}
              className="absolute -bottom-10 -right-10 z-0 opacity-70"
            />
            <div className="relative z-10 w-full max-w-xl aspect-[526/420] bg-muted rounded-2xl flex items-center justify-center shadow-md">
              <div className="text-center p-4">
                <p className="text-muted-foreground font-medium">Hero Image loading...</p>
                <p className="text-muted-foreground text-sm mt-1">(Asset `about.png` was not provided)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;