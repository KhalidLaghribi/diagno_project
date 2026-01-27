"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
      <div className="min-h-screen flex items-center justify-center p-4">
        <EmailStep onSubmit={handleEmailSubmit} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Stepper currentStep={currentStepIndex + 1} totalSteps={totalSteps} />
        
        <QuestionStep
          step={currentStep}
          selectedAnswers={answers[currentStep.id] || []}
          onAnswerChange={handleAnswerChange}
        />

        <div className="flex gap-4 mt-6">
          {currentStepIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="flex-1 bg-white border border-gray-300 text-black py-3 px-6 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Précédent
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={(answers[currentStep.id] || []).length === 0}
            className={`${
              currentStepIndex > 0 ? "flex-1" : "w-full"
            } bg-black text-white py-3 px-6 hover:bg-gray-800 transition-colors text-sm font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Suivant
            <span className="ml-2">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
