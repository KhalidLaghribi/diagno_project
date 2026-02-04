import { UserAnswers, DiagnosticResult, StepId } from "@/types/diagnostic";
import { RESULT_MESSAGES, STEPS } from "@/data/questions";

export function calculateDiagnosticResult(
  answers: UserAnswers
): DiagnosticResult {

  const checkedCount: number[] = [];

  // 1. Calculer le nombre de cases cochées par étape
  for (let stepId = 1; stepId <= 6; stepId++) {
    const count = answers[stepId]?.length || 0;
    checkedCount.push(count);
  }

  // 2. Trouver les étapes éligibles (au moins 3 cases cochées)
  const eligibleSteps = checkedCount
    .map((count, index) => ({ stepId: (index + 1) as StepId, count }))
    .filter(item => item.count >= 3);

  // 3. Si aucune étape n'est éligible
  if (eligibleSteps.length === 0) {
    return {
      stepId: 0 as StepId,
      message:
        "Vos réponses sont trop dispersées. Pour obtenir un diagnostic fiable, merci de cocher au moins 3 affirmations dans une même catégorie.",
      checkedCount,
    };
  }

  // 4. Trouver l’étape éligible avec le plus grand nombre de réponses
  const bestStep = eligibleSteps.reduce((prev, current) =>
    current.count > prev.count ? current : prev
  );

  return {
    stepId: bestStep.stepId,
    message: RESULT_MESSAGES[bestStep.stepId],
    checkedCount,
  };
}
