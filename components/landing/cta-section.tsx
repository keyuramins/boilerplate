"use client"
import React from 'react';
import { landingConfig } from '@/config/landing.config';
import { ArrowRight } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const config = landingConfig.sections.cta;
  const variant = config.variant || landingConfig.globalVariant;
  
  // Dynamic classes based on configuration
  const alignmentClass = {
    'left': 'items-start text-left',
    'center': 'items-center text-center',
    'right': 'items-end text-right'
  }[config.alignment];
  
  const backgroundClass = {
    'dark': 'bg-primary text-primary-foreground',
    'light': 'bg-muted/40',
    'color': 'bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-foreground',
    'image': 'bg-[url("https://images.pexels.com/photos/2387819/pexels-photo-2387819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")] bg-cover bg-center text-white'
  }[config.background];

  return (
    <section 
      className={`cta-section py-16 md:py-24 relative overflow-hidden
                 ${variant === 'default' ? 'bg-gradient-to-b from-background via-secondary to-background' :
                   variant === 'grid-dots' ? 'bg-grid-dots' :
                   variant === 'grid-matrix' ? 'bg-grid-matrix' :
                   variant === 'grid-bubbles' ? 'bg-grid-bubbles' :
                   variant === 'neon' ? 'bg-neon' :
                   variant === 'gradient' ? 'bg-gradient-animated' :
                   variant === 'waves' ? 'bg-waves' : ''}
                 ${backgroundClass}`}
    >
      {config.background === 'image' && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      )}
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className={`flex flex-col ${alignmentClass} max-w-[42rem] mx-auto`}>
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg opacity-90 text-muted-foreground">
            Start building your application today with our production-ready
            boilerplate.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center justify-center group
                              ${config.background === 'dark' ? 'bg-background text-foreground' : 'bg-primary text-primary-foreground'}`}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            {config.ctaButtons > 1 && (
              <button className={`px-6 py-3 rounded-lg font-medium border transition-all
                               ${config.background === 'dark' ? 'border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10' : 
                                 'border-input bg-background hover:bg-accent'}`}>
                Learn More
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
