"use client";

import { useState, type FormEvent } from "react";
import {
  Wrench,
  Building2,
  Cpu,
  GraduationCap,
  ArrowUpRight,
  FileDown,
  CheckCircle2,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/lib/images";

/* ---------- form primitives (self-contained) ---------- */

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

/* ---------- data ---------- */

const partnerTypes = [
  "FM Vendor",
  "MEP Contractor",
  "Technology Provider",
  "Staffing & Training Partner",
];

const partners = [
  {
    title: "FM Vendors",
    copy: "Specialized soft or hard service providers with strong local presence and track record.",
    icon: Wrench,
  },
  {
    title: "MEP Contractors",
    copy: "Licensed mechanical, electrical, and plumbing contractors for technical projects.",
    icon: Building2,
  },
  {
    title: "Technology Providers",
    copy: "Smart building, IoT, energy management, and CMMS software companies.",
    icon: Cpu,
  },
  {
    title: "Staffing & Training",
    copy: "Manpower agencies and training institutions for field staff upskilling.",
    icon: GraduationCap,
  },
];

const process = [
  {
    step: "01",
    title: "Submit application",
    copy: "Share your company details and area of specialization through the form below.",
  },
  {
    step: "02",
    title: "Review — 5 working days",
    copy: "Our partnerships team evaluates fit and reach. You'll get an auto-acknowledgement the moment you submit.",
  },
  {
    step: "03",
    title: "Onboarding",
    copy: "Approved partners are onboarded onto OneSIS's regional delivery network.",
  },
];

/* ---------- component ---------- */

import type { Nav, Footer as FooterGlobal } from "@/payload-types";

export function PartnershipPageClient({ nav, footer }: { nav: Nav; footer: FooterGlobal }) {
  const [partnerSent, setPartnerSent] = useState(false);
  const [partnerPending, setPartnerPending] = useState(false);

  function handlePartner(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setPartnerPending(true);

    setTimeout(() => {
      setPartnerPending(false);
      setPartnerSent(true);
    }, 900);
  }

  return (
    <>
      <Header nav={nav} />

      <main className="bg-white">

        {/* HERO */}
        <PageHero
          eyebrow="Become a Partner"
          heading={
            <>
              Partner with OneSIS —{" "}
              <span className="accent">grow together.</span>
            </>
          }
          description="Join our network of trusted service partners across India."
          backgroundImage={images.partnerWithUsBanner}
        />

        {/* PARTNER TYPES */}
        <section className="py-16">
          <Container>
            <div className="max-w-2xl">
              <h2 className="font-display text-[2rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.5rem]">
                Who we partner <span className="accent">with</span>
              </h2>

              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-body)]">
                OneSIS is building a network of trusted service partners across
                India. Whether you are a specialized FM vendor, technology
                provider, staffing company, or compliance expert, we invite you
                to collaborate and co-deliver excellence.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map(({ title, copy, icon: Icon }) => (
                <div
                  key={title}
                  className="border border-[var(--color-border)] bg-white p-6"
                >
                  <Icon
                    className="mb-4 h-5 w-5 text-[var(--color-brand)]"
                    strokeWidth={1.75}
                  />

                  <h3 className="text-[15px] font-semibold text-[var(--color-ink)]">
                    {title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-body)]">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* PROCESS */}
        <section className="bg-[var(--color-cream)] py-16">
          <Container>
            <h2 className="font-display text-[2rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.5rem]">
              How it <span className="accent">works</span>
            </h2>

            <div className="mt-10 grid gap-8 border-y border-[var(--color-border)] py-10 sm:grid-cols-3">
              {process.map(({ step, title, copy }) => (
                <div key={step}>
                  <span className="font-display text-[13px] font-semibold text-[var(--color-brand)]">
                    {step}
                  </span>

                  <h4 className="mt-2 text-[15px] font-semibold text-[var(--color-ink)]">
                    {title}
                  </h4>

                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-body)]">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* PARTNERSHIP FORM */}
        <section className="py-20">
          <Container className="grid gap-12 lg:grid-cols-12">

            <div className="lg:col-span-8">
              <h3 className="font-display text-[22px] text-[var(--color-ink)]">
                Partnership enquiry
              </h3>

              {partnerSent ? (
                <div className="mt-7 flex items-start gap-3 border border-[var(--color-brand)]/25 bg-[var(--color-brand-tint)] p-6">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" />

                  <div>
                    <p className="font-semibold text-[var(--color-ink)]">
                      Application submitted.
                    </p>

                    <p className="mt-1 text-[14px] text-[var(--color-body)]">
                      A confirmation email is on its way. Our partnerships
                      team reviews every application within 5 working days.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handlePartner}
                  className="mt-7 space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Company Name"
                      name="companyName"
                    />

                    <Field
                      label="Contact Person"
                      name="contactPerson"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Designation"
                      name="partnerDesignation"
                      required={false}
                    />

                    <Field
                      label="Email Address"
                      name="partnerEmail"
                      type="email"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Phone Number"
                      name="partnerPhone"
                      type="tel"
                    />

                    <Field
                      label="City / State"
                      name="partnerCity"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField
                      label="Type of Partnership"
                      name="partnershipType"
                      options={partnerTypes}
                    />

                    <Field
                      label="Years of Experience"
                      name="experience"
                      type="number"
                      required={false}
                    />
                  </div>

                  <Field
                    label="Services / Specialization Offered"
                    name="specialization"
                    placeholder="e.g. HVAC maintenance, pest control, housekeeping"
                  />

                  <TextAreaField
                    label="Message / Brief Introduction"
                    name="partnerMessage"
                  />

                  <SubmitButton
                    label="Submit Partnership Enquiry"
                    pending={partnerPending}
                  />
                </form>
              )}
            </div>

            {/* GOOD TO KNOW */}
            <div className="lg:col-span-4">
              <div className="border border-[var(--color-border)] bg-white p-7">
                <h4 className="text-[15px] font-semibold text-[var(--color-ink)]">
                  Good to know
                </h4>

                <ul className="mt-4 space-y-3 text-[13px] leading-relaxed text-[var(--color-body)]">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-brand)]" />

                    Applications are reviewed within 5 working days.
                  </li>

                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-brand)]" />

                    You&apos;ll receive an automatic acknowledgement email on
                    submission.
                  </li>
                </ul>

                <a
                  href="#"
                  className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)]"
                >
                  <FileDown className="h-4 w-4" />

                  Download partner brochure
                </a>
              </div>
            </div>

          </Container>
        </section>
      </main>

      <Footer footer={footer} />
    </>
  );
}