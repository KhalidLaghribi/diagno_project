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
    <div className="bg-white border border-gray-300 max-w-md w-full p-8">
      <div className="text-xs text-gray-500 mb-4">
        ÉTAPE {step.id} - {step.title}
      </div>

      <h2 className="text-xl font-bold mb-2">
        {step.title}
      </h2>

      <p className="text-sm text-gray-600 mb-6">{step.subtitle}</p>

      <div className="space-y-4">
        {step.questions.map((question) => (
          <label
            key={question.id}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedAnswers.includes(question.id)}
              onChange={(e) => onAnswerChange(question.id, e.target.checked)}
              className="mt-0.5 w-4 h-4 border border-gray-400 rounded-sm cursor-pointer accent-black"
            />
            <span className="text-sm text-gray-800 leading-relaxed">
              {question.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
