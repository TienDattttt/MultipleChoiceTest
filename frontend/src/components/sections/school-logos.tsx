"use client";

import React from 'react';
import Image from 'next/image';
import Marquee from "react-fast-marquee";

const logos = [
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/luong_van_chanh.png", alt: "Luong Van Chanh" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/hoa_lac.png", alt: "Hoa Lac" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/greenfield_school.png", alt: "Greenfield School" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/long_hung.png", alt: "Long Hung" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/giap_hai.png", alt: "Giap Hai" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/hoa_sen-12.png", alt: "Hoa Sen" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/bau_bang-13.png", alt: "Bau Bang" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/thuy_nguyen-14.png", alt: "Thuy Nguyen" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/viet_anh-15.png", alt: "Viet Anh" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/van_ban-16.png", alt: "Van Ban" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/dong_hieu-17.png", alt: "Dong Hieu" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/yen_thanh-18.png", alt: "Yen Thanh" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/hong_bang-19.png", alt: "Hong Bang" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/nguyen_quang_dieu-20.png", alt: "Nguyen Quang Dieu" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/bao_thang-21.png", alt: "Bao Thang" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/nguyen_trai-22.png", alt: "Nguyen Trai" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/tran_thi_dung-23.png", alt: "Tran Thi Dung" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/minh_tan-24.png", alt: "Minh Tan" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/ninh_thuan-25.png", alt: "Ninh Thuan" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/nguyen_binh_khiem-26.png", alt: "Nguyen Binh Khiem" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/bao_thang_2-27.png", alt: "Bao Thang 2" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/quang_trung-28.png", alt: "Quang Trung" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/nguyen_cong_tru-29.png", alt: "Nguyen Cong Tru" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/images/mai_son-30.png", alt: "Mai Son" },
];

const row1Logos = logos.slice(0, 12);
const row2Logos = logos.slice(12);

const SchoolLogos = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold text-text-primary">
            Hơn 9000 Trường và Sở Giáo Dục đã tin tưởng lựa chọn Azota
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-gray-800" />
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-8 overflow-x-hidden">
        <Marquee gradient={false} speed={40} direction="left">
          {row1Logos.map((logo, index) => (
            <div key={`row1-${index}`} className="mx-4 flex h-24 w-48 items-center justify-center rounded-lg border border-border bg-white p-4 shadow-sm">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={60}
                className="h-16 w-auto object-contain grayscale"
              />
            </div>
          ))}
        </Marquee>
        <Marquee gradient={false} speed={40} direction="right">
          {row2Logos.map((logo, index) => (
            <div key={`row2-${index}`} className="mx-4 flex h-24 w-48 items-center justify-center rounded-lg border border-border bg-white p-4 shadow-sm">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={60}
                className="h-16 w-auto object-contain grayscale"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default SchoolLogos;