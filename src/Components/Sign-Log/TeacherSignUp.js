import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const TeacherSignUp = ({ onHomeClick }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    pincode: '',
    institutionType: '',
    institutionState: '',
    institutionDistrict: '',
    institutionCity: '',
    selectedInstitution: '',
    customCoachingName: '',
    qualification: '',
    subject: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Teacher signing up', {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      pincode: formData.pincode,
      institutionType: formData.institutionType,
      institutionState: formData.institutionState,
      institutionDistrict: formData.institutionDistrict,
      institutionCity: formData.institutionCity,
      selectedInstitution: formData.institutionType === 'Coaching Center' ? formData.customCoachingName : formData.selectedInstitution,
      qualification: formData.qualification,
      subject: formData.subject
    });
    setShowSuccess(true);
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: '',
      pincode: '',
      institutionType: '',
      institutionState: '',
      institutionDistrict: '',
      institutionCity: '',
      selectedInstitution: '',
      customCoachingName: '',
      qualification: '',
      subject: ''
    });
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
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
    'Delhi', 'Hyderabad', 'Jaipur', 'Kolkata', 'Mumbai',
    'Pune', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Patiala', 'Ludhiana', 'Gurdaspur'
  ];

  const cities = [
    'Agra', 'Ahmedabad', 'Bangalore', 'Bhopal', 'Chennai',
    'Delhi', 'Hyderabad', 'Jaipur', 'Kolkata', 'Mumbai', 'Gurgaon', 'Faridabad',
    'Pune', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Jammu', 'Chandigarh', 'Shimla', 'Dehradun'
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
      <div className="signup-container">
        <h2>Teacher Sign Up</h2>
        {showSuccess && (
          <div className="success-message show">Sign Up Successful!</div>
        )}
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
            </div>
            <div className="form-row">
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
          </fieldset>

          {/* Institution Details Section */}
          <fieldset className="form-section">
            <legend>Institutional Details</legend>
            <div className="form-row">
              <div className="form-group">
                <select
                  id="institutionType"
                  name="institutionType"
                  required
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
            </div>
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
                  required
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
                  required
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
                    required
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
          </fieldset>

          {/* Professional Details Section */}
          <fieldset className="form-section">
            <legend>Professional Details</legend>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="qualification"
                  required
                  placeholder=" "
                  value={formData.qualification}
                  onChange={handleInputChange}
                />
                <label htmlFor="qualification">Qualification</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="subject"
                  required
                  placeholder=" "
                  value={formData.subject}
                  onChange={handleInputChange}
                />
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