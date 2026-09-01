"use client";

import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import type { Nav } from "@/payload-types";
import { useState } from "react";

export function Header({ nav }: { nav: Nav }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--color-border-soft)] bg-[var(--color-offwhite)]/95 backdrop-blur">
        <Container className="flex h-[72px] items-center justify-between">
          {/* Left Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={images.logo_oneSIS}
              alt="OneSIS Logo"
              width={180}
              height={60}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop / Tablet Navigation */}
          <nav className="hidden items-center gap-4 md:flex lg:gap-8">
            {(nav.links ?? []).map((link) => (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 py-6 text-[13px] font-medium text-[var(--color-body)] transition-colors hover:text-[var(--color-brand)] lg:text-[14px]"
                >
                  {link.label}

                  {"children" in link && link.children && (
                    <svg
                      className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {"children" in link && link.children && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-[250px] rounded-lg border border-gray-200 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-5 py-3 text-sm text-gray-700 transition-colors hover:bg-red-50 hover:text-[var(--color-brand)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop / Tablet Right Section */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="#DownloadCompanyProfile"
              className="inline-flex items-center gap-2 rounded bg-[var(--color-brand)] px-4 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[var(--color-brand-dark)] lg:px-5 lg:text-[13px]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {nav.ctaLabel}
            </Link>

            {/* SIS Group logo: hidden on tablet (md-lg), only shown from lg (desktop) up */}
            <Link
              href="https://sisindia.com/"
              target="_blank"
              rel="noreferrer"
              className="hidden shrink-0 lg:block"
            >
              <Image
                src={images.logo_SISGroup}
                alt="SIS Logo"
                width={180}
                height={60}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Mobile Menu Button - Three Stripes */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex flex-col gap-1.5 rounded-md p-2 transition-colors hover:bg-gray-100 md:hidden"
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-gray-800"></span>
            <span className="block h-0.5 w-6 bg-gray-800"></span>
            <span className="block h-0.5 w-6 bg-gray-800"></span>
          </button>
        </Container>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-black/50 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed right-0 top-0 z-[1000] h-full w-[300px] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Close menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Sidebar Content */}
        <div className="flex h-full flex-col">
          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-6 pt-16">
            {(nav.links ?? []).map((link) => {
              const hasChildren = "children" in link && link.children;
              const isExpanded = expandedItems.includes(link.label);

              return (
                <div key={link.label} className="border-b border-gray-100 py-1">
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        toggleExpand(link.label);
                      } else {
                        setIsSidebarOpen(false);
                        window.location.href = link.href;
                      }
                    }}
                    className="flex w-full items-center justify-between py-3 text-base font-medium text-gray-800 transition-colors hover:text-[var(--color-brand)]"
                  >
                    <span>{link.label}</span>
                    {hasChildren && (
                      <svg
                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Mobile Sub-links - Collapsible */}
                  {hasChildren && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-4 space-y-1 pb-2">
                        {link.children!.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className="block py-2 text-sm text-gray-600 transition-colors hover:text-[var(--color-brand)]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-200 px-6 py-6">
            {/* Download Profile Button */}
            <Link
              href="#DownloadCompanyProfile"
              onClick={() => setIsSidebarOpen(false)}
              className="mb-4 flex w-full items-center justify-center gap-2 rounded bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-dark)]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {nav.ctaLabel}
            </Link>

            {/* SIS Group Logo - Centered (mobile sidebar only, unaffected by tablet rule) */}
            <div className="flex justify-center">
              <Link
                href="https://sisindia.com/"
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <Image
                  src={images.logo_SISGroup}
                  alt="SIS Logo"
                  width={180}
                  height={60}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}