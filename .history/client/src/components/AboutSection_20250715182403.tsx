import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, BookOpen, Shield } from 'lucide-react';
import aboutImage from '@/assets/about-illustration.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(imageRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // GSAP tickle animation: up, down, up, down, pause, repeat (on <img> only)
      gsap.timeline({
        repeat: -1,
        defaults: { ease: "power1.inOut" }
      })
        .to(imgRef.current, { y: -20, duration: 0.13 })
        .to(imgRef.current, { y: 0, duration: 0.13 })
        .to(imgRef.current, { y: -20, duration: 0.13 })
        .to(imgRef.current, { y: 0, duration: 0.13 })
        .to(imgRef.current, { y: 0, duration: 1.2 }); // pause
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: "Instant Profit-Sharing",
      description: "Automated distribution based on community participation"
    },
    {
      icon: BookOpen,
      title: "Learning-Based Earning",
      description: "Earn rewards while expanding your Web3 knowledge"
    },
    {
      icon: Shield,
      title: "Immutable & Community-Driven",
      description: "Fully decentralized governance and transparent operations"
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-gradient-to-br from-[#23243a] via-[#1a1b2e] to-[#2a225a]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-jakarta mb-6 bg-gradient-to-r from-primary via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">
                About <span>SPLOSH</span>
              </h2>
              <p className="text-2xl text-muted-foreground leading-relaxed mb-10 font-medium">
                SPLOSH represents the future of decentralized autonomous organizations, combining cutting-edge blockchain technology with community-driven innovation to create a truly democratic financial ecosystem.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-6 p-0 opacity-0 translate-y-8 transition-all duration-300"
                  style={{ animation: `fadeInUp 0.7s ${0.2 + index * 0.15}s forwards` }}
                >
                  <div
                    className="flex-1 flex items-center bg-background/80 border border-border rounded-2xl px-6 py-5 shadow-md transition-all duration-300 group-hover:ring-4 group-hover:ring-white group-hover:shadow-2xl group-hover:scale-105"
                  >
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary via-fuchsia-400 to-cyan-400 animate-gradient-move transition-all duration-300 group-hover:shadow-lg group-hover:ring-4 group-hover:ring-white">
                      <feature.icon className="w-7 h-7 text-white drop-shadow-lg group-hover:drop-shadow-[0_0_12px_white] transition-all duration-300" />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-jakarta text-foreground mb-1 font-semibold">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-muted-foreground font-normal">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative flex justify-center items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-none">
              <img 
                ref={imgRef}
                src={aboutImage} 
                alt="About SPLOSH" 
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          to { opacity: 1; transform: none; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 4s ease-in-out infinite;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;