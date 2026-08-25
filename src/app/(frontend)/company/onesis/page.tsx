import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Tag } from "@/components/ui/Tag";
import { images } from "@/lib/images";
import { getGlobal } from "@/lib/payload-fetch";

const paragraphs = [
  "Founded in 2023, OneSIS is a 100% wholly owned subsidiary of SIS Ltd, established to deliver comprehensive, technology-driven, and group-managed facility management solutions.",
  "OneSIS was conceptualized to bring together the full depth of the SIS Group's capabilities under a single umbrella, offering clients a truly integrated experience.",
  "From soft services to technical operations, from property management to specialized civil and MEP works, OneSIS provides one point of accountability for all facility needs.",
];

const highlights = [
  {
    index: "01",
    title: "100% SIS Group Entity",
    description: "Fully owned and backed by India's #1 Security & FM Group.",
  },
  {
    index: "02",
    title: "Founded 2023",
    description: "Built for the next generation of integrated facility services.",
  },
  {
    index: "03",
    title: "Technology-First",
    description: "Proprietary platforms power every engagement, end to end.",
    tags: ["One Point App", "iOPS", "OneSis FACTECH", "M-Trainer"],
  },
  {
    index: "04",
    title: "Solution Services",
    description: "Services delivered directly — not subcontracted — ensuring quality.",
  },
];

export const metadata = {
  title: "About OneSIS | OneSIS",
  description:
    "OneSIS — Reimagining Facility Management for Modern India. A 100% wholly owned subsidiary of SIS Ltd.",
};

export default async function AboutOneSISPage() {
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
              OneSIS — Reimagining{" "}
              <span className="accent">Facility Management</span> for Modern
              India
            </>
          }
          backgroundImage={images.aboutOneSIS}
        />

        <section className="py-20">
  <Container className="max-w-3xl">
    <div className="flex flex-col gap-3">
      {paragraphs.map((p) => (
        <p
          key={p}
          className="text-[15px] leading-relaxed text-[var(--color-body)]"
        >
          {p}
        </p>
      ))}
    </div>
  </Container>
</section>

        <section className="bg-[var(--color-cream)] py-20">
          <Container>
            <div className="grid grid-cols-1 divide-y divide-[var(--color-border)] border border-[var(--color-border)] bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {highlights.map((h) => (
                <div key={h.index} className="p-8">
                  <span className="font-display text-4xl text-[var(--color-muted-2)]">
                    {h.index}
                  </span>
                  <h3 className="mt-4 text-[16px] font-semibold text-[var(--color-ink)]">
                    {h.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                    {h.description}
                  </p>
                  {h.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {h.tags.map((t) => (
                        <Tag key={t} className="px-2.5 py-1 text-[10px]">
                          {t}
                        </Tag>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container className="flex flex-col items-start justify-between gap-6 border-t border-[var(--color-border)] pt-10 sm:flex-row sm:items-center">
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-body)]">
              Curious what sets OneSIS apart from a fragmented, multi-vendor approach?
            </p>
            <Link
              href="/company/why-onesis"
              className="inline-flex items-center gap-2 bg-[var(--color-brand)] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--color-brand-dark)]"
            >
              Why OneSIS
            </Link>
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}