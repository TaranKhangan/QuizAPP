
import React, { useState,useEffect } from "react";
import '.../App.css';

const Quiz = ({ onQuizComplete}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds total
  
    const questions = [
      {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: '4',
      },
      {
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        answer: 'Paris',
      },
    ];
  
    // Timer logic
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearInterval(timer);
      } else {
        handleSubmit();
      }
    }, [timeLeft]);
  
    const handleAnswerChange = (e) => {
      setAnswers({ ...answers, [currentQuestion]: e.target.value });
    };
  
    const handleNext = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    };
  
    const handleSubmit = () => {
      let score = 0;
      questions.forEach((q, index) => {
        if (answers[index] === q.answer) score++;
      });
      onQuizComplete(score);
    };
  
    return (
      <div className="quiz-container">
        <div className="timer">Time Left: {timeLeft}s</div>
        <h2>{questions[currentQuestion].question}</h2>
        <div className="options">
          {questions[currentQuestion].options.map((option, idx) => (
            <label key={idx} className="option">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={handleAnswerChange}
              />
              {option}
            </label>
          ))}
        </div>
        <div className="buttons">
          {currentQuestion < questions.length - 1 ? (
            <button onClick={handleNext}>Next</button>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    );
  };
  export default Quiz