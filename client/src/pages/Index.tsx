import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import AboutSection from '@/components/AboutSection';
import TokenomicsSection from '@/components/TokenomicsSection';
import SmartContractsSection from '@/components/SmartContractsSection';
import FeaturesGrid from '@/components/FeaturesGrid';
import MissionStatement from '@/components/MissionStatement';
import FAQSection from '@/components/FAQSection';
import IKOSection from '@/components/IKOSection';
import EmailSubscription from '@/components/EmailSubscription';
import Footer from '@/components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href && target.href.includes('#')) {
        e.preventDefault();
        const elementId = target.href.split('#')[1];
        const element = document.getElementById(elementId);
        if (element) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: element, offsetY: 80 },
            ease: "power2.inOut"
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PartnersCarousel />
        <AboutSection />
        <TokenomicsSection />
        <SmartContractsSection />
        <FeaturesGrid />
        <MissionStatement />
        <FAQSection />
        <IKOSection />
        <EmailSubscription />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
