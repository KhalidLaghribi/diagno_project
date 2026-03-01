import { UserAnswers, DiagnosticResult, StepId } from "@/types/diagnostic";
import { RESULT_MESSAGES, STEPS } from "@/data/questions";

export function calculateDiagnosticResult(
  answers: UserAnswers
): DiagnosticResult {

  const orderedStepIds = Array.from(new Set(STEPS.map((s) => s.stepId)));
  const maxStepId = Math.max(...orderedStepIds);

  const checkedCount: number[] = Array.from({ length: maxStepId }, (_, i) => {
    const stepId = i + 1;
    return answers[stepId]?.length || 0;
  });

  for (const stepId of orderedStepIds) {
    const count = answers[stepId]?.length || 0;
    if (count >= 3) {
      return {
        stepId: stepId as StepId,
        message:
          RESULT_MESSAGES[stepId] ||
          "Un accompagnement a été identifié sur la base de vos réponses.",
        checkedCount,
      };
    }
  }

  return {
    stepId: 0 as StepId,
    message:
      "Vos réponses sont trop dispersées. Pour obtenir un diagnostic fiable, merci de cocher au moins 3 affirmations dans une même catégorie.",
    checkedCount,
  };
}
