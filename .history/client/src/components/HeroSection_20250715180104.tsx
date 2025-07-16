import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import Aurora from './Aurora';
import { useTheme } from '@/context/ThemeProvider';

const HeroSection = () => {
  const naviagte = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
        .fromTo(subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 z-1">
        {(theme === "dark") ? < Aurora
          colorStops={["#cb69f9", "#0c0f43", "#dc87ff", "#58256e", "#0c0e2e", "#FFFFFF", "#c49fd4"]}
          amplitude={1.5}
          blend={0.2}
        /> :
          <Aurora
            colorStops={["#cb69f9", "#ecdff2", "#beb6c2", "#cd61ff", "#d8c8e0"]}
            amplitude={1.0}
            blend={0.1}
          />
        }
      </div>


      {/* Content */}
      <div className={
        `relative z-10 container mx-auto px-4 lg:px-8 text-center ${theme === 'dark' ? '' : 'card glass bg-card border-glass'}`
      }>
        <div className="max-w-4xl mx-auto space-y-8">
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-jakarta  text-foreground leading-tight"
          >
            Decentralize
            <br />
            <span className="text-nowrap">
              Safe & Secure Technology
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            SPLOSH is a 100% decentralized DAO-driven community platform built with blockchain and smart contracts.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Button variant="glow" size="lg">
              Learn More
            </Button>
            <Button onClick={() => naviagte("/login")} size="lg">
              Explore Ecosystem
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;