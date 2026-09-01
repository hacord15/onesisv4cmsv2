import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { getGlobal, getCollectionItem, mediaUrl } from "@/lib/payload-fetch";
import { MapPin, Building2, Ruler, Calendar, CheckCircle2, ArrowLeft } from "lucide-react";
import ProjectGallery from "@/components/ui/ProjectGallery";

const CATEGORY_LABEL: Record<string, string> = {
  "civil-interior": "Civil & Interior",
  "property-management": "Property Management",
  "specialized-civil": "Specialized Civil",
  "ifm-technical": "IFM / Technical",
  pmc: "PMC",
};

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const item = await getCollectionItem("case-studies", { slug: { equals: slug } });
  if (!item) return { title: "Case Study | OneSIS" };

  return {
    title: item.metaTitle || `${item.title} | OneSIS Case Studies`,
    description: item.metaDescription || item.shortDescription || undefined,
  };
}

export default async function CaseStudyDetailPage({ params }: Params) {
  const { slug } = await params;

  const [nav, footer, item] = await Promise.all([
    getGlobal("nav"),
    getGlobal("footer"),
    getCollectionItem("case-studies", { slug: { equals: slug } }),
  ]);

  if (!item) notFound();

  const coverImage = mediaUrl(item.coverImage);
  const gallery = (item.projectImages ?? [])
    .map((entry) => mediaUrl(entry.image))
    .filter(Boolean);

  const facts = [
    item.clientName && { icon: Building2, label: "Client", value: item.clientName },
    item.location && { icon: MapPin, label: "Location", value: item.location },
    item.projectType && { icon: Building2, label: "Project Type", value: item.projectType },
    item.areaSize && { icon: Ruler, label: "Area / Size", value: item.areaSize },
    item.completionYear && { icon: Calendar, label: "Completion Year", value: String(item.completionYear) },
  ].filter((f): f is { icon: typeof MapPin; label: string; value: string } => Boolean(f));

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="relative h-[46vh] min-h-[320px] w-full sm:h-[54vh]">
            {coverImage && (
              <Image src={coverImage} alt={item.title} fill priority className="object-cover" />
            )}
            <div className="absolute inset-0 bg-[rgba(16,22,29,0.55)]" />
            <Container className="absolute inset-0 z-10 flex flex-col justify-end px-0 pb-10">
              <Link
                href="/solutions/case-studies"
                className="inline-flex w-fit items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white/80 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Case Studies
              </Link>
              <div className="mt-4 flex items-center gap-2">
                {item.category && (
                  <Tag className="w-fit border-white/30 bg-white/10 px-3 py-1 text-[11px] text-white">
                    {CATEGORY_LABEL[item.category] ?? item.category}
                  </Tag>
                )}
              </div>
              <h1 className="mt-4 max-w-3xl font-display text-[2.1rem] leading-[1.15] text-white sm:text-[2.75rem]">
                {item.title}
              </h1>
              {item.clientName && (
                <p className="mt-3 text-[14.5px] text-white/80">
                  {item.clientName}
                  {item.location ? `, ${item.location}` : ""}
                </p>
              )}
            </Container>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-10 lg:px-16">
          <Container className="max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-12">
              {/* Main column */}
              <div className="lg:col-span-8">
                {item.projectOverview && (
                  <div>
                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                      Project Overview
                    </h2>
                    <div className="prose prose-neutral mt-3 max-w-none text-[15px] leading-relaxed text-[var(--color-body)]">
                      <RichText data={item.projectOverview} />
                    </div>
                  </div>
                )}

                {item.solution && (
                  <div className="mt-10">
                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                      The Solution
                    </h2>

                    <div className="prose prose-neutral mt-3 max-w-none text-[15px] leading-relaxed text-[var(--color-body)] prose-ul:list-disc prose-ul:pl-6 prose-li:my-1">
                      <RichText data={item.solution} />
                    </div>
                  </div>
                )}

                {item.services && item.services.length > 0 && (
                  <div className="mt-10">
                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                      Services
                    </h2>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {item.services.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-[var(--color-body)]"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" />
                          <span>{s.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {gallery.length > 0 && (
                  <div className="mt-10">
                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                      Project Gallery
                    </h2>

                    <ProjectGallery
                      images={gallery}
                      title={item.title}
                    />
                  </div>
                )}

                {item.additionalDetails && (
                  <div className="mt-10">
                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                      Additional Details
                    </h2>
                    <div className="prose prose-neutral mt-3 max-w-none text-[15px] leading-relaxed text-[var(--color-body)]">
                      <RichText data={item.additionalDetails} />
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
                {facts.length > 0 && (
                  <div className="rounded-2xl border border-[var(--color-ink)]/10 p-6">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                      Project Details
                    </h3>
                    <dl className="mt-4 flex flex-col gap-4">
                      {facts.map((fact) => (
                        <div key={fact.label} className="flex items-start gap-3">
                          <fact.icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" />
                          <div>
                            <dt className="text-[11px] uppercase tracking-[0.05em] text-[var(--color-muted)]">
                              {fact.label}
                            </dt>
                            <dd className="mt-0.5 text-[13.5px] font-medium text-[var(--color-ink)]">
                              {fact.value}
                            </dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {item.keyFigures && item.keyFigures.length > 0 && (
                  <div className="rounded-2xl bg-[var(--color-cream)] p-6">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                      Key Figures
                    </h3>
                    <div className="mt-4 flex flex-col gap-4">
                      {item.keyFigures.map((fig, i) => (
                        <div key={i}>
                          <div className="font-display text-[1.5rem] text-[var(--color-ink)]">{fig.value}</div>
                          <div className="text-[12px] text-[var(--color-muted)]">{fig.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl bg-[var(--color-ink)] p-6 text-white">
                  <h3 className="font-display text-[1.15rem] leading-snug">Have a similar project in mind?</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-white/70">
                    Talk to our team about how OneSIS can deliver it end to end.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12.5px] font-semibold text-[var(--color-ink)] transition hover:bg-white/90"
                  >
                    Talk to Us
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
