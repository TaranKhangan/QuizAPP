/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './FullTest-details.css';

const FullTestDetails = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);

  // Sample data (replace with API call if needed)
  useEffect(() => {
    const tests = [
      {
        id: 1,
        quizName: 'Algebra Basics',
        status: 'LIVE',
        description: 'A beginner-friendly quiz on algebra basics.',
        category: 'Academic',
        visibility: 'Public',
        creatorName: 'John Doe',
        pricing: 'Free',
        testDate: '2025-07-20',
        interestArea: 'Mathematics',
        duration: '60 minutes',
        passingMarks: '50',
        maximumMarks: '100',
        institution: 'XYZ University',
        standard: 'High School',
        totalCandidates: '150',
        language: 'English',
        logo: 'https://example.com/logo.png',
      },
      // Add more test objects as needed
    ];
    const selectedTest = tests.find((t) => t.id === parseInt(id));
    setTest(selectedTest);
  }, [id]);

  if (!test) return <div>Loading...</div>;

  return (
    <div className="full-test-details">
      {/* Header section *//*}
      <div className="test-details-header">
        <h2 className="test-name">{test.quizName}</h2>
        <h2 className="test-status">
          Test State: <strong>{test.status}</strong>
        </h2>
      </div>

      <div className="content-wrapper">
        {/* Button container on the left side *//*}
        <div className="buttons-container">
          <button className="btn preview">Preview Test</button>
          <button className="btn download">Download Bulk Certificate</button>
          <button className="btn approve">Approve Test</button>
          <button className="btn reject">Reject Test</button>
          <button className="btn delete">Delete Test</button>
        </div>

        {/* Middle section: Full test details form *//*}
        <div className="test-details-content">
          <form className="test-details-form">
            <div className="form-group">
              <label htmlFor="testName">Test Name</label>
              <input type="text" id="testName" value={test.quizName} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="testDescription">Test Description</label>
              <input type="text" id="testDescription" value={test.description} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="testCategory">Test Category</label>
              <input type="text" id="testCategory" value={test.category} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="testVisibility">Test Visibility</label>
              <input type="text" id="testVisibility" value={test.visibility} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="creatorName">Creator Name</label>
              <input type="text" id="creatorName" value={test.creatorName} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="pricing">Pricing</label>
              <input type="text" id="pricing" value={test.pricing} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="testDate">Test Date</label>
              <input type="text" id="testDate" value={test.testDate} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="interestArea">Interest Area</label>
              <input type="text" id="interestArea" value={test.interestArea} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="testDuration">Test Duration</label>
              <input type="text" id="testDuration" value={test.duration} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="passingMarks">Passing Marks</label>
              <input type="text" id="passingMarks" value={test.passingMarks} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="maximumMarks">Maximum Marks</label>
              <input type="text" id="maximumMarks" value={test.maximumMarks} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="institution">Institution</label>
              <input type="text" id="institution" value={test.institution} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="standard">Standard</label>
              <input type="text" id="standard" value={test.standard} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="totalCandidates">Total Candidates Appeared</label>
              <input type="text" id="totalCandidates" value={test.totalCandidates} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="testLanguage">Test Language</label>
              <input type="text" id="testLanguage" value={test.language} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="testLogo">Test Logo URL</label>
              <input type="text" id="testLogo" value={test.logo} readOnly />
            </div>

            <div className="btns-container">
              <button type="button" className="btn save-btn">Save</button>
              <button type="button" className="btn cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FullTestDetails;*/