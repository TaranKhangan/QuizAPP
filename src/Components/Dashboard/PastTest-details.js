import React, { useState, useEffect, useRef }  from 'react';
import './PastTest-details.css';
import Certificate from '../Pictures/certificate.png';
import Report from '../Pictures/report-card.png';

const PastTest=()=>{


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
/*
  const tabHead=[{
    sr_no :"Sr.No.",
    name: "Test Name",
    marks : "Marks",
    duration: "Test Duration",
    certificate: "Certificate",
    report: "Report",
    rank: "Rank"
  }]*/
  const tabData=[{
    s_no : 1,
    testName: "Science",
    marks: "45/50",
    testDuration: 90,
    rank: "2nd",
  
  },{
  s_no : 2,
  testName: "Maths",
  marks: "45/50",
  testDuration: 90,
  rank: "2nd",

},
{
      s_no: 3,
      testName: "English",
      marks: "40/50",
      testDuration: 60,
      rank: "3rd",
    },
    {
      s_no: 4,
      testName: "History",
      marks: "48/50",
      testDuration: 75,
      rank: "1st",
    },
    {
      s_no: 5,
      testName: "Geography",
      marks: "42/50",
      testDuration: 80,
      rank: "4th",
    },
    {
      s_no: 6,
      testName: "Physics",
      marks: "47/50",
      testDuration: 90,
      rank: "2nd",
    },
    {
    s_no: 8,
    testName: "Biology",
    marks: "48/50",
    testDuration: 75,
    rank: "1st",
  },
  {
    s_no: 9,
    testName: "Computer Science",
    marks: "40/50",
    testDuration: 60,
    rank: "4th",
  },
  {
    s_no: 10,
    testName: "Economics",
    marks: "46/50",
    testDuration: 80,
    rank: "2nd",
  },
  {
    s_no: 11,
    testName: "Literature",
    marks: "43/50",
    testDuration: 70,
    rank: "3rd",
  },

{
  s_no : 2,
  testName: "Maths",
  marks: "45/50",
  testDuration: 90,
  rank: "2nd",

},{
  s_no : 2,
  testName: "Maths",
  marks: "45/50",
  testDuration: 90,
  rank: "2nd",

},{
  s_no : 2,
  testName: "Maths",
  marks: "45/50",
  testDuration: 90,
  rank: "2nd",

}
]

return (
    <div className="pastTest">
      {/*****Filter section */}
      <div className="Sticky-filterby">
        <div className={`filter-section ${isFilterOpen ? 'filter-section--open' : ''}`} ref={filterRef}>
          <h2>Filter By</h2>
          <hr />
          <div className="filter-group">
            <label>Test Type</label>
            <select>
              <option value="">All Tests</option>
              <option value="institutional">Institutional Test</option>
              <option value="paid">Paid Test</option>
              <option value="free">Free Test</option>
              <option value="mock">Mock Test</option>
             
            </select>
          </div>
          <hr />
          <div className="filter-group">
            <label>Date</label>
            <select>
              <option value="yesterday">Yesterday</option>
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-year">Last Year </option>
            </select>
          </div>
          <hr />
          <div className="filter-group">
            <label>Test Status </label>
            <select>
              <option value="attempted">Attempted</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="not-attempted">Not Attempted</option>
            </select>
          </div>
          <hr />
          <div className="filter-group">
            <label>Performance</label>
             
          </div>
          <hr />
          <div className="filter-group">
            <label>Self Practice Quiz</label>
          </div>
          <br></br>
          <br></br><br></br>
          <hr></hr>
          <div className='clear-filters'>
            Clear Filter</div>
            </div>
      </div>
      {/***main section starts */}
       <div className="pastTest-main-section">
        {/***header ***** */}
        <div className="pastTest-header">
          <h1>Take Quiz</h1>
          <div className="filter-toggle-wrapper">
            <button className="filter-toggle-button" onClick={toggleFilter} ref={buttonRef}>
              {isFilterOpen ? 'Hide Filters' : 'Filter By'}
            </button>
          </div>
        </div>
        {
          /***Table container****/
        }
        <div className='table-container'>

          <table>
             <thead>
            <tr>
              
              <th>Sr.no.</th>
              <th>Test Name</th>
              <th>Marks</th>
              <th>Test Duration</th>
              <th>Certificate</th>
              <th> Report</th>
              <th>Rank</th>

            </tr>
            
            </thead>
            <tbody>
               {tabData.map((tabVal, index) => (
            <tr key={index}>
            <td>{tabVal.s_no}</td>
            <td>{tabVal.testName}</td>
            <td>{tabVal.marks}</td>
            <td>{tabVal.testDuration}</td>
            <td>
                  <img src={Certificate} alt="Certificate" className="certi-rep" />
                  
                </td>
            <td>
              <img src={Report} alt="Report" className="certi-rep" />
            </td>
            <td>{tabVal.rank}</td>
            </tr>
            
          
            ))}
            
            </tbody>
            
          </table>
        </div>
     </div>
      </div>
      
)
}
export default PastTest;