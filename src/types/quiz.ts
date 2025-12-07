import {Difficulty, QuestionType, AnswerMode} from './common';
import {QuestionDetail} from './question';

export type QuizConfig = {
  difficulty: Difficulty;
  topic: string;
  numQuestions: number;
  responseType: QuestionType;
  answerMode: AnswerMode;
};

export type QuizResult = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeTaken: number;
  weakTopics: string[];
  questionDetails: QuestionDetail[];
};
