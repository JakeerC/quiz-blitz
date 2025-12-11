import {useState} from 'react';
import {
  Settings,
  Zap,
  BookOpen,
  ListChecks,
  Shuffle,
  PenLine,
} from 'lucide-react';
import {Button} from '@/components/ui/Button';
import {ToggleSelector} from '@/components/ui/ToggleSelector';
import {ChipSelector} from '@/components/ui/ChipSelector';
import {Stepper} from '@/components/ui/Stepper';
import {Slider} from '@/components/ui/Slider';
import {soundManager} from '@/utils';
import {QuizConfig} from '@/types';
import {AnswerMode, Difficulty, QuestionType} from '@/types';
import {InputGroup, InputGroupInput} from '@/components/ui/InputGroup';

type SetupProps = {
  onStartQuizAction: (config: QuizConfig) => void;
  onBackAction: () => void;
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
  'Art',
];

export function Setup({onStartQuizAction, onBackAction}: SetupProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [topic, setTopic] = useState<string>('Science');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [useCustomTopic, setUseCustomTopic] = useState<boolean>(false);
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [responseType, setResponseType] =
    useState<QuestionType>('multiple-choice');
  const [answerMode, setAnswerMode] = useState<AnswerMode>('interactive');

  const handleStart = () => {
    soundManager.playClick();
    const finalTopic =
      useCustomTopic && customTopic.trim() ? customTopic.trim() : topic;
    onStartQuizAction({
      difficulty,
      topic: finalTopic,
      numQuestions,
      responseType,
      answerMode,
    });
  };

  const handleDifficultyChange = (value: Difficulty) => {
    soundManager.playClick();
    setDifficulty(value);
  };

  const handleTopicChange = (value: string) => {
    soundManager.playClick();
    setTopic(value);
    setUseCustomTopic(false);
  };

  const handleResponseTypeChange = (value: QuestionType) => {
    soundManager.playClick();
    setResponseType(value);
  };

  const handleAnswerModeChange = (value: AnswerMode) => {
    soundManager.playClick();
    setAnswerMode(value);
  };

  return (
    <div className="min-h-screen bg-transparent p-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="border-box flex h-16 w-16 items-center justify-center bg-[#5B8BFF]">
              <Settings size={32} strokeWidth={3} className="" />
            </div>
            <h1 className="tracking-tight uppercase">Setup Quiz</h1>
          </div>
          <Button
            onClick={() => {
              soundManager.playClick();
              onBackAction();
            }}
            variant="secondary">
            <span className="tracking-wide uppercase">← Dashboard</span>
          </Button>
        </div>

        {/* Main Setup Container */}
        <div className="card space-y-10 p-8">
          {/* Difficulty */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Zap size={24} strokeWidth={3} className="" />
              <h2 className="tracking-wide uppercase">Difficulty</h2>
            </div>
            <ToggleSelector
              options={[
                {value: 'easy', label: 'Easy'},
                {value: 'medium', label: 'Medium'},
                {value: 'hard', label: 'Hard'},
                {value: 'mixed', label: 'Mixed'},
              ]}
              selected={difficulty}
              onChange={handleDifficultyChange}
            />
          </div>

          {/* Topic */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <BookOpen size={24} strokeWidth={3} className="" />
              <h2 className="tracking-wide uppercase">Topic</h2>
            </div>
            <ChipSelector
              options={TOPICS}
              selected={topic}
              onChange={handleTopicChange}
            />

            {/* Custom Topic Input */}
            <div className="mt-4">
              <div className="mb-3 flex items-center gap-2">
                <PenLine size={20} strokeWidth={3} className="" />
                <label className="text-sm tracking-wide uppercase">
                  Or enter custom topic:
                </label>
              </div>
              <InputGroup
                value={customTopic}
                onChange={(e) => {
                  const value = e.target.value;
                  setCustomTopic(value);
                  if (value.trim()) {
                    setUseCustomTopic(true);
                  }
                }}
                placeholder="e.g. Ancient Rome, JavaScript, Marine Biology">
                <InputGroupInput />
              </InputGroup>
            </div>
          </div>

          {/* Number of Questions */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <ListChecks size={24} strokeWidth={3} className="" />
              <h2 className="tracking-wide uppercase">Questions</h2>
            </div>

            {/* Display current value */}
            <div className="mb-4">
              <div className="bg-primary border-box inline-block px-6 py-3">
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

          <div className="h-2 bg-black"></div>

          {/* Response Type */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Shuffle size={24} strokeWidth={3} className="" />
              <h2 className="tracking-wide uppercase">Response Type</h2>
            </div>
            <ToggleSelector
              options={[
                {value: 'multiple-choice', label: 'Multiple Choice'},
                {value: 'true-false', label: 'True / False'},
                {value: 'mixed', label: 'Mixed'},
              ]}
              selected={responseType}
              onChange={handleResponseTypeChange}
            />

            {/* Swipe Hint for True/False */}
            {responseType === 'true-false' && (
              <div className="border-primary-950 bg-primary-200 border-box mt-4 rounded-md p-4">
                <p className="text-sm tracking-wide uppercase">
                  💡 Swipe right for TRUE, left for FALSE
                </p>
              </div>
            )}
          </div>

          {/* Answer Mode */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="tracking-wide uppercase">Answer Mode</h2>
            </div>
            <ToggleSelector
              options={[
                {value: 'interactive', label: 'Interactive'},
                {value: 'batch', label: 'Batch'},
              ]}
              selected={answerMode}
              onChange={handleAnswerModeChange}
            />
            <p className="mt-3 text-sm text-gray-600">
              {answerMode === 'interactive'
                ? "See if you're right after each question"
                : 'Get all results at the end'}
            </p>
          </div>
        </div>

        {/* Start Button */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleStart}
            variant="primary"
            size="large"
            className="px-16">
            <span className="tracking-widest uppercase">Start Quiz →</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
