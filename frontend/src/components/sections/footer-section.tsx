import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Linkedin, ChevronDown } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="bg-white text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top logos */}
        <div className="flex flex-wrap items-center gap-8 mb-12 pb-8 border-b border-gray-200">
          <Link href="/">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/svgs/azota_logo-1.svg?"
              alt="Azota Logo"
              width={129}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <Image
            src="https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/top50edtech.png"
            alt="Top 50 EdTech Asia"
            width={80}
            height={80}
            className="h-20 w-auto"
          />
          <Image
            src="https://azota.vn/static/media/logo-bocongthuong.57545691.png"
            alt="Certification Badge"
            width={120}
            height={45}
            className="h-11 w-auto"
          />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About Us */}
          <div className="text-muted-foreground">
            <h3 className="font-semibold text-base text-foreground mb-4">About Us</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-primary hover:underline transition-colors">Đội ngũ</a></li>
              <li><a href="#" className="hover:text-primary hover:underline transition-colors">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-primary hover:underline transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-primary hover:underline transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-primary hover:underline transition-colors">Hợp tác với Azota</a></li>
            </ul>
          </div>

          {/* Column 2: Sản phẩm */}
          <div className="text-muted-foreground">
            <h3 className="font-semibold text-base text-foreground mb-4">Sản phẩm</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-primary hover:underline transition-colors">Thi - Kiểm tra online</a></li>
              <li><a href="#" className="hover:text-primary hover:underline transition-colors">Ngân hàng câu hỏi</a></li>
              <li><a href="#" className="hover:text-primary hover:underline transition-colors">Khóa học (LMS)</a></li>
              <li><a href="#" className="hover:text-primary hover:underline transition-colors">Báo giá</a></li>
            </ul>
          </div>

          {/* Column 3: Hướng dẫn */}
          <div className="text-muted-foreground">
            <h3 className="font-semibold text-base text-foreground mb-4">Hướng dẫn</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-primary hover:underline transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary hover:underline transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          {/* Column 4: QR Codes and Social */}
          <div>
            <h3 className="font-semibold text-base text-foreground mb-4">Quét QR để tham gia</h3>
            <div className="flex gap-4 mb-6">
              <Image src="https://azota.vn/static/media/qr-zalo.c7151e28.jpg" alt="Zalo QR Code" width={80} height={80} className="rounded-lg" />
              <Image src="https://azota.vn/static/media/qr-fb.65a2ec38.jpg" alt="Facebook QR Code" width={80} height={80} className="rounded-lg" />
            </div>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="bg-primary text-primary-foreground p-2 rounded-full inline-flex items-center justify-center hover:opacity-90 transition-opacity">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="bg-primary text-primary-foreground p-2 rounded-full inline-flex items-center justify-center hover:opacity-90 transition-opacity">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Language and Login */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <button className="flex items-center gap-2 border border-input rounded-md px-3 py-1.5 transition-colors hover:border-gray-400">
            <Image 
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/svgs/vi-2.svg?" 
              alt="VI Flag"
              width={20}
              height={15}
            />
            <span className="text-foreground font-medium">VI</span>
            <ChevronDown size={16} className="text-muted-foreground" />
          </button>
          <a href="#" className="uppercase bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-6 py-2.5 rounded-full transition-colors">ĐĂNG NHẬP</a>
        </div>

        {/* Company Info and Awards */}
        <div className="mt-8 pt-8 border-t border-border grid grid-cols-1 lg:grid-cols-2 gap-8 text-muted-foreground">
          <div>
            <p className="font-semibold text-base text-foreground">Công ty TNHH Công nghệ Giáo dục Azota</p>
            <p className="mt-2">Tầng 3, số 5 Ngõ 78 Duy Tân, Dịch vọng Hậu, Cầu Giấy, Hà Nội</p>
            <p>MST: 0109742634</p>
            <p>Liên hệ hợp tác: <a href="mailto:admin@azota.vn" className="text-primary hover:underline">admin@azota.vn</a></p>
          </div>
          <div className="flex items-center justify-start lg:justify-end gap-x-6">
            <Image src="https://azota.vn/static/media/award_1.c15e58c0.png" alt="Award 1" width={80} height={112} className="h-28 w-auto object-contain"/>
            <Image src="https://azota.vn/static/media/award_2.c1f3fd5d.png" alt="Award 2" width={80} height={112} className="h-28 w-auto object-contain"/>
            <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/icons/award_3-1.png?" alt="Award 3" width={40} height={112} className="h-28 w-auto object-contain"/>
            <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/icons/award_4-2.png?" alt="Award 4" width={40} height={112} className="h-28 w-auto object-contain"/>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;