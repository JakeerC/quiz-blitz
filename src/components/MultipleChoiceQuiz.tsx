'use client';

import { useState, useEffect } from 'react';
import { Check, X, Clock, Info } from 'lucide-react';
import { BrutalistButton } from './ui/BrutalistButton';
import { soundManager } from '../utils/sounds';
import type { QuizConfig, QuizResult, QuestionDetail } from '../context/AppContext';

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
  topic: string;
  explanation: string;
};

type MultipleChoiceQuizProps = {
  config: QuizConfig;
  onComplete: (result: QuizResult) => void;
};

// Generate mock questions
function generateQuestions(config: QuizConfig): Question[] {
  const templates = [
    { 
      q: `What is the capital of ${config.topic}?`, 
      opts: ['Paris', 'London', 'Berlin', 'Madrid'],
      exp: 'This question tests your knowledge of capitals and major cities in geography.'
    },
    { 
      q: `Which year is significant in ${config.topic}?`, 
      opts: ['1492', '1776', '1945', '2001'],
      exp: 'Historical dates help us understand the timeline of important events and discoveries.'
    },
    { 
      q: `Who is famous in ${config.topic}?`, 
      opts: ['Einstein', 'Newton', 'Tesla', 'Curie'],
      exp: 'Understanding key figures helps us appreciate their contributions to this field.'
    },
    { 
      q: `What is a key concept in ${config.topic}?`, 
      opts: ['Gravity', 'Evolution', 'Relativity', 'Quantum'],
      exp: 'Core concepts form the foundation for understanding more complex topics in this area.'
    },
    { 
      q: `Which discovery relates to ${config.topic}?`, 
      opts: ['DNA', 'Electricity', 'Atoms', 'Cells'],
      exp: 'Scientific discoveries have shaped our modern understanding of the world around us.'
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
      explanation: `${template.exp} The correct answer is "${template.opts[correctIndex]}" based on established ${config.topic} knowledge at ${config.difficulty} level.`
    });
  }
  return questions;
}

export function MultipleChoiceQuiz({ config, onComplete }: MultipleChoiceQuizProps) {
  const [questions] = useState(() => generateQuestions(config));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(config.numQuestions).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime] = useState(Date.now());

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
    const correctAnswers = answers.filter((answer, i) => answer === questions[i].correctAnswer).length;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    // Build question details
    const questionDetails: QuestionDetail[] = questions.map((q, i) => ({
      question: q.question,
      userAnswer: answers[i] !== null ? q.options[answers[i]!] : 'Not answered',
      correctAnswer: q.options[q.correctAnswer],
      isCorrect: answers[i] === q.correctAnswer,
      explanation: q.explanation
    }));
    
    soundManager.playSuccess();
    
    onComplete({
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers: questions.length - correctAnswers,
      timeTaken,
      weakTopics: correctAnswers < questions.length * 0.7 ? [config.topic] : [],
      questionDetails
    });
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="min-h-screen p-6 bg-transparent py-12">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="uppercase tracking-wide dark:text-white">
              Question {currentIndex + 1} / {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <Clock size={20} strokeWidth={3} className="dark:text-white" />
              <span className="uppercase tracking-wide dark:text-white">{config.difficulty}</span>
            </div>
          </div>
          <div className="h-4 bg-white dark:bg-[#2a2a2a] border-[4px] border-black dark:border-white">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-[#FFE500] transition-all"
            />
          </div>
        </div>

        {/* Question Card */}
          <div
            key={currentIndex}
            className="mb-8"
          >
            <div className="border-[6px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <h2 className="mb-2 uppercase tracking-tight dark:text-white">{currentQuestion.question}</h2>
              <div className="inline-block px-3 py-1 bg-[#FFE500] border-[3px] border-black dark:border-white mt-2">
                <span className="text-sm uppercase tracking-wide">{currentQuestion.topic}</span>
              </div>
            </div>
          </div>

        {/* Options */}
        <div className="space-y-4 mb-8">
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
                className={`
                  w-full p-6 border-[4px] border-black dark:border-white text-left transition-all
                  ${isSelected && !showFeedback ? 'bg-gray-200 dark:bg-[#3a3a3a]' : 'bg-white dark:bg-[#2a2a2a]'}
                  ${showCorrect ? 'bg-[#00D9A3]' : ''}
                  ${showIncorrect ? 'bg-[#FF5757]' : ''}
                  ${!showFeedback ? 'hover:bg-gray-50 dark:hover:bg-[#3a3a3a] cursor-pointer' : 'cursor-default'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-wide dark:text-white">{option}</span>
                  {showCorrect && <Check size={28} strokeWidth={3} />}
                  {showIncorrect && <X size={28} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation (Interactive Mode) */}
        {config.answerMode === 'interactive' && showFeedback && (
          <div
            className="mb-8"
          >
            <div className="border-[4px] border-black dark:border-white bg-[#FFFEF9] dark:bg-[#1a1a1a] p-6">
              <div className="flex items-start gap-3 mb-3">
                <Info size={24} strokeWidth={3} className="flex-shrink-0 dark:text-white" />
                <h3 className="uppercase tracking-wide dark:text-white">Explanation</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Next Button (Interactive Mode) */}
        {config.answerMode === 'interactive' && showFeedback && (
          <div
            className="flex justify-end"
          >
            <BrutalistButton 
              onClick={handleNext} 
              variant={isCorrect ? 'success' : 'danger'}
              size="large"
              className="px-12"
            >
              <span className="uppercase tracking-widest">
                {currentIndex < questions.length - 1 ? 'Next →' : 'Finish'}
              </span>
            </BrutalistButton>
          </div>
        )}

      </div>
    </div>
  );
}