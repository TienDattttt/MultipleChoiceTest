import HeroSection from '@/components/sections/hero-section';
import AudienceCardsSection from '@/components/sections/audience-cards-section';
import TrustedSchoolsSection from '@/components/sections/trusted-schools-section';
import OnlineOfflineTestingSection from '@/components/sections/online-offline-testing-section';
import QuestionBankSection from '@/components/sections/question-bank-section';
import LmsSection from '@/components/sections/lms-section';
import WhyChooseSection from '@/components/sections/why-choose-section';
import StatisticsSection from '@/components/sections/statistics-section';
import PartnersSection from '@/components/sections/partners-section';
import AppDownloadSection from '@/components/sections/app-download-section';
import FooterSection from '@/components/sections/footer-section';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AudienceCardsSection />
      <TrustedSchoolsSection />
      <OnlineOfflineTestingSection />
      <QuestionBankSection />
      <LmsSection />
      <WhyChooseSection />
      <StatisticsSection />
      <PartnersSection />
      <AppDownloadSection />
      <FooterSection />
    </main>
  );
}