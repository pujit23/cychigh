import React, { useState } from 'react';
import Quiz from '../components/quiz/Quiz';
import QuizResults from '../components/quiz/QuizResults';
import { calculateMatches } from '../utils/quizMatcher';

const QuizPage = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState([]);

  const handleComplete = (answers) => {
    const matched = calculateMatches(answers);
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
