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

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ReviewsMarquee />
        <CtaStrip />
        <BookingForm />
        <ServicesSection />
        <PricingSection />
        <WhyChooseUs />
        <ServiceAreas />
        <MovingTips />
        <HowItWorks />
        <GallerySection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
