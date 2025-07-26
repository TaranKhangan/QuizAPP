import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Sign-Log/Login';
import Footer from './Components/Home/footer';
import SignUp from './Components/Sign-Log/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import TestDetails from './Components/Dashboard/Test-details';

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
        <Navbar onLoginClick={handleLoginClick} onHomeClick={handleHomeClick} />
        <Routes>
          <Route
            path="/"
            element={showLogin ? <Login /> : <Home onLoginClick={handleLoginClick} />}
          />
          <Route
            path="/signup"
            element={<SignUp onHomeClick={handleHomeClick} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
           <Route
          path="/test-details"
          element={<TestDetails />}
        />
        </Routes>
       
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
