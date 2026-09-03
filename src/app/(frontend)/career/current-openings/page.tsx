import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CareerSubNav } from "@/components/ui/CareerSubNav";
import { OpeningsList } from "@/components/career/OpeningsList";
import { getGlobal, getCollection, mediaUrl } from "@/lib/payload-fetch";
import { images } from "@/lib/images";

export const dynamic = "force-dynamic";


export const metadata = {
  title: "Current Openings | Careers at OneSIS",
  description:
    "Explore current job openings at OneSIS across operations, technical, security, corporate, and EHS roles nationwide.",
};

export default async function OpeningsPage() {
  const [nav, footer, pageIntro, jobs] = await Promise.all([
    getGlobal("nav"),
    getGlobal("footer"),
    getGlobal("career-current-openings-page"),
    getCollection("job-openings", { where: { isActive: { equals: true } } }),
  ]);

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <PageHero
          eyebrow="Career"
          heading={
            <>
              Current <span className="accent">Opening</span>
            </>
          }
          description="Join a team of 3.5 lakh+ professionals across India. Browse open roles below, filter by department, and apply directly."
          backgroundImage={images.currentopeningsBanner}
        />

        <CareerSubNav />

        <section className="py-20">
          <Container>
            <Eyebrow>Open Roles</Eyebrow>

            <div className="mt-8">
              <OpeningsList jobs={jobs} />
            </div>
          </Container>
        </section>

        <section className="bg-[var(--color-cream)] py-16">
          <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-body)]">
              Don&apos;t see a role that fits? Send us your resume anyway —
              we&apos;re always growing.
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