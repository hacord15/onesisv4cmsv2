import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";
import { getGlobal, getCollection, mediaUrl } from "@/lib/payload-fetch";
import type { NewsItem } from "@/payload-types";
import { images } from "@/lib/images";

export const dynamic = "force-dynamic";


export const metadata = {
  title: "News & Media | OneSIS",
  description:
    "Press releases, media coverage, industry insights, and awards & recognition from OneSIS.",
};

export default async function NewsPage() {
  const [nav, footer, pageIntro, newsItems] = await Promise.all([
    getGlobal("nav"),
    getGlobal("footer"),
    getGlobal("company-news-page"),
    getCollection("news-items", { sort: "-publishedDate" }),
  ]);

  const mediaCoverage = newsItems.filter((n) => n.category === "media-coverage");
  const industryInsights = newsItems.filter((n) => n.category === "industry-insights");
  const awards = newsItems.filter((n) => n.category === "awards");

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <PageHero
          eyebrow="Company"
          heading={
            <>
              News &<span className="accent">Media</span>
            </>
          }

          backgroundImage={images.newsBanner}
        />

        <section className="py-20">
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-12">
              <div>
                <Eyebrow>Media Coverage</Eyebrow>
                <p className="mt-4 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                  Curated third-party coverage including:
                </p>
                <ul className="mt-5 flex flex-col gap-5">
                  {mediaCoverage.length === 0 && (
                    <li className="text-[13.5px] text-[var(--color-muted)]">
                      No coverage published yet.
                    </li>
                  )}
                  {mediaCoverage.map((item) => (
                    <NewsRow key={item.id} item={item} />
                  ))}
                </ul>
              </div>

              <div>
                <Eyebrow>Industry Insights</Eyebrow>
                <p className="mt-4 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                  Thought leadership by OneSIS leadership covering:
                </p>
                <ul className="mt-5 flex flex-col gap-5">
                  {industryInsights.length === 0 && (
                    <li className="text-[13.5px] text-[var(--color-muted)]">
                      No insights published yet.
                    </li>
                  )}
                  {industryInsights.map((item) => (
                    <NewsRow key={item.id} item={item} />
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[var(--color-cream)] py-20">
          <Container>
            <Eyebrow>Awards &amp; Recognition</Eyebrow>
            <h2 className="mt-4 font-display text-[2rem] text-[var(--color-ink)] sm:text-[2.5rem]">
              Certified to a <span className="accent">Global Standard</span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {awards.map((a) => (
                <Link key={a.id} href={`/company/news/${a.slug}`}>
                  <Tag className="px-4 py-2 text-[12px] transition hover:border-[var(--color-ink)]">
                    {a.title}
                  </Tag>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}

function NewsRow({ item }: { item: NewsItem }) {
  const thumb = mediaUrl(item.image);
  return (
    <li>
      <Link href={`/company/news/${item.slug}`} className="group flex items-start gap-4">
        {thumb ? (
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-[var(--color-cream)]">
            <Image src={thumb} alt={item.title} fill className="object-cover" />
          </div>
        ) : (
          <span className="mt-2 h-px w-3 shrink-0 bg-[var(--color-brand)]" />
        )}
        <div>
          <div className="text-[13.5px] font-medium text-[var(--color-ink)] group-hover:underline">
            {item.title}
          </div>
          <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--color-body)]">
            {item.summary}
          </p>
        </div>
      </Link>
    </li>
  );
}