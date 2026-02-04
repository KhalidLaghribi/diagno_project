"use client";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export default function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="mb-10">
      {/* Indicateur de progression textuel */}
      <div className="text-center mb-6">
        <p className="text-sm font-medium text-gray-600">
          Étape <span className="text-gold font-semibold">{currentStep}</span> sur {totalSteps}
        </p>
      </div>

      {/* Barre de progression visuelle */}
      <div className="flex items-center justify-between max-w-3xl mx-auto px-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, idx) => {
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;
          const isFuture = step > currentStep;

          return (
            <div key={step} className="flex items-center flex-1">
              {/* Cercle de l'étape */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`
                    relative z-10 flex items-center justify-center
                    transition-all duration-300 ease-in-out
                    ${
                      isActive
                        ? "w-10 h-10 bg-gold shadow-lg shadow-gold/30"
                        : isCompleted
                        ? "w-8 h-8 bg-black"
                        : "w-8 h-8 bg-gray-300"
                    }
                    rounded-full
                  `}
                >
                  {isCompleted ? (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span
                      className={`
                        text-xs font-semibold
                        ${isActive ? "text-white" : isFuture ? "text-gray-500" : "text-white"}
                      `}
                    >
                      {step}
                    </span>
                  )}
                </div>

                {/* Pulse animation pour l'étape active */}
                {isActive && (
                  <div className="absolute w-10 h-10 rounded-full bg-gold animate-ping opacity-20"></div>
                )}
              </div>

              {/* Ligne de connexion entre les étapes */}
              {idx < totalSteps - 1 && (
                <div className="flex-1 h-0.5 mx-2 relative">
                  <div className="absolute inset-0 bg-gray-300"></div>
                  <div
                    className={`
                      absolute inset-0 transition-all duration-500 ease-in-out
                      ${isCompleted ? "bg-black" : "bg-gray-300"}
                    `}
                    style={{
                      width: isCompleted ? "100%" : "0%",
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Barre de progression linéaire alternative */}
      <div className="mt-6 max-w-3xl mx-auto px-4">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold to-gold-dark transition-all duration-500 ease-out"
            style={{
              width: `${(currentStep / totalSteps) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}