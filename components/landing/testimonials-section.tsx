"use client"
import React, { useState, useEffect } from 'react';
import { landingConfig } from '@/config/landing.config';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const config = landingConfig.sections.testimonials;
  const variant = config.variant || landingConfig.globalVariant;
  
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = config.testimonials;
  
  // Dynamic classes based on configuration
  const alignmentClass = {
    'left': 'items-start text-left',
    'center': 'items-center text-center',
    'right': 'items-end text-right'
  }[config.alignment];
  
  // Auto-rotate carousel if configured
  useEffect(() => {
    if (config.layout === 'carousel' && config.autoplay) {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [config.autoplay, config.layout, testimonials.length]);
  
  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      className={`testimonials-section py-16 md:py-24 relative overflow-hidden
                 ${variant === 'default' ? 'bg-muted/30' :
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
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-2 max-w-[42rem] mx-auto">
            Trusted by developers worldwide
          </p>
        </div>

        {config.layout === 'carousel' ? (
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="bg-card rounded-xl p-8 shadow-md border">
                      <Quote className="h-8 w-8 text-primary/40 mb-4" />
                      <p className="text-lg mb-6 italic">{testimonial.content}</p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors
                             ${activeIndex === i ? 'bg-primary' : 'bg-primary/20'}`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
            
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 h-10 w-10 rounded-full bg-background border shadow-md flex items-center justify-center text-foreground hover:bg-accent transition-colors z-10"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 h-10 w-10 rounded-full bg-background border shadow-md flex items-center justify-center text-foreground hover:bg-accent transition-colors z-10"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div 
                key={i} 
                className={`bg-card rounded-xl p-6 shadow-sm border ${config.layout === 'masonry' && i % 3 === 1 ? 'md:mt-12' : ''}`}
              >
                <Quote className="h-6 w-6 text-primary/40 mb-4" />
                <p className="mb-4">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
