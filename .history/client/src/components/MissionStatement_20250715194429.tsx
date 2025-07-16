import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MissionStatement = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-glow rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-primary rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote 
            ref={quoteRef}
            className="text-lg md:text-xl lg:text-2xl font-jakarta leading-tight"
            style={{
              background: 'linear-gradient(90deg, #00ffe7 0%, #a259f7 25%, #ff6ec4 50%, #6e7ff3 75%, #00bfff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
              fontWeight: 700
            }}
          >
            "Identifying and supporting promising startups through decentralization, creating a sustainable ecosystem where innovation thrives and communities prosper through blockchain technology."
          </blockquote>
          
          <div className="mt-8 flex items-center justify-center">
            <div className="w-16 h-1 bg-gradient-primary rounded-full" />
          </div>
          
          <p className="mt-8 text-xl text-muted-foreground font-medium">
            <span style={{
              color: '#7edfff',
              fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
              fontWeight: 500
            }}>
              The SPLOSH Mission
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;