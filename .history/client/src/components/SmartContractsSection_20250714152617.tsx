import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Scale, Building, Coins } from 'lucide-react';
import smartContractsImage from '@/assets/smart-contracts.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmartContractsSection = () => {
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
    }, sectionRef);

    // GSAP tickle animation: left, center, left, center, pause, repeat (on <img> only)
    gsap.timeline({
      repeat: -1,
      defaults: { ease: "power1.inOut" }
    })
      .to(imgRef.current, { x: -10, duration: 0.13 })
      .to(imgRef.current, { x: 0, duration: 0.13 })
      .to(imgRef.current, { x: -10, duration: 0.13 })
      .to(imgRef.current, { x: 0, duration: 0.13 })
      .to(imgRef.current, { x: 0, duration: 1.2 }); // pause

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: RefreshCw,
      title: "Self-Executing Logic",
      description: "Automated processes without human intervention"
    },
    {
      icon: Scale,
      title: "No Intermediaries",
      description: "Direct peer-to-peer transactions and interactions"
    },
    {
      icon: Building,
      title: "Immutable",
      description: "Permanent and unchangeable once deployed"
    },
    {
      icon: Coins,
      title: "Financial Automation",
      description: "Streamlined DeFi operations and profit distribution"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl font-jakarta md:text-5xl text-foreground mb-6">
                Secure & Trustless
                <br />
                <span className="bg-gradient-primary ">
                  Smart Contracts
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Our smart contracts ensure transparent, automated, and secure operations without the need for traditional intermediaries or centralized control.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-border/50 hover:shadow-card transition-all duration-300 hover:border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-glow rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                ref={imgRef}
                src={smartContractsImage} 
                alt="Smart Contracts" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-glow opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartContractsSection;