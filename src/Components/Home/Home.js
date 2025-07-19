

import React, { useState } from 'react';

//import './Home.css'; // i am using app.css for this purpose... :).

const Hero = () => (
  <section id="home" className="hero" aria-label="Hero Section">
    <h1>Online Test Platform provided by Sahash</h1>
    <p>Join our journey to educate, quiz your knowledge, and embrace humanity through science and learning.</p>
    <button
      className="btn-primary"
      onClick={() => document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' })}
    >
      Take a Quiz Now
    </button>
  </section>
);

const Education = () => (
  <section id="education" aria-labelledby="education-heading">
    <div className="container">
      <h2 id="education-heading">Educational Programs</h2>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b4733c0e-e546-4e27-a76c-c26ca524ce13.png"
          alt="Educational books and globe icon"
        />
        <h3> Industrial Training</h3>
        <p>Providing accessible education for all ages, with a focus on science, technology, and social skills.</p>
          <a href="https://www.techfeedosolutions.com/" className="learn-more" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png"
          alt="Community education group"
        />
        <h3>Community Outreach</h3>
        <p>Engaging local communities through workshops, seminars, and collaborative projects to foster growth.</p>
        <a href="https://sahashindia.org" className="learn-more" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png"
          alt="Science education icon"
        />
        <h3>Science Literacy</h3>
        <p>Promoting scientific understanding and critical thinking skills for a better future.</p>
        <a href="https://sahashindia.org" className="learn-more" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
      </article>
    </div>
  </section>
);


const Quiz = () => {
  // Placeholder quiz data (replace with actual quiz data as needed)
  const quizzes = [
    { id: 1, title: 'Science Basics', description: 'Test your knowledge of fundamental science concepts.', img: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b4733c0e-e546-4e27-a76c-c26ca524ce13.png' },
    { id: 2, title: 'Human Values', description: 'Explore ethics and human values through this quiz.', img: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png' },
    { id: 3, title: 'Tech Trivia', description: 'Challenge yourself with technology-related questions.', img: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png' },
    { id: 4, title: 'Physics Fun', description: 'Dive into the world of physics with fun questions.', img: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b4733c0e-e546-4e27-a76c-c26ca524ce13.png' },
    { id: 5, title: 'Biology Basics', description: 'Test your understanding of biology concepts.', img: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;

  const handleNext = () => {
    if (currentIndex + cardsPerView < quizzes.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleStartQuiz = (quizTitle) => {
    console.log(`${quizTitle} quiz started!`);
    // Add actual quiz start logic here (e.g., navigate to quiz page)
  };

  const visibleQuizzes = quizzes.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section id="quiz" aria-labelledby="quiz-heading">
      <div className="container quiz-container">
        <h2 id="quiz-heading">Active Quizzes</h2>
        <div className="carousel-wrapper">
          <button
            className="carousel-arrow left-arrow"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Scroll to previous quizzes"
          >
            ←
          </button>
          <div className="carousel">
            {visibleQuizzes.map((quiz, index) => (
              <article key={quiz.id} className={`card quiz-card color-${index % 3}`}>
                <img src={quiz.img} alt={`${quiz.title} quiz icon`} />
                <h3>{quiz.title}</h3>
                <p>{quiz.description}</p>
                <button
                  className="btn-primary"
                  onClick={() => handleStartQuiz(quiz.title)}
                >
                  Start Quiz
                </button>
              </article>
            ))}
          </div>
          <button
            className="carousel-arrow right-arrow"
            onClick={handleNext}
            disabled={currentIndex + cardsPerView >= quizzes.length}
            aria-label="Scroll to next quizzes"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};




const HumanityScience = () => (
  <section id="humanity-science" aria-labelledby="humanity-science-heading">
    <div className="container">
      <h2 id="humanity-science-heading">Humanity & Science Highlights</h2>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7b846cc0-b3fc-4aa9-9c00-003f715bc931.png"
          alt="Volunteers helping children"
        />
        <h3>Empowering Communities</h3>
        <p>Our NGO initiatives bring education and essential resources to vulnerable populations worldwide.</p>
        <a href="https://sahashindia.org" className="learn-more" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/976dda56-f19c-4d78-b9b1-0797d0ccaf26.png"
          alt="Scientists in laboratory"
        />
        <h3>Exploring Scientific Frontiers</h3>
        <p>Supporting innovative research projects that advance human knowledge and wellbeing.</p>
        <a href="https://sahashindia.org" className="learn-more" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1012570-e703-40a2-a5cb-0eb072c274bf.png"
          alt="Teacher with children"
        />
        <h3>Inspiring The Next Generation</h3>
        <p>Creating hands-on educational experiences that spark curiosity and lifelong learning.</p>
        <a href="https://sahashindia.org" className="learn-more" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
      </div>
    </div>
  </section>
);


const AboutUs = () => (
  <section id="aboutUs" aria-labelledby="aboutUs-heading">
    <div className="container">
      <h2 id="aboutUs-heading">About Us</h2>
      <div className="content-block">
        <h3>Our Vision</h3>
        <p>Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem.  </p>
        <a href="https://www.sahashindia.org/visionmission.html" className="learn-more" target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
      </div>
      <div className="content-block">
        <h3>Our Mission</h3>
        <p>Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem.  </p>
        <a href="https://www.sahashindia.org/visionmission.html" className="learn-more" target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
      </div>
      <div className="content-block">
        <h3>Our Values</h3>
        <p>
        Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem.  
        </p>
        <a href="https://www.sahashindia.org/visionmission.html" className="learn-more" target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
      </div>
      
    </div>
  </section>
);

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="feedback" aria-labelledby="feedback-heading" className="feedback-section">
      <div className="container">
        <h2 id="feedback-heading">Share Your Feedback</h2>
        <div className="feedback-form-container">
          <div className="feedback-form">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Name"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
              required
            />
            <textarea
              placeholder="Your Feedback"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Feedback message"
              rows="5"
              required
            ></textarea>
            <button className="btn-primary" onClick={handleSubmit}>
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
const Home = ({ onLoginClick }) => {
  

  return (
    <main role="main">
      <Hero />
      <Education />
      <Quiz />
      <HumanityScience />
       <AboutUs />
      <FeedbackForm />
      
     
    </main>
  );
};

export default Home;