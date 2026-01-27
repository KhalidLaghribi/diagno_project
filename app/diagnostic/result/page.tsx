"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
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

  return <ResultCard result={result} calendlyUrl={calendlyUrl} />;
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ResultContent />
    </Suspense>
  );
}
