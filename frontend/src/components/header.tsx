'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad119f3d-e853-4c9b-bc84-5e8a4fbbbced-azota-vn/assets/svgs/azota_logo-1.svg"
              alt="Azota"
              width={120}
              height={40}
              className="h-8 lg:h-10 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="#about" 
              className="text-body-text hover:text-primary transition-colors text-[15px] font-medium"
            >
              Về Chúng Tôi
            </Link>
            
            <div className="relative">
              <button
                onMouseEnter={() => setIsProductOpen(true)}
                onMouseLeave={() => setIsProductOpen(false)}
                className="flex items-center space-x-1 text-body-text hover:text-primary transition-colors text-[15px] font-medium"
              >
                <span>Sản phẩm</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isProductOpen && (
                <div
                  onMouseEnter={() => setIsProductOpen(true)}
                  onMouseLeave={() => setIsProductOpen(false)}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border py-2"
                >
                  <Link href="#testing" className="block px-4 py-2 text-sm text-body-text hover:bg-muted hover:text-primary transition-colors">
                    Thi - Kiểm tra online
                  </Link>
                  <Link href="#question-bank" className="block px-4 py-2 text-sm text-body-text hover:bg-muted hover:text-primary transition-colors">
                    Ngân hàng câu hỏi
                  </Link>
                  <Link href="#lms" className="block px-4 py-2 text-sm text-body-text hover:bg-muted hover:text-primary transition-colors">
                    Khóa học LMS
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="#pricing" 
              className="text-body-text hover:text-primary transition-colors text-[15px] font-medium"
            >
              Báo giá
            </Link>
            
            <Link 
              href="#guide" 
              className="text-body-text hover:text-primary transition-colors text-[15px] font-medium"
            >
              Hướng dẫn
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 text-body-text hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-[15px] font-medium">VI</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-border py-2">
                  <button className="block w-full text-left px-4 py-2 text-sm text-body-text hover:bg-muted hover:text-primary transition-colors">
                    Tiếng Việt
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-body-text hover:bg-muted hover:text-primary transition-colors">
                    English
                  </button>
                </div>
              )}
            </div>

            {/* Login Button */}
            <Link
              href="#login"
              className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-[15px] font-semibold"
            >
              ĐĂNG NHẬP
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}