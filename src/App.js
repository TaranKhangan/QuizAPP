//import logo from './logo.svg';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Sign-Log/Login';
//import TeacherSignUp from './Components/Sign-Log/TeacherSignUp';
import SignUp from './Components/Sign-Log/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleHomeClick = () => {
    setShowLogin(false);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar onLoginClick={handleLoginClick} onHomeClick={handleHomeClick}/>

        <Routes>
          <Route
            path="/"
            element={showLogin ? <Login /> : <Home onLoginClick={handleLoginClick} />}
          />
         {/** <Route
            path="/teacher-signup"
            element={<TeacherSignUp onHomeClick={handleHomeClick} />}
          /> */}
          <Route
            path="/signup"
            element={<SignUp onHomeClick={handleHomeClick} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
/*
import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Sign-Log/Login';
import TeacherSignUp from './Components/Sign-Log/TeacherSignUp';
import StudentSignUp from './Components/Sign-Log/StudentSignUp';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

const App =()=>{
  const [showLogin,setShowLogin] = useState(false);
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return(
    <div className='app-container'>
      <Navbar onLoginClick={handleLoginClick}/>
      {showLogin ? <Login/> : <Home onLoginClick={handleLoginClick}/>}
      
      
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

