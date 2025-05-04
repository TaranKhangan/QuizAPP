import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const TeacherSignUp = ({ onHomeClick }) => {
  const navigate = useNavigate();

const [institutionType, setInstitutionType] = useState('');
  const [institutionState, setInstitutionState] = useState('');
  const [institutionDistrict, setInstitutionDistrict] = useState('');
  const [institutionCity, setInstitutionCity] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student signing up', {
      institutionType,
      institutionState,
      institutionDistrict,
      institutionCity,
      selectedInstitution,
    });
  };

  const handleBackClick = () => {
    onHomeClick();
    navigate('/');
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
    'Pune', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur','Patiala','Ludhiana','Gurdaspur'
  
  ];
  const cities= [
    'Agra', 'Ahmedabad', 'Bangalore', 'Bhopal', 'Chennai',
    'Delhi', 'Hyderabad', 'Jaipur', 'Kolkata', 'Mumbai','Gurgaon','Faridabad',
    'Pune', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur','Jammu', 'Chandigarh', 'Shimla','Dehradun'
  ];

  // Categorized institution lists
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
    switch (institutionType) {
      case 'School':
        return schools;
      case 'College':
        return colleges;
      case 'University':
        return universities;
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

          {/* Institution Details Section */}
          <fieldset className="form-section">
            <legend>Institutional Details</legend>
            <div className="form-row">
              <div className="form-group">
              <select
                  id="institutionType"
                  name="institutionType"
                  required
                  value={institutionType}
                  onChange={(e) => {
                    setInstitutionType(e.target.value);
                    setInstitutionState('');
                    setInstitutionDistrict('');
                    setInstitutionCity('');
                    setSelectedInstitution('');
                  }}
                >
                  <option value="" disabled selected hidden></option>
                  <option value="School">School</option>
                  <option value="College">College</option>
                  <option value="University">University</option>
                </select>
                <label htmlFor="institutionType">Institution Type</label>
              </div>
            </div>
           
           
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="pincode" required placeholder=" " />
                <label htmlFor="pincode">Pincode</label>
              </div>
              <div className="form-group">
                <select
                  id="schoolState"
                  name="schoolState"
                  required
                  value={institutionState}
                  onChange={(e) => {
                    setInstitutionState(e.target.value);
                    setInstitutionDistrict('');
                    setInstitutionCity('');
                    setSelectedInstitution('');
                  }}
                  disabled={!institutionType}
                >
                  <option value="" disabled selected hidden></option>
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <label htmlFor="schoolState">Institution State</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <select
                  id="schoolDistrict"
                  name="schoolDistrict"
                  required
                  value={institutionDistrict}
                  onChange={(e) => {
                    setInstitutionDistrict(e.target.value);
                    setInstitutionCity('');
                    setSelectedInstitution('');
                  }}
                  disabled={!institutionState}
                >
                  <option value="" disabled selected hidden></option>
                  {districts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                <label htmlFor="schoolDistrict">Institution District</label>
              </div>
              <div className="form-group">
                <select
                  id="schoolCity"
                  name="schoolCity"
                  required
                  value={institutionCity}
                  onChange={(e) => {
                    setInstitutionCity(e.target.value);
                    setSelectedInstitution('');
                  }}
                  disabled={!institutionDistrict}
                >
                  <option value="" disabled selected hidden></option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <label htmlFor="schoolCity">Institution City</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <select
                  id="institutionName"
                  name="institutionName"
                  required
                  value={selectedInstitution}
                  onChange={(e) => setSelectedInstitution(e.target.value)}
                  disabled={!institutionCity}
                >
                  <option value="" disabled selected hidden></option>
                  {getInstitutions().map((institution) => (
                    <option key={institution} value={institution}>
                      {institution}
                    </option>
                  ))}
                </select>
                <label htmlFor="institutionName">Institution Name</label>
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
















