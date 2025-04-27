import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const TeacherSignUp = ({ onHomeClick }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Teacher signing up');
  };

  const handleBackClick = () => {
    onHomeClick();
    navigate('/');
  };

  return (
    <div className="body">
      <div className="bg-animation">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className='circle'></div>
        <div className='circle'></div>
      </div>
      <div className="signup-container">
        <h2>Teacher Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Personal Details Section */}
          <fieldset className="form-section">
            <legend>Personal Details</legend>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="firstName" required placeholder=" " />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="form-group">
                <input type="text" id="middleName" placeholder=" " />
                <label htmlFor="middleName">Middle Name</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="lastName" required placeholder=" " />
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" required placeholder=" " />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="password" id="password" required placeholder=" " />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </fieldset>

          {/* School Details Section */}
          <fieldset className="form-section">
            <legend>School Details</legend>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="schoolName" required placeholder=" " />
                <label htmlFor="schoolName">School Name</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="pincode" required placeholder=" " />
                <label htmlFor="pincode">Pincode</label>
              </div>
              <div className="form-group">
                <input type="text" id="villageTown" required placeholder=" " />
                <label htmlFor="villageTown">Village/Town</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="district" required placeholder=" " />
                <label htmlFor="district">District</label>
              </div>
              <div className="form-group">
                <input type="text" id="state" required placeholder=" " />
                <label htmlFor="state">State</label>
              </div>
            </div>
          </fieldset>

          {/* Professional Details Section */}
          <fieldset className="form-section">
            <legend>Professional Details</legend>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="qualification" required placeholder=" " />
                <label htmlFor="qualification">Qualification</label>
              </div>
              <div className="form-group">
                <input type="text" id="subject" required placeholder=" " />
                <label htmlFor="subject">Subject Expertise</label>
              </div>
            </div>
          </fieldset>

          <button type="submit" className="Signup-btn">Sign Up</button>
        </form>
        <button className="back-btn" onClick={handleBackClick}>Back to Home</button>
      </div>
    </div>
  );
};

export default TeacherSignUp;
















