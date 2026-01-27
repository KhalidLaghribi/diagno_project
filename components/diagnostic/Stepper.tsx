"use client";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export default function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={`h-1 flex-1 max-w-[60px] ${
            step <= currentStep ? "bg-black" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
