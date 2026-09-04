import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { HelpCircle, CheckCircle2, XCircle, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface QuizSectionProps {
  topicId: string;
  topicTitle: string;
  questions?: QuizQuestion[];
}

export const QuizSection: React.FC<QuizSectionProps> = ({ topicId, topicTitle, questions = [] }) => {
  const { user, setUser } = useApp();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  if (!questions || questions.length === 0) return null;

  const handleSelect = (qId: string, optIndex: number) => {
    if (showExplanations[qId]) return; // Already submitted

    const updatedAnswers = { ...selectedAnswers, [qId]: optIndex };
    const updatedExplanations = { ...showExplanations, [qId]: true };

    setSelectedAnswers(updatedAnswers);
    setShowExplanations(updatedExplanations);

    // Update user quiz score and attempts in profile
    if (user) {
      let correctCount = 0;
      let totalAnswered = 0;
      questions.forEach(q => {
        if (updatedAnswers[q.id] !== undefined) {
          totalAnswered++;
          if (updatedAnswers[q.id] === q.correctIndex) {
            correctCount++;
          }
        }
      });
      const updatedUser = {
        ...user,
        quizScores: {
          ...(user.quizScores || {}),
          [topicId]: correctCount
        },
        quizAttempts: {
          ...(user.quizAttempts || {}),
          [topicId]: { correct: correctCount, total: totalAnswered }
        }
      };
      setUser(updatedUser);
      localStorage.setItem('algomentor_user', JSON.stringify(updatedUser));
    }
  };

  const answeredCount = Object.keys(showExplanations).length;
  const correctCount = questions.filter(q => selectedAnswers[q.id] === q.correctIndex).length;

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1c2128] border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#bc8cff]" />
          <h3 className="text-sm font-semibold text-[#e6edf3]">
            Concept Check: {topicTitle}
          </h3>
        </div>
        {answeredCount > 0 && (
          <span className="text-xs font-mono font-medium text-[#8b949e] flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-[#e3b341]" />
            Score: {correctCount}/{questions.length}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-5">
        {questions.map((q, qIndex) => {
          const isAnswered = !!showExplanations[q.id];
          const chosenIdx = selectedAnswers[q.id];
          const isCorrect = chosenIdx === q.correctIndex;

          return (
            <div key={q.id} className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#21262d] text-[#8b949e] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <p className="text-sm font-medium text-[#e6edf3] leading-snug">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2 pl-7">
                {q.options.map((opt, optIdx) => {
                  let btnStyle = 'bg-[#161b22] border-[#30363d] text-[#e6edf3] hover:border-[#58a6ff]/50';

                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'bg-[#3fb950]/15 border-[#3fb950] text-[#3fb950] font-medium';
                    } else if (optIdx === chosenIdx) {
                      btnStyle = 'bg-[#f85149]/15 border-[#f85149] text-[#f85149]';
                    } else {
                      btnStyle = 'bg-[#161b22]/40 border-[#30363d]/40 text-[#8b949e] opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={isAnswered}
                      className={`text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0 ml-2" />
                      )}
                      {isAnswered && optIdx === chosenIdx && !isCorrect && (
                        <XCircle className="w-4 h-4 text-[#f85149] shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Banner */}
              {isAnswered && (
                <div className={`mt-1 ml-7 p-3 rounded-md text-xs leading-relaxed border ${
                  isCorrect
                    ? 'bg-[#3fb950]/10 border-[#3fb950]/30 text-[#e6edf3]'
                    : 'bg-[#f85149]/10 border-[#f85149]/30 text-[#e6edf3]'
                }`}>
                  <strong className={isCorrect ? 'text-[#3fb950]' : 'text-[#f85149]'}>
                    {isCorrect ? 'Correct! ' : 'Not quite. '}
                  </strong>
                  <span className="text-[#8b949e]">{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
