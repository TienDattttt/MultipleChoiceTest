import Image from 'next/image';
import { Facebook, Linkedin } from 'lucide-react';

const Footer = () => {

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