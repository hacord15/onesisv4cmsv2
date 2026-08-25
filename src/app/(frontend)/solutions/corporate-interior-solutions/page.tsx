import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { images } from "@/lib/images";
import { getGlobal } from "@/lib/payload-fetch";

const process = [
  { step: "01", title: "Concept design & space planning", img: images.conceptdesign },
  { step: "02", title: "Design & Build (D&B) execution", img: images.designBuild },
  { step: "03", title: "Furniture, fixtures & fit-out", img: images.furniture },
  { step: "04", title: "IT & AV infrastructure integration", img: images.itAV },
  { step: "05", title: "Civil upgrades & retrofitting", img: images.civilUpgrades },
  { step: "06", title: "Handover, snagging & FM transition", img: images.handover },
];

const categories = [
  {
    title: "Design & Build",
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
    title: "Retrofitting",
    items: [
      "MEP System Replacement",
      "BMS & EMS Integration",
      "Pipeline Upgrades",
      "RECD Installation",
      "Equipment Commissioning",
    ],
  },
  {
    title: "Project Management Consultancy (PMC)",
    items: [
      "Project Planning",
      "Cost Estimation",
      "Construction Supervision",
      "QA/QC",
      "Risk Management",
      "Final Handover",
    ],
  },
];

const stats = [
  { value: "320K+", label: "Permanent Staff" },
  { value: "630+", label: "Districts" },
  { value: "368", label: "Offices" },
];

export const metadata = {
  title: "Corporate Interior Solutions | OneSIS Solutions",
  description:
    "Design-led, project-managed fitout solutions from concept to handover for corporate spaces — Design & Build, Retrofitting, and PMC under one accountable partner.",
};

export default async function CorporateInteriorSolutionsPage() {
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
              Corporate <span className="accent">Interior Solutions</span>
            </>
          }
          description="Design-led, project-managed fitout solutions from concept to handover for corporate spaces."
          backgroundImage={images.interiorSolutionsBanner}
        />

        {/* Fitout process */}
        <section className="py-20">
          <Container>
            <Eyebrow>Our Fitout Process</Eyebrow>
            <h2 className="mt-4 font-display text-[2rem] text-[var(--color-ink)] sm:text-[2.5rem]">
              From Bare Shell to{" "}
              <span className="accent">Business Ready</span>
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {process.map((p, i) => (
                <div
                  key={p.step}
                  className="fitout-card group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Gradient overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    {/* Big step number */}
                    <span className="absolute bottom-4 left-4 font-display text-5xl font-semibold text-white drop-shadow-sm">
                      {p.step}
                    </span>

                    {/* Next-step arrow, hidden on last card */}
                    {i < process.length - 1 && (
                      <span className="absolute bottom-4 right-4 flex h-9 w-9 translate-x-1 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-[var(--color-brand)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    )}
                  </div>

                  {/* Text */}
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-2)]">
                      Step {p.step}
                    </span>
                    <h3 className="mt-2 text-[16px] font-semibold leading-snug text-[var(--color-ink)]">
                      {p.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </Container>

          <style>{`
            .fitout-card {
              opacity: 0;
              animation: fitoutFadeUp 0.6s ease-out forwards;
            }
            @keyframes fitoutFadeUp {
              from {
                opacity: 0;
                transform: translateY(16px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .fitout-card {
                animation: none;
                opacity: 1;
              }
            }
          `}</style>
        </section>

        {/* Service categories */}
        <section className="bg-[var(--color-cream)] py-20">
          <Container>
            <Eyebrow>Service Categories</Eyebrow>
            <h2 className="mt-4 font-display text-[2rem] text-[var(--color-ink)] sm:text-[2.5rem]">
              Three Disciplines,{" "}
              <span className="accent">One Delivery Team</span>
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <CategoryCard key={cat.title} title={cat.title} items={cat.items} />
              ))}
            </div>
          </Container>
        </section>

        {/* Stats */}
        {/* <section className="border-y border-[var(--color-border)] bg-white">
          <Container>
            <div className="grid grid-cols-3 divide-x divide-[var(--color-border)]">
              {stats.map((stat) => (
                <div key={stat.label} className="px-6 py-10 text-center sm:px-8">
                  <div className="font-display text-3xl text-[var(--color-brand)] sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section> */}

        {/* CTA */}
        <section className="bg-[var(--color-cream)] py-16">
          <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-body)]">
              Talk to our fitout team about your space.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--color-brand)] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--color-brand-dark)]"
              >
                Talk to Our Team
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}