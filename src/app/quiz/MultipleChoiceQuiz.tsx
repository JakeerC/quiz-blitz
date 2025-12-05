'use client';

import {useState} from 'react';
import {Check, X, Clock, Info} from 'lucide-react';
import {BrutalistButton} from '@/components/ui/BrutalistButton';
import {soundManager} from '@/utils/sounds';
import type {
  QuizConfig,
  QuizResult,
  QuestionDetail,
} from '@/context/AppContext';

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
  topic: string;
  explanation: string;
};

type MultipleChoiceQuizProps = {
  config: QuizConfig;
  onCompleteAction: (result: QuizResult) => void;
};

// Generate mock questions
function generateQuestions(config: QuizConfig): Question[] {
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

  const questions: Question[] = [];
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

export function MultipleChoiceQuiz({
  config,
  onCompleteAction,
}: MultipleChoiceQuizProps) {
  const [questions] = useState(() => generateQuestions(config));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(config.numQuestions).fill(null)
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime] = useState(() => Date.now());

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);

    if (config.answerMode === 'interactive') {
      setShowFeedback(true);
      // Play sound based on correctness
      const correct = index === currentQuestion.correctAnswer;
      if (correct) {
        soundManager.playCorrect();
      } else {
        soundManager.playIncorrect();
      }
    } else {
      // Play click sound in batch mode
      soundManager.playClick();
      // Auto advance in batch mode
      setTimeout(() => handleNext(), 300);
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz complete
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const correctAnswers = answers.filter(
      (answer, i) => answer === questions[i].correctAnswer
    ).length;
    const now = new Date().getTime();
    const timeTaken = Math.floor((now - startTime) / 1000);

    // Build question details
    const questionDetails: QuestionDetail[] = questions.map((q, i) => ({
      question: q.question,
      userAnswer: answers[i] !== null ? q.options[answers[i]!] : 'Not answered',
      correctAnswer: q.options[q.correctAnswer],
      isCorrect: answers[i] === q.correctAnswer,
      explanation: q.explanation,
    }));

    soundManager.playSuccess();

    onCompleteAction({
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers: questions.length - correctAnswers,
      timeTaken,
      weakTopics: correctAnswers < questions.length * 0.7 ? [config.topic] : [],
      questionDetails,
    });
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="min-h-screen bg-transparent p-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="tracking-wide uppercase">
              Question {currentIndex + 1} / {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <Clock size={20} strokeWidth={3} className="" />
              <span className="tracking-wide uppercase">
                {config.difficulty}
              </span>
            </div>
          </div>
          <div className="border-box h-4 bg-white">
            <div
              style={{width: `${progress}%`}}
              className="bg-primary h-full transition-all"
            />
          </div>
        </div>

        {/* Question Card */}
        <div key={currentIndex} className="mb-8">
          <div className="card p-8">
            <h2 className="mb-2 tracking-tight uppercase">
              {currentQuestion.question}
            </h2>
            <div className="bg-primary border-box mt-2 inline-block px-3 py-1">
              <span className="text-sm tracking-wide uppercase">
                {currentQuestion.topic}
              </span>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="mb-8 space-y-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === currentQuestion.correctAnswer;
            const showCorrect = showFeedback && isCorrectOption;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`border-box w-full p-6 text-left transition-all ${isSelected && !showFeedback ? 'bg-gray-200' : 'bg-white'} ${showCorrect ? 'bg-[#00D9A3]' : ''} ${showIncorrect ? 'bg-[#FF5757]' : ''} ${!showFeedback ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'} `}>
                <div className="flex items-center justify-between">
                  <span className="tracking-wide uppercase">{option}</span>
                  {showCorrect && <Check size={28} strokeWidth={3} />}
                  {showIncorrect && <X size={28} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation (Interactive Mode) */}
        {config.answerMode === 'interactive' && showFeedback && (
          <div className="mb-8">
            <div className="border-box bg-[#FFFEF9] p-6">
              <div className="mb-3 flex items-start gap-3">
                <Info size={24} strokeWidth={3} className="shrink-0" />
                <h3 className="tracking-wide uppercase">Explanation</h3>
              </div>
              <p className="leading-relaxed text-gray-700">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Next Button (Interactive Mode) */}
        {config.answerMode === 'interactive' && showFeedback && (
          <div className="flex justify-end">
            <BrutalistButton
              onClick={handleNext}
              variant={isCorrect ? 'success' : 'danger'}
              size="large"
              className="px-12">
              <span className="tracking-widest uppercase">
                {currentIndex < questions.length - 1 ? 'Next →' : 'Finish'}
              </span>
            </BrutalistButton>
          </div>
        )}
      </div>
    </div>
  );
}
