"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ─────────────────────── animation helpers ─────────────────────── */

function useSectionInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return { ref, isInView };
}

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* ─── Animated Counter Hook ─── */

function useCountUp(target: number, isInView: boolean, duration: number = 1.6) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    }

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return count;
}

/* ─────────────────────── Section 1 — HERO ─────────────────────── */

function Hero() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-white min-h-screen flex items-center">
      <motion.div
        className="max-w-6xl mx-auto px-6 py-24 md:py-32"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fade}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-dm-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.08] tracking-tight">
          <span className="text-[#111827] block">Open source.</span>
          <span className="text-[#1f2937] block">Open access.</span>
          <span className="text-[#16a34a] block">Open Word.</span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-[#374151] max-w-2xl font-inter leading-relaxed">
          TOV is a community-built, openly licensed English Bible translation
          — free to read, free to build with, and free to share. No paywalls.
          No permissions. No restrictions.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-start gap-3">
          <a
            href="#github"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1f2937] text-white font-inter font-medium text-sm rounded-md border border-[#374151] hover:bg-[#111827] transition-colors"
          >
            <span>&#11088;</span> Star on GitHub
          </a>
          <a
            href="#github"
            className="inline-flex items-center gap-1 px-5 py-2.5 bg-white text-[#1f2937] font-inter font-medium text-sm rounded-md border border-[#d1d5db] hover:bg-[#f9fafb] transition-colors"
          >
            View on GitHub <span className="ml-1">&rarr;</span>
          </a>
        </div>

        {/* Shields-style badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center text-xs font-inter font-medium">
            <span className="px-2 py-0.5 bg-[#374151] text-white rounded-l">License</span>
            <span className="px-2 py-0.5 bg-[#16a34a] text-white rounded-r">Open</span>
          </span>
          <span className="inline-flex items-center text-xs font-inter font-medium">
            <span className="px-2 py-0.5 bg-[#374151] text-white rounded-l">Version</span>
            <span className="px-2 py-0.5 bg-[#2563eb] text-white rounded-r">0.1-alpha</span>
          </span>
          <span className="inline-flex items-center text-xs font-inter font-medium">
            <span className="px-2 py-0.5 bg-[#374151] text-white rounded-l">PRs</span>
            <span className="px-2 py-0.5 bg-[#16a34a] text-white rounded-r">Welcome</span>
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── Section 2 — STATS BAR ─────────────────────── */

function StatsBar() {
  const { ref, isInView } = useSectionInView();

  const stats = [
    { target: 47, label: "Contributors", suffix: "" },
    { target: 1200, label: "Commits", suffix: "+" },
    { target: 23145, label: "Verses Translated", suffix: "" },
    { target: 3, label: "Languages", suffix: "" },
  ];

  return (
    <section
      ref={ref}
      className="bg-[#f6f8fa] border-y border-[#e5e7eb]"
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatItem
              key={stat.label}
              target={stat.target}
              label={stat.label}
              suffix={stat.suffix}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  target,
  label,
  suffix,
  isInView,
}: {
  target: number;
  label: string;
  suffix: string;
  isInView: boolean;
}) {
  const count = useCountUp(target, isInView);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <p className="font-dm-sans text-3xl sm:text-4xl font-bold text-[#111827]">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-[#6b7280] font-inter">{label}</p>
    </motion.div>
  );
}

/* ─────────────────────── Section 3 — README-STYLE ─────────────────────── */

function ReadmeSection() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="border border-[#d1d5db] rounded-lg overflow-hidden"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fade}
          transition={{ duration: 0.7 }}
        >
          {/* File header bar */}
          <div className="bg-[#f6f8fa] border-b border-[#e5e7eb] px-4 py-3 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#6b7280]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-inter text-sm font-semibold text-[#1f2937]">
              README.md
            </span>
          </div>

          {/* Rendered markdown content */}
          <div className="px-6 py-8 md:px-10 md:py-10 font-inter text-[#1f2937]">
            {/* Title */}
            <h2 className="font-dm-sans text-3xl md:text-4xl font-bold text-[#111827] pb-4 mb-6 border-b border-[#e5e7eb]">
              TOV — The Open Version
            </h2>
            <p className="text-base md:text-lg text-[#374151] mb-8 leading-relaxed">
              The last English Bible translation ever.
            </p>

            {/* What is TOV */}
            <h3 className="font-dm-sans text-xl md:text-2xl font-bold text-[#111827] mt-8 mb-4">
              What is TOV?
            </h3>
            <p className="text-base text-[#374151] leading-relaxed mb-8">
              TOV is more than a translation — it&apos;s a living data structure
              that captures translator notes, manuscript evidence, textual
              variants, and cross-language mappings, all openly available and
              continuously improving.
            </p>

            {/* Quick Start */}
            <h3 className="font-dm-sans text-xl md:text-2xl font-bold text-[#111827] mt-8 mb-4">
              Quick Start
            </h3>
            <div className="bg-[#0d1117] rounded-md p-4 mb-8 overflow-x-auto">
              <code className="text-sm text-[#e6edf3] font-mono whitespace-pre">
                curl https://api.tov.bible/v1/passage?book=john&amp;chapter=3&amp;verse=16
              </code>
            </div>

            {/* Key Features */}
            <h3 className="font-dm-sans text-xl md:text-2xl font-bold text-[#111827] mt-8 mb-4">
              Key Features
            </h3>
            <ul className="space-y-2 text-base text-[#374151]">
              <li className="flex items-start gap-2">
                <span className="text-[#16a34a] mt-0.5 shrink-0">&#10004;</span>
                Fully open license — no restrictions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16a34a] mt-0.5 shrink-0">&#10004;</span>
                Full API access — no verse limits
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16a34a] mt-0.5 shrink-0">&#10004;</span>
                Commercial use allowed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16a34a] mt-0.5 shrink-0">&#10004;</span>
                Manuscript notes and variant readings included
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16a34a] mt-0.5 shrink-0">&#10004;</span>
                Continuously improving
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Section 4 — HOW TO CONTRIBUTE ─────────────────────── */

function HowToContribute() {
  const { ref, isInView } = useSectionInView();

  const cards = [
    {
      icon: "\uD83D\uDCDA",
      title: "Scholars",
      description:
        "Review translations, provide feedback on textual decisions, contribute to manuscript analysis. Every editorial decision is tracked and transparent.",
    },
    {
      icon: "\uD83D\uDCBB",
      title: "Developers",
      description:
        "Build tools, improve the API, contribute to the open-source codebase. Full access to JSON, XML, and plain text formats.",
    },
    {
      icon: "\uD83C\uDF0D",
      title: "Translators",
      description:
        "Help bring TOV to every language. The text in a particular language is almost the least interesting part — the data structure enables any language.",
    },
  ];

  return (
    <section ref={ref} className="bg-[#f6f8fa] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fade}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-dm-sans text-3xl md:text-4xl font-bold text-[#111827] mb-10">
            How to contribute
          </h2>

          {/* Banner image */}
          <div className="relative w-full h-56 md:h-72 rounded-lg overflow-hidden mb-10">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              className="bg-white border border-[#e5e7eb] rounded-lg p-6 hover:shadow-md transition-shadow"
              variants={item}
              transition={{ duration: 0.5 }}
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="font-dm-sans text-lg font-bold text-[#111827] mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-[#4b5563] font-inter leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Section 5 — PRINCIPLES ─────────────────────── */

function Principles() {
  const { ref, isInView } = useSectionInView();

  const principles = [
    "No copyrights. The Word of God belongs to everyone.",
    "No publishing rights. No one controls access.",
    "No one gets paid. This is a labor of love.",
    "No one takes credit. We are servants, not owners.",
    "Full transparency. Every decision documented and inspectable.",
    "Built on inerrancy. Committed to the authority of the original autographs.",
  ];

  return (
    <section ref={ref} className="bg-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          className="font-dm-sans text-3xl md:text-4xl font-bold text-[#111827] mb-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fade}
          transition={{ duration: 0.6 }}
        >
          Our Principles
        </motion.h2>

        <motion.ul
          className="space-y-5"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          {principles.map((principle) => (
            <motion.li
              key={principle}
              className="flex items-start gap-3"
              variants={item}
              transition={{ duration: 0.4 }}
            >
              <span className="text-[#16a34a] font-bold text-lg mt-0.5 shrink-0">
                &#10003;
              </span>
              <span className="font-inter text-base md:text-lg text-[#1f2937] font-medium leading-relaxed">
                {principle}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.blockquote
          className="mt-12 pl-5 border-l-4 border-[#e5e7eb] text-[#6b7280] font-inter text-base italic leading-relaxed"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fade}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          &ldquo;If we release ourselves of the need to be known or the need to make
          money, then all of this is readily achievable.&rdquo;
        </motion.blockquote>
      </div>
    </section>
  );
}

/* ─────────────────────── Section 6 — ROADMAP ─────────────────────── */

function Roadmap() {
  const { ref, isInView } = useSectionInView();

  const milestones = [
    {
      version: "v0.1 — English Translation",
      status: "In Progress",
      statusColor: "bg-[#16a34a]",
      description:
        "Initial translation by scholars from Princeton Theological Seminary and Ligonier Ministries",
    },
    {
      version: "v0.2 — Greek/Hebrew Linked",
      status: "Planned",
      statusColor: "bg-[#2563eb]",
      description:
        "Full linkage to open-source Greek NT and Hebrew texts via BICA partnership",
    },
    {
      version: "v1.0 — Complete Data Structure",
      status: "Planned",
      statusColor: "bg-[#2563eb]",
      description:
        "Full chain of attestation, manuscript evidence, textual variants, cross-language mappings",
    },
    {
      version: "Future — Every Language",
      status: "Vision",
      statusColor: "bg-[#7c3aed]",
      description:
        "Community-driven translations in every language, all built on the same open data structure",
    },
  ];

  return (
    <section ref={ref} className="bg-[#f6f8fa] py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          className="font-dm-sans text-3xl md:text-4xl font-bold text-[#111827] mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fade}
          transition={{ duration: 0.6 }}
        >
          Roadmap
        </motion.h2>

        <motion.div
          className="relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* Vertical timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#d1d5db]" />

          <div className="space-y-10">
            {milestones.map((m) => (
              <motion.div
                key={m.version}
                className="relative flex gap-6 items-start"
                variants={item}
                transition={{ duration: 0.5 }}
              >
                {/* Dot */}
                <div className="relative z-10 mt-1.5 shrink-0">
                  <div className="w-6 h-6 rounded-full bg-white border-[3px] border-[#d1d5db] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#6b7280]" />
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white border border-[#e5e7eb] rounded-lg p-5 flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-dm-sans text-base md:text-lg font-bold text-[#111827]">
                      {m.version}
                    </h3>
                    <span
                      className={`${m.statusColor} text-white text-xs font-inter font-medium px-2.5 py-0.5 rounded-full`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#4b5563] font-inter leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Section 7 — CTA ─────────────────────── */

function CallToAction() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-white border-t border-[#e5e7eb] py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fade}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-dm-sans text-3xl md:text-5xl font-bold text-[#111827] mb-8">
            This belongs to everyone.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#github"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#16a34a] text-white font-inter font-semibold text-sm rounded-md hover:bg-[#15803d] transition-colors"
            >
              Contribute on GitHub
            </a>
            <a
              href="#api"
              className="inline-flex items-center gap-1 px-6 py-3 bg-white text-[#1f2937] font-inter font-semibold text-sm rounded-md border border-[#d1d5db] hover:bg-[#f9fafb] transition-colors"
            >
              Use the API <span className="ml-1">&rarr;</span>
            </a>
          </div>

          {/* Community image */}
          <div className="mt-14 relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80"
              alt="Community whiteboard planning"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Section 8 — FOOTER ─────────────────────── */

function Footer() {
  const links = [
    "Preview",
    "Developers",
    "Compare",
    "Translation Philosophy",
    "API Docs",
    "GitHub",
    "Contact",
  ];

  return (
    <footer className="bg-[#f6f8fa] border-t border-[#e5e7eb]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Link row */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-[#6b7280] hover:text-[#111827] font-inter transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* License line */}
        <p className="text-center text-sm text-[#9ca3af] font-inter mb-4">
          Licensed under open license. Free to use. Free to share. Free to build with.
        </p>

        {/* Copyright */}
        <p className="text-center text-xs text-[#9ca3af] font-inter">
          TOV — The Open Version &copy; 2024
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────── Main Component ─────────────────────── */

export default function Version4() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <StatsBar />
      <ReadmeSection />
      <HowToContribute />
      <Principles />
      <Roadmap />
      <CallToAction />
      <Footer />
    </main>
  );
}
