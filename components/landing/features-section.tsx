"use client"
import React from 'react';
import { landingConfig } from '@/config/landing.config';
import * as Lucide from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const config = landingConfig.sections.features;
  const variant = config.variant || landingConfig.globalVariant;
  
  // Get the right icon component from lucide-react
  const getIcon = (iconName: string) => {
    const capitalizedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const IconComponent = (Lucide[capitalizedIconName as keyof typeof Lucide] || Lucide.Circle) as React.ComponentType<{ className?: string }>;
    return IconComponent;
  };
  
  // Dynamic classes based on configuration
  const alignmentClass = {
    'left': 'items-start text-left',
    'center': 'items-center text-center',
    'right': 'items-end text-right'
  }[config.alignment];
  
  const columnsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[config.columns as 1 | 2 | 3 | 4];
  
  const layoutClass = {
    'grid': `grid ${columnsClass} gap-8`,
    'list': 'flex flex-col gap-6',
    'alternating': 'flex flex-col gap-16'
  }[config.layout];

  return (
    <section 
      className={`features-section py-16 md:py-24 relative overflow-hidden
                  ${variant === 'default' ? 'bg-background' :
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
            Key Features
          </h2>
          <p className="text-muted-foreground mt-2 max-w-[42rem] mx-auto">
            Everything you need to build your next SaaS application
          </p>
        </div>

        <div className={layoutClass}>
          {config.features.map((feature, i) => {
            const Icon = getIcon(feature.icon);
            
            return (
              <div
                key={i}
                className={`bg-card rounded-lg border p-6 shadow-sm transition-all hover:shadow-md overflow-hidden relative 
                           ${config.layout === 'alternating' ? 'flex md:items-center' + (i % 2 === 0 ? ' md:flex-row' : ' md:flex-row-reverse') : ''}`}
              >
                {config.layout === 'alternating' ? (
                  <>
                    <div className={`flex flex-col space-y-4 ${config.alignment} ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} flex-1`}>
                      <h3 className="font-bold text-xl">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                    {config.showIcons && (
                      <div className="flex items-center justify-center mt-6 md:mt-0 flex-shrink-0">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                          <Icon className="w-12 h-12" />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className={`flex flex-col ${config.iconPosition === 'left' ? 'md:flex-row md:items-start gap-4' : ''}`}>
                    {config.showIcons && (
                      <div className={`${config.iconPosition === 'top' ? 'mb-4' : 'flex-shrink-0'}`}>
                        <div className="p-3 rounded-full bg-primary/10 text-primary inline-flex">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col space-y-2">
                      <h3 className="font-bold text-xl">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
