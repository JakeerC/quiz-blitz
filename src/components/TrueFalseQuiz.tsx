import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, Check, X, Clock, Info } from 'lucide-react';
import { soundManager } from '../utils/sounds';
import type { QuizConfig, QuizResult, QuestionDetail } from '../App';

type Question = {
  question: string;
  correctAnswer: boolean;
  topic: string;
  explanation: string;
};

type TrueFalseQuizProps = {
  config: QuizConfig;
  onComplete: (result: QuizResult) => void;
};

// Generate mock questions
function generateQuestions(config: QuizConfig): Question[] {
  const templates = [
    { 
      q: `${config.topic} was discovered in ancient times`, 
      a: true,
      exp: 'Many foundational concepts and discoveries have roots in ancient civilizations and early human inquiry.'
    },
    { 
      q: `The study of ${config.topic} began in the 20th century`, 
      a: false,
      exp: 'Most fields of study have much longer histories, often dating back centuries or millennia.'
    },
    { 
      q: `${config.topic} is considered a fundamental concept`, 
      a: true,
      exp: 'Core concepts form the building blocks for understanding more advanced topics in any field.'
    },
    { 
      q: `There are no practical applications of ${config.topic}`, 
      a: false,
      exp: 'Nearly all areas of knowledge have real-world applications that benefit society and technology.'
    },
    { 
      q: `${config.topic} has influenced modern technology`, 
      a: true,
      exp: 'Scientific and theoretical knowledge often serves as the foundation for technological advancement.'
    },
  ];

  const questions: Question[] = [];
  for (let i = 0; i < config.numQuestions; i++) {
    const template = templates[i % templates.length];
    questions.push({
      question: `${template.q} (${config.difficulty})`,
      correctAnswer: template.a,
      topic: config.topic,
      explanation: `${template.exp} In the context of ${config.topic}, this ${template.a ? 'is' : 'is not'} accurate at ${config.difficulty} level.`
    });
  }
  return questions;
}

export function TrueFalseQuiz({ config, onComplete }: TrueFalseQuizProps) {
  const [questions] = useState(() => generateQuestions(config));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(config.numQuestions).fill(null));
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
    const correctAnswers = answers.filter((answer, i) => answer === questions[i].correctAnswer).length;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    // Build question details
    const questionDetails: QuestionDetail[] = questions.map((q, i) => ({
      question: q.question,
      userAnswer: answers[i] !== null ? (answers[i] ? 'True' : 'False') : 'Not answered',
      correctAnswer: q.correctAnswer ? 'True' : 'False',
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
    <div className="min-h-screen p-6 bg-transparent py-12">
      <div className="max-w-2xl mx-auto">
        
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
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full bg-[#FFE500]"
            />
          </div>
        </div>

        {/* Swipe Indicators */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 opacity-60">
            <ChevronLeft size={32} strokeWidth={3} className="dark:text-white" />
            <div className="px-4 py-2 bg-[#FF5757] border-[3px] border-black dark:border-white">
              <span className="uppercase tracking-wide">False</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 opacity-60">
            <div className="px-4 py-2 bg-[#00D9A3] border-[3px] border-black dark:border-white">
              <span className="uppercase tracking-wide">True</span>
            </div>
            <ChevronRight size={32} strokeWidth={3} className="dark:text-white" />
          </div>
        </div>

        {/* Swipeable Card */}
        <div className="relative h-[400px] flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              style={{ x, rotate, opacity }}
              className="absolute w-full cursor-grab active:cursor-grabbing"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="border-[6px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                <h2 className="mb-6 uppercase tracking-tight text-center dark:text-white">
                  {currentQuestion.question}
                </h2>
                
                <div className="flex justify-center mb-4">
                  <div className="px-4 py-2 bg-[#FFE500] border-[3px] border-black dark:border-white">
                    <span className="text-sm uppercase tracking-wide">{currentQuestion.topic}</span>
                  </div>
                </div>

                {/* Interactive Mode Feedback */}
                {showFeedback && config.answerMode === 'interactive' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`
                      mt-6 p-4 border-[4px] border-black dark:border-white flex items-center justify-center gap-3
                      ${isCorrect ? 'bg-[#00D9A3]' : 'bg-[#FF5757]'}
                    `}
                  >
                    {isCorrect ? <Check size={32} strokeWidth={3} /> : <X size={32} strokeWidth={3} />}
                    <span className="uppercase tracking-wide">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
          </motion.div>
        )}

        {/* Button Controls (Alternative to Swipe) */}
        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(false)}
            disabled={showFeedback}
            className="w-40 h-20 border-[4px] border-black dark:border-white bg-[#FF5757] hover:bg-[#FF4444] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <X size={28} strokeWidth={3} />
            <span className="uppercase tracking-wide">False</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(true)}
            disabled={showFeedback}
            className="w-40 h-20 border-[4px] border-black dark:border-white bg-[#00D9A3] hover:bg-[#00C794] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Check size={28} strokeWidth={3} />
            <span className="uppercase tracking-wide">True</span>
          </motion.button>
        </div>

        {/* Swipe Hint */}
        <p className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
          Swipe or tap to answer
        </p>

      </div>
    </div>
  );
}