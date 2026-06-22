export const dynamic = "force-dynamic";

import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero-section";
import ReviewsMarquee from "@/components/sections/reviews-marquee";
import CtaStrip from "@/components/sections/cta-strip";
import BookingForm from "@/components/sections/booking-form";
import ServicesSection from "@/components/sections/services-section";
import PricingSection from "@/components/sections/pricing-section";
import WhyChooseUs from "@/components/sections/why-choose-us";
import ServiceAreas from "@/components/sections/service-areas";
import MovingTips from "@/components/sections/moving-tips";
import HowItWorks from "@/components/sections/how-it-works";
import GallerySection from "@/components/sections/gallery-section";
import FinalCta from "@/components/sections/final-cta";
import Footer from "@/components/sections/footer";
import ScrollReveal from "@/components/scroll-reveal";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero — no animation, visible immediately */}
        <HeroSection />

        <ScrollReveal>
          <ReviewsMarquee />
        </ScrollReveal>

        <ScrollReveal y={40}>
          <CtaStrip />
        </ScrollReveal>

        <ScrollReveal>
          <BookingForm />
        </ScrollReveal>

        <ScrollReveal>
          <ServicesSection />
        </ScrollReveal>

        <ScrollReveal>
          <PricingSection />
        </ScrollReveal>

        <ScrollReveal>
          <WhyChooseUs />
        </ScrollReveal>

        <ScrollReveal>
          <ServiceAreas />
        </ScrollReveal>

        <ScrollReveal>
          <MovingTips />
        </ScrollReveal>

        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>

        <ScrollReveal>
          <GallerySection />
        </ScrollReveal>

        <ScrollReveal>
          <FinalCta />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
