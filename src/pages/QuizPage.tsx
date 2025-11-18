import { useState, useEffect } from 'react';
import { ChevronLeft, Timer, CheckCircle2, XCircle, Trophy, RotateCcw, Home, Clock, Diamond, Users, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { MultiplayerLeaderboard } from '../components/MultiplayerLeaderboard';

interface QuizQuestion {
  id: number;
  reference: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

const mockQuestions: QuizQuestion[] = [
  {
    id: 1,
    reference: 'John 3:16',
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    options: ['John 3:16', 'Romans 8:28', 'Psalm 23:1', 'Genesis 1:1'],
    correctAnswer: 0,
  },
  {
    id: 2,
    reference: 'Romans 8:28',
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    options: ['Philippians 4:13', 'Romans 8:28', 'Matthew 28:20', 'Proverbs 3:5'],
    correctAnswer: 1,
  },
  {
    id: 3,
    reference: 'Psalm 23:1',
    text: 'The Lord is my shepherd; I shall not want.',
    options: ['Psalm 23:1', 'Isaiah 40:31', 'Jeremiah 29:11', '1 Corinthians 13:4'],
    correctAnswer: 0,
  },
];

interface QuizPageProps {
  onNavigateHome: () => void;
  isMultiplayer?: boolean;
}

export function QuizPage({ onNavigateHome, isMultiplayer = false }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    if (quizComplete || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, quizComplete, showResult]);

  const handleTimeout = () => {
    setAnswers([...answers, false]);
    setShowResult(true);
    setTimeout(() => {
      moveToNext();
    }, 2000);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === mockQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, isCorrect]);
    setShowResult(true);

    setTimeout(() => {
      moveToNext();
    }, 2000);
  };

  const moveToNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setQuizComplete(false);
    setAnswers([]);
  };

  if (quizComplete) {
    const percentage = Math.round((score / mockQuestions.length) * 100);
    
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-[#1a2942]/60 backdrop-blur-sm border border-white/20 rounded-2xl p-12 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-white text-2xl mb-2">Quiz Complete!</h1>
          <p className="text-gray-400 mb-8">Great job on completing the quiz</p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Score</p>
              <p className="text-white text-2xl">{score}/{mockQuestions.length}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Accuracy</p>
              <p className="text-white text-2xl">{percentage}%</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Questions</p>
              <p className="text-white text-2xl">{mockQuestions.length}</p>
            </div>
          </div>

          {/* Answer Review */}
          <div className="mb-8 text-left space-y-2">
            <h3 className="text-white mb-3">Answer Review</h3>
            {mockQuestions.map((q, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                {answers[i] ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                )}
                <span className="text-white text-sm">{q.reference}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={restartQuiz}
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={onNavigateHome}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = mockQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-full">
      {/* Multiplayer Leaderboard Sidebar */}
      {isMultiplayer && (
        <MultiplayerLeaderboard
          currentQuestion={currentQuestion}
          totalQuestions={mockQuestions.length}
          yourScore={score}
          showResult={showResult}
        />
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-3 md:px-8 py-3 md:py-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onNavigateHome}
            className="w-7 h-7 md:w-8 md:h-8 bg-white/10 rounded hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
        </div>

        <div>
          <h1 className="text-white text-center text-base md:text-xl">Quick Quiz</h1>
        </div>

        <div className="w-7 md:w-8" /> {/* Spacer for center alignment */}
      </header>

      {/* Quiz Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-6 overflow-hidden">
        <div className="w-full max-w-3xl">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Time Left */}
            <div className="bg-[#1a2942]/80 backdrop-blur-sm border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>TIME LEFT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-2xl ${timeLeft <= 5 ? 'text-orange-400' : 'text-orange-400'}`}>
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Score */}
            <div className="bg-[#1a2942]/80 backdrop-blur-sm border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <Diamond className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                <span>SCORE</span>
              </div>
              <div className="text-2xl text-blue-400">{score}</div>
            </div>

            {/* Correct */}
            <div className="bg-[#1a2942]/80 backdrop-blur-sm border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span>CORRECT</span>
              </div>
              <div className="text-2xl text-green-400">{score}</div>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-white text-sm">Question {currentQuestion + 1} of {mockQuestions.length}</p>
            <p className="text-gray-400 text-sm">{Math.round((score / Math.max(currentQuestion, 1)) * 100)}% Accuracy</p>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#1a2942]/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-4"
            >
              <div className="mb-4">
                <span className="text-teal-400 text-xs tracking-wider">QUESTION {currentQuestion + 1}</span>
              </div>

              <p className="text-white mb-6 leading-relaxed">
                {question.text}
              </p>

              {/* Answer Options */}
              <div className="space-y-2.5">
                {question.options.map((option, index) => {
                  const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
                  const isSelected = selectedAnswer === index;
                  const isCorrectOption = index === question.correctAnswer;
                  
                  let optionStyle = 'bg-[#152238]/80 border-white/10 hover:border-white/30 hover:bg-[#152238]';
                  
                  if (showResult && isSelected && isCorrect) {
                    optionStyle = 'bg-green-500/20 border-green-500/50';
                  } else if (showResult && isSelected && !isCorrect) {
                    optionStyle = 'bg-red-500/20 border-red-500/50';
                  } else if (showResult && isCorrectOption) {
                    optionStyle = 'bg-green-500/20 border-green-500/50';
                  }

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${optionStyle} ${
                        showResult ? 'cursor-default' : 'cursor-pointer'
                      }`}
                      whileHover={!showResult ? { scale: 1.01 } : {}}
                      whileTap={!showResult ? { scale: 0.99 } : {}}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                        showResult && isSelected && isCorrect
                          ? 'bg-green-500 text-white'
                          : showResult && isSelected && !isCorrect
                          ? 'bg-red-500 text-white'
                          : showResult && isCorrectOption
                          ? 'bg-green-500 text-white'
                          : 'bg-white/10 text-gray-300'
                      }`}>
                        {optionLabel}
                      </div>
                      <span className="text-white text-left flex-1 text-sm">{option}</span>
                      
                      {showResult && isCorrectOption && (
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Exit Quiz Button */}
          <button
            onClick={() => setShowExitModal(true)}
            className="w-full py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Exit Quiz</span>
          </button>
        </div>
      </div>

      {/* Exit Modal */}
      <AnimatePresence>
        {showExitModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowExitModal(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-[#1a2942]/95 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md mx-4 pointer-events-auto"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-white text-xl mb-2 text-center">Exit Quiz?</h2>
                <p className="text-gray-400 text-sm mb-4 text-center">Your progress will not be saved and your score will be lost.</p>
                
                {/* Quiz Stats */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-orange-400 text-xs mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>TIME</span>
                      </div>
                      <div className="text-white">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-blue-400 text-xs mb-1">
                        <Diamond className="w-3.5 h-3.5 fill-blue-400" />
                        <span>SCORE</span>
                      </div>
                      <div className="text-white">{score}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-green-400 text-xs mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>CORRECT</span>
                      </div>
                      <div className="text-white">{score}/{currentQuestion + 1}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setShowExitModal(false)}
                    variant="outline"
                    className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={onNavigateHome}
                    className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
                  >
                    Exit Quiz
                  </Button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}