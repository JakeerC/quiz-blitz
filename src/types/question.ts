export type MultipleChoiceQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  topic: string;
  explanation: string;
};

export type TrueFalseQuestion = {
  question: string;
  correctAnswer: boolean;
  topic: string;
  explanation: string;
};

export type QuestionDetail = {
  question: string;
  userAnswer: string | boolean;
  correctAnswer: string | boolean;
  isCorrect: boolean;
  explanation: string;
};
