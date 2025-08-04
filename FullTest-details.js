import React, { useState, useEffect, useRef } from 'react';
import './FullTest-details.css';
import editIcon from '../Pictures/edit.png';

const FullTestDetails = ({ testName = 'Sample Test', status = 'Live' }) => {
  const [editModes, setEditModes] = useState({
    testName: false,
    testDescription: false,
    testCategory: false,
    testVisibility: false,
    creator: false,
    testDate: false,
    testPricing: false,
    interest: false,
    testDuration: false,
    passingMarks: false,
    maxMarks: false,
    institution: false,
    standard: false,
    totalCandidates: false,
    testLanguage: false,
    testLogo: false,
  });

  const [formData, setFormData] = useState({
    testName: 'Sample Test',
    testDescription: 'This is a sample test description.',
    testCategory: 'general',
    testVisibility: 'institutional',
    creator: 'John Doe',
    testDate: '2025-08-01',
    testPricing: 0,
    interest: 'programming',
    testDuration: 60,
    passingMarks: 50,
    maxMarks: 100,
    institution: 'Sample Institution',
    standard: 'college',
    totalCandidates: 100,
    testLanguage: 'english',
    testLogo: null,
  });

  const [initialFormData, setInitialFormData] = useState({ ...formData });
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const actionsButtonRef = useRef(null);

  const toggleEditMode = (field) => {
    setEditModes((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (e, field) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleInputBlur = (field) => {
    setEditModes((prev) => ({ ...prev, [field]: false }));
  };

  const handleSave = () => {
    setShowSaveAlert(true);
  };

  const confirmSave = () => {
    setInitialFormData({ ...formData });
    setEditModes({
      testName: false,
      testDescription: false,
      testCategory: false,
      testVisibility: false,
      creator: false,
      testDate: false,
      testPricing: false,
      interest: false,
      testDuration: false,
      passingMarks: false,
      maxMarks: false,
      institution: false,
      standard: false,
      totalCandidates: false,
      testLanguage: false,
      testLogo: false,
    });
    setShowSaveAlert(false);
    setHasChanges(false);
  };

  const cancelSave = () => {
    setFormData({ ...initialFormData });
    setEditModes({
      testName: false,
      testDescription: false,
      testCategory: false,
      testVisibility: false,
      creator: false,
      testDate: false,
      testPricing: false,
      interest: false,
      testDuration: false,
      passingMarks: false,
      maxMarks: false,
      institution: false,
      standard: false,
      totalCandidates: false,
      testLanguage: false,
      testLogo: false,
    });
    setShowSaveAlert(false);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setShowCancelAlert(true);
  };

  const confirmCancel = () => {
    setFormData({ ...initialFormData });
    setEditModes({
      testName: false,
      testDescription: false,
      testCategory: false,
      testVisibility: false,
      creator: false,
      testDate: false,
      testPricing: false,
      interest: false,
      testDuration: false,
      passingMarks: false,
      maxMarks: false,
      institution: false,
      standard: false,
      totalCandidates: false,
      testLanguage: false,
      testLogo: false,
    });
    setShowCancelAlert(false);
    setHasChanges(false);
  };

  const closeCancelAlert = () => {
    setShowCancelAlert(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        actionsButtonRef.current &&
        !actionsButtonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="full-test-details-container">
      <div className="sticky-container">
        <div className="sticky-buttons">
          <h2>Actions</h2>
          <hr />
          <button className="action-button preview-button">Preview</button>
          <button className="action-button download-button">Download Certificate</button>
          <button className="action-button approve-button">Approve Test</button>
          <button className="action-button reject-button">Reject Test</button>
          <button className="action-button delete-button">Delete Test</button>
        </div>
      </div>
      <div className="main-content-container">
        <div className="sticky-header">
          <div className="header-content">
            <h1 className="test-name">{testName}</h1>
            <span className="test-status">Status: {status}</span>
          </div>
        </div>
        <div className="actions-dropdown-container">
          <button
            className="actions-button"
            onClick={toggleDropdown}
            ref={actionsButtonRef}
          >
            Actions
          </button>
          {showDropdown && (
            <div className="actions-dropdown" ref={dropdownRef}>
              <div className="actions-dropdown-content">
                <button className="action-button preview-button">Preview</button>
                <button className="action-button download-button">Download Certificate</button>
                <button className="action-button approve-button">Approve Test</button>
                <button className="action-button reject-button">Reject Test</button>
                <button className="action-button delete-button">Delete Test</button>
              </div>
            </div>
          )}
        </div>
        <div className="form-content">
          <div className="form-section">
            <legend>Test Details</legend>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="testName">Test Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="testName"
                    value={formData.testName}
                    readOnly={!editModes.testName}
                    onChange={(e) => handleInputChange(e, 'testName')}
                    onBlur={() => handleInputBlur('testName')}
                  />
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('testName')}
                    title={editModes.testName ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="testDescription">Test Description</label>
                <div className="input-wrapper">
                  <textarea
                    id="testDescription"
                    value={formData.testDescription}
                    readOnly={!editModes.testDescription}
                    onChange={(e) => handleInputChange(e, 'testDescription')}
                    onBlur={() => handleInputBlur('testDescription')}
                  />
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('testDescription')}
                    title={editModes.testDescription ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="testCategory">Test Category</label>
                <div className="input-wrapper">
                  <select
                    id="testCategory"
                    value={formData.testCategory}
                    disabled={!editModes.testCategory}
                    onChange={(e) => handleInputChange(e, 'testCategory')}
                    onBlur={() => handleInputBlur('testCategory')}
                  >
                    <option value="general">General</option>
                    <option value="competitive">Competitive</option>
                    <option value="mock">Mock</option>
                    <option value="academic">Academic</option>
                  </select>
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('testCategory')}
                    title={editModes.testCategory ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="testVisibility">Test Visibility</label>
                <div className="input-wrapper">
                  <select
                    id="testVisibility"
                    value={formData.testVisibility}
                    disabled={!editModes.testVisibility}
                    onChange={(e) => handleInputChange(e, 'testVisibility')}
                    onBlur={() => handleInputBlur('testVisibility')}
                  >
                    <option value="institutional">Institutional</option>
                    <option value="global">Global</option>
                    <option value="interest">Interest Based</option>
                  </select>
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('testVisibility')}
                    title={editModes.testVisibility ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="creator">Creator</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="creator"
                    value={formData.creator}
                    readOnly={!editModes.creator}
                    onChange={(e) => handleInputChange(e, 'creator')}
                    onBlur={() => handleInputBlur('creator')}
                  />
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('creator')}
                    title={editModes.creator ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="testDate">Test Date</label>
                <div className="input-wrapper">
                  <input
                    type="date"
                    id="testDate"
                    value={formData.testDate}
                    readOnly={!editModes.testDate}
                    onChange={(e) => handleInputChange(e, 'testDate')}
                    onBlur={() => handleInputBlur('testDate')}
                  />
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('testDate')}
                    title={editModes.testDate ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="testPricing">Test Pricing</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    id="testPricing"
                    value={formData.testPricing}
                    readOnly={!editModes.testPricing}
                    onChange={(e) => handleInputChange(e, 'testPricing')}
                    onBlur={() => handleInputBlur('testPricing')}
                  />
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('testPricing')}
                    title={editModes.testPricing ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="interest">Interest</label>
                <div className="input-wrapper">
                  <select
                    id="interest"
                    value={formData.interest}
                    disabled={!editModes.interest}
                    onChange={(e) => handleInputChange(e, 'interest')}
                    onBlur={() => handleInputBlur('interest')}
                  >
                    <option value="programming">Programming</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="literature">Literature</option>
                  </select>
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('interest')}
                    title={editModes.interest ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="testDuration">Test Duration (minutes)</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    id="testDuration"
                    value={formData.testDuration}
                    readOnly={!editModes.testDuration}
                    onChange={(e) => handleInputChange(e, 'testDuration')}
                    onBlur={() => handleInputBlur('testDuration')}
                  />
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('testDuration')}
                    title={editModes.testDuration ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="passingMarks">Passing Marks</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    id="passingMarks"
                    value={formData.passingMarks}
                    readOnly={!editModes.passingMarks}
                    onChange={(e) => handleInputChange(e, 'passingMarks')}
                    onBlur={() => handleInputBlur('passingMarks')}
                  />
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('passingMarks')}
                    title={editModes.passingMarks ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="maxMarks">Max Marks</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    id="maxMarks"
                    value={formData.maxMarks}
                    readOnly={!editModes.maxMarks}
                    onChange={(e) => handleInputChange(e, 'maxMarks')}
                    onBlur={() => handleInputBlur('maxMarks')}
                  />
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('maxMarks')}
                    title={editModes.maxMarks ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="institution">Institution</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="institution"
                    value={formData.institution}
                    readOnly={!editModes.institution}
                    onChange={(e) => handleInputChange(e, 'institution')}
                    onBlur={() => handleInputBlur('institution')}
                  />
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('institution')}
                    title={editModes.institution ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="standard">Standard/Course</label>
                <div className="input-wrapper">
                  <select
                    id="standard"
                    value={formData.standard}
                    disabled={!editModes.standard}
                    onChange={(e) => handleInputChange(e, 'standard')}
                    onBlur={() => handleInputBlur('standard')}
                  >
                    <option value="school">School Level</option>
                    <option value="university">University Level</option>
                    <option value="college">College Level</option>
                    <option value="competitive">Competitive Exam Level</option>
                  </select>
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('standard')}
                    title={editModes.standard ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="totalCandidates">Total Candidates Appeared</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    id="totalCandidates"
                    value={formData.totalCandidates}
                    readOnly={!editModes.totalCandidates}
                    onChange={(e) => handleInputChange(e, 'totalCandidates')}
                    onBlur={() => handleInputBlur('totalCandidates')}
                  />
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('totalCandidates')}
                    title={editModes.totalCandidates ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="testLanguage">Test Language</label>
                <div className="input-wrapper">
                  <select
                    id="testLanguage"
                    value={formData.testLanguage}
                    disabled={!editModes.testLanguage}
                    onChange={(e) => handleInputChange(e, 'testLanguage')}
                    onBlur={() => handleInputBlur('testLanguage')}
                  >
                    <option value="all">All</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                  </select>
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('testLanguage')}
                    title={editModes.testLanguage ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="testLogo">Test Logo</label>
                <div className="input-wrapper">
                  <input
                    type="file"
                    id="testLogo"
                    accept="image/*"
                    disabled={!editModes.testLogo}
                    onChange={(e) => handleInputChange(e, 'testLogo')}
                    onBlur={() => handleInputBlur('testLogo')}
                  />
                  <button
                    type="button"
                    className="edit-toggle"
                    onClick={() => toggleEditMode('testLogo')}
                    title={editModes.testLogo ? 'Lock' : 'Edit'}
                  >
                    <img src={editIcon} alt="Toggle Edit" />
                  </button>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button
                type="button"
                className="save-button"
                disabled={!hasChanges}
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="cancel-button"
                disabled={!hasChanges}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {showSaveAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <p>This will permanently update this field in database</p>
            <div className="alert-buttons">
              <button onClick={confirmSave}>OK</button>
              <button onClick={cancelSave}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showCancelAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <p>Discard changes, are you sure?</p>
            <div className="alert-buttons">
              <button onClick={confirmCancel}>Yes</button>
              <button onClick={closeCancelAlert}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullTestDetails;