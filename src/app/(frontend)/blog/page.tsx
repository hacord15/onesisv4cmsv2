import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Tag } from "@/components/ui/Tag";
import { getGlobal, getCollection, mediaUrl } from "@/lib/payload-fetch";
import { Clock, User } from "lucide-react";
import { images } from "@/lib/images";

export const dynamic = "force-dynamic";


const CATEGORY_LABEL: Record<string, string> = {
  "facility-management": "Facility Management",
  "industry-insights": "Industry Insights",
  "company-news": "Company News",
  "case-studies": "Case Studies",
  compliance: "Compliance",
};

export const metadata = {
  title: "Blog | OneSIS",
  description: "Insights, updates, and perspectives from the OneSIS team on facility management and beyond.",
};

export default async function BlogPage() {
  const [nav, footer, posts] = await Promise.all([
    getGlobal("nav"),
    getGlobal("footer"),
    getCollection("blogs", {
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
    }),
  ]);

  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const restPosts = posts.filter((p) => p.id !== featuredPost?.id);

  const formatDate = (date?: string | null) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
      : null;

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <PageHero
          eyebrow="Insights"
          heading={<span className="accent">Blog</span>}
          description="Perspectives, updates, and practical insights from the OneSIS team."
           backgroundImage={images.caseStudies}
        />

        <section className="py-16">
          <Container>
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group mb-14 grid gap-8 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white transition hover:shadow-lg lg:grid-cols-2"
              >
                <div className="relative h-64 w-full overflow-hidden lg:h-full">
                  <Image
                    src={mediaUrl(featuredPost.featuredImage)}
                    alt={featuredPost.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <div className="flex items-center gap-2">
                    <Tag className="w-fit px-2.5 py-1 text-[10px]">
                      {CATEGORY_LABEL[featuredPost.category] ?? featuredPost.category}
                    </Tag>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--color-brand)]">
                      Featured
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl leading-tight text-[var(--color-ink)] group-hover:underline sm:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-body)]">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-[12px] text-[var(--color-muted)]">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" /> {featuredPost.author}
                    </span>
                    {featuredPost.readingTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {featuredPost.readingTime} min read
                      </span>
                    )}
                    {formatDate(featuredPost.publishedAt) && <span>{formatDate(featuredPost.publishedAt)}</span>}
                  </div>
                </div>
              </Link>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={mediaUrl(post.featuredImage)}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <Tag className="w-fit px-2.5 py-1 text-[10px]">
                      {CATEGORY_LABEL[post.category] ?? post.category}
                    </Tag>
                    <h3 className="mt-3 font-display text-lg leading-snug text-[var(--color-ink)] group-hover:underline">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-body)]">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-[11.5px] text-[var(--color-muted)]">
                      <span>{post.author}</span>
                      {post.readingTime && (
                        <>
                          <span>·</span>
                          <span>{post.readingTime} min read</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {posts.length === 0 && (
              <p className="py-20 text-center text-[14px] text-[var(--color-muted)]">
                Blog posts will appear here once published in the CMS.
              </p>
            )}
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}