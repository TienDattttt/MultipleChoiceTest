import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import TargetAudience from "@/components/sections/target-audience";
import SchoolLogos from "@/components/sections/school-logos";
import OnlineOfflineTesting from "@/components/sections/online-offline-testing";
import QuestionBankSection from "@/components/sections/question-bank";
import LmsFeatures from "@/components/sections/lms-features";
import WhyChooseSection from "@/components/sections/why-choose";
import StatisticsSection from "@/components/sections/statistics";
import Partners from "@/components/sections/partners";
import AppDownload from "@/components/sections/app-download";
import Footer from "@/components/sections/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TargetAudience />
        <SchoolLogos />
        <OnlineOfflineTesting />
        <QuestionBankSection />
        <LmsFeatures />
        <WhyChooseSection />
        <StatisticsSection />
        <Partners />
        <AppDownload />
      </main>
      <Footer />
    </div>
  );
}