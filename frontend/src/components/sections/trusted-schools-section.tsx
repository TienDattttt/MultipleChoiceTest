import React from 'react';
import Image from 'next/image';

const logosRow1 = [
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/ninh_thuan-30.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/nguyen_quang_dieu-12.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/luong_van_chanh-13.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/hoa_lac-14.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/greenfield_school-15.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/long_hung-16.png?",
];

const logosRow2 = [
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/giap_hai-17.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/hoa_sen-18.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/bau_bang-19.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/thuy_nguyen-20.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/van_ban-22.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/dong_hieu-23.png?",
];

const logosRow3 = [
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/yen_thanh-24.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/hong_bang-25.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/bao_thang-26.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/nguyen_trai-27.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/tran_thi_dung-28.png?",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/images/minh_tan-29.png?",
];

const LogoCard = ({ src, alt }: { src: string; alt: string }) => (
  <div className="mx-2 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-white p-2 shadow-sm md:mx-3 md:h-24 md:w-24 md:rounded-xl">
    <Image
      src={src}
      alt={alt}
      width={80}
      height={80}
      className="h-16 w-16 object-contain md:h-20 md:w-20"
    />
  </div>
);

const Scroller = ({ logos, animation }: { logos: string[], animation: string }) => (
  <div className={`flex min-w-full flex-shrink-0 items-center motion-safe:${animation}`}>
    {[...logos, ...logos].map((logo, index) => (
      <LogoCard key={`${logo}-${index}`} src={logo} alt={`School logo ${index + 1}`} />
    ))}
  </div>
);

const TrustedSchoolsSection = () => {
  return (
    <section className="bg-muted py-16 md:py-24">
      <style>
        {`
          @keyframes scroll-left {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          @keyframes scroll-right {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
        `}
      </style>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-dark-text leading-tight md:text-4xl">
            Hơn 9000 Trường và Sở Giáo Dục đã tin tưởng lựa chọn
            <br className="hidden md:block" /> Azota
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded bg-gray-800"></div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]">
        <div className="space-y-4 md:space-y-6">
          <div className="flex w-max">
            <Scroller logos={logosRow1} animation="animate-[scroll-left_80s_linear_infinite]" />
          </div>
          <div className="flex w-max">
            <Scroller logos={logosRow2} animation="animate-[scroll-right_90s_linear_infinite]" />
          </div>
          <div className="flex w-max">
            <Scroller logos={logosRow3} animation="animate-[scroll-left_85s_linear_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSchoolsSection;