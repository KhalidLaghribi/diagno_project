"use client";

import { Step } from "@/types/diagnostic";

interface QuestionStepProps {
  step: Step;
  selectedAnswers: string[];
  onAnswerChange: (questionId: string, checked: boolean) => void;
}

export default function QuestionStep({
  step,
  selectedAnswers,
  onAnswerChange,
}: QuestionStepProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-card w-full p-8 sm:p-10">
      {/* Badge de l'étape */}
      <div className="inline-flex items-center gap-2 mb-6">
        <div className="h-8 w-1 bg-gold rounded-full"></div>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Étape {step.id}
        </span>
      </div>

      {/* Titre et sous-titre */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 leading-tight">
          {step.title}
        </h2>
        <p className="text-base text-gray-600 leading-relaxed">
          {step.subtitle}
        </p>
      </div>

      {/* Séparateur décoratif */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

      {/* Instructions */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">💡 Astuce :</span> Sélectionnez toutes 
          les affirmations qui correspondent à votre situation actuelle.
        </p>
      </div>

      {/* Questions avec checkboxes */}
      <div className="space-y-4">
        {step.questions.map((question, idx) => {
          const isSelected = selectedAnswers.includes(question.id);
          
          return (
            <label
              key={question.id}
              className={`
                group relative flex items-start gap-4 p-4 rounded-xl cursor-pointer
                transition-all duration-200 ease-in-out
                ${
                  isSelected
                    ? "bg-gold-50 border-2 border-gold shadow-sm"
                    : "bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }
              `}
            >
              {/* Checkbox personnalisé */}
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => onAnswerChange(question.id, e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`
                    w-5 h-5 rounded-md border-2 flex items-center justify-center
                    transition-all duration-200
                    ${
                      isSelected
                        ? "bg-gold border-gold"
                        : "bg-white border-gray-300 group-hover:border-gray-400"
                    }
                  `}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
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
                  )}
                </div>
              </div>

              {/* Texte de la question */}
              <div className="flex-1">
                <span
                  className={`
                    text-sm leading-relaxed block
                    ${isSelected ? "text-gray-900 font-medium" : "text-gray-700"}
                  `}
                >
                  {question.text}
                </span>
              </div>

              {/* Numéro de question en arrière-plan */}
              <div
                className={`
                  absolute top-2 right-3 text-4xl font-bold opacity-5
                  ${isSelected ? "text-gold" : "text-gray-400"}
                `}
              >
                {idx + 1}
              </div>
            </label>
          );
        })}
      </div>

      {/* Compteur de sélections */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          {selectedAnswers.length > 0 ? (
            <>
              <span className="font-semibold text-gold">{selectedAnswers.length}</span>{" "}
              {selectedAnswers.length === 1 ? "réponse sélectionnée" : "réponses sélectionnées"}
            </>
          ) : (
            "Aucune réponse sélectionnée"
          )}
        </p>
      </div>
    </div>
  );
}