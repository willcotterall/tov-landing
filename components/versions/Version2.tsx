"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  ANIMATION HELPERS                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ------------------------------------------------------------------ */
/*  1. HERO                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #111118 100%)" }}
    >
      {/* faint matrix bg */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 lg:py-0">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center"
        >
          {/* Left copy */}
          <div>
            <motion.h1
              variants={fadeUp}
              className="font-dm-sans text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-white"
            >
              Build with
              <br />
              Scripture.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-2 font-dm-sans text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-[#00ff88]"
            >
              No restrictions.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-lg text-lg leading-relaxed text-white/60 font-dm-sans"
            >
              Full API access. No verse limits. No API key required. JSON, XML,
              plain text. Commercial use allowed.{" "}
              <span className="text-white/90 font-medium">Open source.</span>
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#cta"
                className="inline-flex items-center rounded-lg bg-[#00ff88] px-6 py-3 text-sm font-semibold text-[#0a0a0f] transition hover:bg-[#00ff88]/90"
              >
                Get Started
              </a>
              <a
                href="#demo"
                className="inline-flex items-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                See the API
              </a>
            </motion.div>
          </div>

          {/* Right: floating code block */}
          <motion.div variants={fadeUp} className="relative">
            <div
              className="relative rounded-xl border border-[#00ff88]/30 bg-[#0d0d14] p-6 font-jetbrains text-sm leading-relaxed shadow-2xl overflow-x-auto"
              style={{
                boxShadow:
                  "0 0 60px rgba(0,255,136,0.08), 0 0 20px rgba(0,255,136,0.05)",
              }}
            >
              {/* dots */}
              <div className="mb-5 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>

              <pre className="whitespace-pre text-[13px] sm:text-sm">
                <code>
                  <span className="code-method">GET</span>{" "}
                  <span className="code-string">/v1/passage</span>
                  <span className="code-punctuation">?</span>
                  <span className="code-property">book</span>
                  <span className="code-punctuation">=</span>
                  <span className="code-string">john</span>
                  <span className="code-punctuation">&amp;</span>
                  <span className="code-property">chapter</span>
                  <span className="code-punctuation">=</span>
                  <span className="code-number">3</span>
                  <span className="code-punctuation">&amp;</span>
                  <span className="code-property">verse</span>
                  <span className="code-punctuation">=</span>
                  <span className="code-number">16</span>
                  {"\n\n"}
                  <span className="code-bracket">{"{"}</span>
                  {"\n"}
                  {"  "}
                  <span className="code-property">&quot;text&quot;</span>
                  <span className="code-punctuation">: </span>
                  <span className="code-string">
                    &quot;For God so loved the world...&quot;
                  </span>
                  <span className="code-punctuation">,</span>
                  {"\n"}
                  {"  "}
                  <span className="code-property">&quot;reference&quot;</span>
                  <span className="code-punctuation">: </span>
                  <span className="code-string">&quot;John 3:16&quot;</span>
                  <span className="code-punctuation">,</span>
                  {"\n"}
                  {"  "}
                  <span className="code-property">
                    &quot;manuscript_notes&quot;
                  </span>
                  <span className="code-punctuation">: </span>
                  <span className="code-bracket">[...]</span>
                  <span className="code-punctuation">,</span>
                  {"\n"}
                  {"  "}
                  <span className="code-property">
                    &quot;variant_readings&quot;
                  </span>
                  <span className="code-punctuation">: </span>
                  <span className="code-bracket">[...]</span>
                  {"\n"}
                  <span className="code-bracket">{"}"}</span>
                </code>
              </pre>
            </div>

            {/* glow blob behind card */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-[#00ff88]/[0.04] blur-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. WE KNOW THE PAIN                                                */
/* ------------------------------------------------------------------ */

const painCards = [
  {
    type: "error",
    label: "ERROR",
    body: "ESV API \u2014 500 verse limit exceeded. Crossway copyright. No commercial use.",
  },
  {
    type: "error",
    label: "ERROR",
    body: "NIV \u2014 No public API available. Zondervan copyright. Restricted licensing.",
  },
  {
    type: "error",
    label: "ERROR",
    body: "NASB \u2014 No public API. Lockman Foundation. Paid licensing required.",
  },
  {
    type: "warn",
    label: "INFO",
    body: "KJV \u2014 Public domain. No modern scholarly apparatus. No standard API.",
  },
];

function PainSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorMap: Record<string, string> = {
    error: "#ef4444",
    warn: "#f59e0b",
  };

  return (
    <section
      ref={ref}
      className="relative py-28 lg:py-36"
      style={{ background: "#0a0a0f" }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-4 text-center font-dm-sans text-3xl sm:text-4xl font-bold text-white"
        >
          We know the pain.
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mx-auto mb-14 max-w-2xl text-center text-white/50 font-dm-sans text-lg"
        >
          Every developer building with Scripture hits the same walls.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid gap-4 sm:grid-cols-2"
        >
          {painCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-lg border bg-[#111118] p-5 font-jetbrains text-sm"
              style={{ borderColor: `${colorMap[card.type]}33` }}
            >
              <span
                className="mr-2 rounded px-2 py-0.5 text-xs font-bold"
                style={{
                  background: `${colorMap[card.type]}22`,
                  color: colorMap[card.type],
                }}
              >
                {card.label}
              </span>
              <span className="text-white/70">{card.body}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Success card */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mt-6 rounded-lg border border-[#00ff88]/30 bg-[#00ff88]/[0.06] p-5 font-jetbrains text-sm"
          style={{
            boxShadow: "0 0 40px rgba(0,255,136,0.06)",
          }}
        >
          <span className="mr-2 rounded bg-[#00ff88]/20 px-2 py-0.5 text-xs font-bold text-[#00ff88]">
            SUCCESS
          </span>
          <span className="text-[#00ff88]/90">
            TOV &mdash; Fully open. No limits. No licensing. No fees. Transparent
            scholarship.
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. FEATURE GRID                                                    */
/* ------------------------------------------------------------------ */

const features = [
  {
    title: "Zero Verse Limits",
    desc: "Query the entire Bible without restrictions. No rate limits, no quotas.",
  },
  {
    title: "Every Format",
    desc: "JSON, XML, plain text. Pick your poison.",
  },
  {
    title: "Commercial Use",
    desc: "Build products. Sell apps. No licensing fees.",
  },
  {
    title: "Open Source",
    desc: "View, fork, contribute. It\u2019s yours.",
  },
  {
    title: "Manuscript Data",
    desc: "Translator notes, textual variants, cross-language mappings.",
  },
  {
    title: "No API Key",
    desc: "Basic access requires zero authentication.",
  },
];

function FeatureGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-28 lg:py-36"
      style={{ background: "#111118" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-4 font-dm-sans text-3xl sm:text-4xl font-bold text-white"
        >
          What you get
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-14 max-w-xl text-white/50 font-dm-sans text-lg"
        >
          Everything developers need to build with Scripture, nothing in the way.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-[#00ff88]/30 hover:bg-[#00ff88]/[0.03]"
              style={{ backdropFilter: "blur(4px)" }}
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(0,255,136,0.15), 0 0 30px rgba(0,255,136,0.05)",
                }}
              />
              <h3 className="mb-2 font-jetbrains text-sm font-semibold text-[#00ff88]">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/50">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. LIVE API DEMO                                                   */
/* ------------------------------------------------------------------ */

function ApiDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const rawCode = `$ curl https://api.tov.bible/v1/passage?book=john&chapter=3&verse=16

HTTP/1.1 200 OK
Content-Type: application/json

{
  "reference": "John 3:16",
  "text": "For God so loved the world, that he gave his only Son...",
  "translation": "TOV v0.1",
  "manuscript_notes": [
    { "source": "P66", "date": "~200 CE", "note": "earliest witness" }
  ],
  "variant_readings": [
    { "variant": "μονογενῆ", "witnesses": ["P66", "P75", "B"], "adopted": true }
  ]
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={ref}
      id="demo"
      className="relative py-28 lg:py-36"
      style={{ background: "#0a0a0f" }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-4 font-dm-sans text-3xl sm:text-4xl font-bold text-white"
        >
          Try it now
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-10 max-w-xl text-white/50 font-dm-sans text-lg"
        >
          A single curl command. That&apos;s it.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="relative rounded-xl border border-[#00ff88]/20 bg-[#0d0d14]"
          style={{
            boxShadow: "0 0 60px rgba(0,255,136,0.06)",
          }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <button
              onClick={handleCopy}
              className="rounded-md border border-white/10 px-3 py-1 font-jetbrains text-xs text-white/50 transition hover:border-white/20 hover:text-white/80"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Code body */}
          <div className="overflow-x-auto p-6 font-jetbrains text-[13px] leading-relaxed sm:text-sm">
            <pre className="whitespace-pre">
              <code>
                <span className="code-comment">
                  $ curl https://api.tov.bible/v1/passage?book=john&amp;chapter=3&amp;verse=16
                </span>
                {"\n\n"}
                <span className="code-keyword">HTTP/1.1</span>{" "}
                <span className="code-number">200</span>{" "}
                <span className="code-string">OK</span>
                {"\n"}
                <span className="code-property">Content-Type</span>
                <span className="code-punctuation">: </span>
                <span className="code-string">application/json</span>
                {"\n\n"}
                <span className="code-bracket">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="code-property">&quot;reference&quot;</span>
                <span className="code-punctuation">: </span>
                <span className="code-string">&quot;John 3:16&quot;</span>
                <span className="code-punctuation">,</span>
                {"\n"}
                {"  "}
                <span className="code-property">&quot;text&quot;</span>
                <span className="code-punctuation">: </span>
                <span className="code-string">
                  &quot;For God so loved the world, that he gave his only
                  Son...&quot;
                </span>
                <span className="code-punctuation">,</span>
                {"\n"}
                {"  "}
                <span className="code-property">&quot;translation&quot;</span>
                <span className="code-punctuation">: </span>
                <span className="code-string">&quot;TOV v0.1&quot;</span>
                <span className="code-punctuation">,</span>
                {"\n"}
                {"  "}
                <span className="code-property">
                  &quot;manuscript_notes&quot;
                </span>
                <span className="code-punctuation">: </span>
                <span className="code-bracket">[</span>
                {"\n"}
                {"    "}
                <span className="code-bracket">{"{"}</span>{" "}
                <span className="code-property">&quot;source&quot;</span>
                <span className="code-punctuation">: </span>
                <span className="code-string">&quot;P66&quot;</span>
                <span className="code-punctuation">, </span>
                <span className="code-property">&quot;date&quot;</span>
                <span className="code-punctuation">: </span>
                <span className="code-string">&quot;~200 CE&quot;</span>
                <span className="code-punctuation">, </span>
                <span className="code-property">&quot;note&quot;</span>
                <span className="code-punctuation">: </span>
                <span className="code-string">
                  &quot;earliest witness&quot;
                </span>{" "}
                <span className="code-bracket">{"}"}</span>
                {"\n"}
                {"  "}
                <span className="code-bracket">]</span>
                <span className="code-punctuation">,</span>
                {"\n"}
                {"  "}
                <span className="code-property">
                  &quot;variant_readings&quot;
                </span>
                <span className="code-punctuation">: </span>
                <span className="code-bracket">[</span>
                {"\n"}
                {"    "}
                <span className="code-bracket">{"{"}</span>{" "}
                <span className="code-property">&quot;variant&quot;</span>
                <span className="code-punctuation">: </span>
                <span className="code-string">
                  &quot;&#956;&#959;&#957;&#959;&#947;&#949;&#957;&#8134;&quot;
                </span>
                <span className="code-punctuation">, </span>
                <span className="code-property">&quot;witnesses&quot;</span>
                <span className="code-punctuation">: </span>
                <span className="code-bracket">[</span>
                <span className="code-string">&quot;P66&quot;</span>
                <span className="code-punctuation">, </span>
                <span className="code-string">&quot;P75&quot;</span>
                <span className="code-punctuation">, </span>
                <span className="code-string">&quot;B&quot;</span>
                <span className="code-bracket">]</span>
                <span className="code-punctuation">, </span>
                <span className="code-property">&quot;adopted&quot;</span>
                <span className="code-punctuation">: </span>
                <span className="code-keyword">true</span>{" "}
                <span className="code-bracket">{"}"}</span>
                {"\n"}
                {"  "}
                <span className="code-bracket">]</span>
                {"\n"}
                <span className="code-bracket">{"}"}</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. ARCHITECTURE / PIPELINE                                         */
/* ------------------------------------------------------------------ */

const pipelineSteps = [
  {
    title: "Ancient Manuscripts",
    desc: "Greek & Hebrew source texts, papyri, codices",
  },
  {
    title: "Textual Criticism",
    desc: "Scholarly comparison, variant analysis, dating",
  },
  {
    title: "Translation",
    desc: "Transparent, community-reviewed English rendering",
  },
  {
    title: "Open API",
    desc: "RESTful endpoints, multiple formats, zero auth",
  },
  {
    title: "Your App",
    desc: "Websites, mobile apps, research tools, AI/ML",
  },
];

function Architecture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-28 lg:py-36 overflow-hidden">
      {/* bg image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80"
          alt=""
          fill
          className="object-cover opacity-[0.07]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0a0a0f 0%, rgba(10,10,15,0.85) 50%, #111118 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-4 font-dm-sans text-3xl sm:text-4xl font-bold text-white"
        >
          From manuscript to your app
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-16 max-w-xl text-white/50 font-dm-sans text-lg"
        >
          A transparent pipeline from ancient source texts to modern developer
          tooling.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="flex flex-col gap-0 lg:flex-row lg:items-stretch"
        >
          {pipelineSteps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col items-center lg:flex-row lg:flex-1"
            >
              <div className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-[#00ff88]/20">
                <p className="font-jetbrains text-xs font-semibold uppercase tracking-wider text-[#00ff88]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-dm-sans text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/40">
                  {step.desc}
                </p>
              </div>

              {i < pipelineSteps.length - 1 && (
                <>
                  {/* Mobile arrow */}
                  <span className="flex shrink-0 items-center justify-center py-2 font-jetbrains text-xl text-[#00ff88]/40 lg:hidden">
                    &#8595;
                  </span>
                  {/* Desktop arrow */}
                  <span className="hidden lg:flex shrink-0 items-center justify-center px-3 font-jetbrains text-lg text-[#00ff88]/40">
                    &#8594;
                  </span>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. COMPARISON TABLE                                                */
/* ------------------------------------------------------------------ */

function Comparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const rows = [
    {
      label: "License",
      tov: { icon: "\u2713", text: "Open", color: "#00ff88" },
      esv: { icon: "\u2717", text: "Locked", color: "#ef4444" },
      niv: { icon: "\u2717", text: "Locked", color: "#ef4444" },
      kjv: { icon: "\u2713", text: "PD", color: "#00ff88" },
    },
    {
      label: "API Access",
      tov: { icon: "\u2713", text: "Full", color: "#00ff88" },
      esv: { icon: "~", text: "500/req", color: "#f59e0b" },
      niv: { icon: "\u2717", text: "None", color: "#ef4444" },
      kjv: { icon: "\u2717", text: "None", color: "#ef4444" },
    },
    {
      label: "Commercial",
      tov: { icon: "\u2713", text: "Yes", color: "#00ff88" },
      esv: { icon: "\u2717", text: "No", color: "#ef4444" },
      niv: { icon: "\u2717", text: "No", color: "#ef4444" },
      kjv: { icon: "\u2713", text: "Yes", color: "#00ff88" },
    },
    {
      label: "Scholarship",
      tov: { icon: "\u2713", text: "Modern", color: "#00ff88" },
      esv: { icon: "~", text: "Some", color: "#f59e0b" },
      niv: { icon: "~", text: "Some", color: "#f59e0b" },
      kjv: { icon: "\u2717", text: "Old", color: "#ef4444" },
    },
  ];

  const translations = ["tov", "esv", "niv", "kjv"] as const;
  const translationLabels: Record<string, string> = {
    tov: "TOV",
    esv: "ESV",
    niv: "NIV",
    kjv: "KJV",
  };

  return (
    <section
      ref={ref}
      className="relative py-28 lg:py-36"
      style={{ background: "#111118" }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-4 font-dm-sans text-3xl sm:text-4xl font-bold text-white"
        >
          How TOV compares
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-12 max-w-xl text-white/50 font-dm-sans text-lg"
        >
          Side-by-side with major English translations.
        </motion.p>

        {/* terminal table */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0d0d14] font-jetbrains text-xs sm:text-sm"
        >
          <table className="w-full min-w-[500px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-4 py-3 text-left text-white/30 font-normal">
                  &nbsp;
                </th>
                {translations.map((t) => (
                  <th
                    key={t}
                    className={`px-4 py-3 text-center font-semibold ${
                      t === "tov" ? "text-[#00ff88]" : "text-white/60"
                    }`}
                  >
                    {translationLabels[t]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={
                    i < rows.length - 1
                      ? "border-b border-white/[0.05]"
                      : ""
                  }
                >
                  <td className="px-4 py-3 text-white/50">{row.label}</td>
                  {translations.map((t) => {
                    const cell = row[t];
                    return (
                      <td
                        key={t}
                        className="px-4 py-3 text-center"
                        style={{ color: cell.color }}
                      >
                        <span className="mr-1">{cell.icon}</span>
                        {cell.text}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. CTA                                                             */
/* ------------------------------------------------------------------ */

function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const curlCmd =
    "curl https://api.tov.bible/v1/passage?book=john&chapter=3&verse=16";

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={ref}
      id="cta"
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Side image */}
      <div className="absolute bottom-0 right-0 h-full w-1/2 opacity-[0.05] pointer-events-none hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
          alt=""
          fill
          className="object-cover object-left"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="font-dm-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
        >
          Start building today.
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mx-auto mt-6 max-w-lg text-lg text-white/50 font-dm-sans"
        >
          No sign-up. No API key. Just start making requests.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-[#00ff88] px-7 py-3.5 text-sm font-semibold text-[#0a0a0f] transition hover:bg-[#00ff88]/90"
          >
            View API Docs
          </a>
          <a
            href="#"
            className="inline-flex items-center rounded-lg border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            View on GitHub
          </a>
        </motion.div>

        {/* Curl command */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mx-auto mt-12 max-w-2xl"
        >
          <div
            className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-[#111118] px-5 py-3 cursor-pointer transition hover:border-white/15"
            onClick={handleCopy}
          >
            <code className="font-jetbrains text-xs sm:text-sm text-white/60 truncate mr-4">
              <span className="text-[#00ff88] mr-2">$</span>
              {curlCmd}
            </code>
            <span className="shrink-0 font-jetbrains text-xs text-white/30 transition hover:text-white/60">
              {copied ? "Copied!" : "Copy"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. FOOTER                                                          */
/* ------------------------------------------------------------------ */

function Footer() {
  const links = [
    { label: "API Docs", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Preview", href: "#" },
    { label: "Compare", href: "#" },
  ];

  return (
    <footer
      className="border-t border-white/[0.06]"
      style={{ background: "#0a0a0f" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <p className="font-dm-sans text-sm text-white/30">
          TOV &mdash; The Open Version
        </p>

        <nav className="flex flex-wrap items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-dm-sans text-sm text-white/40 transition hover:text-white/70"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="font-dm-sans text-sm text-white/30">
          Free to use. Free to share.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN EXPORT                                                        */
/* ------------------------------------------------------------------ */

export default function Version2() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-[#00ff88]/20 selection:text-white">
      <Hero />
      <PainSection />
      <FeatureGrid />
      <ApiDemo />
      <Architecture />
      <Comparison />
      <CTA />
      <Footer />
    </div>
  );
}
