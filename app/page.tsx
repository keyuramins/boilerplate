import { siteConfig } from "@/config/site";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <section className="max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {siteConfig.marketing.hero.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {siteConfig.marketing.hero.description}
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href={siteConfig.marketing.hero.cta.primary.href}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              {siteConfig.marketing.hero.cta.primary.text}
            </a>
            <a
              href={siteConfig.marketing.hero.cta.secondary.href}
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {siteConfig.marketing.hero.cta.secondary.text}
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {siteConfig.marketing.features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 rounded-lg border bg-card"
              >
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <span className="text-primary">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
