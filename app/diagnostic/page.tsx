"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { STEPS } from "@/data/questions";
import { UserAnswers, EmailFormData } from "@/types/diagnostic";
import { calculateDiagnosticResult } from "@/lib/diagnostic";
import Stepper from "@/components/diagnostic/Stepper";
import QuestionStep from "@/components/diagnostic/QuestionStep";
import EmailStep from "@/components/diagnostic/EmailStep";

export default function DiagnosticPage() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [isEmailStep, setIsEmailStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentStep = STEPS[currentStepIndex];
  const totalSteps = STEPS.length;

  const handleAnswerChange = (questionId: string, checked: boolean) => {
    setAnswers((prev) => {
      const stepAnswers = prev[currentStep.id] || [];
      if (checked) {
        return {
          ...prev,
          [currentStep.id]: [...stepAnswers, questionId],
        };
      } else {
        return {
          ...prev,
          [currentStep.id]: stepAnswers.filter((id) => id !== questionId),
        };
      }
    });
  };

  const handleNext = () => {
    const currentAnswers = answers[currentStep.id] || [];

    if (currentAnswers.length === 0) {
      // Toast notification moderne au lieu d'alert
      alert("Veuillez sélectionner au moins une réponse avant de continuer.");
      return;
    }

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsEmailStep(true);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleEmailSubmit = async (formData: EmailFormData) => {
    setIsLoading(true);

    try {
      const result = calculateDiagnosticResult(answers);

      const response = await fetch("/api/send-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          acceptCallback: formData.acceptCallback,
          result,
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const data = await response.json();

      router.push(
        `/diagnostic/result?stepId=${result.stepId}&message=${encodeURIComponent(
          result.message
        )}&counts=${result.checkedCount.join(",")}`
      );
    } catch (error) {
      console.error("Error submitting diagnostic:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailStep) {
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
          <div key="email-step" className="animate-fadeIn">
            <EmailStep onSubmit={handleEmailSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>
    );
  }

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
        <Stepper currentStep={currentStepIndex + 1} totalSteps={totalSteps} />
        
        <div key={currentStep.id} className="animate-fadeIn">
          <QuestionStep
            step={currentStep}
            selectedAnswers={answers[currentStep.id] || []}
            onAnswerChange={handleAnswerChange}
          />
        </div>

        {/* Boutons de navigation */}
        <div className="flex gap-4 mt-6">
          {currentStepIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="
                flex-1 rounded-xl bg-white border-2 border-gray-300 text-gray-900 
                py-3.5 px-6 hover:bg-gray-50 hover:border-gray-400
                transition-all duration-200 text-sm font-semibold
                flex items-center justify-center gap-2
              "
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Précédent
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={(answers[currentStep.id] || []).length === 0}
            className={`
              ${currentStepIndex > 0 ? "flex-1" : "w-full"}
              rounded-xl bg-black text-white py-3.5 px-6 
              hover:bg-gray-900 transition-all duration-200 
              text-sm font-semibold shadow-lg hover:shadow-xl
              flex items-center justify-center gap-2
              disabled:opacity-50 disabled:cursor-not-allowed
              disabled:hover:shadow-lg disabled:hover:translate-y-0
              transform hover:-translate-y-0.5 active:translate-y-0
            `}
          >
            {currentStepIndex === totalSteps - 1 ? "Terminer" : "Suivant"}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}