//import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import React from 'react';
const App =()=>{
  return(
    <div className='app-container'>
      <Home/>
    </div>
  )
}



export default App;




/*
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import React, { useState } from 'react';

const App = ()=>{
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  //////////////
  const [isQuizStarted, setIsQuizStarted] = useState(false);
////////////

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setIsQuizOver(true);
  };
/++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++/
  return ({/* 
    <div className="app-container">
      show Home if quiz hasn't started...
      {!isQuizStarted?(
        <Home onStartQuiz={startQuiz}/>
      ):(
        <>
        {isQuizOver ? (
       <Result score={score} total={2} />
      ) : (
        <Quiz onQuizComplete={handleQuizComplete} />
      )}
        </>
      )}
      <h1>Quiz App</h1>
      
    </div>
  );
}
*/

