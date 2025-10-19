import Image from 'next/image';

interface Partner {
  name: string;
  logoUrl: string;
  width: number;
  height: number;
}

const partners: Partner[] = [
  {
    name: 'Google Cloud',
    logoUrl: 'https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/google_cloud.png',
    width: 140,
    height: 94,
  },
  {
    name: 'AWS',
    logoUrl: 'https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/aws.png',
    width: 89,
    height: 53,
  },
  {
    name: 'OpenAI',
    logoUrl: 'https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/open_ai.png',
    width: 139,
    height: 35,
  },
  {
    name: 'Gemini',
    logoUrl: 'https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/gemini.png',
    width: 119,
    height: 31,
  },
  {
    name: 'Sở GDĐT Thanh Hóa',
    logoUrl: 'https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/so_gddt_thanh_hoa.png',
    width: 79,
    height: 79,
  },
  {
    name: 'BITEX',
    logoUrl: 'https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/bitex.png',
    width: 115,
    height: 39,
  },
  {
    name: 'FPT',
    logoUrl: 'https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/fpt.png',
    width: 95,
    height: 40,
  },
  {
    name: 'CMC CORP',
    logoUrl: 'https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/cmc_corp.png',
    width: 156,
    height: 39,
  },
];

const Partners = () => {
  return (
    <section className="bg-[#EBFBF5] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-3xl font-bold text-text-primary mb-12">
          CÁC ĐỐI TÁC CỦA AZOTA
        </h3>
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg h-36"
            >
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="object-contain max-h-16 w-auto"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;