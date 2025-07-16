import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { InfiniteSlider } from './InfiniteSlider';

const PartnersCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const partners = [
    {
      alt: 'Apple Music logo',
      src: 'https://motion-primitives.com/apple_music_logo.svg'
    },
    {
      alt: 'Chrome logo',
      src: 'https://motion-primitives.com/chrome_logo.svg'
    },
    {
      alt: 'Strava logo',
      src: 'https://motion-primitives.com/strava_logo.svg'
    },
    {
      alt: 'Nintendo logo',
      src: 'https://motion-primitives.com/nintendo_logo.svg'
    },
    {
      alt: 'Jquery logo',
      src: 'https://motion-primitives.com/jquery_logo.svg'
    },
    {
      alt: 'Prada logo',
      src: 'https://motion-primitives.com/prada_logo.svg'
    },
    {
      alt: 'Apple Music logo',
      src: 'https://motion-primitives.com/apple_music_logo.svg'
    },
    {
      alt: 'Chrome logo',
      src: 'https://motion-primitives.com/chrome_logo.svg'
    },
    {
      alt: 'Strava logo',
      src: 'https://motion-primitives.com/strava_logo.svg'
    },
    {
      alt: 'Nintendo logo',
      src: 'https://motion-primitives.com/nintendo_logo.svg'
    },
    {
      alt: 'Jquery logo',
      src: 'https://motion-primitives.com/jquery_logo.svg'
    },
    {
      alt: 'Prada logo',
      src: 'https://motion-primitives.com/prada_logo.svg'
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      gsap.to(carousel, {
        x: '-50%',
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    }, carouselRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <h3 className="text-center text-muted-foreground mb-12 text-lg font-medium">
          Trusted by leading wallets and platforms
        </h3>

        <InfiniteSlider gap={40} reverse duration={50} className="w-full h-full">
          {partners.map((partner, idx) => (
            <img
              key={idx}
              src={partner.src}
              alt={partner.alt}
              className="h-[120px] rounded-lg bg-secondary-foreground p-2"
            />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
};

export default PartnersCarousel;