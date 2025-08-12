import React, { useState, useEffect, useRef } from 'react';
import './TakeQuiz.css';
import clockIcon from '../Pictures/clock.png';
import Certificate from '../Pictures/certificate.png';
import TermConditions from '../Pictures/terms-and-conditions.png';
import Questions from '../Pictures/question.png';
import FeeIcon from '../Pictures/fee.png';

const TestDetails = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

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

  const tests = [
    {
      name: "Sample Name",
      description: "Test Description",
      status: "Live",
      from: "01 August, 2025",
      to: "31 August, 2025",
      questions: 20,
      duration: 20,
      pricing: "Free", 
    },
    {
      name: "Sample Name (Paid)",
      description: "Test Description for Paid Quiz",
      status: "Live",
      from: "01 August, 2025",
      to: "31 August, 2025",
      questions: 25,
      duration: 30,
      pricing: "Paid",
      fee: "$10",
    },
    {
      name: "Schedule and Paid",
      description: "Description for Schedule and paid",
      status: "Coming soon",
      from: "01 August, 2025",
      to: "31 August, 2025",
      questions: 20,
      duration: 20,
      pricing: "Paid",
      fee: "$20",
    },
  ];

  return (
    <div className="take-quiz">
      <div className="Sticky-filterby">
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
      </div>
      <div className="take-quiz-main-section">
        <div className="take-quiz-header">
          <h1>Take Quiz</h1>
          <div className="filter-toggle-wrapper">
            <button className="filter-toggle-button" onClick={toggleFilter} ref={buttonRef}>
              {isFilterOpen ? 'Hide Filters' : 'Filter By'}
            </button>
          </div>
        </div>
        <div className="test-container-row">
          {tests.map((test, index) => (
            <div className="test-card" key={index}>
              <h3>Test Name: {test.name}</h3>
              <p className="desc">
                <strong>Test description: </strong>
                {test.description}
              </p>
              <p className="test-status">
                <strong>Status: </strong>
                <i>{test.status}</i>
              </p>
              <div className="from-to">
                <p>
                  <strong>From: </strong>
                  {test.from}
                </p>
                <p>
                  <strong>To: </strong>
                  {test.to}
                </p>
              </div>
              <div className="test-details">
                <div className="detail-item">
                  <img src={Questions} alt="questions" className="icon" />
                  <p>
                    <strong>{test.questions} Questions</strong>
                  </p>
                </div>
                <div className="vl"></div>
                <div className="detail-item">
                  <img src={clockIcon} alt="Duration" className="icon" />
                  <p>
                    <strong>{test.duration} Minutes</strong>
                  </p>
                </div>
                {test.pricing === "Paid" && (
                  <>
                    <div className="vl"></div>
                    <div className="detail-item">
                      <img src={FeeIcon} alt="Fee" className="icon" />
                      <p>
                        <strong>Rs.{test.fee} Fees</strong>
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="test-footer">
                <div>
                  <img src={Certificate} alt="Certificate" className="icon" />
                  E-Certificate
                </div>
                <div>
                  <img src={TermConditions} alt="Terms & Conditions" className="icon" />
                  View T&C
                </div>
              </div>
              <button className="play-button">
                {test.pricing === 'Paid'? (test.status==="Live"? "Pay to Play Quiz" : "Pay to enroll in quiz"):"Play"}  
              </button>
              <hr />
              <p className="last-p">By: SAHASH</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestDetails;