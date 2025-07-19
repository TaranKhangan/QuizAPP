

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = ({ onHomeClick }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userType: '',
    fullname: '',
    fathername: '',
    gender: '',
    customGender: '',
    areasOfInterest: [],
    email: '',
    phoneNumber: '',
    pincode: '',
    city: '',
    district: '',
    state: '',
    institutionType: '',
    institutionState: '',
    institutionDistrict: '',
    institutionCity: '',
    selectedInstitution: '',
    customCoachingName: '',
    grade: '',
    designation: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);//for success message

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('handleSubmit called');
    const submitData = {
      userType: formData.userType,
      fullname: formData.fullname,
      fathername: formData.fathername,
      gender: formData.gender === 'Others' ? formData.customGender : formData.gender,
      ...(formData.userType === 'Student' || formData.userType === 'Others' ? { areasOfInterest: formData.areasOfInterest } : {}),
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      ...(formData.userType === 'Student' || formData.userType === 'Others' ? {
        pincode: formData.pincode,
        city: formData.city,
        district: formData.district,
        state: formData.state
      } : {}),
      ...(formData.userType === 'Student' || formData.userType === 'Teacher' ? {
        institutionType: formData.institutionType,
        institutionState: formData.institutionState,
        institutionDistrict: formData.institutionDistrict,
        institutionCity: formData.institutionCity,
        selectedInstitution: formData.institutionType === 'Coaching Center' ? formData.customCoachingName : formData.selectedInstitution,
        ...(formData.userType === 'Student' ? { grade: formData.grade } : { designation: formData.designation })
      } : {}),
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };
    console.log(`${formData.userType} signing up`, submitData);
    setShowSuccess(true);
    setFormData({
      userType: '',
      fullname: '',
      fathername: '',
      gender: '',
      customGender: '',
      areasOfInterest: [],
      email: '',
      phoneNumber: '',
      pincode: '',
      city: '',
      district: '',
      state: '',
      institutionType: '',
      institutionState: '',
      institutionDistrict: '',
      institutionCity: '',
      selectedInstitution: '',
      customCoachingName: '',
      grade: '',
      designation: '',
      username: '',
      password: '',
      confirmPassword: ''
    });
  
    // Redirect to dashboard after signup
    setTimeout(() => navigate('/dashboard'), 3000); // Match success message duration
  };

  

// for success message
  useEffect(() => {
    if (showSuccess) {
      console.log('Success message should be visible');
      const timer = setTimeout(() => {
        console.log('Hiding success message');
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

// for areas of interest
  useEffect(() => {
    console.log("areasOfInterest:", formData.areasOfInterest);
  }, [formData.areasOfInterest]);

  //to back to home page .. 
  const handleBackClick = () => {
    onHomeClick();
    navigate('/');
  };

  // Handle input changes and reset dependent fields

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [id]: value };
      //reset dependent fields with insti type
      if (id === 'institutionType') {
        newFormData.institutionState = '';
        newFormData.institutionDistrict = '';
        newFormData.institutionCity = '';
        newFormData.selectedInstitution = '';
        newFormData.customCoachingName = '';
        newFormData.grade = '';
        newFormData.designation = '';
      } else if (id === 'institutionState') {
        newFormData.institutionDistrict = '';
        newFormData.institutionCity = '';
        newFormData.selectedInstitution = '';
        newFormData.customCoachingName = '';
      } else if (id === 'institutionDistrict') {
        newFormData.institutionCity = '';
        newFormData.selectedInstitution = '';
        newFormData.customCoachingName = '';
      } else if (id === 'institutionCity') {
        newFormData.selectedInstitution = '';
        newFormData.customCoachingName = '';
      }
      return newFormData;
    });
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const districts = [
    'Ahmedabad', 'Amritsar', 'Bangalore', 'Bhopal', 'Chennai',
    'Delhi', 'Hyderabad', 'Jaipur', 'Kolkata', 'Mumbai', 'Sangrur', 'Mansa', 'Gurdaspur',
    'Pune', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur'
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chandigarh', 'Manglore', 'Hyderabad', 'Ahmedabad',
    'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
    'Lucknow', 'Kanpur', 'Nagpur', 'Amritsar', 'Bhopal'
  ];

  const schools = [
    'ABC High School', 'DEF Academy', 'MNO School of Science',
    'QRS School of Business', 'ZAB School of Law'
  ];

  const colleges = [
    'PQR College', 'JKL College of Arts', 'UVW College of Commerce',
    'TUV College of Education', 'FGH College of Hospitality',
    'Beant College of Engineering', 'BHM College of Management'
  ];

  const universities = [
    'XYZ University', 'RST University of Engineering', 'CDE University of Medicine',
    'GNDU University', 'Guru Nanak Dev Engineering College'
  ];

  const interests = [
    'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology',
    'Computer Science / Coding', 'English Literature', 'Social Studies / History',
    'Economics', 'Geography', 'Robotics / AI', 'Environmental Awareness',
    'Space / Astronomy', 'Arts'
  ];

  const schoolGrades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const collegeUniversityCourses = ['BA', 'MA', 'BSc', 'MSc', 'BCom', 'MCom', 'BCA', 'MCA', 'BTech', 'MTech', 'BBA', 'MBA', 'Polytechnic'];
  const coachingExams = ['JEE', 'NEET', 'SSC', 'UPSC', 'Railway'];

  const getInstitutions = () => {
    switch (formData.institutionType) {
      case 'School': return schools;
      case 'College': return colleges;
      case 'University': return universities;
      case 'Coaching Center': return [];
      default: return [];
    }
  };

  const getGradeOptions = () => {
    switch (formData.institutionType) {
      case 'School': return schoolGrades;
      case 'College':
      case 'University': return collegeUniversityCourses;
      case 'Coaching Center': return coachingExams;
      default: return [];
    }
  };
//to get the grade label(grade, course, exam) based on institution type
  const getGradeLabel = () => {
    switch (formData.institutionType) {
      case 'School': return 'Grade';
      case 'College':
      case 'University': return 'Course';
      case 'Coaching Center': return 'Exam';
      default: return 'Qualification';
    }
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
      {showSuccess && (
        <div className="success-message show">Sign Up Successful!</div>
      )}
      
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/**For Selecting User Type*/}
          <fieldset className="form-section">
            <legend>User Type</legend>
            <div className="form-row">
              <div className="form-group radio-group">
                <label className="radio-label">Select User Type</label>
                <div className="radio-options">
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="Student"
                      checked={formData.userType === 'Student'}
                      onChange={(e) => setFormData((prev) => ({ ...prev, userType: e.target.value }))}
                    />
                    Student
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="Teacher"
                      checked={formData.userType === 'Teacher'}
                      onChange={(e) => setFormData((prev) => ({ ...prev, userType: e.target.value }))}
                    />
                    Teacher
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="Others"
                      checked={formData.userType === 'Others'}
                      onChange={(e) => setFormData((prev) => ({ ...prev, userType: e.target.value }))}
                    />
                    Others
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

            {/** Personal Details*/}
          {formData.userType && (
            <fieldset className="form-section">
              <legend>Personal Details</legend>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    id="fullname"
                    required
                    placeholder="Full Name "
                    value={formData.fullname}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="fullname"></label>
                </div>
                {(formData.userType === 'Student' || formData.userType === 'Others') && (
                <div className="form-group">
                  <input
                    type="text"
                    id="fathername"
                    required
                    placeholder="Father's Name "
                    value={formData.fathername}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="fathername"></label>
                </div>)}
              </div>
                   
              <div className="form-row">
                <div className="form-group">
                  <select
                    id="gender"
                    required
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled selected hidden>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                  <label htmlFor="gender"></label>
                </div>
                {formData.gender === 'Others' && (
                  <div className="form-group">
                    <input
                      type="text"
                      id="customGender"
                      required
                      placeholder="Specific Gender"
                      value={formData.customGender}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="customGender"></label>
                  </div>
                )}
              </div>
              {(formData.userType === 'Student' || formData.userType === 'Others') && (
                <div className="form-row">
                  <div className="form-group">
                    <select
                      id="areasOfInterest"
                      name="areasOfInterest"
                      required
                      value={formData.areasOfInterest}
                      onChange={handleInputChange}
                     
                    >
                      <option value="" disabled selected hidden>Area of Interest</option>
                      {interests.map((interest) => (
                        <option key={interest} value={interest}>
                          {interest}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="areasOfInterest"></label>
                  </div>
                </div>
              )}
            </fieldset>
          )}
             {/**Contact details */}
          {formData.userType && (
            <fieldset className="form-section">
              <legend>Contact Details</legend>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="Email "
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="email"></label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="number"
                    id="phoneNumber"
                    required
                    placeholder="Phone Number "
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="phoneNumber"></label>
                </div>
              </div>
            </fieldset>
          )}

          {/** Institutional/Educational Details*/}
          {(formData.userType === 'Student' || formData.userType === 'Teacher') && (
            <fieldset className="form-section">
              <legend>{formData.userType === 'Student' ? 'Educational Details' : 'Institutional Details'}</legend>
              <div className="form-row">
                <div className="form-group">
                  <select
                    id="institutionType"
                    name="institutionType"
                    value={formData.institutionType}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled selected hidden>Institution Type</option>
                    <option value="School">School</option>
                    <option value="College">College</option>
                    <option value="University">University</option>
                    <option value="Coaching Center">Coaching Center</option>
                  </select>
                  <label htmlFor="institutionType"></label>
                </div>
                <div className="form-group">
                  <select
                    id="institutionState"
                    name="institutionState"
                    required
                    value={formData.institutionState}
                    onChange={handleInputChange}
                    disabled={!formData.institutionType}
                  >
                    <option value="" disabled selected hidden>Institution State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <label htmlFor="institutionState"></label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <select
                    id="institutionDistrict"
                    name="institutionDistrict"
                    value={formData.institutionDistrict}
                    onChange={handleInputChange}
                    disabled={!formData.institutionState}
                  >
                    <option value="" disabled selected hidden>Institution District</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  <label htmlFor="institutionDistrict"></label>
                </div>
                <div className="form-group">
                  <select
                    id="institutionCity"
                    name="institutionCity"
                    value={formData.institutionCity}
                    onChange={handleInputChange}
                    disabled={!formData.institutionDistrict}
                  >
                    <option value="" disabled selected hidden>Institution City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <label htmlFor="institutionCity"></label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  {formData.institutionType === 'Coaching Center' ? (
                    <input
                      type="text"
                      id="customCoachingName"
                      placeholder=" "
                      value={formData.customCoachingName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <select
                      id="selectedInstitution"
                      name="selectedInstitution"
                      required
                      value={formData.selectedInstitution}
                      onChange={handleInputChange}
                      disabled={!formData.institutionCity}
                    >
                      <option value="" disabled selected hidden>  {formData.institutionType === 'Coaching Center' ? 'Coaching Center Name' : 'Institution Name'}</option>
                      {getInstitutions().map((institution) => (
                        <option key={institution} value={institution}>
                          {institution}
                        </option>
                      ))}
                    </select>
                  )}
                  <label htmlFor={formData.institutionType === 'Coaching Center' ? 'customCoachingName' : 'selectedInstitution'}>
                  
                  </label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  {formData.userType === 'Student' ? (
                    <select
                      id="grade"
                      name="grade"
                      required
                      value={formData.grade}
                      onChange={handleInputChange}
                      disabled={!formData.institutionType}
                    >
                      <option value="" disabled selected hidden>  {formData.userType === 'Student' ? getGradeLabel() : 'Designation'}</option>
                      {getGradeOptions().map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      id="designation"
                      required
                      placeholder="Designation "
                      value={formData.designation}
                      onChange={handleInputChange}
                    />
                  )}
                  <label htmlFor={formData.userType === 'Student' ? 'grade' : 'designation'}>
                  
                  </label>
                </div>
              </div>
            </fieldset>
          )}
          {/** Account Details*/}
          {formData.userType && (
            <fieldset className="form-section">
              <legend>Account Details</legend>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    id="username"
                    required
                    placeholder=" Username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="username"></label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    required
                    placeholder="Password "
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="password"></label>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="confirmPassword"> </label>
                </div>
              </div>
            </fieldset>
          )}
              {/**Button section */}
          <div className="button-container">
            <button type="submit" className="Signup-btn" disabled={!formData.userType}>Sign Up</button>
            <button type="button" className="back-btn" onClick={handleBackClick}>Back to Home</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
