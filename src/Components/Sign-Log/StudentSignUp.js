import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const StudentSignUp = ({ onHomeClick }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    fatherFirstName: '',
    email: '',
    password: '',
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
    areaOfInterest: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit called'); // Debug log
    console.log('Student signing up', {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      fatherFirstName: formData.fatherFirstName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      pincode: formData.pincode,
      city: formData.city,
      district: formData.district,
      state: formData.state,
      institutionType: formData.institutionType,
      institutionState: formData.institutionState,
      institutionDistrict: formData.institutionDistrict,
      institutionCity: formData.institutionCity,
      selectedInstitution: formData.institutionType === 'Coaching Center' ? formData.customCoachingName : formData.selectedInstitution,
      grade: formData.grade,
      areaOfInterest: formData.areaOfInterest
    });
    setShowSuccess(true);
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      fatherFirstName: '',
      email: '',
      password: '',
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
      areaOfInterest: ''
    });
  };

  useEffect(() => {
    if (showSuccess) {
      console.log('Success message should be visible'); // Debug log
      const timer = setTimeout(() => {
        console.log('Hiding success message'); // Debug log
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleBackClick = () => {
    onHomeClick();
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [id]: value };

      // Reset dependent fields when a parent field changes
      if (id === 'institutionType') {
        newFormData.institutionState = '';
        newFormData.institutionDistrict = '';
        newFormData.institutionCity = '';
        newFormData.selectedInstitution = '';
        newFormData.customCoachingName = '';
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
    'ABC High School',
    'DEF Academy',
    'MNO School of Science',
    'QRS School of Business',
    'ZAB School of Law'
  ];

  const colleges = [
    'PQR College',
    'JKL College of Arts',
    'UVW College of Commerce',
    'TUV College of Education',
    'FGH College of Hospitality',
    'Beant College of Engineering',
    'BHM College of Management'
  ];

  const universities = [
    'XYZ University',
    'RST University of Engineering',
    'CDE University of Medicine',
    'GNDU University',
    'Guru Nanak Dev Engineering College'
  ];

  const getInstitutions = () => {
    switch (formData.institutionType) {
      case 'School':
        return schools;
      case 'College':
        return colleges;
      case 'University':
        return universities;
      case 'Coaching Center':
        return [];
      default:
        return [];
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
        <h2>Student Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Personal Details Section */}
          <fieldset className="form-section">
            <legend>Personal Details</legend>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="firstName"
                  required
                  placeholder=" "
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="middleName"
                  placeholder=" "
                  value={formData.middleName}
                  onChange={handleInputChange}
                />
                <label htmlFor="middleName">Middle Name</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="lastName"
                  required
                  placeholder=" "
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="fatherFirstName"
                  required
                  placeholder=" "
                  value={formData.fatherFirstName}
                  onChange={handleInputChange}
                />
                <label htmlFor="fatherFirstName">Father's Name</label>
              </div>
            </div>
          </fieldset>

          {/* Contact Details Section */}
          <fieldset className="form-section">
            <legend>Contact Details</legend>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  required
                  placeholder=" "
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  required
                  placeholder=" "
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="tel"
                  id="phoneNumber"
                  required
                  placeholder=" "
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>
            </div>
          </fieldset>

          {/* Address Section */}
          <fieldset className="form-section">
            <legend>Address</legend>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="pincode"
                  required
                  placeholder=" "
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
                <label htmlFor="pincode">Pincode</label>
              </div>
              <div className="form-group">
                <select
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected hidden></option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <label htmlFor="city">City/Village</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <select
                  id="district"
                  name="district"
                  required
                  value={formData.district}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected hidden></option>
                  {districts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                <label htmlFor="district">District</label>
              </div>
              <div className="form-group">
                <select
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected hidden></option>
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <label htmlFor="state">State</label>
              </div>
            </div>
          </fieldset>

          {/* Educational Details Section */}
          <fieldset className="form-section">
            <legend>Educational Details</legend>
            <div className="form-row">
              <div className="form-group">
                <select
                  id="institutionType"
                  name="institutionType"
                  
                  value={formData.institutionType}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected hidden></option>
                  <option value="School">School</option>
                  <option value="College">College</option>
                  <option value="University">University</option>
                  <option value="Coaching Center">Coaching Center</option>
                </select>
                <label htmlFor="institutionType">Institution Type</label>
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
                  <option value="" disabled selected hidden></option>
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <label htmlFor="institutionState">Institution State</label>
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
                  <option value="" disabled selected hidden></option>
                  {districts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                <label htmlFor="institutionDistrict">Institution District</label>
              </div>
              <div className="form-group">
                <select
                  id="institutionCity"
                  name="institutionCity"
                  
                  value={formData.institutionCity}
                  onChange={handleInputChange}
                  disabled={!formData.institutionDistrict}
                >
                  <option value="" disabled selected hidden></option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <label htmlFor="institutionCity">Institution City</label>
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
                    <option value="" disabled selected hidden></option>
                    {getInstitutions().map((institution) => (
                      <option key={institution} value={institution}>
                        {institution}
                      </option>
                    ))}
                  </select>
                )}
                <label htmlFor={formData.institutionType === 'Coaching Center' ? 'customCoachingName' : 'selectedInstitution'}>
                  {formData.institutionType === 'Coaching Center' ? 'Coaching Center Name' : 'Institution Name'}
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <select
                  id="grade"
                  name="grade"
                  required
                  value={formData.grade}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected hidden></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
                <label htmlFor="grade">Qualification</label>
              </div>
              <div className="form-group">
                <select
                  id="areaOfInterest"
                  name="areaOfInterest"
                  required
                  value={formData.areaOfInterest}
                  onChange={handleInputChange}
                >
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