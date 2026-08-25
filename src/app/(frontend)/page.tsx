import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { AnchorStrip } from "@/components/sections/AnchorStrip";
import { About } from "@/components/sections/About";
import { CoreVerticals } from "@/components/sections/CoreVerticals";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { RepairAndInterior } from "@/components/sections/RepairAndInterior";
import { OfficeInterior } from "@/components/sections/OfficeInterior";
import { FourOutcomes } from "@/components/sections/FourOutcomes";
import { Accountability } from "@/components/sections/Accountability";
import { WhereWeOperate } from "@/components/sections/WhereWeOperate";
import { TechPlatforms } from "@/components/sections/TechPlatforms";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { CorporateInteriorSolutions } from "@/components/sections/CorporateInteriorSolutions";
import { OutcomesAndOperations } from "@/components/sections/OutcomesAndOperations";
import { ComplianceRiskManagement } from "@/components/sections/ComplianceRiskManagement";
import { Testimonials } from "@/components/sections/Testimonials";
import { getGlobal } from "@/lib/payload-fetch";

export default async function Home() {
  // CMS-driven sections. Everything below comes from the Payload admin panel
  // (Nav / Footer / Home globals) instead of src/lib/content.ts.
  const [nav, footer, home] = await Promise.all([
    getGlobal("nav"),
    getGlobal("footer"),
    getGlobal("home"),
  ]);

  return (
    <>
      <Header nav={nav} />
      <main>
        <Hero hero={home.hero} />
        <AnchorStrip />
        <About about={home.about} />
        <CoreVerticals verticals={home.verticals} />
        {/* <StatsStrip /> */}
        <RepairAndInterior />
       
        <CorporateInteriorSolutions />
         <OfficeInterior/>
         {/* <OutcomesAndOperations /> */}
        <FourOutcomes />
                <ComplianceRiskManagement />

        <Accountability />
        <WhereWeOperate />
        <TechPlatforms />
        <Testimonials />
        <CTA />
      </main>
      <Footer footer={footer} />
    </>
  );
}
