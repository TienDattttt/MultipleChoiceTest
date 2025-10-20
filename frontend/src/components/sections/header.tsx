"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const productSubLinks = [
  { href: "#testing", label: "Thi - Kiểm tra online" },
  { href: "/chuyen-doi-so-cho-nha-truong", label: "Chuyển đổi số Nhà trường" },
  { href: "/tron-de-trac-nghiem", label: "Trộn đề - Chấm phiếu offline" },
  { href: "/ngan-hang-cau-hoi", label: "Ngân hàng câu hỏi" },
  { href: "#lms", label: "Khóa học (LMS)" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  }
  const toggleMobileProducts = () => setIsMobileProductsOpen(!isMobileProductsOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm font-sans">
      <div className="container">
        <nav className="flex items-center justify-between py-4 md:py-8">
          <Link href="/" onClick={closeMobileMenu}>
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/svgs/azota_logo-1.svg"
              alt="Azota logo"
              width={130}
              height={40}
              className="h-8 w-auto md:h-10"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-x-12">
            </div>
            
            <div className="flex items-center gap-x-4 ml-12">
              <Link href="/login" className="px-8 py-3 w-full sm:w-auto text-center bg-primary uppercase text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-300 text-sm">
                ĐĂNG NHẬP
              </Link>
              <Link href="/register" className="px-8 py-3 w-full sm:w-auto text-center border-2 border-primary uppercase text-primary rounded-full font-semibold hover:bg-primary hover:text-white transform hover:-translate-y-0.5 transition-all duration-300 text-sm">
                ĐĂNG KÝ
              </Link>
            </div>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} aria-label="Open mobile menu" className="p-2 -mr-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </div>
      
      <div className={`fixed inset-0 z-50 lg:hidden ${!isMobileMenuOpen && "pointer-events-none"}`}>
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={toggleMobileMenu}
        ></div>
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-background shadow-xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
               <div className="relative group">
                <button className="flex items-center gap-x-2 text-base font-semibold text-gray-700 focus:outline-none border border-gray-300 rounded-full px-3 py-1 hover:border-primary transition-colors">
                  <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df005e61-7852-4016-a9e7-8767afc22ba6-azota-vn/assets/svgs/vi-2.svg" alt="Vietnamese Flag" width={20} height={14} className="rounded-sm" />
                  <span>VI</span>
                  <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                </button>
              </div>
                <button onClick={toggleMobileMenu} aria-label="Close mobile menu" className="p-2 -mr-2">
                    <X className="h-6 w-6 text-gray-700"/>
                </button>
            </div>
            <div className="flex flex-col p-6 space-y-6">
                <Link href="/ve-chung-toi" onClick={closeMobileMenu} className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100">Về Chúng Tôi</Link>
                <div className="border-b border-gray-100">
                    <button onClick={toggleMobileProducts} className="w-full flex justify-between items-center text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2">
                        <span>Sản phẩm</span>
                        <ChevronDown className={`h-5 w-5 transform transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isMobileProductsOpen && (
                        <div className="mt-2 ml-4 space-y-3 pb-4">
                            {productSubLinks.map(link => (
                                <Link key={link.href} href={link.href} onClick={closeMobileMenu} className="block text-gray-600 hover:text-primary transition-colors py-1">{link.label}</Link>
                            ))}
                        </div>
                    )}
                </div>
                <Link href="/bao-gia" onClick={closeMobileMenu} className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100">Báo giá</Link>
                <Link href="https://docs.azota.vn/" onClick={closeMobileMenu} className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100">Hướng dẫn</Link>
                <div className="pt-6">
                    <Link href="/vi/auth/login" onClick={closeMobileMenu} className="block w-full text-center py-3 bg-primary text-primary-foreground uppercase rounded-full font-medium text-lg shadow-lg">
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
}