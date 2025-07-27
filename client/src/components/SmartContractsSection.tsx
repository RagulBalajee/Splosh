import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Scale, Building, Coins } from 'lucide-react';
import smartContractsImage from '@/assets/smart-contracts.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import sploshCoin from '../assets/splosh-coin.png';

gsap.registerPlugin(ScrollTrigger);

const SmartContractsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
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
      }
      if (imageRef.current) {
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
      }
    }, sectionRef);

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
              <h2 className="text-4xl md:text-5xl mb-6 font-jakarta" style={{
                background: 'linear-gradient(90deg, #00ffe7 0%, #6e7ff3 50%, #00bfff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
                fontWeight: 800
              }}>
                Secure & Trustless
                <br />
                <span style={{
                  background: 'linear-gradient(90deg, #00ffe7 0%, #6e7ff3 50%, #00bfff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
                  fontWeight: 800
                }}>
                  Smart Contracts
                </span>
              </h2>
              <p className="text-xl leading-relaxed mb-8" style={{
                color: '#7edfff',
                fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
                fontWeight: 500
              }}>
                Our smart contracts ensure transparent, automated, and secure operations without the need for traditional intermediaries or centralized control.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="glass3d-card">
                  <div className="glass3d-bg">
                    <div className="glass3d-glass" />
                    <div className="glass3d-circles">
                      <div className="circle1" />
                      <div className="circle2" />
                      <div className="circle3" />
                      <div className="circle4" />
                      <div className="circle5" />
                    </div>
                  </div>
                  <div className="glass3d-content">
                    <div className="glass3d-icon">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <div className="glass3d-text">
                      <h3 className="glass3d-title">{feature.title}</h3>
                      <p className="glass3d-desc">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex flex-col items-center justify-center">
            <img
              src={sploshCoin}
              alt="Splosh Coin - InSecure & Trustless Smart Contracts"
              className="w-80 h-80 md:w-[28rem] md:h-[28rem] object-contain mb-4 bg-transparent animate-coin-toss"
              style={{
                background: 'transparent',
                animation: 'coin-toss 2.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
                willChange: 'transform',
                transformStyle: 'preserve-3d'
              }}
              draggable={false}
            />
            <div className="text-lg font-bold text-center text-gradient-pinkblue mt-2">
              InSecure & Trustless<br />Smart Contracts
            </div>
          </div>
        </div>
      </div>
      <style>{`
/* Cinematic 3D Glassmorphic Card Styles */
.glass3d-card {
  position: relative;
  width: 100%;
  min-height: 270px;
  background: transparent;
  border-radius: 2rem;
  perspective: 1800px;
  transition: box-shadow 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 12px 48px 0 #1a1a2a33, 0 0 0 2px #40c9ff33;
  overflow: visible;
  margin-bottom: 1.5rem;
  cursor: pointer;
  will-change: transform, box-shadow;
}
.glass3d-card:hover {
  transform: rotate3d(1, 1.5, 0, 32deg) scale(1.09) translateY(-18px);
  box-shadow: 0 32px 96px 0 #00ffa399, 0 0 0 8px #40c9ff66, 0 0 64px 16px #e81cff55;
  z-index: 10;
}
.glass3d-bg {
  position: absolute;
  inset: 0;
  border-radius: 2rem;
  overflow: hidden;
  z-index: 1;
  background: linear-gradient(135deg, rgba(0,255,163,0.22) 0%, rgba(64,201,255,0.13) 100%);
  box-shadow: 0 8px 48px 0 #00ffa355, 0 0 0 2px #40c9ff22;
}
.glass3d-glass {
  position: absolute;
  inset: 0;
  border-radius: 2rem 0 2rem 2rem;
  background: linear-gradient(120deg, rgba(255,255,255,0.22) 60%, rgba(0,255,163,0.13) 100%);
  backdrop-filter: blur(18px) saturate(1.2);
  box-shadow: 0 8px 48px 0 #00ffa355, 0 0 0 2px #00ffa322;
  pointer-events: none;
  border-top-right-radius: 4.5rem 3.5rem;
  border-bottom-left-radius: 2rem 2rem;
  border-bottom-right-radius: 2rem 2rem;
  border-top-left-radius: 2rem 2rem;
}
.glass3d-circles {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 2;
  pointer-events: none;
  perspective: 1200px;
}
.glass3d-circles > div {
  position: absolute;
  border-radius: 50%;
  border: 2.5px solid rgba(0,255,163,0.22);
  background: rgba(0,255,163,0.10);
  transition: transform 0.7s cubic-bezier(.4,0,.2,1), opacity 0.7s cubic-bezier(.4,0,.2,1);
  opacity: 0.7;
  filter: blur(0.5px);
  will-change: transform, opacity;
}
.circle1 { width: 38px; height: 38px; right: 0; top: 0; transition-delay: 0.05s; }
.circle2 { width: 60px; height: 60px; right: -11px; top: -11px; transition-delay: 0.12s; }
.circle3 { width: 84px; height: 84px; right: -23px; top: -23px; transition-delay: 0.19s; }
.circle4 { width: 110px; height: 110px; right: -36px; top: -36px; transition-delay: 0.26s; }
.circle5 { width: 140px; height: 140px; right: -52px; top: -52px; transition-delay: 0.33s; }
.glass3d-card:hover .glass3d-circles .circle1 { transform: translateZ(64px) scale(1.32) translateY(-8px); opacity: 1; }
.glass3d-card:hover .glass3d-circles .circle2 { transform: translateZ(48px) scale(1.22) translateY(-6px); opacity: 0.97; }
.glass3d-card:hover .glass3d-circles .circle3 { transform: translateZ(32px) scale(1.15) translateY(-4px); opacity: 0.93; }
.glass3d-card:hover .glass3d-circles .circle4 { transform: translateZ(16px) scale(1.08) translateY(-2px); opacity: 0.89; }
.glass3d-card:hover .glass3d-circles .circle5 { transform: translateZ(8px) scale(1.04); opacity: 0.85; }
.glass3d-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.7rem 1.7rem 1.7rem 1.7rem;
  transform: translate3d(0,0,64px);
  will-change: transform;
}
.glass3d-icon {
  margin-bottom: 1.2rem;
  background: linear-gradient(135deg, #00ffa3 0%, #40c9ff 100%);
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px #00ffa344, 0 0 12px #40c9ff22;
  transform: translate3d(0,0,32px);
}
.glass3d-title {
  font-size: 1.35rem;
  font-weight: 900;
  margin-bottom: 0.7rem;
  background: linear-gradient(90deg, #00ffe7 0%, #6e7ff3 50%, #00bfff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-family: 'Plus Jakarta Sans', Inter, system-ui, sans-serif;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 12px #00ffa355, 0 0 8px #40c9ff22;
  transform: translate3d(0,0,32px);
}
.glass3d-desc {
  color: #7edfff;
  font-family: 'Fira Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-weight: 500;
  font-size: 1.08rem;
  margin-bottom: 1.7rem;
  transform: translate3d(0,0,24px);
}
.glass3d-socials {
  display: flex;
  gap: 0.95rem;
  margin-bottom: 1.4rem;
  transform: translate3d(0,0,24px);
}
.glass3d-social {
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 4px 16px #00ffa322;
  border: none;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s, background 0.4s;
  cursor: pointer;
  outline: none;
  font-size: 1.2rem;
  will-change: transform, box-shadow;
}
.glass3d-social:hover, .glass3d-social:focus {
  background: linear-gradient(135deg, #00ffa3 0%, #40c9ff 100%);
  transform: translate3d(0,0,32px) scale(1.18);
  box-shadow: 0 8px 32px #00ffa355, 0 0 0 4px #40c9ff44;
}
.glass3d-viewmore {
  background: linear-gradient(90deg, #00ffa3 0%, #40c9ff 100%);
  color: #fff;
  font-weight: 800;
  border: none;
  border-radius: 2em;
  padding: 0.9em 2.6em;
  font-size: 1.08rem;
  box-shadow: 0 4px 16px #00ffa322;
  transition: transform 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s;
  cursor: pointer;
  outline: none;
  will-change: transform, box-shadow;
}
.glass3d-viewmore:hover, .glass3d-viewmore:focus {
  transform: translate3d(0,0,40px) scale(1.13);
  box-shadow: 0 8px 32px #00ffa355, 0 0 0 4px #40c9ff44;
}
`}</style>
    </section>
  );
};

export default SmartContractsSection;