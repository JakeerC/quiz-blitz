'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Zap, BookOpen, ListChecks, Shuffle, PenLine } from 'lucide-react';
import { BrutalistButton } from './ui/BrutalistButton';
import { ToggleSelector } from './ui/ToggleSelector';
import { ChipSelector } from './ui/ChipSelector';
import { Stepper } from './ui/Stepper';
import { Slider } from './ui/Slider';
import { BrutalistInput } from './ui/BrutalistInput';
import { soundManager } from '../utils/sounds';
import type { QuizConfig } from '../App';

type QuizSetupScreenProps = {
  onStartQuiz: (config: QuizConfig) => void;
  onBack: () => void;
};

const TOPICS = [
  'Science',
  'History',
  'Geography',
  'Math',
  'Literature',
  'Movies',
  'Music',
  'Sports',
  'Technology',
  'Art'
];

export function QuizSetupScreen({ onStartQuiz, onBack }: QuizSetupScreenProps) {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [topic, setTopic] = useState('Science');
  const [customTopic, setCustomTopic] = useState('');
  const [useCustomTopic, setUseCustomTopic] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10);
  const [responseType, setResponseType] = useState<'multiple-choice' | 'true-false'>('multiple-choice');
  const [answerMode, setAnswerMode] = useState<'interactive' | 'batch'>('interactive');

  const handleStart = () => {
    soundManager.playClick();
    const finalTopic = useCustomTopic && customTopic.trim() ? customTopic.trim() : topic;
    onStartQuiz({
      difficulty,
      topic: finalTopic,
      numQuestions,
      responseType,
      answerMode
    });
  };

  const handleDifficultyChange = (value: 'easy' | 'medium' | 'hard') => {
    soundManager.playClick();
    setDifficulty(value);
  };

  const handleTopicChange = (value: string) => {
    soundManager.playClick();
    setTopic(value);
    setUseCustomTopic(false);
  };

  const handleResponseTypeChange = (value: 'multiple-choice' | 'true-false') => {
    soundManager.playClick();
    setResponseType(value);
  };

  const handleAnswerModeChange = (value: 'interactive' | 'batch') => {
    soundManager.playClick();
    setAnswerMode(value);
  };

  return (
    <div className="min-h-screen p-6 bg-transparent py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#5B8BFF] dark:bg-[#4169E1] border-[4px] border-black dark:border-white flex items-center justify-center">
              <Settings size={32} strokeWidth={3} className="dark:text-white" />
            </div>
            <h1 className="uppercase tracking-tight dark:text-white">Setup Quiz</h1>
          </div>
          <BrutalistButton onClick={() => { soundManager.playClick(); onBack(); }} variant="secondary">
            <span className="uppercase tracking-wide">← Dashboard</span>
          </BrutalistButton>
        </div>

        {/* Main Setup Container */}
        <div className="border-[6px] border-black dark:border-white bg-white dark:bg-[#2a2a2a] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] space-y-10">
          
          {/* Difficulty */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Zap size={24} strokeWidth={3} className="dark:text-white" />
              <h2 className="uppercase tracking-wide dark:text-white">Difficulty</h2>
            </div>
            <ToggleSelector
              options={[
                { value: 'easy', label: 'Easy' },
                { value: 'medium', label: 'Medium' },
                { value: 'hard', label: 'Hard' }
              ]}
              selected={difficulty}
              onChange={handleDifficultyChange}
            />
          </div>

          {/* Topic */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={24} strokeWidth={3} className="dark:text-white" />
              <h2 className="uppercase tracking-wide dark:text-white">Topic</h2>
            </div>
            <ChipSelector
              options={TOPICS}
              selected={topic}
              onChange={handleTopicChange}
            />
            
            {/* Custom Topic Input */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <PenLine size={20} strokeWidth={3} className="dark:text-white" />
                <label className="text-sm uppercase tracking-wide dark:text-white">
                  Or enter custom topic:
                </label>
              </div>
              <BrutalistInput
                value={customTopic}
                onChange={(value) => {
                  setCustomTopic(value);
                  if (value.trim()) {
                    setUseCustomTopic(true);
                  }
                }}
                placeholder="e.g. Ancient Rome, JavaScript, Marine Biology"
              />
            </div>
          </div>

          {/* Number of Questions */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ListChecks size={24} strokeWidth={3} className="dark:text-white" />
              <h2 className="uppercase tracking-wide dark:text-white">Questions</h2>
            </div>
            
            {/* Display current value */}
            <div className="mb-4">
              <div className="inline-block px-6 py-3 bg-[#FFE500] border-[4px] border-black dark:border-white">
                <span className="tracking-wider">{numQuestions} Questions</span>
              </div>
            </div>
            
            {/* Slider */}
            <div className="mb-4">
              <Slider
                value={numQuestions}
                onChange={setNumQuestions}
                min={5}
                max={30}
                step={1}
              />
            </div>
            
            {/* Stepper as alternative */}
            <div className="flex justify-center">
              <Stepper
                value={numQuestions}
                onChange={setNumQuestions}
                min={5}
                max={30}
                step={5}
              />
            </div>
          </div>

          <div className="h-[4px] bg-black dark:bg-white"></div>

          {/* Response Type */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shuffle size={24} strokeWidth={3} className="dark:text-white" />
              <h2 className="uppercase tracking-wide dark:text-white">Response Type</h2>
            </div>
            <ToggleSelector
              options={[
                { value: 'multiple-choice', label: 'Multiple Choice' },
                { value: 'true-false', label: 'True / False' }
              ]}
              selected={responseType}
              onChange={handleResponseTypeChange}
            />
            
            {/* Swipe Hint for True/False */}
            {responseType === 'true-false' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-[#FFE500] dark:bg-[#B8A000] border-[3px] border-black dark:border-white"
              >
                <p className="text-sm uppercase tracking-wide dark:text-white">
                  💡 Swipe right for TRUE, left for FALSE
                </p>
              </motion.div>
            )}
          </div>

          {/* Answer Mode */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="uppercase tracking-wide dark:text-white">Answer Mode</h2>
            </div>
            <ToggleSelector
              options={[
                { value: 'interactive', label: 'Interactive' },
                { value: 'batch', label: 'Batch' }
              ]}
              selected={answerMode}
              onChange={handleAnswerModeChange}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {answerMode === 'interactive' 
                ? 'See if you\'re right after each question' 
                : 'Get all results at the end'
              }
            </p>
          </div>

        </div>

        {/* Start Button */}
        <div className="mt-8 flex justify-end">
          <BrutalistButton 
            onClick={handleStart} 
            variant="primary" 
            size="large"
            className="px-16"
          >
            <span className="uppercase tracking-widest">Start Quiz →</span>
          </BrutalistButton>
        </div>

      </motion.div>
    </div>
  );
}