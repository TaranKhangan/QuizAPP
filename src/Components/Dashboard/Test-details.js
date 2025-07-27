import React, { useState, useEffect, useRef } from 'react';
import './Test-details.css';

const TestDetails = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Handle clicks outside the filter dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isFilterOpen &&
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  // Sample array of test data (can be replaced with API data or props)
  const tests = [
    {
      id: 1,
      quizName: 'Algebra Basics',
      visibility: 'Public',
      pricing: 'Free',
      language: 'English',
      publishDate: '2025-07-20',
    },
    {
      id: 2,
      quizName: 'World History',
      visibility: 'Private',
      pricing: 'Paid',
      language: 'Hindi',
      publishDate: '2025-07-15',
    },
    {
      id: 3,
      quizName: 'Physics Fundamentals',
      visibility: 'Public',
      pricing: 'Free',
      language: 'English',
      publishDate: '2025-07-10',
    },
  ];

  return (
    <div className="test-details-page">
      {/* Filter Section - Sidebar on desktop, dropdown on mobile */}
      <div className={`filter-section ${isFilterOpen ? 'filter-section--open' : ''}`} ref={filterRef}>
        <h2>Filter By</h2>
        <hr />
        <div className="filter-group">
          <label>State</label>
          <select>
            <option value="">All States</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="approved">Approved</option>
            <option value="scheduled">Scheduled</option>
            <option value="live">Live</option>
            <option value="expired">Expired</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>
        <hr />
        <div className="filter-group">
          <label>Visibility</label>
          <select>
            <option value="">All</option>
            <option value="institution-based">Institution Based</option>
            <option value="global">Global</option>
            <option value="interest-based">Interest Based</option>
          </select>
        </div>
        <hr />
        <div className="filter-group">
          <label>Language</label>
          <select>
            <option value="">All Languages</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>
        <hr />
        <div className="filter-group">
          <label>Categories</label>
          <select>
            <option value="">All Categories</option>
            <option value="general">General</option>
            <option value="academic">Academic</option>
            <option value="competitive">Competitive</option>
            <option value="mock">Mock</option>
          </select>
        </div>
        <hr />
        <div className="filter-group">
          <label>Pricing</label>
          <select>
            <option value="">All</option>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>
      {/* Test Details Section */}
      <div className="test-details-section">
        <div className="test-details-header">
          <h1>Test Details</h1>
          <div className="filter-toggle-wrapper">
            <button className="filter-toggle-button" onClick={toggleFilter} ref={buttonRef}>
              {isFilterOpen ? 'Hide Filters' : 'Filter By'}
            </button>
          </div>
        </div>
        <div className="test-container-row">
          {tests.map((test) => (
            <div key={test.id} className="test-card">
              <h3>Test {test.id}</h3>
              <p><strong>Quiz Name:</strong> {test.quizName}</p>
              <p><strong>Visibility:</strong> {test.visibility}</p>
              <p><strong>Pricing:</strong> {test.pricing}</p>
              <p><strong>Language:</strong> {test.language}</p>
              <p><strong>Publish Date:</strong> {test.publishDate}</p>
              <button className="details-button">Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestDetails;