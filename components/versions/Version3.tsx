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

const fadeScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

/* ─────────────────── Section 1 — HERO ─────────────────── */

function Hero() {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80"
          alt="Sunrise over mountains"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.h1
          className="font-instrument text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight"
          variants={fade}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          The last English Bible
          <br />
          translation ever.
        </motion.h1>

        <motion.p
          className="mt-8 text-lg md:text-xl text-white/80 font-inter tracking-wide"
          variants={fade}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          An open-source translation. Free forever.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 2 — MISSION STATEMENT ─────────────────── */

function MissionStatement() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-[#faf7f2] py-24 md:py-32 px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.h2
          className="font-instrument text-3xl md:text-5xl lg:text-6xl font-bold text-[#3b1f0b] leading-tight"
          variants={fade}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          What if God&apos;s Word
          <br className="hidden md:block" />
          was truly free?
        </motion.h2>

        <motion.div
          className="mt-10 md:mt-14 space-y-6 text-lg md:text-xl text-[#5c3317]/80 font-inter leading-relaxed max-w-3xl mx-auto"
          variants={fade}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          <p>
            Free to read. Free to share. Free to build with.
            <br className="hidden md:block" />
            No paywalls. No permissions. No restrictions.
          </p>
          <p>
            TOV is more than a translation — it&apos;s a living data structure
            that captures translator notes, manuscript evidence, textual
            variants, and cross-language mappings, all openly available and
            continuously improving.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 3 — THE PROBLEM ─────────────────── */

function TheProblem() {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax-style background */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.h2
          className="font-instrument text-4xl md:text-6xl font-bold text-white leading-tight mb-12 md:mb-16"
          variants={fade}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          How Scripture
          <br />
          got locked up
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/85 font-inter leading-relaxed mb-8"
          variants={fade}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Most English Bible translations are controlled by licensing
          restrictions and publishing rights. Developers face API limits and
          expensive fees. Ministries need permission to quote God&apos;s Word.
          Mobile apps pay per verse.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-white/85 font-inter leading-relaxed mb-8"
          variants={fade}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The Bible — the most important text in human history — is locked
          behind paywalls and legal barriers. It&apos;s a model built for
          Gutenberg, not the 21st century.
        </motion.p>

        <motion.p
          className="text-2xl md:text-4xl font-instrument font-bold text-white mt-12 md:mt-16 leading-snug"
          variants={fade}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          We don&apos;t need the
          <br />
          Gutenberg model anymore.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 4 — THE VISION ─────────────────── */

function TheVision() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-[#faf7f2] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
        {/* Image side */}
        <motion.div
          className="relative h-[400px] lg:h-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeLeft}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=1920&q=80"
            alt="Church interior with warm light"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Text side */}
        <motion.div
          className="flex items-center px-8 md:px-16 lg:px-20 py-16 md:py-24"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeRight}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="max-w-xl">
            <h2 className="font-instrument text-3xl md:text-5xl font-bold text-[#3b1f0b] leading-tight mb-8">
              More than
              <br />
              a translation
            </h2>

            <div className="space-y-6 text-lg text-[#5c3317]/80 font-inter leading-relaxed">
              <p>
                Imagine drilling down from an English verse to a third-century
                manuscript. Imagine seeing every textual variant, every
                translator&apos;s note, every scholarly decision — all open, all
                inspectable, all free.
              </p>
              <p>
                TOV isn&apos;t just a good translation. It&apos;s the best
                repository of human knowledge about God&apos;s Word in one
                place. A living data structure that captures everything we know
                about the biblical text.
              </p>
            </div>

            <a
              href="#philosophy"
              className="inline-flex items-center mt-10 text-[#c2410c] font-inter font-semibold text-lg hover:text-[#ea580c] transition-colors group"
            >
              Read the Translation Philosophy
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 5 — TIM KELLER QUOTE ─────────────────── */

function KellerQuote() {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1920&q=80"
          alt="Golden field at sunrise"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#3b1f0b]/70" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center py-24"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeScale}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p className="font-instrument text-4xl md:text-6xl lg:text-7xl italic text-white leading-tight">
          &ldquo;Abolish the
          <br />
          Bible trade.&rdquo;
        </p>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 6 — SECOND QUOTE ─────────────────── */

function SecondQuote() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-[#f5f0e8] py-24 md:py-32 px-6">
      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fade}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <blockquote className="border-l-4 border-[#c2410c] pl-8 md:pl-12">
          <p className="font-instrument text-2xl md:text-3xl lg:text-4xl text-[#3b1f0b] leading-snug italic">
            &ldquo;If we release ourselves of the need to be known or the need
            to make money, then all of this is readily achievable.&rdquo;
          </p>
        </blockquote>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 7 — WHO'S BEHIND IT ─────────────────── */

function WhoBehindIt() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-[#faf7f2] py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-instrument text-3xl md:text-5xl font-bold text-[#3b1f0b] leading-tight mb-16 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fade}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Servants, not owners.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image card */}
          <motion.div
            className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeLeft}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80"
              alt="Stack of aged books"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            className="space-y-6 text-lg text-[#5c3317]/80 font-inter leading-relaxed"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeRight}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <p>
              Scholars and editors from Princeton Theological Seminary and
              Ligonier Ministries are producing the initial v0.1 translation.
            </p>
            <p>
              In partnership with BICA for open-source Greek New Testament and
              Hebrew texts. Every editorial decision is tracked and transparent.
            </p>
            <p>
              Built on a commitment to the inerrancy of the original autographs.
            </p>
            <p className="text-[#3b1f0b] font-medium italic">
              These are servants of the text, not owners of it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Section 8 — CTA ─────────────────── */

function CTA() {
  const { ref, isInView } = useSectionInView();

  return (
    <section ref={ref} className="bg-[#3b1f0b] py-24 md:py-32 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.h2
          className="font-instrument text-4xl md:text-6xl font-bold text-white leading-tight mb-12"
          variants={fade}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Join the movement.
        </motion.h2>

        {/* Email signup */}
        <motion.form
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-12"
          variants={fade}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-6 py-4 rounded-full bg-[#5c3317] text-white placeholder-white/50 font-inter text-base border border-[#7a4a2a] focus:outline-none focus:border-[#ea580c] focus:ring-2 focus:ring-[#ea580c]/30 transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-[#ea580c] hover:bg-[#c2410c] text-white font-inter font-semibold rounded-full text-base transition-colors whitespace-nowrap"
          >
            Get Notified
          </button>
        </motion.form>

        {/* Links */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70 font-inter"
          variants={fade}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
        >
          <a
            href="#preview"
            className="hover:text-[#ea580c] transition-colors underline underline-offset-4"
          >
            Or preview the reader
          </a>
          <span className="hidden sm:inline text-white/30">|</span>
          <a
            href="#philosophy"
            className="hover:text-[#ea580c] transition-colors underline underline-offset-4"
          >
            Read the Translation Philosophy
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Section 9 — FOOTER ─────────────────── */

function Footer() {
  const links = [
    { label: "Preview", href: "#preview" },
    { label: "Developers", href: "#developers" },
    { label: "Compare", href: "#compare" },
    { label: "Translation Philosophy", href: "#philosophy" },
    { label: "API Docs", href: "#api" },
    { label: "GitHub", href: "#github" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-[#2a1508] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          {/* Brand */}
          <div>
            <p className="font-instrument text-2xl text-[#f5f0e8] font-bold">
              TOV — The Open Version
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#f5f0e8]/60 hover:text-[#ea580c] font-inter text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-[#5c3317]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[#f5f0e8]/50 font-inter text-sm">
            Free to use. Free to share.
          </p>
          <p className="text-[#f5f0e8]/40 font-inter text-xs">
            Released under an open license. No rights reserved on the
            translation text.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────── MAIN EXPORT ─────────────────── */

export default function Version3() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <MissionStatement />
      <TheProblem />
      <TheVision />
      <KellerQuote />
      <SecondQuote />
      <WhoBehindIt />
      <CTA />
      <Footer />
    </main>
  );
}
