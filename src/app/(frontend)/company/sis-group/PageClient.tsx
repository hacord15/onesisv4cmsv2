"use client";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { images } from "@/lib/images";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

// --- Updated to match provided text exactly ---
const keyStats = [
  { value: "15982", suffix: "cr", label: "REVENUE" },
  { value: "78154", suffix: "", label: "CUSTOMER SITES" },
  { value: "357022", suffix: "", label: "EMPLOYEES" },
  { value: "446", suffix: "", label: "BRANCHES" },
  { value: "790", suffix: "", label: "DISTRICTS" },
  { value: "25", suffix: "", label: "TRAINING ACADEMIES" },
];

const rankings = [
  { rank: "#1", label: "Security Solutions" },
  { rank: "#1", label: "Facility Management" },
  { rank: "#2", label: "Cash Logistics" },
];

const groupCompanies = [
  "SIS India",
  "Terminix SIS",
  "MSS Security",
  "Henderson",
  "SIS Cash Services",
  "Dusters Total Solutions",
  "Rare Hospitality",
];

// export const metadata = {
//   title: "About SIS Group | OneSIS",
//   description:
//     "SIS Group is India's largest listed security and business services enterprise, operating across 16 group companies with a pan-India and international presence.",
// };

import type { Nav, Footer as FooterGlobal } from "@/payload-types";

export function SISGroupPageClient({ nav, footer }: { nav: Nav; footer: FooterGlobal }) {
  const [openToggles, setOpenToggles] = useState<Record<string, boolean>>({});

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <PageHero
          eyebrow="Company"
          heading={
            <>
              A Billion-Dollar Listed{" "}
              <span className="accent">Indian Multinational</span>
            </>
          }
          description="SIS Group is India's largest listed security and business services enterprise, operating across 16 group companies with a pan-India and international presence."
          backgroundImage={images.sisGroupBanner}
        />

        {/* ============================================================ */}
        {/* NEW ABOUT SIS SECTION (Inserted here) */}
        {/* ============================================================ */}
        
        {/* Embedded CSS to match the provided design without modifying tailwind.config.js */}
        <style jsx>{`
          .sis-about-section {
            background-color: #ffffff;
            padding: 48px 0 80px 0;
          }
          .sis-about-text h2 {
            font-size: 30px;
            line-height: 1.2;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 24px;
          }
          .sis-about-text h2 span {
            color: #c8102e;
          }
          .sis-about-text ul {
            list-style: none;
            padding: 0;
            margin: 0;
            color: #262626;
            font-size: 17px;
            line-height: 1.6;
          }
          .sis-about-text ul li {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 6px;
          }
          .sis-about-text ul li .rank {
            font-weight: 900;
            color: #c8102e;
            font-size: 18px;
            flex-shrink: 0;
          }
          .sis-about-text p {
            color: #4a4a4a;
            font-size: 17px;
            line-height: 30px;
            margin-bottom: 18px;
          }
          .sis-about-text p:last-child {
            margin-bottom: 0;
          }
          .sis-facts-title {
            font-size: 30px;
            font-weight: 700;
            color: #1a1a1a;
          }
          .sis-facts-title span {
            color: #c8102e;
          }
          .sis-facts-date {
            color: #9ca3af;
            font-size: 14px;
            font-style: italic;
            margin-top: 4px;
          }
          .sis-stat-item {
            text-align: center;
          }
          .sis-stat-number {
            font-size: 32px;
            font-weight: 700;
            color: #c8102e;
          }
          .sis-stat-label {
            font-size: 12px;
            font-weight: 700;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 6px;
          }

          @media (max-width: 768px) {
            .sis-about-text h2 {
              font-size: 24px;
            }
            .sis-stat-number {
              font-size: 24px;
            }
          }
          @media (max-width: 1024px) {
            .sis-stat-item {
              margin-bottom: 24px;
            }
          }
        `}</style>

        <section className="sis-about-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Text Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-16 sis-about-text">
              {/* Left Column: Stats/Highlights */}
              <div className="lg:col-span-1">
                <h2>
                  SIS – <span>A Billion Dollar Indian MNC</span>
                </h2>
                <ul>
                  <li>
                    <span className="rank">#1</span>
                    <span>In Security Solutions in India</span>
                  </li>
                  <li>
                    <span className="rank">#1</span>
                    <span>In Security Solutions in Australia</span>
                  </li>
                  <li>
                    <span className="rank">#3</span>
                    <span>Among the top 3 Security Solutions provider in New Zealand</span>
                  </li>
                  <li>
                    <span className="rank">Top5</span>
                    <span>Among the top 5 Security Solutions providers in Singapore</span>
                  </li>
                  <li>
                    <span className="rank">#1</span>
                    <span>In Facility Management Solutions in India</span>
                  </li>
                  <li>
                    <span className="rank">#2</span>
                    <span>In Cash Logistics Solutions in India</span>
                  </li>
                </ul>
              </div>

              {/* Right Column: Paragraphs */}
              <div className="lg:col-span-3">
                <p>
                  SIS Group Enterprises commenced operations as a two-member company in 1974
                  and has since transformed into one of the market leaders in the Asia Pacific
                  region, in Security, Facility Management and Cash Logistics segments, all of
                  which are essential to the functioning of a healthy economy.
                </p>
                <p>
                  SIS Limited is a US$ 1.5 billion Indian multinational business solutions
                  company with market-leading positions in Security Solutions, Facility
                  Management and Cash Logistics. With operations across India, Australia, New
                  Zealand, and Singapore, SIS delivers integrated solutions powered by
                  technology, analytics, and highly trained personnel.
                </p>
                <p>
                  With over five decades of operational experience, SIS has built a strong
                  foundation of trained manpower, disciplined processes and technology-enabled
                  delivery systems. The company operates across diverse industries including
                  infrastructure, manufacturing, healthcare, logistics and government.
                </p>
                <p>
                  At SIS, people remain central to service delivery. Technology is deployed to
                  enhance visibility, coordination and response, enabling consistent and
                  reliable outcomes across large and complex operations.
                </p>
              </div>
            </div>

            {/* Group Facts & Figures Section */}
            <div className="bg-white pt-10 border-t border-[#f3f4f6]">
              <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                <div>
                  <h2 className="sis-facts-title">
                    Group Facts and <span>Figures</span>
                  </h2>
                  <p className="sis-facts-date">*31 March 2026</p>
                </div>
              </div>

              {/* Counters Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
                {keyStats.map((stat, index) => (
                  <div key={index} className="sis-stat-item">
                    <div className="sis-stat-number">
                      {stat.value.toLocaleString()}
                      {stat.suffix && <span>{stat.suffix}</span>}
                    </div>
                    <div className="sis-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* END OF NEW ABOUT SIS SECTION */}
        {/* ============================================================ */}

        {/* Rankings + revenue */}
        {/* (Your existing code would go here if you uncommented the above) */}

        {/* Group companies */}
        <section className="py-16 bg-white">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#171717]"
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              }}
            >
              SIS Group{" "}
              <span className="text-[#c8102e]">At A Glance</span>
              <div className="w-[50px] h-[3px] bg-[#c8102e] mx-auto mt-6" />
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="max-w-7xl mx-auto px-4 space-y-10">
            <img
              src={images.companies}
              alt="SIS Group Companies"
              className="w-full h-auto object-contain"
            />

            <img
              src={images.market}
              alt="SIS Group Market Leader"
              className="w-full max-w-4xl mx-auto h-auto object-contain rounded-xl"
            />
          </div>
        </section>

        {/* Global footprints */}
        <section className="pt-8 pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-10">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#171717]"
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                }}
              >
                Our{" "}
                <span className="text-[#c8102e]">Global Footprints</span>
              </h2>
              <div className="w-[50px] h-[3px] bg-[#c8102e] mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start mt-8">
              {/* Map Column */}
              <div>
                <div className="relative rounded-2xl overflow-hidden border border-[#e5e5e5] shadow-sm bg-white p-4 flex justify-center">
                  <img
                    src={images.footprints}
                    alt="SIS Group Global Footprints Map"
                    className="w-3/4 h-auto mx-auto"
                  />
                </div>
                <p className="text-xs text-[#a3a3a3] mt-3 text-right italic">
                  *Map not to scale
                </p>
              </div>

              {/* Toggles Column */}
              <div className="space-y-3">
                {[
                  {
                    label: "India",
                    content: [
                      { name: "SIS", url: "https://sisindia.com/" },
                      { name: "SISCO", url: "https://siscosecurity.com/" },
                      { name: "VProtect", url: "https://vprotectindia.com/" },
                      { name: "Tech SIS", url: "https://techsisindia.com/" },
                      { name: "SMC-India", url: "https://smc-india.com/" },
                      { name: "DTSS", url: "https://dtss.in/" },
                      { name: "RARE", url: "https://www.raregrp.com/" },
                      { name: "SIS Prosegur", url: "https://www.sisprosegur.com/" },
                      { name: "PestX", url: "https://sispestx.com/" },
                      { name: "AP Securitas", url: "https://sisindia.com/contact-us/" },
                    ],
                  },
                  {
                    label: "Australia",
                    content: [
                      {
                        name: "MSS Security",
                        url: "https://msssecurity.com.au/",
                      },
                      {
                        name: "Southern Cross Protection",
                        url: "https://sxprotection.com.au/",
                      },
                    ],
                  },
                  {
                    label: "New Zealand",
                    content: [
                      {
                        name: "P4G Security",
                        url: "https://www.platform4.co.nz/",
                      },
                    ],
                  },
                  {
                    label: "Singapore",
                    content: [
                      {
                        name: "Henderson",
                        url: "https://hendersonsecurity.com.sg/",
                      },
                    ],
                  },
                ].map((country) => {
                  const isOpen = openToggles[country.label] || false;

                  return (
                    <div
                      key={country.label}
                      className="border border-[#e5e5e5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <button
                        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-[#f9f9f9] transition-colors text-left"
                        onClick={() =>
                          setOpenToggles((prev) => ({
                            ...prev,
                            [country.label]: !prev[country.label],
                          }))
                        }
                      >
                        <span
                          className="font-bold text-[#171717] text-base"
                          style={{
                            fontFamily:
                              '"Helvetica Neue", Helvetica, Arial, sans-serif',
                          }}
                        >
                          {country.label}
                        </span>
                        <ChevronRight
                          size={20}
                          className={`text-[#c8102e] transition-transform duration-300 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`px-5 pb-5 transition-all duration-300 ${
                          isOpen ? "block" : "hidden"
                        }`}
                      >
                        <div className="flex flex-wrap gap-2 pt-1">
                          {country.content.map((item) => (
                            <a
                              key={item.name}
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#262626] bg-[#f2f2f2] rounded-full hover:bg-[#c8102e] hover:text-white transition-colors duration-200"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="py-16">
          <Container className="flex flex-col items-start justify-between gap-6 border-t border-[var(--color-border)] pt-10 sm:flex-row sm:items-center">
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-body)]">
              Want to know how OneSIS draws on the strength of the wider SIS Group?
            </p>
            <Link
              href="/company/onesis"
              className="inline-flex items-center gap-2 bg-[var(--color-brand)] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--color-brand-dark)]"
            >
              About OneSIS
            </Link>
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}