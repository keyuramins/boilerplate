"use client"
import React, { useState } from 'react';
import { landingConfig } from '@/config/landing.config';
import { Plus, Minus } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const config = landingConfig.sections.faq;
  const variant = config.variant || landingConfig.globalVariant;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  // Dynamic classes based on configuration
  const alignmentClass = {
    'left': 'items-start text-left',
    'center': 'items-center text-center',
    'right': 'items-end text-right'
  }[config.alignment];
  
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const columnsClass = config.layout === 'grid' && {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
  }[config.columns as 1 | 2];

  return (
    <section 
      className={`faq-section py-16 md:py-24 relative overflow-hidden
                 ${variant === 'default' ? 'bg-card' :
                   variant === 'grid-dots' ? 'bg-grid-dots' :
                   variant === 'grid-matrix' ? 'bg-grid-matrix' :
                   variant === 'grid-bubbles' ? 'bg-grid-bubbles' :
                   variant === 'neon' ? 'bg-neon' :
                   variant === 'gradient' ? 'bg-gradient-animated' :
                   variant === 'waves' ? 'bg-waves' : ''}`}
    >
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className={`flex flex-col ${alignmentClass} mb-10 md:mb-16`}>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-2 max-w-[42rem] mx-auto">
            Find answers to common questions about our platform
          </p>
        </div>

        <div className={`max-w-3xl mx-auto ${config.layout === 'grid' ? `grid ${columnsClass} gap-6` : 'space-y-4'}`}>
          {config.faqs.map((faq, i) => (
            <div
              key={i}
              className="border rounded-lg overflow-hidden bg-card"
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium"
                onClick={() => toggleAccordion(i)}
              >
                <span>{faq.question}</span>
                {openIndex === i ? (
                  <Minus className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                ) : (
                  <Plus className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 
                          ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="p-4 pt-0 text-muted-foreground">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
