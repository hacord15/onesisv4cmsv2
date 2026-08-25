"use client";

import { useState, type FormEvent } from "react";
import {
  Mail,
  Phone,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/lib/images";

/* ---------- form primitives ---------- */
function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium tracking-wide text-[var(--color-body)]">
        {label}{" "}
        {required && (
          <span className="text-[var(--color-brand)]">*</span>
        )}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-[2px] border border-[var(--color-border)] bg-white px-4 py-3 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-muted-2)] outline-none transition focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/15"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = true,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium tracking-wide text-[var(--color-body)]">
        {label}{" "}
        {required && (
          <span className="text-[var(--color-brand)]">*</span>
        )}
      </span>

      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full appearance-none rounded-[2px] border border-[var(--color-border)] bg-white bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2314110F%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_14px_center] bg-no-repeat px-4 py-3 text-[15px] text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/15"
      >
        <option value="" disabled>
          Select an option
        </option>

        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  name,
  required = true,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium tracking-wide text-[var(--color-body)]">
        {label}{" "}
        {required && (
          <span className="text-[var(--color-brand)]">*</span>
        )}
      </span>

      <textarea
        name={name}
        required={required}
        rows={5}
        className="w-full resize-none rounded-[2px] border border-[var(--color-border)] bg-white px-4 py-3 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-muted-2)] outline-none transition focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/15"
      />
    </label>
  );
}

function SubmitButton({
  label,
  pending,
}: {
  label: string;
  pending: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-[var(--color-brand)] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--color-brand-dark)] disabled:opacity-60"
    >
      {pending ? "Submitting…" : label}

      {!pending && (
        <ArrowUpRight
          className="h-4 w-4"
          strokeWidth={2.5}
        />
      )}
    </button>
  );
}

/* ---------- page data ---------- */
const serviceOptions = [
  "Integrated Facility Management",
  "Property Management",
  "Specialized Services",
  "Other",
];

const industryOptions = [
  "Corporate / IT Parks",
  "Banking & Financial Services",
  "Retail",
  "Healthcare",
  "Manufacturing",
  "Residential",
  "Other",
];

const hearAboutOptions = [
  "Search Engine",
  "LinkedIn",
  "Referral",
  "Industry Event",
  "Existing Client",
  "Other",
];

/* ---------- component ---------- */
import type { Nav, Footer as FooterGlobal } from "@/payload-types";

export function ContactFormPageClient({ nav, footer }: { nav: Nav; footer: FooterGlobal }) {
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquiryPending, setEnquiryPending] = useState(false);

  function handleEnquiry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setEnquiryPending(true);

    setTimeout(() => {
      setEnquiryPending(false);
      setEnquirySent(true);
    }, 900);
  }

  return (
    <>
      <Header nav={nav} />

      <main className="bg-white">

        {/* HERO */}
        <PageHero
          eyebrow="Contact OneSIS"
          heading={
            <>
              Let&apos;s build facilities,{" "}
              <span className="accent">together.</span>
            </>
          }
          description="Reach the nearest OneSIS team for a facility management enquiry."
          backgroundImage={images.contactFormBanner}
        />

        {/* FORM + SIDEBAR */}
        <section className="py-20">
          <Container className="grid gap-12 lg:grid-cols-12">

            {/* FORM */}
            <div className="lg:col-span-7">
              <p className="eyebrow">General Enquiry</p>

              <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.5rem]">
                Tell us what your{" "}
                <span className="accent">facility</span> needs.
              </h2>

              {enquirySent ? (
                <div className="mt-8 flex items-start gap-3 border border-[var(--color-brand)]/25 bg-[var(--color-brand-tint)] p-6">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" />

                  <div>
                    <p className="font-semibold text-[var(--color-ink)]">
                      Enquiry received.
                    </p>

                    <p className="mt-1 text-[14px] text-[var(--color-body)]">
                      A regional OneSIS team will get in touch within
                      2 business days.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleEnquiry}
                  className="mt-8 space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Full Name"
                      name="fullName"
                    />

                    <Field
                      label="Organisation Name"
                      name="organisation"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Designation"
                      name="designation"
                      required={false}
                    />

                    <Field
                      label="Email Address"
                      name="email"
                      type="email"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Phone Number"
                      name="phone"
                      type="tel"
                    />

                    <Field
                      label="City / Location"
                      name="city"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField
                      label="Service Required"
                      name="service"
                      options={serviceOptions}
                    />

                    <SelectField
                      label="Industry Sector"
                      name="industry"
                      options={industryOptions}
                    />
                  </div>

                  <TextAreaField
                    label="Message / Requirements"
                    name="message"
                  />

                  <SelectField
                    label="How did you hear about us?"
                    name="source"
                    options={hearAboutOptions}
                    required={false}
                  />

                  <SubmitButton
                    label="Submit Enquiry"
                    pending={enquiryPending}
                  />
                </form>
              )}
            </div>

            {/* SIDEBAR */}
            <aside className="lg:col-span-5">
              <div className="overflow-hidden border border-[var(--color-border)] bg-white p-7">

                <h3 className="font-display text-[19px] text-[var(--color-ink)]">
                  Prefer to reach a region directly?
                </h3>

                <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-body)]">
                  Find the branch office closest to your site in our
                  regional directory.
                </p>

                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)]"
                >
                  View regional office directory

                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <div className="mt-7 space-y-3 border-t border-[var(--color-border)] pt-6">

                  <a
                    href="mailto:connect@onesis.in"
                    className="flex items-center gap-3 text-[14px] text-[var(--color-body)] hover:text-[var(--color-ink)]"
                  >
                    <Mail className="h-4 w-4 text-[var(--color-brand)]" />

                    connect@onesis.in
                  </a>

                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-3 text-[14px] text-[var(--color-body)] hover:text-[var(--color-ink)]"
                  >
                    <Phone className="h-4 w-4 text-[var(--color-brand)]" />

                    +91 12345 67890
                  </a>

                </div>
              </div>
            </aside>

          </Container>
        </section>
      </main>

      <Footer footer={footer} />
    </>
  );
}