"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import ResultCard from "@/components/diagnostic/ResultCard";
import { DiagnosticResult, StepId } from "@/types/diagnostic";

function ResultContent() {
  const searchParams = useSearchParams();
  const stepId = parseInt(searchParams.get("stepId") || "1") as StepId;
  const message = searchParams.get("message") || "";
  const counts = searchParams.get("counts")?.split(",").map(Number) || [];

  const result: DiagnosticResult = {
    stepId,
    message: decodeURIComponent(message),
    checkedCount: counts,
  };

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/hlp-logo-noir-header.png"
            alt="HLP"
            width={160}
            height={48}
            priority
          />
        </div>
        <ResultCard result={result} calendlyUrl={calendlyUrl} />
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ResultContent />
    </Suspense>
  );
}
