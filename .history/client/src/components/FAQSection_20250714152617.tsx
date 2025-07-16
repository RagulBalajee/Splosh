import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(accordionRef.current,
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

  const faqs = [
    {
      question: "What is Blockchain?",
      answer: "Blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography. It provides transparency, security, and decentralization without the need for intermediaries."
    },
    {
      question: "What is SPLOSH?",
      answer: "SPLOSH is a 100% decentralized DAO-driven community platform built with blockchain and smart contracts. It focuses on identifying and supporting promising startups through decentralization, creating a sustainable ecosystem for innovation and community prosperity."
    },
    {
      question: "What is Decentralization?",
      answer: "Decentralization refers to the distribution of power, control, and decision-making away from a central authority. In blockchain and cryptocurrency contexts, it means that no single entity controls the network, making it more democratic, transparent, and resistant to censorship."
    },
    {
      question: "What is a Smart Contract?",
      answer: "A smart contract is a self-executing contract with the terms of the agreement directly written into code. It automatically executes when predetermined conditions are met, eliminating the need for intermediaries and ensuring trustless, transparent transactions."
    }
  ];

  return (
    <section ref={sectionRef} id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-jakarta text-foreground mb-6">
            Frequently Asked <span className="bg-gradient-primary bg-clip-text">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about SPLOSH and blockchain technology
          </p>
        </div>

        <div ref={accordionRef} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background border border-border/50 rounded-lg shadow-card hover:shadow-elegant transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:text-primary transition-colors">
                  <span className="text-lg font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;