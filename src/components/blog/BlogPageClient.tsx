"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { User, Clock } from "lucide-react";
import { mediaUrl } from "@/lib/payload-fetch";
import type { Blog } from "@/payload-types";

const CATEGORY_LABEL: Record<string, string> = {
  "facility-management": "Facility Management",
  "industry-insights": "Industry Insights",
  "company-news": "Company News",
  "case-studies": "Case Studies",
  compliance: "Compliance",
};

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  "facility-management": { bg: "#fff4e6", text: "#9a3412" },
  "industry-insights": { bg: "#e0f2fe", text: "#0369a1" },
  "company-news": { bg: "#f0fdf4", text: "#15803d" },
  "case-studies": { bg: "#fdf4ff", text: "#7e22ce" },
  compliance: { bg: "#fff1f2", text: "#be123c" },
};

function categoryStyle(category: string) {
  return CATEGORY_STYLES[category] ?? { bg: "var(--color-cream)", text: "var(--color-muted)" };
}

function timeAgo(dateStr?: string | null) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "Today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function CategoryBadge({ category }: { category: string }) {
  const s = categoryStyle(category);
  return (
    <span
      className="rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ background: s.bg, color: s.text }}
    >
      {CATEGORY_LABEL[category] ?? category}
    </span>
  );
}

function FeaturedHero({ post }: { post: Blog }) {
  const image = mediaUrl(post.featuredImage);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block h-[340px] overflow-hidden rounded-2xl shadow-sm md:h-[420px]"
    >
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

      <span
        className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white"
        style={{ background: "var(--color-brand)" }}
      >
        FEATURED
      </span>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <CategoryBadge category={post.category} />
        <h2 className="mb-2 mt-2 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-white/80 md:text-3xl">
          {post.title}
        </h2>
        <div className="flex items-center gap-3 text-xs text-white/70">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" /> {post.author}
          </span>
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readingTime} min read
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function TrendingCard({ post }: { post: Blog }) {
  const image = mediaUrl(post.featuredImage);
  return (
    <Link href={`/blog/${post.slug}`} className="group relative block h-[120px] flex-shrink-0 overflow-hidden rounded-xl">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <CategoryBadge category={post.category} />
        <p className="mt-1 line-clamp-2 text-xs font-semibold leading-tight text-white transition-colors group-hover:text-white/80">
          {post.title}
        </p>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-white/60">
          <span className="flex items-center gap-0.5">
            <User className="h-3 w-3" /> {post.author}
          </span>
          {post.readingTime && (
            <span className="flex items-center gap-0.5">
              <Clock className="h-3 w-3" /> {post.readingTime} min read
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ post }: { post: Blog }) {
  const image = mediaUrl(post.featuredImage);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-shadow hover:shadow-md"
    >
      <div className="aspect-[16/10] overflow-hidden">
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <CategoryBadge category={post.category} />
        <h3 className="mb-1.5 mt-2 line-clamp-2 text-base font-bold leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)]">
          {post.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--color-body)]">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 border-t border-[var(--color-cream)] pt-4 text-xs text-[var(--color-muted)]">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" /> {post.author}
          </span>
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readingTime} min read
            </span>
          )}
          <span className="ml-auto">{timeAgo(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}

export function BlogPageClient({ posts }: { posts: Blog[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category))).sort()],
    [posts]
  );

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const trending = posts.filter((p) => p.slug !== featured?.slug).slice(0, 3);

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && p.slug !== featured?.slug;
  });

  if (posts.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-white">
        <p className="text-sm text-[var(--color-muted)]">No articles published yet. Check back soon!</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Top bar: category pills + search */}
      <div className="sticky top-0 z-40 border-b border-white/5 bg-[var(--color-ink)]">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4">
          <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                style={
                  activeCategory === cat
                    ? { background: "var(--color-brand)", color: "#fff" }
                    : { color: "rgba(255,255,255,0.5)" }
                }
              >
                {cat === "All" ? "All" : CATEGORY_LABEL[cat] ?? cat}
              </button>
            ))}
          </div>

          <div className="relative ml-4 flex-shrink-0">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 rounded-full border border-white/10 bg-white/10 py-1.5 pl-9 pr-4 text-sm text-white placeholder-white/40 transition-all focus:w-52 focus:border-[var(--color-brand)] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Hero + Trending */}
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {featured && (
            <div className="lg:col-span-3">
              <FeaturedHero post={featured} />
            </div>
          )}
          {trending.length > 0 && (
            <div className="lg:col-span-2">
              <h3 className="mb-4 text-base font-bold text-[var(--color-ink)]">Trending</h3>
              <div className="flex flex-col gap-3">
                {trending.map((post) => (
                  <TrendingCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Latest articles */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">
              {activeCategory === "All" ? "Latest Articles" : CATEGORY_LABEL[activeCategory] ?? activeCategory}
            </h2>
            <div className="h-px flex-1 bg-[var(--color-cream)]" />
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-[var(--color-muted)]">
              <p className="text-lg font-medium">No articles found</p>
              <p className="mt-1 text-sm">Try a different category or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}