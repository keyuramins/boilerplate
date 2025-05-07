"use server"
import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { CtaSection } from '@/components/landing/cta-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { StatisticsSection } from '@/components/landing/statistics-section';
import { FaqSection } from '@/components/landing/faq-section';
import { landingConfig } from '@/config/landing.config';

function LandingPage() {
  // Function to render sections based on configuration
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return <HeroSection key="hero" />;
      case 'features':
        return <FeaturesSection key="features" />;
      case 'pricing':
        return <PricingSection key="pricing" />;
      case 'cta':
        return <CtaSection key="cta" />;
      case 'testimonials':
        return <TestimonialsSection key="testimonials" />;
      case 'statistics':
        return <StatisticsSection key="statistics" />;
      case 'faq':
        return <FaqSection key="faq" />;
      default:
        return null;
    }
  };

  return (
    <main className={`landing-page ${landingConfig.globalVariant}`}>
      {landingConfig.sectionOrder.map(sectionId => renderSection(sectionId))}
    </main>
  );
}

export default LandingPage;
