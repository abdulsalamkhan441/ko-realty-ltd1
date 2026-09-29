import FinalCTASection from "@/pages/landing/section/finalcta";
import FooterSection from "@/pages/footer";
import HeroSection from "@/pages/landing/section/herosection";
import HomeValuationSection from "@/pages/landing/section/homevaluation";
import PropertiesCarousel from "@/pages/landing/section/properties";
import ReviewsGlassSection from "@/pages/landing/section/reveiw";
import TeamSection from "@/pages/landing/section/whoarewe";
import WhyUsSection from "@/pages/landing/section/whychoseus";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <TeamSection />
      <PropertiesCarousel />
      <WhyUsSection />
      <HomeValuationSection />
      <ReviewsGlassSection />
      <FinalCTASection />
      <FooterSection />
    </>
  );
}