import React, { useState, useEffect, useRef } from 'react';
import './Test-Submission.css';
import counter from '../Pictures/chronometer.png';
import score from '../Pictures/achievement.png';
import answered from '../Pictures/answer.png';
import unanswered from '../Pictures/question.png';
import correct from '../Pictures/check.png';
import incorrect from '../Pictures/no.png';


//TestDetails component: Manages a quiz interface with answers , submission, and result display.
function TestDetails() {
  //state to control visiblity of info and details sections, selected answers, submission status, popup visibility, and time tracking
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeTaken, setTimeTaken] = useState(0);
  //For countdown timer
  const [timeLeft, setTimeLeft] = useState(25*60); // 25 minutes in seconds

  //Refs to handle clicks outside the info and details sections
  const infoRef = useRef(null);
  const buttonRef = useRef(null);
  const detailsRef = useRef(null);
  const detailsButtonRef = useRef(null);

  //Smaple data for QUiz cards
  const quizCards = [
    {
      id: 1,
      question: "What is the full form of RAM?",
      options: ["Random Access Memory", "Read Reccess Memory", "Read and Write Access Memory", "Read Access Manager"],
      answer: "Random Access Memory",
      description: "RAM stands for Random Access Memory."
    },
    {
      id: 2,
      question: "What is the full form of CPU?",
      options: ["Central Processing Unit", "Control Processing Unit", "Central Programming Unit", "Central Protocol unit"],
      answer: "Central Processing Unit",
      description: "CPU stands for Central Processing Unit."
    },
    {
      id: 2,
      question: "What is the full form of CPU?",
      options: ["Central Processing Unit", "Control Processing Unit", "Central Programming Unit", "Central Protocol unit"],
      answer: "Central Processing Unit",
      description: "CPU stands for Central Processing Unit."
    },
    {
      id: 3,
      question: "What is the full form of GPU?",
      options: ["Graphics Processing Unit", "Graphical Processing Unit", "Graphical Programming Unit", "Graphics Putting unit"],
      answer: "Graphics Processing Unit",
      description: "GPU stands for Graphics Processing Unit."
    },
    {
      id: 4,
      question: "What is the full form of PSU?",
      options: ["Power Solution Unit", "Power Supply Unit", "Process Supply Unit", "Power Scheduling Unit"],
      answer: "Power Supply Unit",
      description: "PSU stands for Power Supply Unit."
    },
    {
      id: 5,
      question: "What is the full form of FTP?",
      options: ["File Transmission Protocol", "File Transfer Process", "File Transfer Protocol", "File Transaction Protocol"],
      answer: "File Transfer Protocol",
      description: "FTP stands for File Transfer Protocol."
    }
  ];

  //Toggle functions to open and close info and details sections and details sections

  function toggleDetails() {
    setIsDetailsOpen(!isDetailsOpen);
  }

  //Effect to handle clicks outside the info and details sections to close them
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isInfoOpen &&
        infoRef.current &&
        !infoRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsInfoOpen(false);
      }
      if (
        isDetailsOpen &&
        detailsRef.current &&
        !detailsRef.current.contains(event.target) &&
        detailsButtonRef.current &&
        !detailsButtonRef.current.contains(event.target)
      ) {
        setIsDetailsOpen(false);
      }
    }
    // Add event listener for mousedown to detect clicks outside the sections

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isInfoOpen, isDetailsOpen]);

  //Effect for countdown timer
  useEffect(()=>{
    let timer;
    if (!isSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmit(); // Automatically submit when time runs out
    }
    return () => clearInterval(timer);

  })
  //Functions to handle option selection
  function handleOptionChange(questionId, option) {
    // only allow selection if the quiz is not submitted
    if (!isSubmitted) {
      setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
    }
  }

  //Function to handle quiz submission, 
  function handleSubmit() {
    // Calculate time taken from start time to now
    const endTime = Date.now();
    const timeInSeconds = Math.floor((endTime - startTime) / 1000);
    setTimeTaken(timeInSeconds);
    setIsSubmitted(true);
    setIsPopupOpen(true);
  }
//Function to handle closing the popup after submission
  function handleClosePopup() {
    setIsPopupOpen(false);
  }
//Function to handle downloading certificate and report
  function handleDownloadCertificate() {
    console.log('Downloading certificate...');
  
  }

  function handleDownloadReport() {
    console.log('Downloading report...');
    
  }

  //Function to calculate quiz results after submission
  function getQuizResults() {
    let score = 0;
    let answered = 0;
    let correct = 0;
    let incorrect = 0;
// Iterate through quiz cards to calculate score, answered, unanswered, correct, and incorrect counts
    for (let i = 0; i < quizCards.length; i++) {
      const quiz = quizCards[i];
      if (selectedAnswers[quiz.id]) {
        answered++;
        if (selectedAnswers[quiz.id] === quiz.answer) {
          score++;
          correct++;
        } else {
          incorrect++;
        }
      }
    }

    const unanswered = quizCards.length - answered;

    return { score, answered, unanswered, correct, incorrect };
  }

  //Function to format time in MM:SS format
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Calculate results only if the quiz is submitted
  const results = isSubmitted ? getQuizResults() : { score: 0, answered: 0, unanswered: 0, correct: 0, incorrect: 0 };

  // Render the component
  return (
    <div className="test-submission">
      {/**Sticky info panel */}
      <div className="Sticky-Info">
        <div className={`Info-section ${isInfoOpen ? 'Info-section--open' : ''} ${isSubmitted ? 'Info-section--submitted' : ''}`} ref={infoRef}>
          <h2>Information</h2>
          <hr></hr>
          <div className="Info-group">
            {isSubmitted ? (
              <>
              {/**Display quiz result after submisssion */}
              <hr />
              <div className='pack-h4-p'>
                <h4>
                  <img src={counter} alt="counter Icon" className="icon" />
                  Time Taken: </h4>
                </div>
                <p>{formatTime(timeTaken)}</p>
                <hr></hr>
              <div className='pack-h4-p'>
                <h4> <img src={score} alt='score' className='icon'></img>
                Score:</h4>
              </div>
                <p>{results.score} / {quizCards.length}</p>
              
              <hr />
              <div className='pack-h4-p'>
                <h4>
                  <img src={answered} alt="answer Icon" className="icon" />  Answered Questions:</h4>
                </div>
                <p>{results.answered}</p>
                <hr />
                <div className='pack-h4-p'>
                <h4> <img src={unanswered} alt="unanswered Icon" className="icon" />  Unanswered Questions:</h4>
                </div>
                <p>{results.unanswered}</p>
                <hr />
                <div className='pack-h4-p'>
                <h4>
                  <img src={correct} alt="correct Icon" className="icon" />  Correct Questions:</h4>
                  </div>
                <p>{results.correct}</p>
              
                <hr />
                <div className='pack-h4-p'>
                <h4><img src={incorrect} alt="incorrect Icon" className="icon" />  Incorrect Questions:</h4></div>
                <p>{results.incorrect}</p>
                
                <hr />
                <div className="submit-button-container">
                  <button onClick={handleDownloadCertificate}>Download Certificate</button>
                  <button onClick={handleDownloadReport}>Download Report</button>
                </div>
              </>
            ) : (
              <>
              {/**Display 
instructions before submission
              */}
                <h4>
                  <img src={counter} alt="counter Icon" className="icon" />  Time Left:</h4>
                <p>{formatTime(timeLeft)}</p>
                
                <h4><img src={unanswered} alt="question Icon" className="icon" />  Number of Questions: </h4>
                <p>{quizCards.length}</p>
                

                <hr />
                <h4>Don't refresh The page</h4>
                <h4>Don't close the page</h4>
                <hr />
                <div className="submit-button-container">
                  <button type="submit" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/**Main quiz content section  */}
      <div className="test-submission-section">
        <div className="test-submission-header">
          <h1>Quiz Name</h1>
        </div>
        {/* Mobile-specific information and controls */}
        <div className="mobile-info-section">
          {!isSubmitted ? (
            <>
              <div className="mobile-info-left">
                 <h4> <img src={counter} alt='time-Icon' className='icon'></img> Time Left:  
                 {formatTime(timeLeft)}
                 </h4>
                 <h4> <img src={unanswered} alt='questions' className='icon'></img> No. of Questions: {quizCards.length}</h4>
              </div>
              <div className="mobile-info-right">
                 <p>Don't refresh The page</p>
                <p>Don't close the page</p>
               {/**<button className="instructions-toggle" onClick={toggleInfo} ref={buttonRef}>
                  Instructions
                </button>
                {isInfoOpen && (
                  <div className="instructions-dropdown" ref={infoRef}>
                    <p>Don't refresh the page</p>
                    <p>Don't close the page</p>
                  </div>
                )}**/}
              </div>
            </>
          ) : (
            <div className="mobile-info-right">
              <button className="details-toggle" onClick={toggleDetails} ref={detailsButtonRef}>
                 Quiz Details
              </button>
              {isDetailsOpen && (
                <div className="details-dropdown" ref={detailsRef}>
                  <h4> <img src={counter} alt='counter Icon' className='icon' /> Time Taken:</h4>
                  <p>{formatTime(timeTaken)}</p>
                  <h4> <img src={score} alt='score Icon' className='icon' /> Score:</h4>
                  <p>{results.score} / {quizCards.length}</p>
                  <h4><img src={answered} alt='answered Icon' className='icon' /> Answered Questions:</h4>
                  <p>{results.answered}</p>
                  <h4><img src={unanswered} alt='unanswered Icon' className='icon' /> Unanswered Questions:</h4>
                  <p>{results.unanswered}</p>
                  <h4> <img src={correct} alt='correct Icon' className='icon' /> Correct Questions:</h4>
                  <p>{results.correct}</p>
                  <h4> <img src={incorrect} alt='incorrect Icon' className='icon' /> Incorrect Questions:</h4>
                  <p>{results.incorrect}</p>
                  <hr />
                  <div className="submit-button-container">
                    <button onClick={handleDownloadCertificate}>Download Certificate</button>
                    <button onClick={handleDownloadReport}>Download Report</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
         {/* Render quiz questions and options */}
        <div className="ques-container-row">
          {quizCards.map((quesVal) => (
            <div className="ques-card" key={quesVal.id}>
              <div className='pack-h4-marks'>
              <h4>
                {quesVal.id}. {quesVal.question}
              </h4> <span className='points'>Points: 1</span>
              </div>
              <div className="options-container">
                {quesVal.options.map((option, index) => (
                  <label
                    key={index}
                    className={`option-label ${
                      isSubmitted && option === quesVal.answer
                        ? 'correct-answer'
                        : isSubmitted && selectedAnswers[quesVal.id] === option && option !== quesVal.answer
                        ? 'incorrect-answer'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${quesVal.id}`}
                      value={option}
                      checked={selectedAnswers[quesVal.id] === option}
                      onChange={() => handleOptionChange(quesVal.id, option)}
                      disabled={isSubmitted}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {isSubmitted && (
              <p ><b>Reason: </b>{quesVal.description}</p>
              )}
            </div>
          ))}
        </div>
          {/* Submit button at the bottom (hidden after submission) */}
        {!isSubmitted && (
          <div className="bottom-submit-button">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
        {/**SUbmission confirmation popup */}
        {isPopupOpen && (
          <div className="submission-popup">
            <div className="popup-content">
              <h2>Submission Successful</h2>
              <button onClick={handleClosePopup}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestDetails;
