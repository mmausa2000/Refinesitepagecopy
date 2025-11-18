import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Clock, Zap, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MultiplayerGameplayProps {
  onGameEnd: () => void;
}

const gameQuestions = [
  {
    id: 1,
    question: 'Complete the verse: "Love is patient, love is..."',
    options: ['kind', 'gentle', 'forgiving', 'eternal'],
    correctAnswer: 'kind',
    reference: '1 Corinthians 13:4',
  },
  {
    id: 2,
    question: 'Who said: "I can do all things through Christ who strengthens me"?',
    options: ['Paul', 'Peter', 'John', 'David'],
    correctAnswer: 'Paul',
    reference: 'Philippians 4:13',
  },
  {
    id: 3,
    question: 'What is the beginning of wisdom according to Proverbs?',
    options: ['Fear of the Lord', 'Knowledge', 'Understanding', 'Faith'],
    correctAnswer: 'Fear of the Lord',
    reference: 'Proverbs 9:10',
  },
];

const allPlayers = [
  { id: '1', name: 'You', avatar: 'Y', color: 'from-purple-500 to-pink-500', score: 0 },
  { id: '2', name: 'Sarah', avatar: 'S', color: 'from-amber-500 to-yellow-500', score: 0 },
  { id: '3', name: 'Mike', avatar: 'M', color: 'from-blue-500 to-cyan-500', score: 0 },
  { id: '4', name: 'Emma', avatar: 'E', color: 'from-green-500 to-teal-500', score: 0 },
];

export function MultiplayerGameplay({ onGameEnd }: MultiplayerGameplayProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [playerScores, setPlayerScores] = useState(allPlayers.map(p => ({ ...p })));
  const [playersAnswered, setPlayersAnswered] = useState<string[]>([]);
  const [playerAnswers, setPlayerAnswers] = useState<Record<string, { answer: string; time: number }>>({});

  const currentQuestion = gameQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(selectedAnswer || '');
    }
  }, [timeLeft, showResult]);

  // Simulate other players answering
  useEffect(() => {
    if (selectedAnswer && !showResult) {
      // Simulate other players answering shortly after you
      const delays = [800, 1500, 2200];
      const otherPlayers = allPlayers.filter(p => p.id !== '1');
      
      otherPlayers.forEach((player, index) => {
        setTimeout(() => {
          setPlayersAnswered(prev => [...prev, player.id]);
          
          // Randomly correct or incorrect
          const isPlayerCorrect = Math.random() > 0.3;
          const playerAnswer = isPlayerCorrect 
            ? currentQuestion.correctAnswer 
            : currentQuestion.options.find(o => o !== currentQuestion.correctAnswer) || currentQuestion.options[0];
          
          setPlayerAnswers(prev => ({
            ...prev,
            [player.id]: { answer: playerAnswer, time: 30 - timeLeft + (index * 2) }
          }));

          // Update score if correct
          if (isPlayerCorrect) {
            setPlayerScores(prev => prev.map(p => 
              p.id === player.id ? { ...p, score: p.score + 1 } : p
            ));
          }
        }, delays[index]);
      });
    }
  }, [selectedAnswer]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setPlayersAnswered(prev => [...prev, '1']);
    setPlayerAnswers(prev => ({
      ...prev,
      '1': { answer, time: 30 - timeLeft }
    }));

    if (answer === currentQuestion.correctAnswer) {
      setPlayerScores(prev => prev.map(p => 
        p.id === '1' ? { ...p, score: p.score + 1 } : p
      ));
    }

    setShowResult(true);

    // Wait for all players, then move to next question or end game
    setTimeout(() => {
      if (currentQuestionIndex < gameQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
        setPlayersAnswered([]);
        setPlayerAnswers({});
      } else {
        onGameEnd();
      }
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Question {currentQuestionIndex + 1} of {gameQuestions.length}
          </span>
          <span className="text-teal-400">
            {playerScores.find(p => p.id === '1')?.score || 0} points
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / gameQuestions.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-green-500 to-teal-500"
          />
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center justify-center gap-3">
        <Clock className="w-5 h-5 text-orange-400" />
        <div className="flex items-center gap-2">
          <motion.span
            key={timeLeft}
            initial={{ scale: 1.2, color: '#fb923c' }}
            animate={{ scale: 1, color: timeLeft < 10 ? '#f87171' : '#fb923c' }}
            className="text-3xl font-mono"
          >
            {timeLeft}
          </motion.span>
          <span className="text-gray-400 text-sm">seconds</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white text-xl text-center mb-4">
            {currentQuestion.question}
          </p>
          <p className="text-purple-400 text-sm text-center">
            {currentQuestion.reference}
          </p>
        </motion.div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === currentQuestion.correctAnswer;
          const showCorrect = showResult && isCorrectOption;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                showCorrect
                  ? 'bg-green-500/20 border-green-500 shadow-lg shadow-green-500/20'
                  : showWrong
                  ? 'bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20'
                  : isSelected
                  ? 'bg-teal-500/20 border-teal-500'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-lg ${
                  showCorrect ? 'text-green-400' : showWrong ? 'text-red-400' : 'text-white'
                }`}>
                  {option}
                </span>
                {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                {showWrong && <XCircle className="w-6 h-6 text-red-400" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Live Player Status */}
      <div className="space-y-3">
        <h4 className="text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-400" />
          Live Standings
        </h4>
        
        <div className="space-y-2">
          {playerScores
            .sort((a, b) => b.score - a.score)
            .map((player, index) => {
              const hasAnswered = playersAnswered.includes(player.id);
              const answer = playerAnswers[player.id];
              const isPlayerCorrect = answer?.answer === currentQuestion.correctAnswer;

              return (
                <motion.div
                  key={player.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    index === 0
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  {/* Rank */}
                  <div className="w-6 text-center">
                    <span className={`${index === 0 ? 'text-amber-400' : 'text-gray-400'}`}>
                      #{index + 1}
                    </span>
                  </div>

                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${player.color} flex items-center justify-center text-white`}>
                    {player.avatar}
                  </div>

                  {/* Name */}
                  <div className="flex-1">
                    <p className={`${index === 0 ? 'text-amber-400' : 'text-white'}`}>
                      {player.name}
                    </p>
                    {showResult && answer && (
                      <p className={`text-xs ${isPlayerCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {isPlayerCorrect ? `✓ Correct (${answer.time}s)` : '✗ Wrong'}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span className={`text-lg ${index === 0 ? 'text-amber-400' : 'text-white'}`}>
                      {player.score}
                    </span>
                    {!showResult && hasAnswered && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-green-400"
                      />
                    )}
                    {!showResult && !hasAnswered && (
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-6 rounded-full border-2 border-gray-500 border-t-teal-400 animate-spin"
                        style={{ borderTopColor: '#14b8a6' }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* Answer Feedback */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`p-4 rounded-xl border-2 ${
              isCorrect
                ? 'bg-green-500/10 border-green-500'
                : 'bg-red-500/10 border-red-500'
            }`}
          >
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-green-400 text-lg">Correct! 🎉</p>
                    <p className="text-gray-300 text-sm">+1 point added</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-red-400 text-lg">{selectedAnswer ? 'Incorrect' : 'Time\'s up!'}</p>
                    <p className="text-gray-300 text-sm">
                      The correct answer was: <span className="text-green-400">{currentQuestion.correctAnswer}</span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
