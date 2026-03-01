import CustomCursor from '@/components/ciivicchain/CustomCursor';
import NavBar from '@/components/NavBar/NavBar';
import HeroSection from '@/components/ciivicchain/HeroSection';
import FeaturesSection from '@/components/ciivicchain/FeaturesSection';
import HowItWorksSection from '@/components/ciivicchain/HowItWorksSection';
import DataFunnelSection from '@/components/ciivicchain/DataFunnelSection';
import DemoVideoSection from '@/components/ciivicchain/DemoVideoSection';
import TransparencySection from '@/components/ciivicchain/TransparencySection';
import UseCasesSection from '@/components/ciivicchain/UseCasesSection';
import DashboardSection from '@/components/ciivicchain/DashboardSection';
import TechStackSection from '@/components/ciivicchain/TechStackSection';
import FAQSection from '@/components/ciivicchain/FAQSection';
import FinalCTASection from '@/components/ciivicchain/FinalCTASection';

export default function LandingPage() {
  return (
    <div
      className="relative"
      style={{ background: '#0A0A0A', fontFamily: "'Syne', sans-serif" }}
    >
      <CustomCursor />
      <NavBar />

      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DataFunnelSection />
      <DemoVideoSection />
      <TransparencySection />
      <UseCasesSection />
      <DashboardSection />
      <TechStackSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}