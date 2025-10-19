import React from 'react';
import { Apple, Play } from 'lucide-react';

const AppDownloadSection = () => {
  return (
    <section 
      id="download-app" 
      className="py-20 lg:py-24 bg-[linear-gradient(180deg,_#1B5E5C_0%,_#0D3D3C_100%)]"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Tải ứng dụng Azota Teacher ngay
        </h2>
        <div className="w-20 h-1 bg-white mx-auto mb-12 rounded-full" />
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a
            href="https://apps.apple.com/vn/app/azota-teacher/id1658231068"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-black text-white rounded-xl py-4 px-8 w-full md:w-auto justify-center transition-transform duration-300 hover:scale-105"
          >
            <Apple className="w-10 h-10 flex-shrink-0" fill="white" strokeWidth={0} />
            <div className="text-left">
              <p className="text-sm font-normal">iOS</p>
              <p className="font-bold text-xl leading-tight">Download the<br/>App Now</p>
            </div>
          </a>
          
          <a
            href="https://play.google.com/store/apps/details?id=azt.teacher&hl=vi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-black text-white rounded-xl py-4 px-8 w-full md:w-auto justify-center transition-transform duration-300 hover:scale-105"
          >
            <Play className="w-8 h-8 flex-shrink-0" fill="white" strokeWidth={0}/>
            <div className="text-left">
              <p className="text-sm font-normal uppercase">Android</p>
              <p className="font-bold text-xl leading-tight">Download the<br/>App Now</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;