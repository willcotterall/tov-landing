"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import VersionSwitcher from "@/components/VersionSwitcher";

const Version1 = dynamic(() => import("@/components/versions/Version1"), { ssr: false });
const Version2 = dynamic(() => import("@/components/versions/Version2"), { ssr: false });
const Version3 = dynamic(() => import("@/components/versions/Version3"), { ssr: false });
const Version4 = dynamic(() => import("@/components/versions/Version4"), { ssr: false });
const Version5 = dynamic(() => import("@/components/versions/Version5"), { ssr: false });

function PageContent() {
  const searchParams = useSearchParams();
  const version = parseInt(searchParams.get("v") || "1", 10);

  return (
    <>
      {version === 1 && <Version1 />}
      {version === 2 && <Version2 />}
      {version === 3 && <Version3 />}
      {version === 4 && <Version4 />}
      {version === 5 && <Version5 />}
      <VersionSwitcher />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <PageContent />
    </Suspense>
  );
}
