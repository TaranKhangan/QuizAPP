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
              <input type="radio" id="testCategory" value={test.category} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="testVisibility">Test Visibility</label>
              <input type="radio" id="testVisibility" value={test.visibility} readOnly />
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
/*
this is the fulltestdetails page.. the top of this page will have a container for heading or being honest for two texts.. on the left side it should be test name(dynamic) and on the right side of this container there should be text having details text status : live(will be dynamic) and this container should be sticky ; it should be sticky and don't scroll with the page's content...
  here on the left side i want a button sections where 5 buttons are present (preview button, download certificate button, approve test, reject test and delete test)  .. And i want this section to be sticky .. at its position.. its should not scroll with page.. i repeat whatever happens it should be sticky at its place and responsiveness should be considered too.. use clamp if needed sometimes..  
THen in the middle or u can say main side where the actual content will be it should be more like a form .. and i want to clear one thing this should not effect the other forms of my different pages... so make sure these doesn't disturb others..   then at the end of this section there should be two buttons save and cancel..   bhai js and css files alag bnana .. aur html file alag mat krna */
import React from 'react';
import './FullTest-details.css';

const FullTestDetails = ({ testName = 'Sample Test', status = 'Live' }) => {
  return (
    <div className="full-test-details-container">
      {/* Sticky Header */}
      <header className="sticky-header">
        <div className="header-content">
          <h1 className="test-name">{testName}</h1>
          <span className="test-status">Status: {status}</span>
        </div>
      </header>

      <div className="main-content-wrapper">
        {/* Sticky Button Section */}
        <aside className="sticky-buttons">
          <button className="action-button">Preview</button>
          <button className="action-button">Download Certificate</button>
          <button className="action-button">Approve Test</button>
          <button className="action-button">Reject Test</button>
          <button className="action-button">Delete Test</button>
        </aside>

        {/* Main Form Content */}
        <main className="form-content">
          <form>
            <div className="form-group">
              <label htmlFor="testTitle">Test Title</label>
              <input type="text" id="testTitle" placeholder="Enter test title" />
            </div>
            <div className="form-group">
              <label htmlFor="testDescription">Description</label>
              <textarea id="testDescription" placeholder="Enter test description"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="testDuration">Duration (minutes)</label>
              <input type="number" id="testDuration" placeholder="Enter duration" />
            </div>
            <div className="form-group">
              <label htmlFor="testCategory">Category</label>
              <select id="testCategory">
                <option value="">Select category</option>
                <option value="technical">Technical</option>
                <option value="aptitude">Aptitude</option>
                <option value="coding">Coding</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="button" className="save-button">Save</button>
              <button type="button" className="cancel-button">Cancel</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default FullTestDetails;