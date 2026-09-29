import KeyHandoffCTA from "@/pages/about/finalcta";
import AboutHeroInteractive from "@/pages/about/herosection";
import SkillsAndImpact from "@/pages/about/stats";
import FooterSection from "@/pages/footer";
import Navbar from "@/pages/navbar";


export default function AboutMe() {
  return (
    <>
      <Navbar/>
      <AboutHeroInteractive/>
      <SkillsAndImpact/>
      <KeyHandoffCTA/>
      <FooterSection/>
    </>
  );
}