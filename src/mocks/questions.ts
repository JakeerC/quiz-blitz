import {QuizConfig} from '@/context/AppContext';

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

// Generate mock questions for multiple choice
export function generateMultipleChoiceQuestions(
  config: QuizConfig
): MultipleChoiceQuestion[] {
  const templates = [
    {
      q: `What is the capital of ${config.topic}?`,
      opts: ['Paris', 'London', 'Berlin', 'Madrid'],
      exp: 'This question tests your knowledge of capitals and major cities in geography.',
    },
    {
      q: `Which year is significant in ${config.topic}?`,
      opts: ['1492', '1776', '1945', '2001'],
      exp: 'Historical dates help us understand the timeline of important events and discoveries.',
    },
    {
      q: `Who is famous in ${config.topic}?`,
      opts: ['Einstein', 'Newton', 'Tesla', 'Curie'],
      exp: 'Understanding key figures helps us appreciate their contributions to this field.',
    },
    {
      q: `What is a key concept in ${config.topic}?`,
      opts: ['Gravity', 'Evolution', 'Relativity', 'Quantum'],
      exp: 'Core concepts form the foundation for understanding more complex topics in this area.',
    },
    {
      q: `Which discovery relates to ${config.topic}?`,
      opts: ['DNA', 'Electricity', 'Atoms', 'Cells'],
      exp: 'Scientific discoveries have shaped our modern understanding of the world around us.',
    },
  ];

  const questions: MultipleChoiceQuestion[] = [];
  for (let i = 0; i < config.numQuestions; i++) {
    const template = templates[i % templates.length];
    const correctIndex = Math.floor(Math.random() * 4);
    questions.push({
      question: `${template.q} (${config.difficulty})`,
      options: template.opts,
      correctAnswer: correctIndex,
      topic: config.topic,
      explanation: `${template.exp} The correct answer is "${template.opts[correctIndex]}" based on established ${config.topic} knowledge at ${config.difficulty} level.`,
    });
  }
  return questions;
}

// Generate mock questions for true/false
export function generateTrueFalseQuestions(
  config: QuizConfig
): TrueFalseQuestion[] {
  const templates = [
    {
      q: `${config.topic} was discovered in ancient times`,
      a: true,
      exp: 'Many foundational concepts and discoveries have roots in ancient civilizations and early human inquiry.',
    },
    {
      q: `The study of ${config.topic} began in the 20th century`,
      a: false,
      exp: 'Most fields of study have much longer histories, often dating back centuries or millennia.',
    },
    {
      q: `${config.topic} is considered a fundamental concept`,
      a: true,
      exp: 'Core concepts form the building blocks for understanding more advanced topics in any field.',
    },
    {
      q: `There are no practical applications of ${config.topic}`,
      a: false,
      exp: 'Nearly all areas of knowledge have real-world applications that benefit society and technology.',
    },
    {
      q: `${config.topic} has influenced modern technology`,
      a: true,
      exp: 'Scientific and theoretical knowledge often serves as the foundation for technological advancement.',
    },
  ];

  const questions: TrueFalseQuestion[] = [];
  for (let i = 0; i < config.numQuestions; i++) {
    const template = templates[i % templates.length];
    questions.push({
      question: `${template.q} (${config.difficulty})`,
      correctAnswer: template.a,
      topic: config.topic,
      explanation: `${template.exp} In the context of ${config.topic}, this ${template.a ? 'is' : 'is not'} accurate at ${config.difficulty} level.`,
    });
  }
  return questions;
}
