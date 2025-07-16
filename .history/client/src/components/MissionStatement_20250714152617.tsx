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
            className="text-3xl md:text-4xl lg:text-5xl font-jakarta text-foreground leading-tight"
          >
            "Identifying and supporting promising startups through{' '}
            <span className="bg-gradient-primary ">
              decentralization
            </span>
            , creating a sustainable ecosystem where innovation thrives and communities prosper through{' '}
            <span className="bg-gradient-primary ">
              blockchain technology
            </span>
            ."
          </blockquote>
          
          <div className="mt-8 flex items-center justify-center">
            <div className="w-16 h-1 bg-gradient-primary rounded-full" />
          </div>
          
          <p className="mt-8 text-xl text-muted-foreground font-medium">
            The SPLOSH Mission
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;