"use client";

/**
 * Contact — OneSIS
 * ---------------------------------------------------------------
 * Uses the site's shared design tokens (src/app/globals.css) and
 * fonts already loaded by the root layout — no separate font
 * imports needed here:
 *
 *   --color-ink          near-black text
 *   --color-body         secondary/paragraph gray
 *   --color-muted        small-caps labels, captions
 *   --color-offwhite     page background
 *   --color-cream        alternate-section tint
 *   --color-border       hairlines
 *   --color-brand        rgb(161, 35, 43) — primary accent
 *   --color-brand-dark   hover / pressed state
 *   --color-brand-tint   soft accent wash (badges, success states)
 *
 *   font-display  → Playfair Display (headings + italic accent)
 *   default body  → Inter (set globally on <body>)
 *
 * Signature carried over from the homepage: an italic serif accent
 * phrase in brand red inside every section heading.
 * ---------------------------------------------------------------
 */

import { useState, type FormEvent } from "react";
import {
  MapPin,
  Building2,
  Users2,
  Boxes,
  Wrench,
  Cpu,
  GraduationCap,
  Mail,
  Phone,
  ArrowUpRight,
  FileDown,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/sections/Header";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { images } from "@/lib/images";

/* ---------------------------------- data ---------------------------------- */

const presence = [
  { value: "29", label: "States", copy: "Pan-India coverage across all major and tier-2 cities.", icon: MapPin },
  { value: "630+", label: "Districts", copy: "Deep local presence enabling last-mile service delivery.", icon: Boxes },
  { value: "368", label: "Offices", copy: "Network of regional and branch offices for on-ground accountability.", icon: Building2 },
  { value: "16", label: "Group Companies", copy: "Integrated capabilities drawn from across the SIS Group ecosystem.", icon: Users2 },
];

const serviceOptions = ["Integrated Facility Management", "Property Management", "Specialized Services", "Other"];
const industryOptions = ["Corporate / IT Parks", "Banking & Financial Services", "Retail", "Healthcare", "Manufacturing", "Residential", "Other"];
const hearAboutOptions = ["Search Engine", "LinkedIn", "Referral", "Industry Event", "Existing Client", "Other"];

const partnerTypes = ["FM Vendor", "MEP Contractor", "Technology Provider", "Staffing & Training Partner"];

const partners = [
  { title: "FM Vendors", copy: "Specialized soft or hard service providers with strong local presence and track record.", icon: Wrench },
  { title: "MEP Contractors", copy: "Licensed mechanical, electrical, and plumbing contractors for technical projects.", icon: Building2 },
  { title: "Technology Providers", copy: "Smart building, IoT, energy management, and CMMS software companies.", icon: Cpu },
  { title: "Staffing & Training", copy: "Manpower agencies and training institutions for field staff upskilling.", icon: GraduationCap },
];

const process = [
  { step: "01", title: "Submit application", copy: "Share your company details and area of specialization through the form below." },
  { step: "02", title: "Review — 5 working days", copy: "Our partnerships team evaluates fit and reach. You'll get an auto-acknowledgement the moment you submit." },
  { step: "03", title: "Onboarding", copy: "Approved partners are onboarded onto OneSIS's regional delivery network." },
];

/* ------------------------------- primitives ------------------------------- */

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
        {label} {required && <span className="text-[var(--color-brand)]">*</span>}
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
        {label} {required && <span className="text-[var(--color-brand)]">*</span>}
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

function TextAreaField({ label, name, required = true }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium tracking-wide text-[var(--color-body)]">
        {label} {required && <span className="text-[var(--color-brand)]">*</span>}
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

function SubmitButton({ label, pending }: { label: string; pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-[var(--color-brand)] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--color-brand-dark)] disabled:opacity-60"
    >
      {pending ? "Submitting…" : label}
      {!pending && <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />}
    </button>
  );
}

/* --------------------------------- page ---------------------------------- */

import type { Nav, Footer as FooterGlobal } from "@/payload-types";

export function ContactIndexPageClient({ nav, footer }: { nav: Nav; footer: FooterGlobal }) {
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquiryPending, setEnquiryPending] = useState(false);
  const [partnerSent, setPartnerSent] = useState(false);
  const [partnerPending, setPartnerPending] = useState(false);

  function handleEnquiry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnquiryPending(true);
    setTimeout(() => {
      setEnquiryPending(false);
      setEnquirySent(true);
    }, 900);
  }

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
    <main className="bg-[var(--color-offwhite)]">
      {/* ---------------------------- HERO ---------------------------- */}
  <section className="relative overflow-hidden bg-[var(--color-ink)]">
  <Image
    src={images.contactBanner}
    alt="OneSIS managed facility"
    fill
    priority
    sizes="100vw"
    className="object-cover"
  />

  {/* Lighter solid overlay */}
  <div className="absolute inset-0 bg-[var(--color-ink)]/30" />

  {/* Lighter gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/60 via-[var(--color-ink)]/20 to-transparent" />

  <Container className="relative pb-16 pt-24">
    <p className="eyebrow">Contact OneSIS</p>
    <h1 className="mt-5 font-display text-[2.5rem] leading-[1.1] text-white sm:text-[3.25rem]">
      Let&apos;s build facilities, <span className="accent">together.</span>
    </h1>
    <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70">
      Reach the nearest OneSIS team for a facility management enquiry, or
      join our growing network of delivery partners across India.
    </p>
  </Container>

  {/* presence stat strip – unchanged */}
  <Container className="relative pb-16">
    <div className="grid grid-cols-2 gap-px overflow-hidden bg-white/10 lg:grid-cols-4">
      {presence.map(({ value, label, copy, icon: Icon }) => (
        <div key={label} className="bg-[var(--color-ink)]/70 p-6 backdrop-blur-sm">
          <Icon className="mb-4 h-5 w-5 text-[var(--color-brand)]" strokeWidth={1.75} />
          <div className="font-display text-3xl leading-none text-white">{value}</div>
          <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/55">
            {label}
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-white/45">{copy}</p>
        </div>
      ))}
    </div>
  </Container>
</section>

      {/* ------------------------ GENERAL ENQUIRY ------------------------ */}
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          {/* form */}
          <div className="lg:col-span-7">
            <p className="eyebrow">General Enquiry</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.5rem]">
              Tell us what your <span className="accent">facility</span> needs.
            </h2>

            {enquirySent ? (
              <div className="mt-8 flex items-start gap-3 border border-[var(--color-brand)]/25 bg-[var(--color-brand-tint)] p-6">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" />
                <div>
                  <p className="font-semibold text-[var(--color-ink)]">Enquiry received.</p>
                  <p className="mt-1 text-[14px] text-[var(--color-body)]">
                    A regional OneSIS team will get in touch within 2 business days.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquiry} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" name="fullName" />
                  <Field label="Organisation Name" name="organisation" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Designation" name="designation" required={false} />
                  <Field label="Email Address" name="email" type="email" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Phone Number" name="phone" type="tel" />
                  <Field label="City / Location" name="city" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField label="Service Required" name="service" options={serviceOptions} />
                  <SelectField label="Industry Sector" name="industry" options={industryOptions} />
                </div>
                <TextAreaField label="Message / Requirements" name="message" />
                <SelectField
                  label="How did you hear about us?"
                  name="source"
                  options={hearAboutOptions}
                  required={false}
                />
                <SubmitButton label="Submit Enquiry" pending={enquiryPending} />
              </form>
            )}
          </div>

          {/* sidebar */}
          <aside className="lg:col-span-5">
            <div className="overflow-hidden border border-[var(--color-border)] bg-white">
              <div className="flex aspect-[4/3] items-center justify-center border-b border-[var(--color-border)] bg-[var(--color-brand-tint)]">
                <div className="text-center">
                  <MapPin className="mx-auto mb-3 h-6 w-6 text-[var(--color-brand)]" strokeWidth={1.75} />
                  <p className="text-[13px] font-medium text-[var(--color-body)]">
                    Interactive presence map
                  </p>
                  <p className="text-[12px] text-[var(--color-muted)]">29 states · 630+ districts</p>
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-display text-[19px] text-[var(--color-ink)]">
                  Prefer to reach a region directly?
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-body)]">
                  Find the branch office closest to your site in our regional
                  directory.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)]"
                >
                  View regional office directory
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <div className="mt-7 space-y-3 border-t border-[var(--color-border)] pt-6">
                  <a href="mailto:connect@onesis.in" className="flex items-center gap-3 text-[14px] text-[var(--color-body)] hover:text-[var(--color-ink)]">
                    <Mail className="h-4 w-4 text-[var(--color-brand)]" /> connect@onesis.in
                  </a>
                  <a href="tel:+911234567890" className="flex items-center gap-3 text-[14px] text-[var(--color-body)] hover:text-[var(--color-ink)]">
                    <Phone className="h-4 w-4 text-[var(--color-brand)]" /> +91 12345 67890
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {/* ------------------------- BECOME A PARTNER ------------------------- */}
      <section className="bg-[var(--color-cream)] py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Become a Partner</p>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.5rem]">
              Partner with OneSIS — <span className="accent">grow together.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-body)]">
              OneSIS is building a network of trusted service partners across
              India. Whether you are a specialized FM vendor, technology
              provider, staffing company, or compliance expert, we invite you
              to collaborate and co-deliver excellence.
            </p>
          </div>

          {/* who we partner with */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map(({ title, copy, icon: Icon }) => (
              <div key={title} className="border border-[var(--color-border)] bg-white p-6">
                <Icon className="mb-4 h-5 w-5 text-[var(--color-brand)]" strokeWidth={1.75} />
                <h3 className="text-[15px] font-semibold text-[var(--color-ink)]">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-body)]">{copy}</p>
              </div>
            ))}
          </div>

          {/* process — a genuine sequence, so numbering earns its place */}
          <div className="mt-16 grid gap-8 border-y border-[var(--color-border)] py-10 sm:grid-cols-3">
            {process.map(({ step, title, copy }) => (
              <div key={step}>
                <span className="font-display text-[13px] font-semibold text-[var(--color-brand)]">
                  {step}
                </span>
                <h4 className="mt-2 text-[15px] font-semibold text-[var(--color-ink)]">{title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-body)]">{copy}</p>
              </div>
            ))}
          </div>

          {/* partnership enquiry form */}
          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h3 className="font-display text-[22px] text-[var(--color-ink)]">
                Partnership enquiry
              </h3>

              {partnerSent ? (
                <div className="mt-7 flex items-start gap-3 border border-[var(--color-brand)]/25 bg-[var(--color-brand-tint)] p-6">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" />
                  <div>
                    <p className="font-semibold text-[var(--color-ink)]">Application submitted.</p>
                    <p className="mt-1 text-[14px] text-[var(--color-body)]">
                      A confirmation email is on its way. Our partnerships team
                      reviews every application within 5 working days.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePartner} className="mt-7 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Company Name" name="companyName" />
                    <Field label="Contact Person" name="contactPerson" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Designation" name="partnerDesignation" required={false} />
                    <Field label="Email Address" name="partnerEmail" type="email" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone Number" name="partnerPhone" type="tel" />
                    <Field label="City / State" name="partnerCity" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField label="Type of Partnership" name="partnershipType" options={partnerTypes} />
                    <Field label="Years of Experience" name="experience" type="number" required={false} />
                  </div>
                  <Field
                    label="Services / Specialization Offered"
                    name="specialization"
                    placeholder="e.g. HVAC maintenance, pest control, housekeeping"
                  />
                  <TextAreaField label="Message / Brief Introduction" name="partnerMessage" />
                  <SubmitButton label="Submit Partnership Enquiry" pending={partnerPending} />
                </form>
              )}
            </div>

            {/* note panel */}
            <div className="lg:col-span-4">
              <div className="border border-[var(--color-border)] bg-white p-7">
                <h4 className="text-[15px] font-semibold text-[var(--color-ink)]">Good to know</h4>
                <ul className="mt-4 space-y-3 text-[13px] leading-relaxed text-[var(--color-body)]">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-brand)]" />
                    Applications are reviewed within 5 working days.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-brand)]" />
                    You&apos;ll receive an automatic acknowledgement email on submission.
                  </li>
                </ul>
                
                 <a href="#"
                  className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)]"
                >
                  <FileDown className="h-4 w-4" />
                  Download partner brochure
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
    <Footer footer={footer} />
    </>
  );
}