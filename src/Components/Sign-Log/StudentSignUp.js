
import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const StudentSignUp = ({ onHomeClick }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit called');
    console.log('Student signing up', {
      fullname: formData.fullname,
      fathername: formData.fathername,
      gender: formData.gender === 'Others' ? formData.customGender : formData.gender,
      areasOfInterest: formData.areasOfInterest,
      email: formData.email,
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
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    });
    setShowSuccess(true);
    setFormData({
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
      username: '',
      password: '',
      confirmPassword: ''
    });
   
  };

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

  useEffect(() => {
  console.log("areasOfInterest:", formData.areasOfInterest);
}, [formData.areasOfInterest]);

  const handleBackClick = () => {
    onHomeClick();
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [id]: value };

      if (id === 'institutionType') {
        newFormData.institutionState = '';
        newFormData.institutionDistrict = '';
        newFormData.institutionCity = '';
        newFormData.selectedInstitution = '';
        newFormData.customCoachingName = '';
        newFormData.grade = '';
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

  /*const handleInterestChange = (interest) => {
    setFormData((prev) => {
      const newInterests = prev.areasOfInterest.includes(interest)
        ? prev.areasOfInterest.filter((i) => i !== interest)
        : [...prev.areasOfInterest, interest];
      return { ...prev, areasOfInterest: newInterests };
    });
    setIsInterestsOpen(false); // Hide dropdown after selection
  };*/

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

  const interests = [
    'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology',
    'Computer Science / Coding', 'English Literature', 'Social Studies / History',
    'Economics', 'Geography', 'Robotics / AI', 'Environmental Awareness',
    'Space / Astronomy', 'Arts'
  ];

  const schoolGrades = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];

  const collegeUniversityCourses = [
    'BA', 'MA', 'BSc', 'MSc', 'BCom', 'MCom', 'BCA', 'MCA', 'BTech', 'MTech', 'BBA', 'MBA', 'Polytechnic'
  ];

  const coachingExams = [
    'JEE', 'NEET', 'SSC', 'UPSC', 'Railway'
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

  const getGradeOptions = () => {
    switch (formData.institutionType) {
      case 'School':
        return schoolGrades;
      case 'College':
      case 'University':
        return collegeUniversityCourses;
      case 'Coaching Center':
        return coachingExams;
      default:
        return [];
    }
  };

  const getGradeLabel = () => {
    switch (formData.institutionType) {
      case 'School':
        return 'Grade';
      case 'College':
      case 'University':
        return 'Course';
      case 'Coaching Center':
        return 'Exam';
      default:
        return 'Qualification';
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
                  id="fullname"
                  required
                  placeholder=" "
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
                <label htmlFor="fullname">Full Name</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="fathername"
                  required
                  placeholder=" "
                  value={formData.fathername}
                  onChange={handleInputChange}
                />
                <label htmlFor="fathername">Father's Name</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <select
                  id="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected hidden></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                <label htmlFor="gender">Gender</label>
              </div>
              {formData.gender === 'Others' && (
                <div className="form-group">
                  <input
                    type="text"
                    id="customGender"
                    required
                    placeholder=" "
                    value={formData.customGender}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="customGender">Specify Gender</label>
                </div>
              )}
            </div>
           {/*
           <div className="form-row ">
      <div className="form-group ">
        <select
          id="areasOfInterest"
          name="areasOfInterest" > 
          <option value="" disabled hidden>
            Select Area of Interest
          </option>
          {interests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
        <label
          htmlFor="areasOfInterest">
          Areas of Interest
        </label>
      </div>
    </div>
      */}
    
         <div className="form-row">

  <div className="form-group">
    <select
      id="areasOfInterest"
      name="areasOfInterest" required 
      value={formData.areasOfInterest}
      onChange={handleInputChange}
     
    >
       <option value="" disabled selected hidden></option>
      {interests.map((interest) => (
        <option key={interest} value={interest}>
          {interest}
        </option>
      ))}
    </select>
    <label htmlFor="areasOfInterest">Areas of Interest</label>
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
                  disabled={!formData.institutionType}
                >
                  <option value="" disabled selected hidden></option>
                  {getGradeOptions().map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label htmlFor="grade">{getGradeLabel()}</label>
              </div>
            </div>
          </fieldset>

          {/* Account Details Section */}
          <fieldset className="form-section">
            <legend>Account Details</legend>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="username"
                  required
                  placeholder=" "
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <label htmlFor="username">Username</label>
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
              <div className="form-group">
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  placeholder=" "
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
            </div>
          </fieldset>

          {/* Buttons */}
          <div className="button-container">
            <button type="submit" className="Signup-btn">Sign Up</button>
            <button type="button" className="back-btn" onClick={handleBackClick}>Back to Home</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentSignUp;
