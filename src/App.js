//import logo from './logo.svg';
import './App.css';
import {Quiz} from './Quiz';
import {Result} from './Result';
import { useState } from 'react';

const App = ()=>{
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setIsQuizOver(true);
  };

  return (
    <div className="app-container">
      <h1>Quiz App</h1>
      {isQuizOver ? (
        <Result score={score} total={questions.length} />
      ) : (
        <Quiz onQuizComplete={handleQuizComplete} />
      )}
    </div>
  );
}

export default App;
