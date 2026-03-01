"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const heroScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* ─────────────────── Section 1 — HERO ─────────────────── */

function Hero() {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <motion.div
        variants={heroScale}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center"
      >
        <h1 className="font-instrument text-[120px] md:text-[200px] lg:text-[280px] font-normal tracking-tight text-white leading-none select-none">
          TOV
        </h1>
        <p className="uppercase tracking-[0.3em] text-sm text-white/50 mt-4 font-inter">
          The Open Version
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-white/60" />
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 2 — TAGLINE ─────────────────── */

function Tagline() {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-black px-6"
    >
      <motion.h2
        variants={fade}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 1, ease: "easeOut" }}
        className="font-instrument text-4xl md:text-6xl lg:text-8xl text-white text-center font-normal leading-tight"
      >
        The Word. Free. Forever.
      </motion.h2>
    </section>
  );
}

/* ─────────────────── Section 3 — FULL-BLEED IMAGE + TEXT ─────────────────── */

function LockedSection() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920&q=80"
          alt="Ancient manuscript"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <p className="font-instrument text-3xl md:text-5xl text-white font-normal leading-snug">
            Every translation is locked.
          </p>
          <p className="font-instrument text-3xl md:text-5xl text-white font-normal leading-snug mt-2">
            This one isn&apos;t.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 4 — STATS ─────────────────── */

function Stats() {
  const { ref, isInView } = useSectionInView();

  const stats = [
    { number: "$0", label: "licensing fees" },
    { number: "0", label: "verse limits" },
    { number: "∞", label: "possibilities" },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-white px-6"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 lg:gap-32"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="font-instrument text-6xl md:text-8xl font-normal text-[#0a0a0a] leading-none">
              {stat.number}
            </div>
            <div className="text-sm uppercase tracking-widest text-gray-500 font-inter mt-4">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 5 — API CODE BLOCK ─────────────────── */

function ApiSection() {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center bg-white px-6"
    >
      <motion.div
        variants={fade}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        {/* Section label */}
        <p className="uppercase tracking-widest text-xs text-gray-400 font-inter text-center mb-12">
          For developers who build with purpose.
        </p>

        {/* Code block */}
        <div className="bg-[#f8f8f8] border border-gray-200 rounded-lg p-6 md:p-8 overflow-x-auto">
          <pre className="font-jetbrains text-sm md:text-base leading-relaxed">
            <code>
              <span className="text-emerald-600">GET</span>{" "}
              <span className="text-gray-700">
                /v1/passage?book=john&amp;chapter=3&amp;verse=16
              </span>
              {"\n\n"}
              <span className="text-gray-400">{"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-[#c9a84c]">&quot;text&quot;</span>
              <span className="text-gray-400">: </span>
              <span className="text-emerald-700">
                &quot;For God so loved the world...&quot;
              </span>
              <span className="text-gray-400">,</span>
              {"\n"}
              {"  "}
              <span className="text-[#c9a84c]">&quot;reference&quot;</span>
              <span className="text-gray-400">: </span>
              <span className="text-emerald-700">&quot;John 3:16&quot;</span>
              <span className="text-gray-400">,</span>
              {"\n"}
              {"  "}
              <span className="text-[#c9a84c]">
                &quot;manuscript_notes&quot;
              </span>
              <span className="text-gray-400">: </span>
              <span className="text-gray-500">[...]</span>
              <span className="text-gray-400">,</span>
              {"\n"}
              {"  "}
              <span className="text-[#c9a84c]">
                &quot;variant_readings&quot;
              </span>
              <span className="text-gray-400">: </span>
              <span className="text-gray-500">[...]</span>
              {"\n"}
              <span className="text-gray-400">{"}"}</span>
            </code>
          </pre>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 6 — FULL-BLEED QUOTE (parallax) ─────────────────── */

function QuoteSection() {
  const { ref, isInView } = useSectionInView();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <div className="absolute inset-0 scale-125">
          <Image
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80"
            alt="Dramatic light rays"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-black/60" />

      {/* Quote text */}
      <div ref={ref} className="relative z-10 px-6">
        <motion.p
          variants={fadeScale}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-instrument italic text-4xl md:text-6xl lg:text-7xl text-white text-center font-normal leading-tight max-w-4xl"
        >
          Abolish the Bible trade.
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────────── Section 7 — COMPARISON ─────────────────── */

function Comparison() {
  const { ref, isInView } = useSectionInView();

  const locked = [
    { name: "ESV", status: "Locked" },
    { name: "NIV", status: "Locked" },
    { name: "NASB", status: "Locked" },
    { name: "KJV", status: "Outdated" },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center bg-black px-6"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center space-y-4"
      >
        {locked.map((item, i) => (
          <motion.p
            key={i}
            variants={staggerItem}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-instrument text-2xl md:text-3xl text-gray-500 line-through decoration-gray-600"
          >
            {item.name} — {item.status}
          </motion.p>
        ))}

        <motion.div
          variants={staggerItem}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-8"
        >
          <p className="font-instrument text-3xl md:text-4xl lg:text-5xl text-white">
            TOV —{" "}
            <span className="text-[#c9a84c]">Open</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 8 — CREDIBILITY + CTA ─────────────────── */

function CredibilityCta() {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center bg-white px-6"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center max-w-3xl space-y-10"
      >
        {/* Credibility statement */}
        <motion.p
          variants={staggerItem}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-instrument text-2xl md:text-4xl text-[#0a0a0a] font-normal leading-snug"
        >
          Built by scholars from Princeton Theological Seminary and Ligonier
          Ministries.
        </motion.p>

        {/* Gold accent text */}
        <motion.p
          variants={staggerItem}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-instrument text-2xl md:text-4xl text-[#c9a84c] font-normal"
        >
          Free for everyone.
        </motion.p>

        {/* Email signup */}
        <motion.div
          variants={staggerItem}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 bg-transparent border-b border-gray-300 focus:border-[#0a0a0a] outline-none py-3 text-base font-inter text-[#0a0a0a] placeholder:text-gray-400 transition-colors"
            />
            <button className="bg-[#0a0a0a] text-white font-inter text-sm uppercase tracking-widest px-6 py-3 hover:bg-black transition-colors shrink-0">
              Notify me
            </button>
          </div>
          <p className="text-xs text-gray-400 font-inter mt-6">
            Be the first to read it.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 9 — FOOTER ─────────────────── */

function Footer() {
  const { ref, isInView } = useSectionInView();

  const links = [
    "Preview",
    "Developers",
    "Compare",
    "Philosophy",
    "API Docs",
    "GitHub",
    "Contact",
  ];

  return (
    <footer ref={ref} className="bg-black py-16 px-6">
      <motion.div
        variants={fade}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-8"
      >
        {/* Links row */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
          {links.map((link, i) => (
            <span key={i} className="flex items-center gap-2">
              <a
                href="#"
                className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors font-inter"
              >
                {link}
              </a>
              {i < links.length - 1 && (
                <span className="text-gray-600 text-xs">&middot;</span>
              )}
            </span>
          ))}
        </div>

        {/* Title */}
        <p className="font-instrument text-lg text-white">
          TOV — The Open Version
        </p>

        {/* Subtitle */}
        <p className="text-xs text-white/40 font-inter">
          Free to use. Free to share.
        </p>
      </motion.div>
    </footer>
  );
}

/* ─────────────────── Main Component ─────────────────── */

export default function Version5() {
  return (
    <main className="bg-black">
      <Hero />
      <Tagline />
      <LockedSection />
      <Stats />
      <ApiSection />
      <QuoteSection />
      <Comparison />
      <CredibilityCta />
      <Footer />
    </main>
  );
}
