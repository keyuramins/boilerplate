"use client"
import React from 'react';
import { landingConfig } from '@/config/landing.config';
import {getIconComponent} from '@/components/common/icons';

export const HeroSection: React.FC = () => {
  const config = landingConfig.sections.hero;
  const variant = config.variant || landingConfig.globalVariant;
  
  // Dynamic classes based on configuration
  const alignmentClass = {
    'left': 'items-start text-left',
    'center': 'items-center text-center',
    'right': 'items-end text-right'
  }[config.alignment];
  
  const imagePositionClass = {
    'left': 'flex-row-reverse',
    'right': 'flex-row',
    'top': 'flex-col-reverse',
    'bottom': 'flex-col'
  }[config.imagePosition];

  return (
    <section 
      className={`hero-section py-20 md:py-28 relative overflow-hidden
                  ${variant === 'default' ? 'bg-gradient-to-b from-background via-background to-secondary/20' :
                    variant === 'grid-dots' ? 'bg-grid-dots' :
                    variant === 'grid-matrix' ? 'bg-grid-matrix' :
                    variant === 'grid-bubbles' ? 'bg-grid-bubbles' :
                    variant === 'neon' ? 'bg-neon' :
                    variant === 'gradient' ? 'bg-gradient-animated' :
                    variant === 'waves' ? 'bg-waves' : ''}`}
    >
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className={`flex ${config.showImage ? imagePositionClass : 'flex-col'} gap-8 md:gap-12`}>
          <div className={`flex flex-col ${alignmentClass} space-y-6 md:space-y-8 flex-1`}>
            <div className="space-y-4">
              {config.content.badge && (
                <div className={`inline-block px-4 py-1.5 rounded-full 
                              ${config.content.badge.variant === 'primary' ? 'bg-primary/10 text-primary' :
                                config.content.badge.variant === 'secondary' ? 'bg-secondary/10 text-secondary' :
                                'bg-muted text-muted-foreground'} 
                              font-medium text-sm mb-4`}>
                  {config.content.badge.text}
                </div>
              )}
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
                {config.content.title}
              </h1>
              
              <p className="text-muted-foreground text-lg md:text-xl max-w-[42rem] mx-auto md:leading-relaxed">
                {config.content.description}
              </p>
            </div>
            
            <div className={`flex ${config.alignment === 'center' ? 'justify-center' : ''} flex-col sm:flex-row gap-4`}>
              {config.content.buttons.map((button, index) => {
                const Icon = button.icon ? getIconComponent(button.icon) : null;
                
                return (
                  <button
                    key={index}
                    className={`px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center justify-center group
                              ${button.variant === 'default' ? 'bg-primary text-primary-foreground hover:opacity-90' :
                                button.variant === 'outline' ? 'border border-input bg-background hover:bg-accent' :
                                'bg-secondary text-secondary-foreground hover:bg-secondary/90'}`}
                  >
                    {button.text}
                    {Icon && <Icon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                  </button>
                );
              })}
            </div>
          </div>
          
          {config.showImage && config.content.image && (
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-xl">
                <img 
                  src={config.content.image.src} 
                  alt={config.content.image.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/10 backdrop-blur-sm"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
