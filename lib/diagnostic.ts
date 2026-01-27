import { UserAnswers, DiagnosticResult, StepId } from "@/types/diagnostic";
import { RESULT_MESSAGES, STEPS } from "@/data/questions";

export function calculateDiagnosticResult(
  answers: UserAnswers
): DiagnosticResult {
  const checkedCount: number[] = [];

  for (let stepId = 1; stepId <= 6; stepId++) {
    const count = answers[stepId]?.length || 0;
    checkedCount.push(count);
  }

  let maxCount = Math.max(...checkedCount);
  let resultStepId: StepId = 1;

  for (let i = 0; i < checkedCount.length; i++) {
    if (checkedCount[i] === maxCount) {
      resultStepId = (i + 1) as StepId;
      break;
    }
  }

  return {
    stepId: resultStepId,
    message: RESULT_MESSAGES[resultStepId],
    checkedCount,
  };
}

export function getStepProgress(currentStep: number): number {
  return Math.round((currentStep / 6) * 100);
}

export function isStepComplete(
  stepId: number,
  answers: UserAnswers
): boolean {
  return (answers[stepId]?.length || 0) > 0;
}
