import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { getGlobal, getCollectionItem, mediaUrl } from "@/lib/payload-fetch";
import { User, Clock, ArrowLeft, ArrowRight } from "lucide-react";
export const dynamic = "force-dynamic";


const CATEGORY_LABEL: Record<string, string> = {
  "facility-management": "Facility Management",
  "industry-insights": "Industry Insights",
  "company-news": "Company News",
  "case-studies": "Case Studies",
  compliance: "Compliance",
};

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await getCollectionItem("blogs", { slug: { equals: slug } });
  if (!post) return { title: "Blog | OneSIS" };

  const ogImage = mediaUrl(post.seoImage) || mediaUrl(post.featuredImage);

  return {
    title: post.seoTitle || `${post.title} | OneSIS Blog`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;

  const [nav, footer, post] = await Promise.all([
    getGlobal("nav"),
    getGlobal("footer"),
    getCollectionItem("blogs", { slug: { equals: slug } }),
  ]);

  if (!post || post.status !== "published") notFound();

  const heroImage = mediaUrl(post.featuredImage);
  const relatedBlogs = (post.relatedBlogs ?? []).filter(
    (related): related is Exclude<typeof related, number> => typeof related !== "number"
  );

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Tag className="w-fit px-2.5 py-1 text-[11px] font-semibold uppercase">
              {CATEGORY_LABEL[post.category] ?? post.category}
            </Tag>
            <span className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
              <User className="h-3.5 w-3.5" /> {post.author}
            </span>
            {post.readingTime && (
              <span className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
                <Clock className="h-3.5 w-3.5" /> {post.readingTime} min read
              </span>
            )}
            {formattedDate && <span className="text-xs text-[var(--color-muted)]">{formattedDate}</span>}
          </div>

          <h1 className="mb-3 font-display text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">
            {post.title}
          </h1>

          <p className="mb-6 text-base leading-relaxed text-[var(--color-body)]">{post.excerpt}</p>

          {heroImage && (
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-sm">
              <Image src={heroImage} alt={post.title} fill priority className="object-cover" />
            </div>
          )}

          {post.content && (
            <div className="prose prose-neutral mb-10 max-w-none text-[15px] leading-relaxed text-[var(--color-body)]">
              <RichText data={post.content} />
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center gap-2">
              {post.tags.map((t, i) => (
                <Tag key={i} className="px-3 py-1 text-[11.5px]">
                  #{t.tag}
                </Tag>
              ))}
            </div>
          )}

          <div className="mb-10 border-y border-[var(--color-cream)] py-6">
            <p className="mb-3 text-sm font-semibold text-[var(--color-ink)]">Share this article</p>
            <ShareButtons title={post.title} />
          </div>

          {relatedBlogs.length > 0 && (
            <div className="border-t border-[var(--color-cream)] pt-8">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">
                  Related Articles
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand)] hover:underline"
                >
                  View all posts <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {relatedBlogs.map((related) => {
                  const thumb = mediaUrl(related.featuredImage);
                  return (
                    <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                      <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-cream)]">
                        {thumb && <Image src={thumb} alt={related.title} fill className="object-cover" />}
                      </div>
                      <p className="line-clamp-2 text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">
                        {related.title}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer footer={footer} />
    </>
  );
}