import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CareerSubNav } from "@/components/ui/CareerSubNav";
import { images } from "@/lib/images";
import { getGlobal } from "@/lib/payload-fetch";

// NOTE: Placeholder benefit categories for layout/demo purposes only.
// Replace with confirmed HR policy details (coverage amounts, leave days,
// eligibility) before launch.
const benefits = [
  {
    title: "Health & Insurance",
    description:
      "Group medical insurance and accident coverage, with regular health check-up camps at select sites.",
  },
  {
    title: "Financial Benefits",
    description:
      "Provident Fund and gratuity as per statutory norms, with Aadhaar-linked, on-time salary disbursement every cycle.",
  },
  {
    title: "Leave & Time Off",
    description:
      "Paid annual and sick leave, plus festival and national holidays observed across regions.",
  },
  {
    title: "Learning & Development",
    description:
      "Structured upskilling through the M-Trainer digital platform, with clear pathways for internal promotion.",
  },
  {
    title: "Safety & Wellbeing",
    description:
      "PPE provided for all field roles, mandatory safety training, and a dedicated employee helpdesk for support.",
  },
  {
    title: "Recognition & Rewards",
    description:
      "Structured recognition programs and service-milestone rewards for outstanding performance at every level.",
  },
];

export const metadata = {
  title: "Employee Benefits | Careers at OneSIS",
  description:
    "Health, financial, and wellbeing benefits for OneSIS employees — from insurance and provident fund to structured learning and recognition.",
};

export default async function BenefitsPage() {
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
              Employee <span className="accent">Benefits</span>
            </>
          }
          description="We invest in the people who keep every OneSIS site running — with benefits built around health, financial security, and growth."
          backgroundImage={images.employeeBenefitsBanner}
        />

        <CareerSubNav />

        <section className="py-20">
          <Container>
            <Eyebrow>What You Get</Eyebrow>
            <p className="mt-3 max-w-lg text-[13.5px] leading-relaxed text-[var(--color-muted)]">
              Categories shown below are placeholders for layout purposes and
              will be replaced with confirmed HR policy details ahead of
              launch.
            </p>

            <div className="mt-10 grid grid-cols-1 divide-y divide-[var(--color-border)] border-t border-[var(--color-border)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="px-6 py-10 sm:px-8">
                  <h3 className="text-[15px] font-semibold text-[var(--color-ink)]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[var(--color-cream)] py-16">
          <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-body)]">
              Have questions about benefits or eligibility? Reach out to our HR team.
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