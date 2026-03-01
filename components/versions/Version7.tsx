"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   Section 1 — HERO: Pinned Dissolve
   ═══════════════════════════════════════════════════════════ */

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const tovTextRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background — moves slower than scroll
      gsap.to(bgRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinnedRef.current,
        },
      });

      // 0-0.6: TOV scales up and fades out
      tl.fromTo(
        tovTextRef.current,
        { scale: 1, opacity: 1 },
        { scale: 2, opacity: 0, duration: 0.6, ease: "power1.in" }
      )
        // 0.3-0.7: subtitle fades in
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.3
        )
        // 0.5-0.9: tagline fades in
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.5
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[200vh]">
      {/* Parallax background */}
      <div ref={bgRef} className="absolute inset-0 h-[120%] -top-[10%]">
        <Image
          src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80"
          alt="Abstract dark blue texture"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#080b14]/70" />
      </div>

      {/* Pinned content */}
      <div
        ref={pinnedRef}
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >
        <h1
          ref={tovTextRef}
          className="font-source-serif text-[150px] md:text-[250px] font-bold text-[#f5f0e6] leading-none select-none will-change-transform"
        >
          TOV
        </h1>

        <p
          ref={subtitleRef}
          className="absolute font-source-serif text-2xl md:text-4xl text-[#f5f0e6] tracking-wide opacity-0"
        >
          The Open Version
        </p>

        <p
          ref={taglineRef}
          className="absolute mt-24 font-inter text-lg md:text-2xl text-[#818cf8] tracking-widest uppercase opacity-0"
        >
          Scripture, unchained.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 2 — PROBLEM STATEMENT: Text Reveal on Scroll
   ═══════════════════════════════════════════════════════════ */

const problemLines = [
  "Most English Bible translations are controlled",
  "by licensing restrictions.",
  "Developers face API limits.",
  "Ministries need permission to quote God\u2019s Word.",
  "The Bible \u2014 the most important text",
  "in human history \u2014 is locked.",
];

function ProblemStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      linesRef.current.forEach((line) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { opacity: 0.1, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080b14] py-40 px-6 flex flex-col items-center justify-center"
    >
      <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
        {problemLines.map((line, i) => (
          <p
            key={i}
            ref={(el) => {
              linesRef.current[i] = el;
            }}
            className="font-source-serif text-2xl md:text-4xl text-[#f5f0e6] leading-relaxed"
          >
            {line}
          </p>
        ))}

        <p
          ref={ctaRef}
          className="font-source-serif text-3xl md:text-5xl text-[#818cf8] mt-16 pt-8 font-semibold"
        >
          We&rsquo;re changing that.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 3 — STATS: Scrub Counter
   ═══════════════════════════════════════════════════════════ */

const stats = [
  { value: "$0", label: "Licensing Fees" },
  { value: "0", label: "Verse Limits" },
  { value: "\u221e", label: "Possibilities" },
];

function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade-in for each stat
      statsRef.current.forEach((stat, i) => {
        if (!stat) return;
        gsap.fromTo(
          stat,
          { opacity: 0, y: 60, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `top+=${i * 80} 70%`,
              end: () => `top+=${i * 80 + 300} 40%`,
              scrub: 1,
            },
          }
        );
      });

      // Progress bar scrub
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0d1117] py-40 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => {
                statsRef.current[i] = el;
              }}
              className="flex flex-col items-center"
            >
              <span className="font-source-serif text-7xl md:text-9xl text-[#f5f0e6] font-bold leading-none">
                {stat.value}
              </span>
              <span className="font-inter text-sm uppercase tracking-widest text-[#f5f0e6]/40 mt-6">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          ref={progressRef}
          className="h-full bg-[#6366f1] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 4 — HORIZONTAL SCROLL: Comparison Cards
   ═══════════════════════════════════════════════════════════ */

const comparisonCards = [
  {
    name: "TOV",
    accent: true,
    borderColor: "border-[#6366f1]",
    bgColor: "bg-[#6366f1]",
    items: [
      "Fully open-source",
      "No limits on usage",
      "Zero licensing fees",
      "Modern scholarship",
      "Full REST API",
    ],
  },
  {
    name: "ESV",
    accent: false,
    borderColor: "border-red-500/30",
    bgColor: "bg-[#111827]",
    items: [
      "Crossway copyright",
      "500 verse limit per request",
      "No commercial use",
      "Restricted redistribution",
    ],
  },
  {
    name: "NIV",
    accent: false,
    borderColor: "border-red-500/30",
    bgColor: "bg-[#111827]",
    items: [
      "Zondervan copyright",
      "No public API",
      "Restricted licensing",
      "Permission required",
    ],
  },
  {
    name: "NASB",
    accent: false,
    borderColor: "border-red-500/30",
    bgColor: "bg-[#111827]",
    items: [
      "Lockman Foundation",
      "No public API",
      "Paid licensing",
      "Limited quotation rights",
    ],
  },
  {
    name: "KJV",
    accent: false,
    borderColor: "border-amber-500/30",
    bgColor: "bg-[#111827]",
    items: [
      "Public domain",
      "No modern scholarly apparatus",
      "No API standard",
      "Archaic language",
    ],
  },
];

function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = cardsContainerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const ctx = gsap.context(() => {
      const totalScroll = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080b14] overflow-hidden"
    >
      {/* Section title */}
      <div className="absolute top-8 left-0 right-0 z-10 text-center pointer-events-none">
        <p className="font-inter text-sm uppercase tracking-widest text-[#f5f0e6]/30">
          How TOV compares
        </p>
      </div>

      <div
        ref={cardsContainerRef}
        className="flex items-center h-screen gap-8 px-[10vw] will-change-transform"
      >
        {comparisonCards.map((card, i) => (
          <div
            key={i}
            className={`
              flex-shrink-0 w-[80vw] md:w-[400px] h-[70vh] max-h-[500px] rounded-2xl
              border ${card.borderColor} ${card.bgColor}
              p-8 md:p-10 flex flex-col justify-between
              ${card.accent ? "text-white" : "text-[#f5f0e6]"}
            `}
          >
            <div>
              <h3
                className={`font-source-serif text-5xl md:text-6xl font-bold mb-6 ${
                  card.accent ? "text-white" : "text-[#f5f0e6]"
                }`}
              >
                {card.name}
              </h3>
              <ul className="space-y-3">
                {card.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-base">
                    <span
                      className={`mt-1.5 block w-2 h-2 rounded-full flex-shrink-0 ${
                        card.accent
                          ? "bg-white"
                          : card.name === "KJV"
                          ? "bg-amber-500/60"
                          : "bg-red-500/40"
                      }`}
                    />
                    <span
                      className={`font-inter ${
                        card.accent ? "text-white/90" : "text-[#f5f0e6]/60"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {card.accent && (
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="font-inter text-sm text-white/70 uppercase tracking-widest">
                  Free &amp; Open Source
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 5 — API SHOWCASE: Typewriter Reveal
   ═══════════════════════════════════════════════════════════ */

const codeLines = [
  'GET /v1/passage?book=john&chapter=3&verse=16',
  '',
  '{',
  '  "reference": "John 3:16",',
  '  "text": "For God so loved the world...",',
  '  "manuscript_notes": [',
  '    { "source": "P66", "date": "~200 CE" }',
  '  ],',
  '  "variant_readings": [',
  '    { "variant": "\u03BC\u03BF\u03BD\u03BF\u03B3\u03B5\u03BD\u1FC6", "adopted": true }',
  '  ]',
  '}',
];

function ApiShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const codeLinesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade in
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      }

      // Sequential line reveal
      codeLinesRef.current.forEach((line, i) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `top+=${100 + i * 40} 70%`,
              end: () => `top+=${100 + i * 40 + 120} 50%`,
              scrub: 1,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0d1117] py-40 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          ref={headingRef}
          className="font-source-serif text-3xl md:text-5xl text-[#f5f0e6] text-center mb-16"
        >
          For developers who build
          <br />
          <span className="text-[#818cf8]">with purpose.</span>
        </h2>

        <div className="relative rounded-xl border border-[#f5f0e6]/10 bg-[#080b14] p-6 md:p-8 overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#6366f1]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top bar */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#f5f0e6]/5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-4 font-jetbrains text-xs text-[#f5f0e6]/30">
              api.tov.bible
            </span>
          </div>

          <div className="font-jetbrains text-sm md:text-base leading-relaxed">
            {codeLines.map((line, i) => (
              <div
                key={i}
                ref={(el) => {
                  codeLinesRef.current[i] = el;
                }}
                className="opacity-0"
              >
                {line === "" ? (
                  <br />
                ) : (
                  <span
                    className={
                      i === 0
                        ? "text-[#818cf8]"
                        : line.includes('"')
                        ? "text-[#f5f0e6]/80"
                        : "text-[#f5f0e6]/50"
                    }
                  >
                    {line}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-center font-inter text-sm text-[#f5f0e6]/30 mt-8 tracking-wide">
          RESTful API &middot; Full manuscript data &middot; Zero rate limits
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 6 — PHILOSOPHY: Parallax Image + Text
   ═══════════════════════════════════════════════════════════ */

function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const creditsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background movement
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Text block fade in
      if (textBlockRef.current) {
        gsap.fromTo(
          textBlockRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 25%",
              scrub: 1,
            },
          }
        );
      }

      // Quote scale in
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 80%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      }

      // Credits fade
      if (creditsRef.current) {
        gsap.fromTo(
          creditsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: creditsRef.current,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-40 px-6 overflow-hidden flex items-center"
    >
      {/* Parallax background */}
      <div ref={bgImageRef} className="absolute inset-0 h-[130%] -top-[15%]">
        <Image
          src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1920&q=80"
          alt="Dramatic sky and clouds"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[#080b14]/80" />

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <div ref={textBlockRef}>
          <p className="font-inter text-sm uppercase tracking-widest text-[#818cf8] mb-8">
            Our Philosophy
          </p>
          <p className="font-source-serif text-xl md:text-2xl text-[#ede8de] leading-relaxed mb-6">
            Built on a commitment to the inerrancy of the original autographs.
            A balanced approach: word-level accuracy with natural English
            readability. Every editorial decision tracked and transparent.
          </p>
        </div>

        <p
          ref={quoteRef}
          className="font-source-serif text-4xl md:text-6xl lg:text-7xl text-[#f5f0e6] italic mt-16 mb-12 leading-tight"
        >
          &ldquo;Abolish the
          <br />
          Bible trade.&rdquo;
        </p>

        <p
          ref={creditsRef}
          className="font-inter text-sm text-[#f5f0e6]/40 tracking-wide"
        >
          Scholars from Princeton Theological Seminary and Ligonier Ministries
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 7 — VISION: Scale Reveal
   ═══════════════════════════════════════════════════════════ */

function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: cardRef.current,
        },
      });

      tl.fromTo(
        cardRef.current,
        {
          scale: 0.3,
          borderRadius: "2rem",
        },
        {
          scale: 1,
          borderRadius: "0rem",
          duration: 0.6,
          ease: "power2.out",
        }
      ).fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.3
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[200vh] bg-[#080b14]">
      <div
        ref={cardRef}
        className="h-screen w-full flex items-center justify-center will-change-transform"
      >
        <div className="relative w-full h-full bg-[#111827] border border-[#6366f1]/20 overflow-hidden flex items-center justify-center">
          {/* Subtle gradient orbs */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#6366f1]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#818cf8]/5 rounded-full blur-3xl pointer-events-none" />

          <div
            ref={contentRef}
            className="relative max-w-3xl mx-auto text-center px-8 md:px-12 opacity-0"
          >
            <p className="font-inter text-sm uppercase tracking-widest text-[#6366f1] mb-8">
              The Vision
            </p>
            <h2 className="font-source-serif text-3xl md:text-5xl lg:text-6xl text-[#f5f0e6] leading-tight mb-8">
              More than a translation.
              <br />
              <span className="text-[#818cf8]">A living data structure.</span>
            </h2>
            <p className="font-source-serif text-lg md:text-xl text-[#ede8de]/70 leading-relaxed mb-10">
              Manuscript evidence. Textual variants. Cross-language mappings.
              Continuously improving. The best repository of human knowledge
              about God&rsquo;s Word.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                "Manuscripts",
                "Variants",
                "Cross-language",
                "Evolving",
              ].map((label) => (
                <div key={label} className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#6366f1]" />
                  </div>
                  <span className="font-inter text-xs uppercase tracking-widest text-[#f5f0e6]/40">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section 8 — CTA + FOOTER: Fade Convergence
   ═══════════════════════════════════════════════════════════ */

function CtaFooter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const leftLinkRef = useRef<HTMLAnchorElement>(null);
  const rightLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading from top
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: -60 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      }

      // Input from bottom
      if (inputRef.current) {
        gsap.fromTo(
          inputRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      }

      // Left link from left
      if (leftLinkRef.current) {
        gsap.fromTo(
          leftLinkRef.current,
          { opacity: 0, x: -80 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 25%",
              scrub: 1,
            },
          }
        );
      }

      // Right link from right
      if (rightLinkRef.current) {
        gsap.fromTo(
          rightLinkRef.current,
          { opacity: 0, x: 80 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 25%",
              scrub: 1,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const footerLinks = [
    "Preview",
    "Developers",
    "Compare",
    "Philosophy",
    "API Docs",
    "GitHub",
    "Contact",
  ];

  return (
    <>
      {/* CTA Section */}
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1920&q=80"
            alt="Dramatic light beams"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#080b14]/85" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2
            ref={headingRef}
            className="font-source-serif text-5xl md:text-7xl lg:text-8xl text-[#f5f0e6] leading-tight mb-12"
          >
            The Word.
            <br />
            Free. Forever.
          </h2>

          <div ref={inputRef} className="mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full sm:flex-1 bg-[#f5f0e6]/5 border border-[#f5f0e6]/10 rounded-lg px-5 py-3.5 font-inter text-sm text-[#f5f0e6] placeholder:text-[#f5f0e6]/30 focus:outline-none focus:border-[#6366f1]/50 transition-colors"
              />
              <button className="w-full sm:w-auto bg-[#6366f1] hover:bg-[#818cf8] text-white font-inter text-sm font-medium px-8 py-3.5 rounded-lg transition-colors whitespace-nowrap">
                Get Notified
              </button>
            </div>
            <p className="font-inter text-xs text-[#f5f0e6]/20 mt-4">
              Join the movement. Be first to know when TOV launches.
            </p>
          </div>

          <div className="flex items-center justify-center gap-12">
            <a
              ref={leftLinkRef}
              href="#"
              className="font-inter text-sm text-[#818cf8] hover:text-[#f5f0e6] transition-colors underline underline-offset-4 decoration-[#818cf8]/30"
            >
              Preview Reader
            </a>
            <a
              ref={rightLinkRef}
              href="#"
              className="font-inter text-sm text-[#818cf8] hover:text-[#f5f0e6] transition-colors underline underline-offset-4 decoration-[#818cf8]/30"
            >
              Developer Docs
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080b14] border-t border-[#f5f0e6]/5 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-10">
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-inter text-sm text-[#f5f0e6]/40 hover:text-[#f5f0e6] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <p className="font-source-serif text-lg text-[#f5f0e6]/60 mb-2">
            TOV &mdash; The Open Version
          </p>
          <p className="font-inter text-xs text-[#f5f0e6]/20">
            Free to use. Free to share.
          </p>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Component — Version7
   ═══════════════════════════════════════════════════════════ */

export default function Version7() {
  return (
    <main className="bg-[#080b14]">
      <Hero />
      <ProblemStatement />
      <Stats />
      <HorizontalScroll />
      <ApiShowcase />
      <Philosophy />
      <Vision />
      <CtaFooter />
    </main>
  );
}
