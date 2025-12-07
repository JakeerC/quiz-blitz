import {Difficulty, Grade} from './common';

export type HistoryEntry = {
  id: number;
  date: string;
  topic: string;
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  grade: Grade;
};
