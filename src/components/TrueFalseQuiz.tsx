'use client';

import {useState, useEffect} from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'motion/react';
import {ChevronLeft, ChevronRight, Check, X, Clock, Info} from 'lucide-react';
import {soundManager} from '../utils/sounds';
import type {
  QuizConfig,
  QuizResult,
  QuestionDetail,
} from '../context/AppContext';

type Question = {
  question: string;
  correctAnswer: boolean;
  topic: string;
  explanation: string;
};

type TrueFalseQuizProps = {
  config: QuizConfig;
  onCompleteAction: (result: QuizResult) => void;
};

// Generate mock questions
function generateQuestions(config: QuizConfig): Question[] {
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

  const questions: Question[] = [];
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

export function TrueFalseQuiz({config, onCompleteAction}: TrueFalseQuizProps) {
  const [questions] = useState(() => generateQuestions(config));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    Array(config.numQuestions).fill(null)
  );
  const [startTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<boolean | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: boolean) => {
    if (showFeedback) return;

    soundManager.playSwipe();
    setLastAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);

    if (config.answerMode === 'interactive') {
      setShowFeedback(true);
      // Play sound based on correctness
      const correct = answer === currentQuestion.correctAnswer;
      setTimeout(() => {
        if (correct) {
          soundManager.playCorrect();
        } else {
          soundManager.playIncorrect();
        }
      }, 100);

      setTimeout(() => {
        advanceQuestion();
      }, 2500); // Extended time to read explanation
    } else {
      advanceQuestion();
    }
  };

  const advanceQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowFeedback(false);
      setLastAnswer(null);
      x.set(0);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const correctAnswers = answers.filter(
      (answer, i) => answer === questions[i].correctAnswer
    ).length;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    // Build question details
    const questionDetails: QuestionDetail[] = questions.map((q, i) => ({
      question: q.question,
      userAnswer:
        answers[i] !== null ? (answers[i] ? 'True' : 'False') : 'Not answered',
      correctAnswer: q.correctAnswer ? 'True' : 'False',
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

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      handleAnswer(true);
    } else if (info.offset.x < -100) {
      handleAnswer(false);
    } else {
      x.set(0);
    }
  };

  const isCorrect = lastAnswer === currentQuestion.correctAnswer;

  return (
    <div className="min-h-screen bg-transparent p-6 py-12">
      <div className="mx-auto max-w-2xl">
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
          <div className="h-4 border-4 border-black bg-white">
            <motion.div
              animate={{width: `${progress}%`}}
              className="h-full bg-[#FFE500]"
            />
          </div>
        </div>

        {/* Swipe Indicators */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 opacity-60">
            <ChevronLeft size={32} strokeWidth={3} className="" />
            <div className="border-[3px] border-black bg-[#FF5757] px-4 py-2">
              <span className="tracking-wide uppercase">False</span>
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-60">
            <div className="border-[3px] border-black bg-[#00D9A3] px-4 py-2">
              <span className="tracking-wide uppercase">True</span>
            </div>
            <ChevronRight size={32} strokeWidth={3} className="" />
          </div>
        </div>

        {/* Swipeable Card */}
        <div className="relative mb-8 flex h-[400px] items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              drag="x"
              dragConstraints={{left: 0, right: 0}}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              style={{x, rotate, opacity}}
              className="absolute w-full cursor-grab active:cursor-grabbing"
              initial={{scale: 0.8, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{scale: 0.8, opacity: 0}}>
              <div className="border-[6px] border-black bg-white p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="mb-6 text-center tracking-tight uppercase">
                  {currentQuestion.question}
                </h2>

                <div className="mb-4 flex justify-center">
                  <div className="border-[3px] border-black bg-[#FFE500] px-4 py-2">
                    <span className="text-sm tracking-wide uppercase">
                      {currentQuestion.topic}
                    </span>
                  </div>
                </div>

                {/* Interactive Mode Feedback */}
                {showFeedback && config.answerMode === 'interactive' && (
                  <motion.div
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    className={`mt-6 flex items-center justify-center gap-3 border-4 border-black p-4 ${isCorrect ? 'bg-[#00D9A3]' : 'bg-[#FF5757]'} `}>
                    {isCorrect ? (
                      <Check size={32} strokeWidth={3} />
                    ) : (
                      <X size={32} strokeWidth={3} />
                    )}
                    <span className="tracking-wide uppercase">
                      {isCorrect ? 'Correct!' : 'Wrong!'}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Explanation (Interactive Mode) */}
        {config.answerMode === 'interactive' && showFeedback && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="mb-8">
            <div className="border-4 border-black bg-[#FFFEF9] p-6">
              <div className="mb-3 flex items-start gap-3">
                <Info size={24} strokeWidth={3} className="shrink-0" />
                <h3 className="tracking-wide uppercase">Explanation</h3>
              </div>
              <p className="leading-relaxed text-gray-700">
                {currentQuestion.explanation}
              </p>
            </div>
          </motion.div>
        )}

        {/* Button Controls (Alternative to Swipe) */}
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            onClick={() => handleAnswer(false)}
            disabled={showFeedback}
            className="flex h-20 w-40 items-center justify-center gap-2 border-4 border-black bg-[#FF5757] hover:bg-[#FF4444] disabled:opacity-50">
            <X size={28} strokeWidth={3} />
            <span className="tracking-wide uppercase">False</span>
          </motion.button>

          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            onClick={() => handleAnswer(true)}
            disabled={showFeedback}
            className="flex h-20 w-40 items-center justify-center gap-2 border-4 border-black bg-[#00D9A3] hover:bg-[#00C794] disabled:opacity-50">
            <Check size={28} strokeWidth={3} />
            <span className="tracking-wide uppercase">True</span>
          </motion.button>
        </div>

        {/* Swipe Hint */}
        <p className="mt-6 text-center text-sm tracking-wide text-gray-600 uppercase">
          Swipe or tap to answer
        </p>
      </div>
    </div>
  );
}
