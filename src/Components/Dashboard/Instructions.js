import React, { useState } from "react";
import './Instructions.css';

const Instructions = () => {
  const instructions = {
    first: "This quiz contains 20 MCQ-based questions, each carrying distinct marks.",
    second: "The duration of the quiz is 30 minutes.",
    third: "You are not allowed to refresh, close, or change the window once the test starts; otherwise, you will not be able to submit the test.",
    fourth: "The language of the quiz is Hindi.",
  };

  const [selectedLang, setSelectedLang] = useState("Hindi");

  const handleLangChange = (event) => {
    setSelectedLang(event.target.value);
  };

  return (
    <div className="instructions-container">
      <div className="inst-header">
        <h1>Instructions</h1>
      </div>
      <div className="inst-body">
        <ul>
        <li>{instructions.first}</li>
        <li>{instructions.second}</li>
        <li>{instructions.third}</li>
        <li>{instructions.fourth}</li>
        </ul>
      
      <div className="lang-selection" role="radiogroup" aria-label="Select quiz language">
        <h4>Select Language</h4>
        <div className="radio-group">
          <label htmlFor="lang-hindi">
            <input
              type="radio"
              id="lang-hindi"
              value="Hindi"
              checked={selectedLang === "Hindi"}
              onChange={handleLangChange}
            />
            Hindi
          </label>
          <label htmlFor="lang-english">
            <input
              type="radio"
              id="lang-english"
              value="English"
              checked={selectedLang === "English"}
              onChange={handleLangChange}
            />
            English
          </label>
        </div>
      </div>
      </div>
      <div className="start-button-container">
        <button className="start-button" aria-label="Start the quiz">
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Instructions;