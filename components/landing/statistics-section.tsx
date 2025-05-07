"use client"
import React from 'react';
import { landingConfig } from '@/config/landing.config';

export const StatisticsSection: React.FC = () => {
  const config = landingConfig.sections.statistics;
  const variant = config.variant || landingConfig.globalVariant;
  
  // Dynamic classes based on configuration
  const alignmentClass = {
    'left': 'items-start text-left',
    'center': 'items-center text-center',
    'right': 'items-end text-right'
  }[config.alignment];
  
  const layoutClass = {
    'row': 'flex flex-wrap justify-center',
    'grid': 'grid grid-cols-2 md:grid-cols-4 gap-6'
  }[config.layout];

  return (
    <section 
      className={`statistics-section py-16 md:py-24 relative overflow-hidden
                 ${variant === 'default' ? 'bg-primary/5' :
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
            By The Numbers
          </h2>
          <p className="text-muted-foreground mt-2 max-w-[42rem] mx-auto">
            Join thousands of developers who trust our platform
          </p>
        </div>

        <div className={layoutClass}>
          {config.stats.map((stat, i) => (
            <div
              key={i}
              className={`p-6 ${config.layout === 'row' ? 'm-4' : ''} bg-card rounded-lg border shadow-sm 
                        ${config.animate ? 'animate-stat hover:shadow-md transition-all' : ''}`}
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
