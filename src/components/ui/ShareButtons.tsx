"use client";

import { useState } from "react";
import { CheckIcon, LinkIcon } from "./icons";

type ShareKind = "linkedin" | "x" | "facebook";

type ShareButtonsProps = {
  title: string;
  className?: string;
};

export function ShareButtons({ title, className = "" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const openShare = (kind: ShareKind) => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    const shareUrls: Record<ShareKind, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
    window.open(shareUrls[kind], "_blank", "noopener,noreferrer,width=600,height=520");
  };

  const copyLink = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard permission denied — fail silently
    }
  };

  const buttonClass =
    "flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-ink)]/15 text-[11px] font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button type="button" aria-label="Share on LinkedIn" onClick={() => openShare("linkedin")} className={buttonClass}>
        in
      </button>
      <button type="button" aria-label="Share on X" onClick={() => openShare("x")} className={buttonClass}>
        X
      </button>
      <button type="button" aria-label="Share on Facebook" onClick={() => openShare("facebook")} className={buttonClass}>
        f
      </button>
      <button
        type="button"
        aria-label="Copy link"
        onClick={copyLink}
        className={buttonClass}
        title={copied ? "Copied!" : "Copy link"}
      >
        {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <LinkIcon className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
