import Image from 'next/image';
import { Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinkColumns = [
    {
      title: 'About Us',
      links: [
        { name: 'Đội ngũ', href: '#' },
        { name: 'Về Chúng Tôi', href: '#' },
        { name: 'Chính sách bảo mật', href: '#' },
        { name: 'Hợp tác với Azota', href: '#' },
      ],
    },
    {
      title: 'Sản phẩm',
      links: [
        { name: 'Thi - Kiểm tra online', href: '#' },
        { name: 'Khóa học (LMS)', href: '#' },
        { name: 'Báo giá', href: '#' },
      ],
    },
    {
      title: 'Hướng dẫn',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'Hướng dẫn sử dụng', href: '#' },
        { name: 'Hỗ trợ kỹ thuật', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-white">
      <div className="container mx-auto max-w-[1200px] px-8 py-16">
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6 pb-12">
          <a href="#">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/svgs/azota_logo-1.svg"
              alt="Azota Logo"
              width={130}
              height={40}
              className="h-10 w-auto"
            />
          </a>
          <a href="#">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/top50edtech-2.png"
              alt="Top 50 EdTech"
              width={58}
              height={64}
              className="h-16 w-auto object-contain"
            />
          </a>
          <a
            href="#"
            aria-label="Certification Badge"
            className="h-16 w-auto flex items-center"
          >
            <div
              className="h-[61px] w-[164px] flex items-center justify-center rounded-lg bg-gray-100 border border-gray-200"
              title="Đã thông báo Bộ Công Thương Badge Placeholder"
            />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {footerLinkColumns.map((column) => (
            <div key={column.title}>
              <h5 className="font-bold text-base text-text-primary mb-5">
                {column.title}
              </h5>
              <ul className="space-y-4 text-sm text-text-secondary">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-primary">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h5 className="font-bold text-base text-text-primary mb-5">
              Quét QR để tham gia
            </h5>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 border border-gray-200 flex items-center justify-center rounded-lg mb-2" />
                <p className="text-xs text-text-secondary">QR Gv</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 border border-gray-200 flex items-center justify-center rounded-lg mb-2" />
                <p className="text-xs text-text-secondary">QR Hs</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded bg-primary text-white hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook size={20} fill="white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded bg-primary text-white hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} fill="white" />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="text-sm text-text-secondary space-y-2">
            <h5 className="font-bold text-base text-text-primary mb-3">
              Công ty TNHH Công nghệ Giáo dục Azota
            </h5>
            <p>
              Tầng 3, số 5 ngõ 78 Duy Tân, Dịch vọng Hậu, Cầu Giấy, Hà Nội
            </p>
            <p>MST: 0109742634</p>
            <p>
              Liên hợp tác:{' '}
              <a
                href="mailto:admin@azota.vn"
                className="text-primary hover:underline"
              >
                admin@azota.vn
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-start md:justify-end gap-4">
            <div className="h-[88px] w-[62px] bg-gray-100 border border-gray-200 rounded-md" />
            <div className="h-[88px] w-[62px] bg-gray-100 border border-gray-200 rounded-md" />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/icons/award_3-1.png"
              alt="Trophy Award"
              width={40}
              height={88}
              className="h-[88px] w-auto object-contain"
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/icons/award_4-2.png"
              alt="Trophy Award"
              width={40}
              height={88}
              className="h-[88px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;