import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { CareerSubNav } from "@/components/ui/CareerSubNav";
import { getGlobal, getCollectionItem } from "@/lib/payload-fetch";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";

export const dynamic = "force-dynamic";

const CAREERS_EMAIL = "Onesis@sisindia.com"; // TODO: confirm/replace with the real recruitment inbox

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const job = await getCollectionItem("job-openings", { slug: { equals: slug } });
  if (!job) return { title: "Job Opening | OneSIS Careers" };
  return {
    title: `${job.title} | Careers at OneSIS`,
    description: `${job.title} — ${job.department}, ${job.location}. ${job.experience} experience required.`,
  };
}

export default async function JobDetailPage({ params }: Params) {
  const { slug } = await params;

  const [nav, footer, job] = await Promise.all([
    getGlobal("nav"),
    getGlobal("footer"),
    getCollectionItem("job-openings", { slug: { equals: slug } }),
  ]);

  if (!job || job.isActive === false) notFound();

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <CareerSubNav />

        <section className="px-6 py-16 sm:px-10 lg:px-16">
          <Container className="max-w-4xl">
            <Link
              href="/career/current-openings"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Current Openings
            </Link>

            <div className="mt-8 border-b border-[var(--color-border)] pb-8">
              <h1 className="font-display text-[1.9rem] leading-tight text-[var(--color-ink)] sm:text-[2.4rem]">
                {job.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-[var(--color-muted)]">
                <span className="capitalize">{job.department}</span>
                <span className="h-1 w-1 rounded-full bg-[var(--color-muted-2)]" />
                <span>{job.location}</span>
                <span className="h-1 w-1 rounded-full bg-[var(--color-muted-2)]" />
                <span className="capitalize">{job.type?.replace("-", " ")}</span>
                {job.deploymentType && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-[var(--color-muted-2)]" />
                    <span className="capitalize">{job.deploymentType.replace("-", " ")}</span>
                  </>
                )}
                <span className="h-1 w-1 rounded-full bg-[var(--color-muted-2)]" />
                <span>{job.experience}</span>
              </div>
            </div>

            {job.jobDescription && (
              <div className="mt-10">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                  Job Description
                </h2>
                <div className="prose prose-neutral mt-3 max-w-none text-[14.5px] leading-relaxed text-[var(--color-body)]">
                  <RichText data={job.jobDescription} />
                </div>
              </div>
            )}

         -
{job.keyResponsibilities && (
  <div className="mt-10">
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
      Roles &amp; Responsibilities
    </h2>
    <div className="prose prose-neutral mt-3 max-w-none text-[14.5px] leading-relaxed text-[var(--color-body)]">
      <RichText data={job.keyResponsibilities} />
    </div>
  </div>
)}


           {job.candidateRequirements && (
  <div className="mt-10">
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
      Candidate Requirements
    </h2>
    <div className="prose prose-neutral mt-3 max-w-none text-[14.5px] leading-relaxed text-[var(--color-body)]">
      <RichText data={job.candidateRequirements} />
    </div>
  </div>
)}

            <div className="mt-12 flex items-start gap-3 border-t border-[var(--color-border)] pt-8">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" />
              <p className="text-[14px] leading-relaxed text-[var(--color-body)]">
                To apply for this role, email your resume with the subject line{" "}
                <span className="font-semibold text-[var(--color-ink)]">
                  &ldquo;{job.title}&rdquo;
                </span>{" "}
                to{" "}
                <a
                  href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(job.title)}`}
                  className="font-semibold text-[var(--color-brand)] hover:underline"
                >
                  {CAREERS_EMAIL}
                </a>
                .
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}