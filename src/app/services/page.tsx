import FooterSection from "@/pages/footer";
import Navbar from "@/pages/navbar";
import AboutSection from "@/pages/services/about";
import ServiceSection from "@/pages/services/cards";
import HomeValuationCTA from "@/pages/services/finalcta";
import ServicesHero from "@/pages/services/hero";
import WorkflowSection from "@/pages/services/workflow";


export default function Services() {
  return (
    <>
      <Navbar/>
      <ServicesHero/>
      <AboutSection/>
      <ServiceSection/>
      <WorkflowSection/>
      <HomeValuationCTA/>
      <FooterSection/>
    </>
  );
}