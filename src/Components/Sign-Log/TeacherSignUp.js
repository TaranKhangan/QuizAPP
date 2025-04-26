import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const TeacherSignUp = ({ onHomeClick }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Teacher signing up');
  };

  const handleBackClick = ()=>{
    onHomeClick();//acll the prop to update the state in app.js
    navigate('/');
  }
  return (
    <div className="body">
    <div className="bg-animation">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
    </div>
    <div className="signup-container">
      
      <h2>Teacher Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" id="name" required placeholder=" " />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-group">
          <input type="email" id="email" required placeholder=" " />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input type="password" id="password" required placeholder=" " />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-group">
          <input type="text" id="qualification" required placeholder=" " />
          <label htmlFor="qualification">Qualification</label>
        </div>
        <div className="form-group">
          <input type="text" id="subject" required placeholder=" " />
          <label htmlFor="subject">Subject Expertise</label>
        </div>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <button className="back-btn" onClick={handleBackClick}>Back to Home</button>
    </div>
    </div>
  );
};

export default TeacherSignUp;