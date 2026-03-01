"use client";

import { useRef } from "react";
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

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* ─────────────────────── Section 1 — HERO ─────────────────────── */

function Hero() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* background image — faded overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=80"
          alt="Library books"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/90" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center py-32"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fade}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#0f172a] leading-tight tracking-tight">
          The Word. Free. Forever.
        </h1>

        <p className="mt-8 text-lg sm:text-xl md:text-2xl text-[#1e293b]/80 max-w-2xl mx-auto font-inter leading-relaxed">
          An open-source, freely licensed English Bible translation — free to read,
          free to build with, free to share.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#preview"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#0f172a] text-white font-inter font-semibold rounded-lg text-base hover:bg-[#1e293b] transition-colors"
          >
            Preview the Reader
          </a>
          <a
            href="#developers"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#0f172a] text-[#0f172a] font-inter font-semibold rounded-lg text-base hover:bg-[#0f172a] hover:text-white transition-colors"
          >
            For Developers
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 2 — CREDIBILITY BAR ──────────────── */

function CredibilityBar() {
  const { ref, isInView } = useSectionInView();

  const partners = [
    "Princeton Theological Seminary",
    "Ligonier Ministries",
    "BICA Partnership",
  ];

  return (
    <motion.section
      ref={ref}
      className="bg-[#f5f5f4] border-y border-gray-200"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={slideUp}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
        {partners.map((name) => (
          <span
            key={name}
            className="font-playfair uppercase tracking-[0.25em] text-sm sm:text-base text-[#1e293b]/50 select-none"
          >
            {name}
          </span>
        ))}
      </div>
    </motion.section>
  );
}

/* ─────────────────── Section 3 — PROBLEM ──────────────────────── */

function ProblemSection() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* text */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeLeft}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-sm font-inter font-semibold uppercase tracking-widest text-[#b8860b] mb-4">
              The Problem
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#0f172a] leading-tight">
              Scripture is locked&nbsp;up.
            </h2>
            <div className="mt-8 space-y-5 text-[#1e293b]/80 font-inter text-lg leading-relaxed">
              <p>
                Most English Bible translations are controlled by licensing restrictions
                and publishing rights. Developers face API limits and expensive fees.
                Ministries need permission to quote God&rsquo;s Word.
              </p>
              <p>
                Mobile apps pay per verse. The Bible — the most important text in human
                history — is locked behind paywalls and legal barriers.
              </p>
            </div>
          </motion.div>

          {/* image */}
          <motion.div
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeRight}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80"
              alt="Grand library with rows of books"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 4 — SOLUTION ─────────────────────── */

const solutionCards = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Fully Open License",
    description: "No restrictions, no permissions needed. Use it however you want — commercially, personally, or in ministry.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a23.838 23.838 0 0 0-1.012 5.434c3.58.766 7.296 1.166 11.093 1.166 3.797 0 7.514-.4 11.093-1.166a23.84 23.84 0 0 0-1.012-5.434m-15.482 0A47.578 47.578 0 0 1 12 8.59c2.82 0 5.573.26 8.222.757m-16.444 0a22.23 22.23 0 0 1 .36-2.396C5.697 4.576 8.647 3 12 3s6.303 1.576 7.862 3.951c.14.225.27.455.389.69m0 0a22.076 22.076 0 0 1-.03.206" />
      </svg>
    ),
    title: "Scholarly Foundation",
    description: "Built by scholars from Princeton & Ligonier with rigorous academic methodology and theological faithfulness.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
      </svg>
    ),
    title: "Living Translation",
    description: "Continuously improving as scholarship advances and new manuscripts are discovered. Never 'finished.'",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Developer First",
    description: "Full API access, no limits, every format. JSON, XML, plain text — whatever your application needs.",
  },
];

function SolutionSection() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-[#fafafa] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fade}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-inter font-semibold uppercase tracking-widest text-[#b8860b] mb-4">
            The Solution
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#0f172a] leading-tight">
            We&rsquo;re building something different.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutionCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fade}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="text-[#b8860b] mb-5">{card.icon}</div>
              <h3 className="font-playfair text-xl font-bold text-[#0f172a] mb-3">
                {card.title}
              </h3>
              <p className="font-inter text-[#1e293b]/70 text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 5 — COMPARISON TABLE ─────────────── */

const comparisonData = {
  headers: ["", "TOV", "ESV", "NIV", "NASB", "KJV"],
  rows: [
    {
      label: "License",
      values: ["Fully Open", "Crossway copyright", "Zondervan copyright", "Lockman Foundation", "Public Domain"],
    },
    {
      label: "API Access",
      values: ["Full, no limits", "500 verse limit", "No public API", "No public API", "No standard"],
    },
    {
      label: "Commercial Use",
      values: ["Yes", "No", "Restricted", "Paid", "Yes"],
    },
    {
      label: "Modern Apparatus",
      values: ["Yes", "Limited", "Limited", "Limited", "None"],
    },
  ],
};

function ComparisonTable() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fade}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-inter font-semibold uppercase tracking-widest text-[#b8860b] mb-4">
            Comparison
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#0f172a] leading-tight">
            How TOV Compares
          </h2>
        </motion.div>

        <motion.div
          className="overflow-x-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fade}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                {comparisonData.headers.map((header, i) => (
                  <th
                    key={header || "label"}
                    className={`text-left font-playfair text-sm sm:text-base font-bold py-4 px-4 sm:px-6 border-b-2 border-gray-200 ${
                      i === 1
                        ? "bg-[#b8860b]/10 text-[#b8860b] border-b-[#b8860b]"
                        : "text-[#0f172a]"
                    } ${i === 0 ? "w-40" : ""}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.rows.map((row, rowIdx) => (
                <tr
                  key={row.label}
                  className={rowIdx % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}
                >
                  <td className="font-inter font-semibold text-[#0f172a] text-sm py-4 px-4 sm:px-6">
                    {row.label}
                  </td>
                  {row.values.map((val, colIdx) => (
                    <td
                      key={`${row.label}-${colIdx}`}
                      className={`font-inter text-sm py-4 px-4 sm:px-6 ${
                        colIdx === 0
                          ? "bg-[#b8860b]/10 text-[#0f172a] font-semibold"
                          : "text-[#1e293b]/70"
                      }`}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────── Section 6 — TRANSLATION PHILOSOPHY ────────────── */

function PhilosophySection() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-[#fafafa] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* image */}
          <motion.div
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeLeft}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80"
              alt="Studying with books"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* text */}
          <motion.div
            className="order-1 lg:order-2"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeRight}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <p className="text-sm font-inter font-semibold uppercase tracking-widest text-[#b8860b] mb-4">
              Translation Philosophy
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#0f172a] leading-tight">
              Built on conviction. Open by&nbsp;design.
            </h2>
            <div className="mt-8 space-y-5 text-[#1e293b]/80 font-inter text-lg leading-relaxed">
              <p>
                Built on a commitment to the inerrancy of the original autographs. TOV
                takes a balanced approach: word-level accuracy with natural English
                readability.
              </p>
              <p>
                Every editorial decision is tracked and transparent — never
                &ldquo;finished,&rdquo; but continuously improving as scholarship
                advances and new manuscripts are discovered.
              </p>
            </div>
            <a
              href="#philosophy"
              className="inline-flex items-center mt-8 text-[#b8860b] font-inter font-semibold hover:underline text-base group"
            >
              Read the Translation Philosophy
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 7 — CTA ──────────────────────────── */

function CtaSection() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80"
          alt="Library books"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0f172a]/92" />
      </div>

      <motion.div
        className="relative z-10 max-w-2xl mx-auto px-6 text-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fade}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white leading-tight">
          See it for yourself.
        </h2>
        <p className="mt-6 text-lg text-white/70 font-inter leading-relaxed">
          TOV is currently in active development. Sign up to be notified when the
          preview reader and full API are available.
        </p>

        {/* email form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="you@email.com"
            className="flex-1 w-full sm:w-auto px-5 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-inter text-base focus:outline-none focus:ring-2 focus:ring-[#d4a843]/60"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 bg-[#b8860b] hover:bg-[#d4a843] text-white font-inter font-semibold rounded-lg text-base transition-colors whitespace-nowrap"
          >
            Get Notified
          </button>
        </form>

        <p className="mt-8 text-white/50 font-inter text-sm">
          Or{" "}
          <a href="#preview" className="text-[#d4a843] hover:underline">
            explore the Preview Reader
          </a>
        </p>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 8 — FOOTER ───────────────────────── */

const footerColumns = [
  {
    title: "Product",
    links: ["Preview", "Developers", "Compare"],
  },
  {
    title: "Resources",
    links: ["Translation Philosophy", "API Docs", "GitHub"],
  },
  {
    title: "Connect",
    links: ["Contact", "License"],
  },
];

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {/* brand */}
          <div className="col-span-2 sm:col-span-1">
            <span className="font-playfair text-2xl font-bold tracking-tight">
              TOV
            </span>
            <p className="mt-3 text-sm text-white/50 font-inter leading-relaxed">
              The Open Version. A freely licensed English Bible translation for
              everyone.
            </p>
          </div>

          {/* link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-inter font-semibold text-sm uppercase tracking-wider text-white/70 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-inter text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-sm text-white/40">
            TOV — The Open Version
          </p>
          <p className="font-inter text-sm text-white/40">
            Free to use. Free to share. &copy; 2024
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════ MAIN EXPORT ═══════════════════════════════ */

export default function Version1() {
  return (
    <main className="font-inter bg-white text-[#0f172a]">
      <Hero />
      <CredibilityBar />
      <ProblemSection />
      <SolutionSection />
      <ComparisonTable />
      <PhilosophySection />
      <CtaSection />
      <Footer />
    </main>
  );
}
