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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const barReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

/* ─────────────────── Section 1 — HERO ─────────────────── */

function Hero() {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#0c0c0c] overflow-hidden flex items-center"
    >
      {/* Subtle architectural background */}
      <motion.div
        className="absolute inset-0 opacity-[0.07]"
        variants={fadeIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Image
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-12">
          {/* Left side — 60% */}
          <motion.div
            className="w-full lg:w-[60%] flex flex-col justify-center"
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <span className="font-jetbrains text-xs tracking-[0.3em] uppercase text-[#d4a052] mb-8">
              VERSION 0.1 — OPEN SOURCE
            </span>

            <h1 className="font-instrument text-6xl md:text-7xl lg:text-8xl text-[#f0ece4] font-normal leading-[0.95] mb-8">
              Scripture,
              <br />
              Unchained.
            </h1>

            <p className="font-inter text-lg text-[#f0ece4]/60 max-w-xl mb-10 leading-relaxed">
              A community-built, openly licensed English Bible translation. Free
              to read, free to build with, free to share. More than a
              translation — a living data structure.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-7 py-3 border border-[#f0ece4]/20 rounded-md font-inter text-sm text-[#f0ece4] hover:bg-[#f0ece4] hover:text-[#0c0c0c] transition-all duration-300"
              >
                Preview the Reader
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-7 py-3 bg-[#d4a052] rounded-md font-inter text-sm text-[#0c0c0c] font-medium hover:bg-[#e8a838] transition-colors duration-300"
              >
                View API Docs
              </a>
            </div>
          </motion.div>

          {/* Right side — 40% — Premium code block */}
          <motion.div
            className="w-full lg:w-[40%]"
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.25 }}
          >
            <div
              className="border border-[#ffffff10] bg-[#141414] rounded-xl overflow-hidden"
              style={{
                boxShadow:
                  "0 0 80px rgba(212, 160, 82, 0.06), 0 0 40px rgba(212, 160, 82, 0.03)",
              }}
            >
              {/* Header bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-[#ffffff08]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffffff15]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffffff10]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffffff10]" />
                <span className="ml-auto font-jetbrains text-xs text-[#f0ece4]/25">
                  api.tov.bible
                </span>
              </div>

              {/* Code content */}
              <div className="px-6 py-6 font-jetbrains text-sm leading-relaxed">
                <p className="text-[#d4a052]">
                  GET{" "}
                  <span className="text-[#f0ece4]/70">/v1/passage</span>
                </p>
                <p className="text-[#f0ece4]/70 ml-4">
                  ?book=
                  <span className="text-[#5ce0d8]/60">john</span>
                </p>
                <p className="text-[#f0ece4]/70 ml-4">
                  &amp;chapter=
                  <span className="text-[#5ce0d8]/60">3</span>
                </p>
                <p className="text-[#f0ece4]/70 ml-4">
                  &amp;verse=
                  <span className="text-[#5ce0d8]/60">16</span>
                </p>
                <br />
                <p className="text-[#f0ece4]/40">{"{"}</p>
                <p className="ml-4">
                  <span className="text-[#f0ece4]/70">&quot;text&quot;</span>
                  <span className="text-[#f0ece4]/30">: </span>
                  <span className="text-[#5ce0d8]/60">
                    &quot;For God so loved...&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">,</span>
                </p>
                <p className="ml-4">
                  <span className="text-[#f0ece4]/70">
                    &quot;manuscript_notes&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">: </span>
                  <span className="text-[#d4a052]">[...]</span>
                  <span className="text-[#f0ece4]/30">,</span>
                </p>
                <p className="ml-4">
                  <span className="text-[#f0ece4]/70">
                    &quot;variant_readings&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">: </span>
                  <span className="text-[#d4a052]">[...]</span>
                </p>
                <p className="text-[#f0ece4]/40">{"}"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 2 — CREDIBILITY RIBBON ─────────────────── */

function CredibilityRibbon() {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="bg-[#0c0c0c] border-t border-[#ffffff10] py-8"
    >
      <motion.div
        className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {["Princeton Theological Seminary", "Ligonier Ministries", "BICA Partnership"].map(
          (name, i) => (
            <span
              key={i}
              className="font-jetbrains text-xs tracking-[0.2em] uppercase text-[#f0ece4]/25"
            >
              {i > 0 && (
                <span className="hidden md:inline mr-12 text-[#f0ece4]/10">
                  ·
                </span>
              )}
              {name}
            </span>
          )
        )}
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 3 — THE PROBLEM ─────────────────── */

const problemBadges = [
  { name: "ESV", detail: "500 verse limit · No commercial use", color: "bg-red-500" },
  { name: "NIV", detail: "No public API · Restricted license", color: "bg-red-500" },
  { name: "NASB", detail: "No public API · Paid licensing", color: "bg-red-500" },
  { name: "KJV", detail: "Public domain · No modern apparatus", color: "bg-[#d4a052]" },
];

function TheProblem() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-[#0c0c0c] py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          {/* Left — Image */}
          <motion.div
            className="w-full lg:w-[45%]"
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80"
                alt="Luxury minimal interior"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            className="w-full lg:w-[55%]"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              variants={staggerItem}
              className="font-jetbrains text-xs tracking-widest uppercase text-[#d4a052] block mb-6"
            >
              THE PROBLEM
            </motion.span>

            <motion.h2
              variants={staggerItem}
              className="font-instrument text-3xl md:text-4xl text-[#f0ece4] font-normal leading-tight mb-8"
            >
              The most important text in history is locked behind paywalls.
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="font-inter text-base text-[#f0ece4]/50 leading-relaxed mb-12 max-w-lg"
            >
              Restrictive licensing prevents developers from building with
              Scripture. API rate limits strangle innovation. Verse quotation
              caps lock down sermons, apps, and study tools. The Word of God,
              gated by expensive fees and legal restrictions.
            </motion.p>

            {/* Status badges */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-col gap-3"
            >
              {problemBadges.map((badge) => (
                <motion.div
                  key={badge.name}
                  variants={staggerItem}
                  className="flex items-center gap-4 border border-[#ffffff08] rounded-full px-5 py-3"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${badge.color} shrink-0`}
                  />
                  <span className="font-jetbrains text-xs text-[#f0ece4]/70 font-medium w-12">
                    {badge.name}
                  </span>
                  <span className="font-inter text-xs text-[#f0ece4]/35">
                    {badge.detail}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 4 — THE SOLUTION ─────────────────── */

const featureCards = [
  {
    symbol: "∞",
    title: "No Limits",
    desc: "Zero verse limits. Zero API restrictions. Zero licensing fees. Full commercial use.",
  },
  {
    symbol: "{ }",
    title: "Developer First",
    desc: "JSON, XML, plain text. Full API access. No authentication required for basic use. Open source.",
  },
  {
    symbol: "◎",
    title: "Living Scholarship",
    desc: "Manuscript evidence, textual variants, translator notes. Continuously improving. Every decision transparent.",
  },
];

function TheSolution() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-[#0c0c0c] py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.h2
          className="font-instrument text-4xl md:text-5xl lg:text-6xl text-[#f0ece4] font-normal text-center mb-20"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Built different.
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featureCards.map((card) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              className="border border-[#ffffff10] bg-[#141414] rounded-xl p-10 lg:p-12 group hover:border-[#ffffff20] transition-colors duration-500"
            >
              <span className="block font-instrument text-6xl text-[#d4a052] mb-8 leading-none">
                {card.symbol}
              </span>
              <h3 className="font-inter text-lg font-semibold text-[#f0ece4] mb-4">
                {card.title}
              </h3>
              <p className="font-inter text-sm text-[#f0ece4]/50 leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 5 — THE API (cream palette inversion) ─────────────────── */

function TheAPI() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-[#f0ece4] py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            className="w-full lg:w-[45%]"
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="font-instrument text-4xl md:text-5xl text-[#0c0c0c] font-normal leading-tight mb-6">
              Elegance in every endpoint.
            </h2>
            <p className="font-inter text-base text-[#0c0c0c]/50 leading-relaxed mb-8 max-w-md">
              A REST API designed with care. Thoughtful responses, rich
              manuscript metadata, and structured variant readings — all
              available without authentication for basic use. Built for
              developers who build for the Kingdom.
            </p>
            <a
              href="#"
              className="font-inter text-sm text-[#d4a052] hover:text-[#e8a838] transition-colors inline-flex items-center gap-2"
            >
              Read full documentation
              <span className="text-lg leading-none">→</span>
            </a>
          </motion.div>

          {/* Right — Premium code block */}
          <motion.div
            className="w-full lg:w-[55%]"
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <div
              className="bg-[#0c0c0c] rounded-xl overflow-hidden"
              style={{
                boxShadow:
                  "0 25px 80px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(0, 0, 0, 0.15)",
              }}
            >
              {/* Header bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-[#ffffff08]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffffff15]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffffff10]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffffff10]" />
                <span className="ml-auto font-jetbrains text-xs text-[#f0ece4]/25">
                  terminal
                </span>
              </div>

              <div className="px-6 py-6 font-jetbrains text-[13px] leading-relaxed overflow-x-auto">
                <p className="text-[#f0ece4]/40">
                  ${" "}
                  <span className="text-[#f0ece4]/70">
                    curl api.tov.bible/v1/passage?book=john&amp;chapter=3&amp;verse=16
                  </span>
                </p>
                <br />
                <p className="text-[#f0ece4]/40">{"{"}</p>
                <p className="ml-4">
                  <span className="text-[#f0ece4]/70">
                    &quot;reference&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">: </span>
                  <span className="text-[#5ce0d8]/60">
                    &quot;John 3:16&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">,</span>
                </p>
                <p className="ml-4">
                  <span className="text-[#f0ece4]/70">&quot;text&quot;</span>
                  <span className="text-[#f0ece4]/30">: </span>
                  <span className="text-[#5ce0d8]/60">
                    &quot;For God so loved the world,
                  </span>
                </p>
                <p className="ml-16">
                  <span className="text-[#5ce0d8]/60">
                    that he gave his only Son...&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">,</span>
                </p>
                <p className="ml-4">
                  <span className="text-[#f0ece4]/70">
                    &quot;translation&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">: </span>
                  <span className="text-[#5ce0d8]/60">
                    &quot;TOV v0.1&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">,</span>
                </p>
                <p className="ml-4">
                  <span className="text-[#f0ece4]/70">
                    &quot;manuscript_notes&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">: [</span>
                </p>
                <p className="ml-8">
                  <span className="text-[#f0ece4]/40">{"{ "}</span>
                  <span className="text-[#f0ece4]/70">&quot;source&quot;</span>
                  <span className="text-[#f0ece4]/30">: </span>
                  <span className="text-[#5ce0d8]/60">&quot;P66&quot;</span>
                  <span className="text-[#f0ece4]/30">, </span>
                  <span className="text-[#f0ece4]/70">&quot;date&quot;</span>
                  <span className="text-[#f0ece4]/30">: </span>
                  <span className="text-[#5ce0d8]/60">
                    &quot;~200 CE&quot;
                  </span>
                  <span className="text-[#f0ece4]/40">{" }"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-[#f0ece4]/30">],</span>
                </p>
                <p className="ml-4">
                  <span className="text-[#f0ece4]/70">
                    &quot;variant_readings&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">: [</span>
                </p>
                <p className="ml-8">
                  <span className="text-[#f0ece4]/40">{"{ "}</span>
                  <span className="text-[#f0ece4]/70">
                    &quot;variant&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">: </span>
                  <span className="text-[#5ce0d8]/60">
                    &quot;μονογενῆ&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">, </span>
                  <span className="text-[#f0ece4]/70">
                    &quot;adopted&quot;
                  </span>
                  <span className="text-[#f0ece4]/30">: </span>
                  <span className="text-[#d4a052]">true</span>
                  <span className="text-[#f0ece4]/40">{" }"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-[#f0ece4]/30">]</span>
                </p>
                <p className="text-[#f0ece4]/40">{"}"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 6 — COMPARISON ─────────────────── */

const comparisonData = [
  {
    name: "TOV",
    width: "100%",
    color: "bg-[#d4a052]",
    glow: true,
    detail: "Fully open · No limits · Modern scholarship",
  },
  {
    name: "ESV",
    width: "25%",
    color: "bg-red-500/40",
    glow: false,
    detail: "Crossway copyright · 500 verse limit",
  },
  {
    name: "NIV",
    width: "20%",
    color: "bg-red-500/40",
    glow: false,
    detail: "Zondervan copyright · No API",
  },
  {
    name: "NASB",
    width: "22%",
    color: "bg-red-500/40",
    glow: false,
    detail: "Lockman Foundation · Paid licensing",
  },
  {
    name: "KJV",
    width: "55%",
    color: "bg-[#d4a052]/40",
    glow: false,
    detail: "Public domain · No modern apparatus",
  },
];

function Comparison() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-[#0c0c0c] py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.h2
          className="font-instrument text-3xl md:text-4xl text-[#f0ece4] font-normal text-center mb-20"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          How we compare.
        </motion.h2>

        <motion.div
          className="flex flex-col gap-6 max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {comparisonData.map((item) => (
            <motion.div key={item.name} variants={staggerItem}>
              <div className="flex items-center gap-6 mb-2">
                <span className="font-jetbrains text-sm text-[#f0ece4]/70 w-14 shrink-0 font-medium">
                  {item.name}
                </span>
                <div className="flex-1 h-3 bg-[#ffffff06] rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${item.color} rounded-full`}
                    style={{
                      width: item.width,
                      transformOrigin: "left",
                      boxShadow: item.glow
                        ? "0 0 20px rgba(212, 160, 82, 0.4), 0 0 40px rgba(212, 160, 82, 0.15)"
                        : "none",
                    }}
                    variants={barReveal}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  />
                </div>
              </div>
              <span className="font-inter text-xs text-[#f0ece4]/25 ml-20">
                {item.detail}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 7 — PHILOSOPHY ─────────────────── */

function Philosophy() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-[#0c0c0c] py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          {/* Left — Image */}
          <motion.div
            className="w-full lg:w-[45%]"
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
                alt="Abstract data globe"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            className="w-full lg:w-[55%]"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={staggerItem}
              className="font-instrument text-3xl md:text-4xl text-[#f0ece4] font-normal leading-tight mb-8"
            >
              Built on conviction.
              <br />
              Open by design.
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="font-inter text-base text-[#f0ece4]/50 leading-relaxed mb-6 max-w-lg"
            >
              TOV holds an unwavering commitment to biblical inerrancy while
              embracing a balanced, transparent approach to translation. Every
              textual decision is documented, every variant reading is preserved,
              and every manuscript source is cited.
            </motion.p>

            <motion.p
              variants={staggerItem}
              className="font-inter text-base text-[#f0ece4]/50 leading-relaxed mb-10 max-w-lg"
            >
              We believe the best scholarship should be freely available.
              Not locked in academic journals. Not gated behind paywalls.
              Open to every pastor, every developer, every reader.
            </motion.p>

            <motion.blockquote
              variants={staggerItem}
              className="border-l-2 border-[#d4a052] pl-6 py-2"
            >
              <p className="font-instrument text-xl md:text-2xl text-[#f0ece4]/80 italic leading-relaxed">
                &ldquo;Not just a good translation — the best repository of
                human knowledge about God&apos;s Word in one place.&rdquo;
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 8 — CTA SIGNUP ─────────────────── */

function CTASignup() {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="relative bg-[#0c0c0c] py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle bg image */}
      <div className="absolute inset-0 opacity-[0.04]">
        <Image
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto"
        >
          <motion.span
            variants={staggerItem}
            className="font-jetbrains text-xs tracking-[0.3em] uppercase text-[#d4a052] block mb-8"
          >
            JOIN THE FUTURE
          </motion.span>

          <motion.h2
            variants={staggerItem}
            className="font-instrument text-5xl md:text-6xl text-[#f0ece4] font-normal leading-tight mb-12"
          >
            The Word.
            <br />
            Free. Forever.
          </motion.h2>

          {/* Email input */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 max-w-md mx-auto mb-10"
          >
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border-b border-[#ffffff20] pb-3 font-inter text-base text-[#f0ece4] placeholder:text-[#f0ece4]/25 focus:outline-none focus:border-[#d4a052] transition-colors"
              />
            </div>
            <button className="px-6 py-3 bg-[#d4a052] rounded-md font-inter text-sm text-[#0c0c0c] font-medium hover:bg-[#e8a838] transition-colors whitespace-nowrap">
              Get Early Access
            </button>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="flex items-center justify-center gap-8"
          >
            <a
              href="#"
              className="font-inter text-xs text-[#f0ece4]/30 hover:text-[#f0ece4]/60 transition-colors uppercase tracking-wider"
            >
              Preview Reader
            </a>
            <a
              href="#"
              className="font-inter text-xs text-[#f0ece4]/30 hover:text-[#f0ece4]/60 transition-colors uppercase tracking-wider"
            >
              Developer Docs
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 9 — FOOTER ─────────────────── */

function Footer() {
  return (
    <footer className="bg-[#0c0c0c] border-t border-[#ffffff10] py-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          {/* Left — Brand */}
          <div>
            <span className="font-instrument text-2xl text-[#f0ece4] block mb-1">
              TOV
            </span>
            <span className="font-inter text-xs text-[#f0ece4]/30">
              The Open Version
            </span>
          </div>

          {/* Center — Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              "Preview",
              "Developers",
              "Compare",
              "Philosophy",
              "API Docs",
              "GitHub",
              "Contact",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="font-inter text-xs text-[#f0ece4]/30 uppercase tracking-wider hover:text-[#f0ece4]/60 transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right — Legal */}
          <div className="text-right">
            <span className="font-inter text-xs text-[#f0ece4]/30 block mb-1">
              Free to use. Free to share.
            </span>
            <span className="font-inter text-xs text-[#f0ece4]/20">
              © 2024
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────── MAIN EXPORT ─────────────────── */

export default function Version6() {
  return (
    <main className="bg-[#0c0c0c] min-h-screen">
      <Hero />
      <CredibilityRibbon />
      <TheProblem />
      <TheSolution />
      <TheAPI />
      <Comparison />
      <Philosophy />
      <CTASignup />
      <Footer />
    </main>
  );
}
