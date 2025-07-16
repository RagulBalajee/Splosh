import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    { label: "Token", value: "SPLOSH", highlight: true },
    { label: "Total Supply", value: "500,000", highlight: false },
    { label: "Locked Tokens", value: "450,000 (90%)", highlight: false },
    { label: "Liquidity Pool", value: "50,000", highlight: false },
    { label: "Network", value: "Polygon", highlight: true },
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
            <Card key={index} className="border-border/50 hover:shadow-card transition-all duration-300 hover:border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-muted-foreground font-medium">
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${
                  item.highlight 
                    ? 'bg-gradient-primary' 
                    : 'text-foreground'
                }`}>
                  {item.value}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Contract Address Card */}
          <Card className="md:col-span-2 lg:col-span-3 border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground font-medium">
                Contract Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
                <code className="text-sm font-mono text-foreground break-all flex-1 mr-4">
                  {contractAddress}
                </code>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;