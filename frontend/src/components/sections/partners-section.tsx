import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
  width: number;
  height: number;
}

const partners: Partner[] = [
  {
    name: "Google Cloud",
    logo: "https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/google_cloud.png",
    width: 257,
    height: 172,
  },
  {
    name: "AWS",
    logo: "https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/aws.png",
    width: 106,
    height: 64,
  },
  {
    name: "OpenAI",
    logo: "https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/open_ai.png",
    width: 153,
    height: 48,
  },
  {
    name: "Gemini",
    logo: "https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/gemini.png",
    width: 191,
    height: 52,
  },
  {
    name: "Sở GDĐT Thanh Hóa",
    logo: "https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/so_gddt_thanh_hoa.png",
    width: 96,
    height: 96,
  },
  {
    name: "BITEX",
    logo: "https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/bitex.png",
    width: 151,
    height: 50,
  },
  {
    name: "FPT",
    logo: "https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/fpt.png",
    width: 139,
    height: 60,
  },
  {
    name: "CMC CORP",
    logo: "https://239114911.e.cdneverest.net/cdnazota/azt-assets/core-mod-assets/assets-landing-page/images/cmc_corp.png",
    width: 169,
    height: 68,
  },
];

const PartnersSection = () => {
  return (
    <div className="bg-[#E6F7F5] py-20 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold uppercase tracking-wider text-gray-900 sm:text-3xl">
            CÁC ĐỐI TÁC CỦA AZOTA
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group flex h-36 items-center justify-center rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:h-40"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="h-auto w-auto max-w-full object-contain"
                  style={{ maxHeight: "64px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;