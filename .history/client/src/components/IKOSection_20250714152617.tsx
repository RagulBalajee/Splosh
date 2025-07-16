import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IKOSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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

  const benefits = [
    {
      icon: Users,
      title: "Community Access",
      description: "Join exclusive community events"
    },
    {
      icon: TrendingUp,
      title: "Early Benefits",
      description: "Get priority access to features"
    },
    {
      icon: Target,
      title: "Governance Rights",
      description: "Vote on platform decisions"
    }
  ];

  return (
    <section ref={sectionRef} id="iko" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card 
            ref={cardRef}
            className="relative overflow-hidden border-2 border-primary/20 shadow-glow bg-gradient-glow"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
            
            <CardContent className="relative z-10 p-8 md:p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-jakarta text-foreground mb-6">
                Join the <span className="bg-gradient-primary bg-clip-text">IKO</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Be part of the Initial Key Offering and help shape the future of decentralized innovation. Early participants receive exclusive benefits and governance rights.
              </p>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                      <benefit.icon className="w-8 h-8 " />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 h-auto animate-glow-pulse"
              >
                Register Now
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                Limited spots available • No registration fees
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default IKOSection;