import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Lock, Droplets, Network, Hash } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TokenomicsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const contractAddress = "0x054Eb75BB0159173B6Ac1bB66447463151F3CEBC";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Contract address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const tokenomicsData = [
    { label: "Token", value: "SPLOSH", highlight: true, icon: Hash },
    { label: "Total Supply", value: "500,000", highlight: false, icon: TrendingUp },
    { label: "Locked Tokens", value: "450,000 (90%)", highlight: false, icon: Lock },
    { label: "Liquidity Pool", value: "50,000", highlight: false, icon: Droplets },
    { label: "Network", value: "Polygon", highlight: true, icon: Network },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-jakarta text-foreground mb-6">
            <span className="">Tokenomics</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent and community-focused token distribution
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tokenomicsData.map((item, index) => (
            <div
              key={index}
              className="group flex items-center bg-background/80 border border-border rounded-2xl px-6 py-7 shadow-md transition-all duration-300 hover:ring-4 hover:ring-[#23336a] hover:shadow-2xl hover:scale-105"
              style={{ animation: `fadeInUp 0.7s ${0.2 + index * 0.12}s forwards`, opacity: 0, transform: 'translateY(32px)' }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary via-fuchsia-400 to-cyan-400 animate-gradient-move transition-all duration-300 group-hover:shadow-lg group-hover:ring-4 group-hover:ring-[#23336a]">
                <item.icon className="w-7 h-7 text-white drop-shadow-lg group-hover:drop-shadow-[0_0_12px_#23336a] transition-all duration-300" />
              </div>
              <div className="ml-6">
                <h3 className="text-lg text-muted-foreground font-medium mb-1">{item.label}</h3>
                <p className={`text-2xl font-bold ${item.highlight ? 'bg-gradient-primary bg-clip-text text-transparent' : 'text-foreground'}`}>{item.value}</p>
              </div>
            </div>
          ))}

          {/* Contract Address Card */}
          <div className="group flex items-center bg-background/80 border border-border rounded-2xl px-6 py-7 shadow-md transition-all duration-300 hover:ring-4 hover:ring-[#23336a] hover:shadow-2xl hover:scale-105 md:col-span-2 lg:col-span-3" style={{ animation: `fadeInUp 0.7s ${0.2 + tokenomicsData.length * 0.12}s forwards`, opacity: 0, transform: 'translateY(32px)' }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary via-fuchsia-400 to-cyan-400 animate-gradient-move transition-all duration-300 group-hover:shadow-lg group-hover:ring-4 group-hover:ring-[#23336a]">
              <Hash className="w-7 h-7 text-white drop-shadow-lg group-hover:drop-shadow-[0_0_12px_#23336a] transition-all duration-300" />
            </div>
            <div className="ml-6 flex-1">
              <h3 className="text-lg text-muted-foreground font-medium mb-1">Contract Address</h3>
              <div className="flex items-center bg-muted/50 rounded-lg p-4">
                <code className="text-sm font-mono text-foreground break-all flex-1 mr-4">{contractAddress}</code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  className="flex-shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
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
      </div>
    </section>
  );
};

export default TokenomicsSection;