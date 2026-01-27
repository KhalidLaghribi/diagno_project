export type StepId = 1 | 2 | 3 | 4 | 5 | 6;

export interface Question {
  id: string;
  text: string;
}

export interface Step {
  id: StepId;
  emoji: string;
  title: string;
  subtitle: string;
  questions: Question[];
}

export interface DiagnosticResult {
  stepId: StepId;
  message: string;
  checkedCount: number[];
}

export interface UserAnswers {
  [stepId: number]: string[];
}

export interface EmailFormData {
  email: string;
  acceptCallback: boolean;
  phone?: string;
}
