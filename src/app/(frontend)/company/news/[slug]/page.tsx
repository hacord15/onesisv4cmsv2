import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { ShareButtons } from "@/components/ui/ShareButtons";
import {
  CalendarIcon,
  ClockIcon,
  SourceIcon,
  PersonIcon,
  StarIcon,
  CheckIcon,
  TagIcon,
  ShareIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from "@/components/ui/icons";
import { getGlobal, getCollectionItem, mediaUrl, toEmbedUrl } from "@/lib/payload-fetch";

export const dynamic = "force-dynamic";


const CATEGORY_LABEL: Record<string, string> = {
  "media-coverage": "Media Coverage",
  "industry-insights": "Industry Insights",
  awards: "Awards",
};

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const item = await getCollectionItem("news-items", { slug: { equals: slug } });
  if (!item) return { title: "News | OneSIS" };

  const metaTitle = item.seo?.metaTitle || `${item.title} | OneSIS News`;
  const metaDescription = item.seo?.metaDescription || item.summary;
  const ogImage = mediaUrl(item.seo?.ogImage) || mediaUrl(item.image);

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

function getInitials(name?: string | null) {
  if (!name) return "";
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default async function NewsDetailPage({ params }: Params) {
  const { slug } = await params;

  const [nav, footer, item] = await Promise.all([
    getGlobal("nav"),
    getGlobal("footer"),
    // NOTE: relatedNews (and its nested image) needs to be populated — pass a
    // depth of at least 2 here if getCollectionItem doesn't already default to it.
    getCollectionItem("news-items", { slug: { equals: slug } }),
  ]);

  if (!item) notFound();

  const embedUrl = toEmbedUrl(item.videoUrl);
  const heroImage = mediaUrl(item.image);
  const authorImage = mediaUrl(item.author?.image);
  const sourceLogo = mediaUrl(item.sourceDetails?.logo);
const relatedNews = (item.relatedNews ?? []).filter(
  (related): related is Exclude<typeof related, number> => typeof related !== "number"
);
  const formattedDate = item.publishedDate
    ? new Date(item.publishedDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <section className="px-6 pb-20 pt-24 sm:px-10 lg:px-16">
          <Container className="max-w-6xl">
            <Link
              href="/company/news"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)] hover:underline"
            >
              ← Back to News
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-12">
              {/* Main column */}
              <div className="lg:col-span-8">
                <Tag className="px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-brand)]">
                  {CATEGORY_LABEL[item.category] ?? item.category}
                </Tag>

                <h1 className="mt-4 font-display text-[2rem] leading-tight text-[var(--color-ink)] sm:text-[2.75rem]">
                  {item.title}
                </h1>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 text-[12.5px] text-[var(--color-muted)]">
                    {formattedDate && (
                      <span className="flex items-center gap-1.5">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {formattedDate}
                      </span>
                    )}
                    {item.source && (
                      <span className="flex items-center gap-1.5">
                        <SourceIcon className="h-3.5 w-3.5" />
                        {item.source}
                      </span>
                    )}
                    {item.readingTime && (
                      <span className="flex items-center gap-1.5">
                        <ClockIcon className="h-3.5 w-3.5" />
                        {item.readingTime} min read
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--color-muted)]">
                    <span className="font-medium">Share:</span>
                    <ShareButtons title={item.title} />
                  </div>
                </div>

                {heroImage && (
                  <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl sm:h-96">
                    <Image src={heroImage} alt={item.title} fill className="object-cover" />
                  </div>
                )}

                {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-[var(--color-brand)]/15 bg-[var(--color-cream)] p-6">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                      <StarIcon className="h-4 w-4" />
                      Key Takeaways
                    </div>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {item.keyTakeaways.map((t, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-white">
                            <CheckIcon className="h-2.5 w-2.5" />
                          </span>
                          <span>{t.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 whitespace-pre-line text-[15px] leading-relaxed text-[var(--color-body)]">
                  {item.content || item.summary}
                </div>

                {item.quote?.text && (
                  <div className="relative mt-8 rounded-2xl border border-[var(--color-ink)]/10 px-8 py-8 text-center">
                    <span className="absolute left-5 top-4 font-display text-[2.5rem] leading-none text-[var(--color-brand)]/30">
                      &ldquo;
                    </span>
                    <p className="font-display text-[1.35rem] italic leading-snug text-[var(--color-ink)]">
                      {item.quote.text}
                    </p>
                    <span className="absolute bottom-2 right-5 font-display text-[2.5rem] leading-none text-[var(--color-brand)]/30">
                      &rdquo;
                    </span>
                    {item.quote.attribution && (
                      <div className="mt-3 text-[12.5px] font-semibold text-[var(--color-brand)]">
                        — {item.quote.attribution}
                      </div>
                    )}
                  </div>
                )}

                {embedUrl && (
                  <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-black">
                    <iframe
                      src={embedUrl}
                      title={item.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Tag key={tag} className="px-3 py-1 text-[11.5px]">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                )}

                {item.externalLink && (
                  <a href={item.externalLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block">
                    <Tag className="px-4 py-2 text-[12px] transition hover:border-[var(--color-ink)]">
                      Read full article ↗
                    </Tag>
                  </a>
                )}

                {relatedNews.length > 0 && (
                  <div className="mt-14 border-t border-[var(--color-cream)] pt-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                        Related News
                      </span>
                      <Link
                        href="/company/news"
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--color-brand)] hover:underline"
                      >
                        View all news <ArrowRightIcon className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                    <div className="mt-6 grid gap-6 sm:grid-cols-3">
                      {relatedNews.map((related) => {
                        const thumb = mediaUrl(related.image);
                        return (
                          <Link key={related.id} href={`/company/news/${related.slug}`} className="group flex flex-col gap-3">
                            <div className="relative h-28 w-full overflow-hidden rounded-xl bg-[var(--color-cream)]">
                              {thumb ? <Image src={thumb} alt={related.title} fill className="object-cover" /> : null}
                              <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.05em] text-[var(--color-brand)]">
                                {CATEGORY_LABEL[related.category] ?? related.category}
                              </span>
                            </div>
                            <div>
                              <div className="text-[13px] font-medium leading-snug text-[var(--color-ink)] group-hover:underline">
                                {related.title}
                              </div>
                              {related.publishedDate && (
                                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--color-muted)]">
                                  <CalendarIcon className="h-3 w-3" />
                                  {new Date(related.publishedDate).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </div>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
                {(item.source || item.sourceDetails?.description) && (
                  <div className="rounded-2xl border border-[var(--color-ink)]/10 p-5">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                      <SourceIcon className="h-4 w-4" />
                      About the Source
                    </div>
                    <div className="mt-4 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[var(--color-cream)] text-[11px] font-bold text-[var(--color-brand)]">
                        {sourceLogo ? (
                          <Image src={sourceLogo} alt={item.source ?? ""} width={40} height={40} className="h-full w-full object-cover" />
                        ) : (
                          getInitials(item.source)
                        )}
                      </div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-[var(--color-ink)]">{item.source}</div>
                        {item.sourceDetails?.description && (
                          <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-muted)]">
                            {item.sourceDetails.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {item.sourceDetails?.website && (
                      <a
                        href={item.sourceDetails.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--color-brand)] hover:underline"
                      >
                        Visit Website <ExternalLinkIcon className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                )}

                {item.author?.name && (
                  <div className="rounded-2xl border border-[var(--color-ink)]/10 p-5">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                      <PersonIcon className="h-4 w-4" />
                      Author
                    </div>
                    <div className="mt-4 flex items-start gap-3">
                      {authorImage ? (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[var(--color-cream)]">
                          <Image src={authorImage} alt={item.author.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream)] text-[11px] font-bold text-[var(--color-brand)]">
                          {getInitials(item.author.name)}
                        </div>
                      )}
                      <div>
                        <div className="text-[13.5px] font-semibold text-[var(--color-ink)]">{item.author.name}</div>
                        {item.author.role && (
                          <div className="text-[12px] text-[var(--color-muted)]">{item.author.role}</div>
                        )}
                        {item.author.linkedin && (
                          <a
                            href={item.author.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-ink)]/15 text-[10px] font-semibold text-[var(--color-ink)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                          >
                            in
                          </a>
                        )}
                      </div>
                    </div>
                    {item.author.bio && (
                      <p className="mt-3 text-[12px] leading-relaxed text-[var(--color-muted)]">{item.author.bio}</p>
                    )}
                  </div>
                )}

                {/* {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                  <div className="rounded-2xl border border-[var(--color-ink)]/10 p-5">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                      <StarIcon className="h-4 w-4" />
                      Key Takeaways
                    </div>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {item.keyTakeaways.map((t, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-[var(--color-body)]">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-white">
                            <CheckIcon className="h-2.5 w-2.5" />
                          </span>
                          <span>{t.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}

                {item.tags && item.tags.length > 0 && (
                  <div className="rounded-2xl border border-[var(--color-ink)]/10 p-5">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                      <TagIcon className="h-4 w-4" />
                      Tags
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Tag key={tag} className="px-3 py-1 text-[11px]">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-[var(--color-ink)]/10 p-5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                    <ShareIcon className="h-4 w-4" />
                    Share this Article
                  </div>
                  <div className="mt-4">
                    <ShareButtons title={item.title} />
                  </div>
                </div>

                <div className="rounded-2xl bg-[var(--color-ink)] p-6 text-white">
                  <h3 className="font-display text-[1.15rem] leading-snug">Ready to transform your business?</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-white/70">
                    Let&apos;s discuss how OneSIS can help you build scalable digital solutions for your organization.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12.5px] font-semibold text-[var(--color-ink)] transition hover:bg-white/90"
                  >
                    Talk to Us <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}