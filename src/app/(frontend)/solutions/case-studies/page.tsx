import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Tag } from "@/components/ui/Tag";
import { getGlobal, getCollection, mediaUrl } from "@/lib/payload-fetch";

const CATEGORY_LABEL: Record<string, string> = {
  "civil-interior": "Civil & Interior",
  "property-management": "Property Management",
  "specialized-civil": "Specialized Civil",
  "ifm-technical": "IFM / Technical",
  pmc: "PMC",
};

export const metadata = {
  title: "Case Studies | OneSIS Solutions",
  description:
    "Featured project case studies across property management, design & build, specialized civil, IFM, and PMC engagements.",
};

type PageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function CaseStudiesPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const selectedCategory = params.category || "";

  const [nav, footer, allCaseStudies] = await Promise.all([
    getGlobal("nav"),
    getGlobal("footer"),
    getCollection("case-studies", {
      sort: "sortOrder",
    }),
  ]);

  const categories = Array.from(
    new Set(
      allCaseStudies
        .map((project) => project.category)
        .filter(
          (category: unknown): category is string =>
            typeof category === "string" && category.length > 0
        )
    )
  );

  const caseStudies = selectedCategory
    ? allCaseStudies.filter(
        (project) => project.category === selectedCategory
      )
    : allCaseStudies;

  return (
    <>
      <Header nav={nav} />

      <main className="bg-white">
        <PageHero
          eyebrow="Solutions"
          heading={<span className="accent">Case Studies</span>}
          description="Real engagements across property management, civil, interiors, and technical facility management — delivered end to end by OneSIS."
        />

        <section className="py-20">
          <Container>
            <div className="mb-10 flex flex-wrap items-center gap-3">
  <Link
    href="/solutions/case-studies"
    className={`rounded-md border px-7 py-3 text-[13px] font-semibold transition-all duration-200 ${
      !selectedCategory
        ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
        : "border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
    }`}
  >
    All
  </Link>

  {categories.map((category) => {
    const isActive = selectedCategory === category;

    return (
      <Link
        key={category}
        href={`/solutions/case-studies?category=${encodeURIComponent(
          category
        )}`}
        className={`rounded-md border px-7 py-3 text-[13px] font-semibold transition-all duration-200 ${
          isActive
            ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
            : "border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
        }`}
      >
        {CATEGORY_LABEL[category] ?? category}
      </Link>
    );
  })}
</div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((project) => (
                <Link
                  key={project.id}
                  href={`/solutions/case-studies/${project.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={mediaUrl(project.coverImage)}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />

                    {project.featured && (
                      <span className="absolute left-3 top-3 rounded-full bg-[var(--color-brand)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-white">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="p-7">
                    <div className="flex items-center gap-2">
                      {project.category && (
                        <Tag className="w-fit px-2.5 py-1 text-[10px]">
                          {CATEGORY_LABEL[project.category] ??
                            project.category}
                        </Tag>
                      )}

                      {project.location && (
                        <span className="text-[11px] text-[var(--color-muted)]">
                          {project.location}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 font-display text-xl text-[var(--color-ink)] group-hover:underline">
                      {project.title}
                    </h3>

                    {project.clientName && (
                      <p className="mt-1 text-[12.5px] font-medium text-[var(--color-brand)]">
                        {project.clientName}
                      </p>
                    )}

                    {project.shortDescription && (
                      <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                        {project.shortDescription}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {caseStudies.length === 0 && (
              <p className="py-20 text-center text-[14px] text-[var(--color-muted)]">
                No case studies found for this category.
              </p>
            )}
          </Container>
        </section>
      </main>

      <Footer footer={footer} />
    </>
  );
}