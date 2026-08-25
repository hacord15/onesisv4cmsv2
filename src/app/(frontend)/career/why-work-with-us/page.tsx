import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CareerSubNav } from "@/components/ui/CareerSubNav";
import { images } from "@/lib/images";
import { getGlobal } from "@/lib/payload-fetch";

const perks = [
  {
    title: "Rewards & Recognition",
    description: "Structured programs recognizing outstanding performance at every level.",
  },
  {
    title: "Employee Helpdesk",
    description: "Dedicated support for grievance redressal, salary queries, and HR support.",
  },
  {
    title: "Best Compensation in the Industry",
    description: "100% statutory compliance with Aadhaar-linked salary disbursement.",
  },
  {
    title: "Career Development",
    description: "Skilling, upskilling programs, and M-Trainer digital learning platform.",
  },
  {
    title: "Equal Opportunity",
    description: "Zero discrimination on age, gender, ethnicity, disability, or sexuality.",
  },
  {
    title: "Townhalls & Events",
    description: "Regular engagement through theme-based events and team celebrations.",
  },
];

export const metadata = {
  title: "Careers | Join the OneSIS Team",
  description:
    "Build your career with India's fastest-growing facility management company. Rewards, career development, and a culture built on safety, dignity, and equal opportunity.",
};

export default async function CareerPage() {
  const nav = await getGlobal("nav");
  const footer = await getGlobal("footer");

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <PageHero
          eyebrow="Career"
          heading={
            <>
              Build Your Career with India&apos;s{" "}
              <span className="accent">Fastest-Growing Service Company</span>
            </>
          }
          description="At OneSIS, we believe our people are our most important asset. As part of the SIS Group — India's largest security and facility management enterprise with 3.5 lakh employees — we offer career opportunities, continuous learning, and a culture built on safety, dignity, and equal opportunity."
                   backgroundImage={images.whyworkwithusBanner}

        />

        <CareerSubNav />

        {/* Why work with us */}
        <section className="py-20">
          <Container>
            <Eyebrow>Why Work With Us</Eyebrow>
            <h2 className="mt-4 font-display text-[2rem] text-[var(--color-ink)] sm:text-[2.5rem]">
              A Team Built on{" "}
              <span className="accent">Safety &amp; Dignity</span>
            </h2>

            <div className="mt-10 grid grid-cols-1 divide-y divide-[var(--color-border)] border-t border-[var(--color-border)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
              {perks.map((perk) => (
                <div key={perk.title} className="px-6 py-10 sm:px-8">
                  <h3 className="text-[15px] font-semibold text-[var(--color-ink)]">
                    {perk.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-[var(--color-cream)] py-16">
          <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-body)]">
              Ready to grow your career with 3.5 lakh+ colleagues across India?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--color-brand)] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--color-brand-dark)]"
            >
              Get in Touch
            </Link>
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}