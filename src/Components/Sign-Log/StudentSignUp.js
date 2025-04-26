import React from 'react';
import './SignUp.css';

const StudentSignUp = ({ onHomeClick }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student signing up');
  };

  return (
    <div className="signup-container">
      <h2>Student Sign Up</h2>
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
          <input type="text" id="grade" required placeholder=" " />
          <label htmlFor="grade">Grade</label>
        </div>
        <div className="form-group">
          <input type="text" id="school" required placeholder=" " />
          <label htmlFor="school">School</label>
        </div>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <button className="back-btn" onClick={onHomeClick}>Back to Home</button>
    </div>
  );
};

export default StudentSignUp;