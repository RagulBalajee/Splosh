import { useEffect, useRef } from 'react';
import tokenpocketLogo from '@/assets/tokenpocket.png';
import safepalLogo from '@/assets/safepal.png';
import bscscanLogo from '@/assets/bscscan.jpg';

const partners = [
  { alt: 'Token Pocket logo', src: tokenpocketLogo, name: 'Token Pocket' },
  { alt: 'SafePal logo', src: safepalLogo, name: 'SafePal' },
  { alt: 'BscScan logo', src: bscscanLogo, name: 'BscScan Product' },
  { alt: 'MetaMask logo', src: 'https://seeklogo.com/images/M/metamask-logo-09EDE53DBD-seeklogo.com.png', name: 'METAMASK' },
];

const PartnersCarousel = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let animationFrame: number;
    let start: number | null = null;
    const scrollWidth = slider.scrollWidth / 2;
    const speed = 0.5; // px per frame

    function animate(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      slider.scrollLeft = (slider.scrollLeft + speed) % scrollWidth;
      animationFrame = requestAnimationFrame(animate);
    }
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <h3 className="text-center text-muted-foreground mb-12 text-lg font-medium">
          Trusted by leading wallets and platforms
        </h3>
        <div
          ref={sliderRef}
          className="flex flex-row gap-12 md:gap-24 overflow-x-hidden whitespace-nowrap relative"
          style={{ width: '100%', maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
        >
          {[...partners, ...partners].map((partner, idx) => (
            <div key={idx} className="inline-flex flex-col items-center mx-6">
              <img
                src={partner.src}
                alt={partner.alt}
                className="h-[80px] md:h-[100px] lg:h-[120px] rounded-lg bg-secondary-foreground p-2 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:ring-4 hover:ring-primary/30"
                style={{ objectFit: 'contain', background: 'white' }}
                draggable={false}
              />
              <span
                className="mt-2 text-xl md:text-2xl font-extrabold text-center drop-shadow-sm tracking-wide uppercase"
                style={{
                  fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
                  color: '#b0b0b0',
                  letterSpacing: '0.05em',
                }}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;