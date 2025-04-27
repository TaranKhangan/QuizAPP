import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const StudentSignUp = ({ onHomeClick }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student signing up');
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
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      <div className="signup-container">
        <h2>Student Sign Up</h2>
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
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="fatherFirstName" required placeholder=" " />
                <label htmlFor="fatherFirstName">Father's First Name</label>
              </div>
              <div className="form-group">
                <input type="text" id="fatherMiddleName" placeholder=" " />
                <label htmlFor="fatherMiddleName">Father's Middle Name</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="fatherLastName" required placeholder=" " />
                <label htmlFor="fatherLastName">Father's Last Name</label>
              </div>
            </div>
          </fieldset>

          {/* Contact Details Section */}
          <fieldset className="form-section">
            <legend>Contact Details</legend>
            <div className="form-row">
              <div className="form-group">
                <input type="email" id="email" required placeholder=" " />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-group">
                <input type="password" id="password" required placeholder=" " />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="tel" id="phoneNumber" required placeholder=" " />
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>
            </div>
          </fieldset>

          {/* Address Section */}
          <fieldset className="form-section">
            <legend>Address</legend>
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

          {/* Educational Details Section */}
          <fieldset className="form-section">
            <legend>Educational Details</legend>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="schoolName" required placeholder=" " />
                <label htmlFor="schoolName">School/University Name</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="schoolDistrict" required placeholder=" " />
                <label htmlFor="schoolDistrict">School/University District</label>
              </div>
              <div className="form-group">
                <input type="text" id="schoolState" required placeholder=" " />
                <label htmlFor="schoolState">School/University State</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="grade" required placeholder=" " />
                <label htmlFor="grade">Grade/Year</label>
              </div>
              <div className="form-group">
                <select id="areaOfInterest" name="areaOfInterest" required>
                  <option value="" disabled selected hidden></option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Biology">Biology</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                </select>
                <label htmlFor="areaOfInterest">Area of Interest</label>
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

export default StudentSignUp;