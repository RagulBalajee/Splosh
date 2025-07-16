import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Zap, Shield, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturesGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(gridRef.current?.children || [],
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
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

  const features = [
    {
      icon: FileText,
      title: "Smart Contracts",
      subtitle: "Automated and transparent execution",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: Zap,
      title: "Lightning-Fast",
      subtitle: "Optimized for speed and efficiency",
      color: "from-yellow-500/20 to-yellow-600/20"
    },
    {
      icon: Shield,
      title: "Highly Secure",
      subtitle: "Bank-grade security protocols",
      color: "from-green-500/20 to-green-600/20"
    },
    {
      icon: Layers,
      title: "Resilient",
      subtitle: "Built to withstand any challenge",
      color: "from-purple-500/20 to-purple-600/20"
    }
  ];

  return (
    <section ref={sectionRef} id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-jakarta text-foreground mb-6">
            Platform <span className="bg-gradient-primary">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge technology for the future of decentralized finance
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group border-border/50 hover:shadow-glow transition-all duration-500 hover:border-primary/30 hover:scale-105 cursor-pointer overflow-hidden"
            >
              <CardContent className="p-8 text-center relative">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-glow rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {feature.subtitle}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;