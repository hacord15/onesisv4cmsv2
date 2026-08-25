import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { getGlobal, getCollection, mediaUrl } from "@/lib/payload-fetch";

export const metadata = {
  title: "Board of Directors | OneSIS",
};

export default async function BoardPage() {
  const [nav, footer, pageIntro, boardMembers] = await Promise.all([
    getGlobal("nav"),
    getGlobal("footer"),
    getGlobal("company-board-page"),
    getCollection("board-members", { sort: "order" }),
  ]);

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <PageHero
          eyebrow={pageIntro.eyebrow}
          heading={<span className="accent">{pageIntro.heading}</span>}
          description={pageIntro.body ?? undefined}
          backgroundImage={mediaUrl(pageIntro.banner)}
        />

        <section className="py-20">
          <Container>
            <Eyebrow>Board of Directors</Eyebrow>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {boardMembers.map((member) => (
                <ProfileCard
                  key={member.id}
                  photo={mediaUrl(member.photo)}
                  name={member.name}
                  title={member.title}
                  bio={member.bio}
                />
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[var(--color-cream)] py-16">
          <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-body)]">
              For governance or investor queries, reach out to our team directly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--color-brand)] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--color-brand-dark)]"
            >
              Contact Us
            </Link>
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}