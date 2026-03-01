"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SwitcherInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentVersion = parseInt(searchParams.get("v") || "1", 10);

  const switchVersion = (v: number) => {
    router.push(`/?v=${v}`, { scroll: false });
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-1">
      <span className="text-[10px] uppercase tracking-widest text-white/60 mr-1 font-sans">
        Version
      </span>
      <div className="flex items-center gap-1 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 px-2 py-1.5 shadow-2xl">
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            onClick={() => switchVersion(v)}
            className={`
              relative px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300
              ${
                currentVersion === v
                  ? "bg-white text-black shadow-lg scale-105"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }
            `}
          >
            V{v}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function VersionSwitcher() {
  return (
    <Suspense fallback={null}>
      <SwitcherInner />
    </Suspense>
  );
}
