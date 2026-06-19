import React, { useState } from 'react';
import Quiz from '../components/quiz/Quiz';
import QuizResults from '../components/quiz/QuizResults';
import { calculateMatches } from '../utils/quizMatcher';
import { getCycles } from '../services/api';

const QuizPage = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState([]);
  const [liveCycles, setLiveCycles] = useState([]);

  React.useEffect(() => {
    getCycles({ limit: 500 }).then(res => {
      if (res.data?.cycles) {
        setLiveCycles(res.data.cycles);
      }
    }).catch(err => console.error('Failed to load cycles for quiz:', err));
  }, []);

  const handleComplete = (answers) => {
    const matched = calculateMatches(answers, liveCycles);
    setResults(matched);
    setIsComplete(true);
    window.scrollTo(0, 0);
  };

  const handleRetake = () => {
    setIsComplete(false);
    setResults([]);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full">
      {!isComplete ? (
        <Quiz onComplete={handleComplete} />
      ) : (
        <QuizResults results={results} onRetake={handleRetake} />
      )}
    </div>
  );
};

export default QuizPage;
