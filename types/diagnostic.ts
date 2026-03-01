
export interface Question {
  id: string;
  text: string;
}

export type StepId = number;

export interface Step {
  id: number;
  emoji: string;
  stepId: StepId;
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
