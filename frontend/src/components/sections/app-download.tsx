import React from 'react';
import { Apple, Play } from 'lucide-react';

const AppDownload = () => {
  return (
    <section 
      id="download-app" 
      className="bg-[#00695c] py-16 md:py-20 text-white"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
          Tải ứng dụng Azota Teacher ngay
        </h2>
        <div className="w-20 h-[2px] bg-white/60 mx-auto mb-12"></div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          {/* iOS Button */}
          <a
            href="https://apps.apple.com/vn/app/azota-teacher/id1658231068"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Azota Teacher on the App Store"
            className="bg-black text-white rounded-xl flex items-center gap-4 py-3 px-6 h-[72px] w-[240px] transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <Apple className="h-10 w-10 text-white flex-shrink-0" fill="currentColor" />
            <div className="text-left">
              <p className="text-sm">iOS</p>
              <p className="font-bold text-lg leading-tight">Download the App Now</p>
            </div>
          </a>
          
          {/* Android Button */}
          <a
            href="https://play.google.com/store/apps/details?id=azt.teacher&hl=vi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get Azota Teacher on Google Play"
            className="bg-black text-white rounded-xl flex items-center gap-4 py-3 px-6 h-[72px] w-[240px] transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <Play className="h-9 w-9 text-white flex-shrink-0" fill="currentColor" />
            <div className="text-left">
              <p className="text-sm uppercase">Android</p>
              <p className="font-bold text-lg leading-tight">Download the App Now</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;