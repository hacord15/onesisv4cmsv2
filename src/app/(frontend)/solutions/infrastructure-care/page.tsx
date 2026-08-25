import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { images } from "@/lib/images";
import { getGlobal } from "@/lib/payload-fetch";

const specializedServices = [
  {
    title: "CapEx & Civil Upgradation",
    image:images.infrastructureCareBanner,
    imageAlt: "Construction workers on a building site",
    items: [
      "Structural Strengthening",
      "Waterproofing",
      "Road & Pavement Works",
      "Boundary Walls",
      "Facade Repairs",
      "Landscape Development",
    ],
  },
  {
    title: "Retrofitting Services",
    image:images.infrastructureCareBanner,
    imageAlt: "HVAC technician inspecting mechanical equipment",
    items: [
      "MEP System Replacement",
      "BMS & EMS Integration",
      "Pipeline Upgrades",
      "RECD Installation",
      "Equipment Commissioning",
    ],
  },
  {
    title: "Smart Maintenance",
    image:images.infrastructureCareBanner,
    imageAlt: "Robotic arm performing maintenance",
    items: [
      "Robotic HVAC Duct Cleaning",
      "Thermography",
      "Ultrasonic Leak Detection",
      "Seepage Scanning",
      "Laser Rust Removal",
    ],
  },
  {
    title: "Project Management Consultancy (PMC)",
    image:images.infrastructureCareBanner,
    imageAlt: "Project manager reviewing blueprints with team",
    items: [
      "Project Planning",
      "Cost Estimation",
      "Construction Supervision",
      "QA/QC",
      "Risk Management",
      "Final Handover",
    ],
  },
  {
    title: "Design & Build",
    image:images.infrastructureCareBanner,
    imageAlt: "Architect working on building plans",
    items: [
      "Architectural Design",
      "Interior Design",
      "MEP Engineering",
      "Procurement",
      "Fit-Out Execution",
      "Post-Completion Support",
    ],
  },
  {
    title: "Renovation & Refurbishment",
    image:images.infrastructureCareBanner,
    imageAlt: "Modern renovated interior with new furniture",
    items: [
      "Lobby Modernization",
      "Clubhouse Renovation",
      "Commercial Interior Upgrades",
      "HVAC Ducting",
      "Epoxy Flooring",
      "Industrial Painting",
    ],
  },
];

export const metadata = {
  title: "Specialized Services | OneSIS Solutions",
  description:
    "Specialized engineering, refurbishment, and infrastructure services that extend beyond traditional facility management.",
};

export default async function SpecializedServicesPage() {
  const nav = await getGlobal("nav");
  const footer = await getGlobal("footer");

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <PageHero
          eyebrow="Solutions"
          heading={
            <>
              Beyond Maintenance —{" "}
              <span className="accent">Specialized Engineering Solutions</span>
            </>
          }
          description="OneSIS delivers specialized engineering, refurbishment, and infrastructure services that extend beyond traditional facility management. Our multidisciplinary teams support clients in upgrading, modernizing, and future-proofing their built assets through technically advanced solutions."
                    backgroundImage={images.infrastructureCareBanner}
          
        />

        <section className="py-20">
          <Container>
            <Eyebrow>Specialized Services</Eyebrow>
            <h2 className="mt-4 font-display text-[2rem] text-[var(--color-ink)] sm:text-[2.5rem]">
              Six Disciplines of{" "}
              <span className="accent">Technical Depth</span>
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {specializedServices.map((service) => (
                <div
                  key={service.title}
                  className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-[16px] font-semibold text-[var(--color-ink)]">
                      {service.title}
                    </h3>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[13px] text-[var(--color-body)]"
                        >
                          <span className="mt-0.5 text-[var(--color-brand)]">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[var(--color-cream)] py-16">
          <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-body)]">
              Talk to our team about your infrastructure care needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--color-brand)] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--color-brand-dark)]"
            >
              Talk to Our Team
            </Link>
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}