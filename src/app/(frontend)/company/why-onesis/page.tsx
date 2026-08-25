import Image from "next/image";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/lib/images";
import { getGlobal } from "@/lib/payload-fetch";

// Stock placeholders – replace with actual photography
const advantages = [
  {
    index: "01",
    title: "One-Stop Solution",
    image:images.onestopsolution,
    imageAlt: "Handshake between two business partners",
    description:
      "Dedicated FM and pledged SME support across all service lines under a single agreement, eliminating multi-vendor complexity.",
  },
  {
    index: "02",
    title: "SLA-Based Accountability",
    image:images.slabasedaccountability,
    imageAlt: "Document with checklist and pen",
    description:
      "Fixed service level agreements with defined KPIs ensure transparency and performance-driven billing.",
  },
  {
    index: "03",
    title: "3-Step Compliance Verification",
    image: images.StepComplianceVerification,
    imageAlt: "Compliance documents and magnifying glass",
    description:
      "Rigorous compliance checks across labour, statutory, and EHS norms save valuable time for HR and compliance teams.",
  },
  {
    index: "04",
    title: "Technology & Innovation",
    image:images.technologyfirstoperations,
    imageAlt: "Data dashboard on a laptop screen",
    description:
      "Proprietary platforms (One Point App, iOPS, OneSis FACTECH) deliver real-time dashboards, e-checklists, and predictive maintenance.",
  },
  {
    index: "05",
    title: "Group Companies Managed Services",
    image:images.groupcompaniesmanagementservices,
    imageAlt: "Team of workers in a facility",
    description:
      "Direct deployment from the SIS Group ecosystem — no subcontracting, ensuring consistent quality and accountability.",
  },
  {
    index: "06",
    title: "Multi-Level Governance",
    image:images.multilevelgovernance,
    imageAlt: "Business meeting with team reviewing documents",
    description: "A structured review cadence keeps every site accountable:",
    list: [
      "Site-level weekly reviews",
      "Monthly operational reviews",
      "Quarterly business reviews with leadership",
    ],
  },
  {
    index: "07",
    title: "Sustainability & EHS",
    image:images.sustainabilityandehs,
    imageAlt: "Green energy and sustainable environment",
    description:
      "Dedicated safety officers, biodegradable materials, energy audits, and ESG-aligned practices built into every contract.",
  },
  {
    index: "08",
    title: "Proven Track Record",
    image: images.proventrackrecord,
    imageAlt: "Bar chart showing growth",
    description: "Trusted by 289 of the Nifty 500 companies.",
    stats: [
      { value: "5%", label: "Savings Year-on-Year" },
      { value: "₹2.5 Cr", label: "Saved Over Contract Periods" },
    ],
  },
];

export const metadata = {
  title: "Why OneSIS | The OneSIS Advantage",
  description:
    "The OneSIS Advantage — one-stop solution, SLA-based accountability, technology-first operations, and a proven track record across India.",
};

export default async function WhyOneSISPage() {
  const nav = await getGlobal("nav");
  const footer = await getGlobal("footer");

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <PageHero
          eyebrow="Company"
          heading={
            <>
              The OneSIS <span className="accent">Advantage</span>
            </>
          }
          backgroundImage={images.whyOneSISBanner}
        />

        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((a) => (
                <div
                  key={a.index}
                  className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="px-6 py-6 sm:px-8">
                    <span className="font-display text-4xl text-[var(--color-muted-2)]">
                      {a.index}
                    </span>
                    <h3 className="mt-2 text-[15px] font-semibold text-[var(--color-ink)]">
                      {a.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                      {a.description}
                    </p>

                    {a.list && (
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {a.list.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[13px] text-[var(--color-body)]"
                          >
                            <span className="mt-2 h-px w-3 shrink-0 bg-[var(--color-brand)]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {a.stats && (
                      <div className="mt-5 flex flex-col gap-4">
                        {a.stats.map((s) => (
                          <div key={s.label}>
                            <div className="font-display text-2xl text-[var(--color-brand)]">
                              {s.value}
                            </div>
                            <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)]">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}