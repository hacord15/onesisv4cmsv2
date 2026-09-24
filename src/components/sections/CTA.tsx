"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { cta } from "@/lib/content";
import { images } from "@/lib/images";
import { downloadFile } from "@/lib/download-file";

export function CTA() {
  const [companyProfile, setCompanyProfile] = useState<{ url: string; filename: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/globals/company-profile?depth=1")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.file?.url) return;
        setCompanyProfile({
          url: data.file.url,
          filename: data.file.filename || "OneSIS-Company-Profile",
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDownload(e: React.MouseEvent) {
    e.preventDefault();
    if (!companyProfile) return;
    try {
      await downloadFile(companyProfile.url, companyProfile.filename);
    } catch {
      window.open(companyProfile.url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <section id="contact" className="bg-[var(--color-cream)]">
      <Container className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center py-16 lg:py-24 lg:pr-16">
          <Eyebrow>{cta.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[2.25rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.75rem]">
            {cta.heading} <span className="accent">{cta.headingAccent}</span>
            <br />
            {cta.headingTail}
          </h2>
          <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[var(--color-body)]">
            {cta.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="#contact" variant="primary">
              {cta.primaryCta}
            </Button>
            <button
  type="button"
  onClick={handleDownload}
  disabled={!companyProfile}
  className="inline-flex items-center gap-2 border border-[var(--color-ink)]/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-50"
>
  {cta.secondaryCta}
</button>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-[var(--color-border)] lg:border-t-0 lg:border-l">
          {cta.stats.map((stat, i) => (
            <div
              key={i}
              className={`relative h-[320px] overflow-hidden border-[var(--color-border)] ${
                i % 2 === 0 ? "border-r" : ""
              } ${i < 2 ? "border-b" : ""}`}
            >
              {/* Image Cards */}
              {i === 0 || i === 3 ? (
                <Image
                  src={
                    i === 0
                      ? images.cta1
                      : images.verticalOfficeInterior
                  }
                  alt=""
                  fill
                  className="object-cover"
                />
              ) : (
                /* Text Cards */
                <div
                  className={`flex h-full flex-col items-center justify-center text-center px-8 ${
                    stat.highlighted
                      ? "bg-[var(--color-brand-tint)]"
                      : "bg-white"
                  }`}
                >
                  <div className="font-display text-4xl text-[var(--color-ink)]">
                    {stat.value}
                  </div>

                  <div className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                    {stat.label}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}