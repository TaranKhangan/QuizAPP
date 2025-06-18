
import React, { useEffect, useRef } from 'react';
import { startGame, resetGame } from './game';
import './Home.css';

const Hero = () => (
  <section id="home" className="hero" aria-label="Hero Section">
    <h1>Empower Minds | Inspire Humanity | Explore Science</h1>
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
        <h3>Inclusive Learning</h3>
        <p>Providing accessible education for all ages, with a focus on science, technology, and social skills.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png"
          alt="Community education group"
        />
        <h3>Community Outreach</h3>
        <p>Engaging local communities through workshops, seminars, and collaborative projects to foster growth.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png"
          alt="Science education icon"
        />
        <h3>Science Literacy</h3>
        <p>Promoting scientific understanding and critical thinking skills for a better future.</p>
      </article>
    </div>
  </section>
);

const Quiz = () => (
  <section id="quiz" aria-labelledby="quiz-heading">
    <h2 id="quiz-heading">Test Your Knowledge: Science & Humanity Quiz</h2>
    <p>Engage with fun and interactive quizzes designed to challenge your understanding of science and human values.</p>
    <button className="btn-primary" id="startQuizBtn">
      Start Quiz
    </button>
  </section>
);

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
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/976dda56-f19c-4d78-b9b1-0797d0ccaf26.png"
          alt="Scientists in laboratory"
        />
        <h3>Exploring Scientific Frontiers</h3>
        <p>Supporting innovative research projects that advance human knowledge and wellbeing.</p>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1012570-e703-40a2-a5cb-0eb072c274bf.png"
          alt="Teacher with children"
        />
        <h3>Inspiring The Next Generation</h3>
        <p>Creating hands-on educational experiences that spark curiosity and lifelong learning.</p>
      </div>
    </div>
  </section>
);

const GameSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      console.error('Canvas or container not found');
      return () => {};
    }

    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const maxWidth = container.clientWidth - 16;
      let width = maxWidth;
      let height = width / aspectRatio;
      const minHeight = 200;
      if (height < minHeight) {
        height = minHeight;
        width = height * aspectRatio;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleFullscreenChange = () => {
      try {
        const fullscreenBtn = document.getElementById('btn-fullscreen');
        const exitBtn = document.getElementById('btn-exit');
        const pauseFullscreenBtn = document.getElementById('btn-pause-fullscreen');
        const resumeFullscreenBtn = document.getElementById('btn-resume-fullscreen');

        if (document.fullscreenElement) {
          if (fullscreenBtn) fullscreenBtn.textContent = 'Exit Fullscreen';
          if (exitBtn) exitBtn.classList.remove('hidden');
          if (pauseFullscreenBtn) pauseFullscreenBtn.classList.remove('hidden');
          if (resumeFullscreenBtn) resumeFullscreenBtn.classList.add('hidden');
        } else {
          if (fullscreenBtn) fullscreenBtn.textContent = 'Fullscreen';
          if (exitBtn) exitBtn.classList.add('hidden');
          if (pauseFullscreenBtn) pauseFullscreenBtn.classList.add('hidden');
          if (resumeFullscreenBtn) resumeFullscreenBtn.classList.add('hidden');
        }
        resizeCanvas();
      } catch (err) {
        console.error('handleFullscreenChange error:', err);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const cleanupGame = startGame(canvas, null);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      cleanupGame();
      resetGame();
    };
  }, []);

  return (
    <section id="game-section" aria-label="Interactive Game Section">
      <div className="container">
        <h2>Play Our Interactive Science Game</h2>
        <div id="game-section-wrapper">
          <div id="game-header" role="region" aria-live="polite">
            <div>
              Score: <span id="score">0</span>
            </div>
            <div>
              Level: <span id="level">1</span>
            </div>
            <div>
              Lives: <span id="lives">3</span>
            </div>
            <div>
              Timer: <span id="timer">60</span>s
            </div>
          </div>
          <div id="game-main">
            <div id="game-sidebar">
              <section>
                <h3>Power-ups</h3>
                <div id="powerups" role="list"></div>
              </section>
              <section>
                <h3>Achievements</h3>
                <div id="achievements" role="list"></div>
              </section>
            </div>
            <div id="game-canvas-container" ref={containerRef}>
              <canvas ref={canvasRef} id="game-canvas"></canvas>
              <div id="particle-container"></div>
              <div id="fullscreen-controls" className="hidden">
                <button id="btn-pause-fullscreen" className="game-btn">Pause</button>
                <button id="btn-resume-fullscreen" className="game-btn hidden">Resume</button>
                <button id="btn-exit" className="exit-btn hidden">Exit</button>
              </div>
            </div>
          </div>
          <div id="game-bottom-controls">
            <button id="btn-pause" className="game-btn">Pause</button>
            <button id="btn-resume" className="game-btn hidden">Resume</button>
            <button id="btn-fullscreen" className="game-btn">Fullscreen</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer role="contentinfo">
    <div className="container">
      <p>
        © 2025 SAHASH NGO | Advancing Education and Science for All |{' '}
        <a href="mailto:info@sahashindia.org">info@sahashindia.org</a>
      </p>
    </div>
  </footer>
);

const Home = ({ onLoginClick }) => (
  <main role="main">
    <Hero />
    <Education />
    <Quiz />
    <HumanityScience />
    <GameSection />
    <Footer />
    <div id="achievement-popup" role="alert" aria-live="assertive"></div>
  </main>
);

export default Home;



//////.........................................../////////////////////////////////////////////////////////////////////////////////////////////////////////.....................................//////////////////////////////////////////////////////////////////////////////////////////////////////////................................../////////////////////////////////////


/*import React, { useEffect, useRef } from 'react';
import { startGame, resetGame } from './game';
import './Home.css';

const Hero = () => (
  <section id="home" className="hero" aria-label="Hero Section">
    <h1>Empower Minds | Inspire Humanity | Explore Science</h1>
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
        <h3>Inclusive Learning</h3>
        <p>Providing accessible education for all ages, with a focus on science, technology, and social skills.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png"
          alt="Community education group"
        />
        <h3>Community Outreach</h3>
        <p>Engaging local communities through workshops, seminars, and collaborative projects to foster growth.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png"
          alt="Science education icon"
        />
        <h3>Science Literacy</h3>
        <p>Promoting scientific understanding and critical thinking skills for a better future.</p>
      </article>
    </div>
  </section>
);

const Quiz = () => (
  <section id="quiz" aria-labelledby="quiz-heading">
    <h2 id="quiz-heading">Test Your Knowledge: Science & Humanity Quiz</h2>
    <p>Engage with fun and interactive quizzes designed to challenge your understanding of science and human values.</p>
    <button className="btn-primary" id="startQuizBtn">
      Start Quiz
    </button>
  </section>
);

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
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/976dda56-f19c-4d78-b9b1-0797d0ccaf26.png"
          alt="Scientists in laboratory"
        />
        <h3>Exploring Scientific Frontiers</h3>
        <p>Supporting innovative research projects that advance human knowledge and wellbeing.</p>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1012570-e703-40a2-a5cb-0eb072c274bf.png"
          alt="Teacher with children"
        />
        <h3>Inspiring The Next Generation</h3>
        <p>Creating hands-on educational experiences that spark curiosity and lifelong learning.</p>
      </div>
    </div>
  </section>
);

const GameSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return () => {};

    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const maxWidth = container.clientWidth - 16;
      let width = maxWidth;
      let height = width / aspectRatio;
      const minHeight = 200;
      if (height < minHeight) {
        height = minHeight;
        width = height * aspectRatio;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleFullscreenChange = () => {
      const fullscreenBtn = document.getElementById('btn-fullscreen');
      const exitBtn = document.getElementById('btn-exit');
      if (document.fullscreenElement) {
        if (fullscreenBtn) fullscreenBtn.textContent = 'Exit Fullscreen';
        if (exitBtn) exitBtn.classList.remove('hidden');
      } else {
        if (fullscreenBtn) fullscreenBtn.textContent = 'Fullscreen';
        if (exitBtn) exitBtn.classList.add('hidden');
      }
      resizeCanvas();
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const cleanupGame = startGame(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      cleanupGame();
      resetGame();
    };
  }, []);

  return (
    <section id="game-section" aria-label="Interactive Game Section">
      <div className="container">
        <h2>Play Our Interactive Science Game</h2>
        <div id="game-section-wrapper">
          <div id="game-header" role="region" aria-live="polite">
            <div>
              Score: <span id="score">0</span>
            </div>
            <div>
              Level: <span id="level">1</span>
            </div>
            <div>
              Lives: <span id="lives">3</span>
            </div>
            <div>
              Timer: <span id="timer">60</span>s
            </div>
          </div>
          <div id="game-main">
            <div id="game-sidebar">
              <section>
                <h3>Power-ups</h3>
                <div id="powerups" role="list"></div>
              </section>
              <section>
                <h3>Achievements</h3>
                <div id="achievements" role="list"></div>
              </section>
            </div>
            <div id="game-canvas-container" ref={containerRef}>
              <canvas ref={canvasRef} id="game-canvas"></canvas>
              <div id="particle-container"></div>
              <button id="btn-exit" className="exit-btn hidden">Exit</button>
            </div>
          </div>
          <div id="game-bottom-controls">
            <button id="btn-pause" className="game-btn">Pause</button>
            <button id="btn-resume" className="game-btn hidden">Resume</button>
            <button id="btn-fullscreen" className="game-btn">Fullscreen</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer role="contentinfo">
    <div className="container">
      <p>
        © 2025 HumanityEd NGO | Advancing Education and Science for All |{' '}
        <a href="mailto:contact@humanityed.org">contact@humanityed.org</a>
      </p>
    </div>
  </footer>
);

const Home = ({ onLoginClick }) => (
  <main role="main">
    <Hero />
    <Education />
    <Quiz />
    <HumanityScience />
    <GameSection />
    <Footer />
    <div id="achievement-popup" role="alert" aria-live="assertive"></div>
  </main>
);

export default Home;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
/*
import React, { useEffect, useRef } from 'react';
import { startGame, resetGame } from './game';
import './Home.css';

const Hero = () => (
  <section id="home" className="hero" aria-label="Hero Section">
    <h1>Empower Minds | Inspire Humanity | Explore Science</h1>
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
        <h3>Inclusive Learning</h3>
        <p>Providing accessible education for all ages, with a focus on science, technology, and social skills.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png"
          alt="Community education group"
        />
        <h3>Community Outreach</h3>
        <p>Engaging local communities through workshops, seminars, and collaborative projects to foster growth.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png"
          alt="Science education icon"
        />
        <h3>Science Literacy</h3>
        <p>Promoting scientific understanding and critical thinking skills for a better future.</p>
      </article>
    </div>
  </section>
);

const Quiz = () => (
  <section id="quiz" aria-labelledby="quiz-heading">
    <h2 id="quiz-heading">Test Your Knowledge: Science & Humanity Quiz</h2>
    <p>Engage with fun and interactive quizzes designed to challenge your understanding of science and human values.</p>
    <button className="btn-primary" id="startQuizBtn">
      Start Quiz
    </button>
  </section>
);

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
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/976dda56-f19c-4d78-b9b1-0797d0ccaf26.png"
          alt="Scientists in laboratory"
        />
        <h3>Exploring Scientific Frontiers</h3>
        <p>Supporting innovative research projects that advance human knowledge and wellbeing.</p>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1012570-e703-40a2-a5cb-0eb072c274bf.png"
          alt="Teacher with children"
        />
        <h3>Inspiring The Next Generation</h3>
        <p>Creating hands-on educational experiences that spark curiosity and lifelong learning.</p>
      </div>
    </div>
  </section>
);

const GameSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return () => {};

    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const maxWidth = container.clientWidth - 16;
      let width = maxWidth;
      let height = width / aspectRatio;
      const minHeight = 200;
      if (height < minHeight) {
        height = minHeight;
        width = height * aspectRatio;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleFullscreenChange = () => {
      const fullscreenBtn = document.getElementById('btn-fullscreen');
      if (fullscreenBtn) {
        fullscreenBtn.textContent = document.fullscreenElement ? 'Exit Fullscreen' : 'Fullscreen';
      }
      resizeCanvas();
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const cleanupGame = startGame(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      cleanupGame();
      resetGame();
    };
  }, []);

  return (
    <section id="game-section" aria-label="Interactive Game Section">
      <div className="container">
        <h2>Play Our Interactive Science Game</h2>
        <div id="game-section-wrapper">
          <div id="game-header" role="region" aria-live="polite">
            <div>
              Score: <span id="score">0</span>
            </div>
            <div>
              Level: <span id="level">1</span>
            </div>
            <div>
              Lives: <span id="lives">3</span>
            </div>
            <div>
              Timer: <span id="timer">60</span>s
            </div>
          </div>
          <div id="game-main">
            <div id="game-sidebar">
              <section>
                <h3>Power-ups</h3>
                <div id="powerups" role="list"></div>
              </section>
              <section>
                <h3>Achievements</h3>
                <div id="achievements" role="list"></div>
              </section>
            </div>
            <div id="game-canvas-container" ref={containerRef}>
              <canvas ref={canvasRef} id="game-canvas"></canvas>
              <div id="particle-container"></div>
            </div>
          </div>
          <div id="game-bottom-controls">
            <button id="btn-pause" className="game-btn">Pause</button>
            <button id="btn-resume" className="game-btn">Resume</button>
            <button id="btn-fullscreen" className="game-btn">Fullscreen</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer role="contentinfo">
    <div className="container">
      <p>
        © 2025 HumanityEd NGO | Advancing Education and Science for All |{' '}
        <a href="mailto:contact@humanityed.org">contact@humanityed.org</a>
      </p>
    </div>
  </footer>
);

const Home = ({ onLoginClick }) => (
  <main role="main">
    <Hero />
    <Education />
    <Quiz />
    <HumanityScience />
    <GameSection />
    <Footer />
    <div id="achievement-popup" role="alert" aria-live="assertive"></div>
  </main>
);

export default Home;////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*import React, { useEffect, useRef } from 'react';
import { startGame, resetGame } from './game';
import './Home.css';

const Hero = () => (
  <section id="home" className="hero" aria-label="Hero Section">
    <h1>Empower Minds | Inspire Humanity | Explore Science</h1>
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
        <h3>Inclusive Learning</h3>
        <p>Providing accessible education for all ages, with a focus on science, technology, and social skills.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png"
          alt="Community education group"
        />
        <h3>Community Outreach</h3>
        <p>Engaging local communities through workshops, seminars, and collaborative projects to foster growth.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png"
          alt="Science education icon"
        />
        <h3>Science Literacy</h3>
        <p>Promoting scientific understanding and critical thinking skills for a better future.</p>
      </article>
    </div>
  </section>
);

const Quiz = () => (
  <section id="quiz" aria-labelledby="quiz-heading">
    <h2 id="quiz-heading">Test Your Knowledge: Science & Humanity Quiz</h2>
    <p>Engage with fun and interactive quizzes designed to challenge your understanding of science and human values.</p>
    <button className="btn-primary" id="startQuizBtn">
      Start Quiz
    </button>
  </section>
);

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
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/976dda56-f19c-4d78-b9b1-0797d0ccaf26.png"
          alt="Scientists in laboratory"
        />
        <h3>Exploring Scientific Frontiers</h3>
        <p>Supporting innovative research projects that advance human knowledge and wellbeing.</p>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1012570-e703-40a2-a5cb-0eb072c274bf.png"
          alt="Teacher with children"
        />
        <h3>Inspiring The Next Generation</h3>
        <p>Creating hands-on educational experiences that spark curiosity and lifelong learning.</p>
      </div>
    </div>
  </section>
);

const GameSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return () => {};

    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const maxWidth = container.clientWidth - 16;
      let width = maxWidth;
      let height = width / aspectRatio;
      const minHeight = 200; // Prevent canvas from being too small
      if (height < minHeight) {
        height = minHeight;
        width = height * aspectRatio;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Handle fullscreen change
    const handleFullscreenChange = () => {
      const fullscreenBtn = document.getElementById('btn-fullscreen');
      if (fullscreenBtn) {
        fullscreenBtn.textContent = document.fullscreenElement ? 'Exit Fullscreen' : 'Fullscreen';
      }
      resizeCanvas();
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const cleanupGame = startGame(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      cleanupGame();
      resetGame();
    };
  }, []);

  return (
    <section id="game-section" aria-label="Interactive Game Section">
      <div className="container">
        <h2>Play Our Interactive Science Game</h2>
        <div id="game-section-wrapper">
          <div id="game-header" role="region" aria-live="polite">
            <div>
              Score: <span id="score">0</span>
            </div>
            <div>
              Level: <span id="level">1</span>
            </div>
            <div>
              Lives: <span id="lives">3</span>
            </div>
            <div>
              Timer: <span id="timer">60</span>s
            </div>
          </div>
          <div id="game-main">
            <div id="game-sidebar">
              <section>
                <h3>Power-ups</h3>
                <div id="powerups" role="list">
                  <button id="btn-double-points" className="powerup-btn">Use Double Points</button>
                  <button id="btn-reset" className="powerup-btn">Reset Game</button>
                </div>
              </section>
              <section>
                <h3>Achievements</h3>
                <div id="achievements" role="list"></div>
              </section>
            </div>
            <div id="game-canvas-container" ref={containerRef}>
              <canvas ref={canvasRef} id="game-canvas"></canvas>
              <div id="particle-container"></div>
            </div>
          </div>
          <div id="game-bottom-controls">
            <button id="btn-pause" className="game-btn">Pause</button>
            <button id="btn-resume" className="game-btn hidden">Resume</button>
            <button id="btn-fullscreen" className="game-btn">Fullscreen</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer role="contentinfo">
    <div className="container">
      <p>
        © 2025 HumanityEd NGO | Advancing Education and Science for All |{' '}
        <a href="mailto:contact@humanityed.org">contact@humanityed.org</a>
      </p>
    </div>
  </footer>
);

const Home = ({ onLoginClick }) => (
  <main role="main">
    <Hero />
    <Education />
    <Quiz />
    <HumanityScience />
    <GameSection />
    <Footer />
    <div id="achievement-popup" role="alert" aria-live="assertive"></div>
  </main>
);

export default Home;*/


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*import React, { useEffect, useRef } from 'react';
import { startGame, resetGame } from './game';
import './Home.css';

const Hero = () => (
  <section id="home" className="hero" aria-label="Hero Section">
    <h1>Empower Minds | Inspire Humanity | Explore Science</h1>
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
        <h3>Inclusive Learning</h3>
        <p>Providing accessible education for all ages, with a focus on science, technology, and social skills.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png"
          alt="Community education group"
        />
        <h3>Community Outreach</h3>
        <p>Engaging local communities through workshops, seminars, and collaborative projects to foster growth.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png"
          alt="Science education icon"
        />
        <h3>Science Literacy</h3>
        <p>Promoting scientific understanding and critical thinking skills for a better future.</p>
      </article>
    </div>
  </section>
);

const Quiz = () => (
  <section id="quiz" aria-labelledby="quiz-heading">
    <h2 id="quiz-heading">Test Your Knowledge: Science & Humanity Quiz</h2>
    <p>Engage with fun and interactive quizzes designed to challenge your understanding of science and human values.</p>
    <button className="btn-primary" id="startQuizBtn">
      Start Quiz
    </button>
  </section>
);

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
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/976dda56-f19c-4d78-b9b1-0797d0ccaf26.png"
          alt="Scientists in laboratory"
        />
        <h3>Exploring Scientific Frontiers</h3>
        <p>Supporting innovative research projects that advance human knowledge and wellbeing.</p>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1012570-e703-40a2-a5cb-0eb072c274bf.png"
          alt="Teacher with children"
        />
        <h3>Inspiring The Next Generation</h3>
        <p>Creating hands-on educational experiences that spark curiosity and lifelong learning.</p>
      </div>
    </div>
  </section>
);

const GameSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return () => {};

    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const maxWidth = container.clientWidth - 16; // Account for padding
      const maxHeight = container.clientHeight - 16;
      let width = maxWidth;
      let height = width / aspectRatio;
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const cleanupGame = startGame(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cleanupGame();
      resetGame();
    };
  }, []);

  return (
    <section id="game-section" aria-label="Interactive Game Section">
      <div className="container">
        <h2>Play Our Interactive Science Game</h2>
        <div id="game-section-wrapper">
          <div id="game-header" role="region" aria-live="polite">
            <div>
              Score: <span id="score">0</span>
            </div>
            <div>
              Level: <span id="level">1</span>
            </div>
            <div>
              Lives: <span id="lives">3</span>
            </div>
            <div>
              Timer: <span id="timer">60</span>s
            </div>
          </div>
          <div id="game-main">
            <div id="game-sidebar">
              <section>
                <h3>Power-ups</h3>
                <div id="powerups" role="list">
                  <button id="btn-double-points" className="powerup-btn">Use Double Points</button>
                  <button id="btn-reset" className="powerup-btn">Reset Game</button>
                </div>
              </section>
              <section>
                <h3>Achievements</h3>
                <div id="achievements" role="list"></div>
              </section>
            </div>
            <div id="game-canvas-container" ref={containerRef}>
              <canvas ref={canvasRef} id="game-canvas"></canvas>
              <div id="particle-container"></div>
            </div>
          </div>
          <div id="game-bottom-controls">
            <button id="btn-pause" className="game-btn">Pause</button>
            <button id="btn-resume" className="game-btn hidden">Resume</button>
            <button id="btn-fullscreen" className="game-btn">Fullscreen</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer role="contentinfo">
    <div className="container">
      <p>
        © 2025 HumanityEd NGO | Advancing Education and Science for All |{' '}
        <a href="mailto:contact@humanityed.org">contact@humanityed.org</a>
      </p>
    </div>
  </footer>
);

const Home = ({ onLoginClick }) => (
  <main role="main">
    <Hero />
    <Education />
    <Quiz />
    <HumanityScience />
    <GameSection />
    <Footer />
    <div id="achievement-popup" role="alert" aria-live="assertive"></div>
  </main>
);

export default Home;




/*
import React, { useEffect, useRef } from 'react';
import { startGame, resetGame } from './game';
import './Home.css';

const Hero = () => (
  <section id="home" className="hero" aria-label="Hero Section">
    <h1>Empower Minds | Inspire Humanity | Explore Science</h1>
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
        <h3>Inclusive Learning</h3>
        <p>Providing accessible education for all ages, with a focus on science, technology, and social skills.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png"
          alt="Community education group"
        />
        <h3>Community Outreach</h3>
        <p>Engaging local communities through workshops, seminars, and collaborative projects to foster growth.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png"
          alt="Science education icon"
        />
        <h3>Science Literacy</h3>
        <p>Promoting scientific understanding and critical thinking skills for a better future.</p>
      </article>
    </div>
  </section>
);

const Quiz = () => (
  <section id="quiz" aria-labelledby="quiz-heading">
    <h2 id="quiz-heading">Test Your Knowledge: Science & Humanity Quiz</h2>
    <p>Engage with fun and interactive quizzes designed to challenge your understanding of science and human values.</p>
    <button className="btn-primary" id="startQuizBtn">
      Start Quiz
    </button>
  </section>
);

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
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/976dda56-f19c-4d78-b9b1-0797d0ccaf26.png"
          alt="Scientists in laboratory"
        />
        <h3>Exploring Scientific Frontiers</h3>
        <p>Supporting innovative research projects that advance human knowledge and wellbeing.</p>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1012570-e703-40a2-a5cb-0eb072c274bf.png"
          alt="Teacher with children"
        />
        <h3>Inspiring The Next Generation</h3>
        <p>Creating hands-on educational experiences that spark curiosity and lifelong learning.</p>
      </div>
    </div>
  </section>
);

const GameSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return () => {};

    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const maxWidth = container.clientWidth - 16; // Account for padding
      const maxHeight = container.clientHeight - 16;
      let width = maxWidth;
      let height = width / aspectRatio;
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const cleanupGame = startGame(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cleanupGame();
      resetGame();
    };
  }, []);

  return (
    <section id="game-section" aria-label="Interactive Game Section">
      <div className="container">
        <h2>Play Our Interactive Science Game</h2>
        <div id="game-section-wrapper">
          <div id="game-header" role="region" aria-live="polite">
            <div>
              Score: <span id="score">0</span>
            </div>
            <div>
              Level: <span id="level">1</span>
            </div>
            <div>
              Lives: <span id="lives">3</span>
            </div>
            <div>
              Timer: <span id="timer">60</span>s
            </div>
          </div>
          <div id="game-main">
            <div id="game-sidebar">
              <section>
                <h3>Power-ups</h3>
                <div id="powerups" role="list">
                  <button id="btn-double-points" className="powerup-btn">Use Double Points</button>
                  <button id="btn-extra-time" className="powerup-btn">Use Extra Time</button>
                </div>
              </section>
              <section>
                <h3>Achievements</h3>
                <div id="achievements" role="list"></div>
              </section>
            </div>
            <div id="game-canvas-container" ref={containerRef}>
              <canvas ref={canvasRef} id="game-canvas"></canvas>
              <div id="particle-container"></div>
            </div>
          </div>
          <div id="game-bottom-controls">
            <button id="btn-pause" className="game-btn">Pause</button>
            <button id="btn-resume" className="game-btn hidden">Resume</button>
            <button id="btn-fullscreen" className="game-btn">Fullscreen</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer role="contentinfo">
    <div className="container">
      <p>
        © 2025 HumanityEd NGO | Advancing Education and Science for All |{' '}
        <a href="mailto:contact@humanityed.org">contact@humanityed.org</a>
      </p>
    </div>
  </footer>
);

const Home = ({ onLoginClick }) => (
  <main role="main">
    <Hero />
    <Education />
    <Quiz />
    <HumanityScience />
    <GameSection />
    <Footer />
    <div id="achievement-popup" role="alert" aria-live="assertive"></div>
  </main>
);

export default Home;

*/










/*import React, { useEffect, useRef } from 'react';
import { startGame, resetGame } from './game';
import './Home.css';

const Hero = () => (
  <section id="home" className="hero" aria-label="Hero Section">
    <h1>Empower Minds | Inspire Humanity | Explore Science</h1>
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
        <h3>Inclusive Learning</h3>
        <p>Providing accessible education for all ages, with a focus on science, technology, and social skills.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png"
          alt="Community education group"
        />
        <h3>Community Outreach</h3>
        <p>Engaging local communities through workshops, seminars, and collaborative projects to foster growth.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png"
          alt="Science education icon"
        />
        <h3>Science Literacy</h3>
        <p>Promoting scientific understanding and critical thinking skills for a better future.</p>
      </article>
    </div>
  </section>
);

const Quiz = () => (
  <section id="quiz" aria-labelledby="quiz-heading">
    <h2 id="quiz-heading">Test Your Knowledge: Science & Humanity Quiz</h2>
    <p>Engage with fun and interactive quizzes designed to challenge your understanding of science and human values.</p>
    <button className="btn-primary" id="startQuizBtn">
      Start Quiz
    </button>
  </section>
);

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
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/976dda56-f19c-4d78-b9b1-0797d0ccaf26.png"
          alt="Scientists in laboratory"
        />
        <h3>Exploring Scientific Frontiers</h3>
        <p>Supporting innovative research projects that advance human knowledge and wellbeing.</p>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1012570-e703-40a2-a5cb-0eb072c274bf.png"
          alt="Teacher with children"
        />
        <h3>Inspiring The Next Generation</h3>
        <p>Creating hands-on educational experiences that spark curiosity and lifelong learning.</p>
      </div>
    </div>
  </section>
);

const GameSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return () => {};

    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const maxWidth = container.clientWidth - 16; // Account for padding
      const maxHeight = container.clientHeight - 16;
      let width = maxWidth;
      let height = width / aspectRatio;
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const cleanupGame = startGame(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cleanupGame();
      resetGame();
    };
  }, []);

  return (
    <section id="game-section" aria-label="Interactive Game Section">
      <div className="container">
        <h2>Play Our Interactive Science Quiz Game</h2>
        <div id="game-section-wrapper">
          <div id="game-header" role="region" aria-live="polite">
            <div>
              Score: <span id="score">0</span>
            </div>
            <div>
              Level: <span id="level">1</span>
            </div>
            <div>
              Lives: <span id="lives">3</span>
            </div>
            <div>
              Timer: <span id="timer">60</span>s
            </div>
          </div>
          <div id="game-main">
            <div id="game-sidebar">
              <section>
                <h3>Power-ups</h3>
                <div id="powerups" role="list">
                  <button id="btn-double-points" className="powerup-btn">Use Double Points</button>
                  <button id="btn-extra-time" className="powerup-btn">Use Extra Time</button>
                </div>
              </section>
              <section>
                <h3>Achievements</h3>
                <div id="achievements" role="list"></div>
              </section>
            </div>
            <div id="game-canvas-container" ref={containerRef}>
              <canvas ref={canvasRef} id="game-canvas"></canvas>
              <div id="particle-container"></div>
              <div id="quiz-controls">
                <div id="question-text"></div>
                <div id="answer-buttons">
                  <button className="answer-btn">Answer 1</button>
                  <button className="answer-btn">Answer 2</button>
                  <button className="answer-btn">Answer 3</button>
                  <button className="answer-btn">Answer 4</button>
                </div>
              </div>
            </div>
          </div>
          <div id="game-bottom-controls">
            <button id="btn-pause" className="game-btn">Pause</button>
            <button id="btn-resume" className="game-btn hidden">Resume</button>
            <button id="btn-fullscreen" className="game-btn">Fullscreen</button>
            <button id="btn-sound-toggle" className="game-btn">Sound On</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer role="contentinfo">
    <div className="container">
      <p>
        © 2025 HumanityEd NGO | Advancing Education and Science for All |{' '}
        <a href="mailto:contact@humanityed.org">contact@humanityed.org</a>
      </p>
    </div>
  </footer>
);

const Home = ({ onLoginClick }) => (
  <main role="main">
    <Hero />
    <Education />
    <Quiz />
    <HumanityScience />
    <GameSection />
    <Footer />
    <div id="achievement-popup" role="alert" aria-live="assertive"></div>
  </main>
);

export default Home;
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*import React, { useEffect, useRef } from 'react';
import { startGame, resetGame } from './game';

const Hero = () => (
  <section id="home" className="hero" aria-label="Hero Section">
    <h1>Empower Minds | Inspire Humanity | Explore Science</h1>
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
        <h3>Inclusive Learning</h3>
        <p>Providing accessible education for all ages, with a focus on science, technology, and social skills.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png"
          alt="Community education group"
        />
        <h3>Community Outreach</h3>
        <p>Engaging local communities through workshops, seminars, and collaborative projects to foster growth.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png"
          alt="Science education icon"
        />
        <h3>Science Literacy</h3>
        <p>Promoting scientific understanding and critical thinking skills for a better future.</p>
      </article>
    </div>
  </section>
);

const Quiz = () => (
  <section id="quiz" aria-labelledby="quiz-heading">
    <h2 id="quiz-heading">Test Your Knowledge: Science & Humanity Quiz</h2>
    <p>Engage with fun and interactive quizzes designed to challenge your understanding of science and human values.</p>
    <button className="btn-primary" id="startQuizBtn">
      Start Quiz
    </button>
  </section>
);

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
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/976dda56-f19c-4d78-b9b1-0797d0ccaf26.png"
          alt="Scientists in laboratory"
        />
        <h3>Exploring Scientific Frontiers</h3>
        <p>Supporting innovative research projects that advance human knowledge and wellbeing.</p>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1012570-e703-40a2-a5cb-0eb072c274bf.png"
          alt="Teacher with children"
        />
        <h3>Inspiring The Next Generation</h3>
        <p>Creating hands-on educational experiences that spark curiosity and lifelong learning.</p>
      </div>
    </div>
  </section>
);

const GameSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return () => {};

    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const maxWidth = container.clientWidth;
      const maxHeight = container.clientHeight;
      let width = maxWidth;
      let height = width / aspectRatio;
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const cleanupGame = startGame(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cleanupGame();
      resetGame();
    };
  }, []);

  return (
    <section id="game-section" aria-label="Interactive Game Section">
      <div className="container">
        <h2>Play Our Interactive Science Quiz Game</h2>
        <div id="game-section-wrapper">
          <div id="game-header" role="region" aria-live="polite">
            <div>
              Score: <span id="score">0</span>
            </div>
            <div>
              Level: <span id="level">1</span>
            </div>
            <div>
              Lives: <span id="lives">3</span>
            </div>
            <div>
              Timer: <span id="timer">60</span>s
            </div>
          </div>
          <div id="game-main">
            <div id="game-sidebar">
              <section>
                <h3>Power-ups</h3>
                <div id="powerups" role="list"></div>
              </section>
              <section>
                <h3>Achievements</h3>
                <div id="achievements" role="list"></div>
              </section>
            </div>
            <div id="game-canvas-container" ref={containerRef}>
              <canvas ref={canvasRef} id="game-canvas" width="800" height="480"></canvas>
              <div id="particle-container"></div>
            </div>
          </div>
          <div id="game-bottom-controls">
            <button id="btn-pause" className="game-btn">Pause</button>
            <button id="btn-resume" className="game-btn hidden">Resume</button>
            <button id="btn-fullscreen" className="game-btn">Fullscreen</button>
            <button id="btn-sound-toggle" className="game-btn">Sound On</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer role="contentinfo">
    <div className="container">
      <p>
        © 2025 HumanityEd NGO | Advancing Education and Science for All |{' '}
        <a href="mailto:contact@humanityed.org">contact@humanityed.org</a>
      </p>
    </div>
  </footer>
);

const Home = ({ onLoginClick }) => (
  <main role="main">
    <Hero />
    <Education />
    <Quiz />
    <HumanityScience />
    <GameSection />
    <Footer />
    <div id="achievement-popup" role="alert" aria-live="assertive"></div>
  </main>
);

export default Home;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*import React, { useEffect, useRef } from 'react';
import { startGame, resetGame } from './game';

const Hero = () => (
  <section id="home" className="hero" aria-label="Hero Section">
    <h1>Empower Minds | Inspire Humanity | Explore Science</h1>
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
        <h3>Inclusive Learning</h3>
        <p>Providing accessible education for all ages, with a focus on science, technology, and social skills.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png"
          alt="Community education group"
        />
        <h3>Community Outreach</h3>
        <p>Engaging local communities through workshops, seminars, and collaborative projects to foster growth.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png"
          alt="Science education icon"
        />
        <h3>Science Literacy</h3>
        <p>Promoting scientific understanding and critical thinking skills for a better future.</p>
      </article>
    </div>
  </section>
);

const Quiz = () => (
  <section id="quiz" aria-labelledby="quiz-heading">
    <h2 id="quiz-heading">Test Your Knowledge: Science & Humanity Quiz</h2>
    <p>Engage with fun and interactive quizzes designed to challenge your understanding of science and human values.</p>
    <button className="btn-primary" id="startQuizBtn">
      Start Quiz
    </button>
  </section>
);

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
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/976dda56-f19c-4d78-b9b1-0797d0ccaf26.png"
          alt="Scientists in laboratory"
        />
        <h3>Exploring Scientific Frontiers</h3>
        <p>Supporting innovative research projects that advance human knowledge and wellbeing.</p>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1012570-e703-40a2-a5cb-0eb072c274bf.png"
          alt="Teacher with children"
        />
        <h3>Inspiring The Next Generation</h3>
        <p>Creating hands-on educational experiences that spark curiosity and lifelong learning.</p>
      </div>
    </div>
  </section>
);

const GameSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const maxWidth = container.clientWidth;
      const maxHeight = container.clientHeight;
      let width = maxWidth;
      let height = width / aspectRatio;
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    startGame(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resetGame();
    };
  }, []);

  return (
    <section id="game-section" aria-label="Interactive Game Section">
      <div className="container">
        <h2>Play Our Interactive Science Quiz Game</h2>
        <div id="game-section-wrapper">
          <div id="game-header" role="region" aria-live="polite">
            <div>
              Score: <span id="score">0</span>
            </div>
            <div>
              Level: <span id="level">1</span>
            </div>
            <div>
              Lives: <span id="lives">3</span>
            </div>
            <div>
              Timer: <span id="timer">60</span>s
            </div>
          </div>
          <div id="game-main">
            <div id="game-sidebar">
              <section>
                <h3>Power-ups</h3>
                <div id="powerups" role="list"></div>
              </section>
              <section>
                <h3>Achievements</h3>
                <div id="achievements" role="list"></div>
              </section>
            </div>
            <div id="game-canvas-container" ref={containerRef}>
              <canvas ref={canvasRef} id="game-canvas" width="800" height="480"></canvas>
              <div id="particle-container"></div>
            </div>
          </div>
          <div id="game-bottom-controls">
            <button id="btn-pause" className="game-btn">Pause</button>
            <button id="btn-resume" className="game-btn hidden">Resume</button>
            <button id="btn-fullscreen" className="game-btn">Fullscreen</button>
            <button id="btn-sound-toggle" className="game-btn">Sound On</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer role="contentinfo">
    <div className="container">
      <p>
        © 2025 HumanityEd NGO | Advancing Education and Science for All |{' '}
        <a href="mailto:contact@humanityed.org">contact@humanityed.org</a>
      </p>
    </div>
  </footer>
);

const Home = ({ onLoginClick }) => (
  <main role="main">
    <Hero />
    <Education />
    <Quiz />
    <HumanityScience />
    <GameSection />
    <Footer />
    <div id="achievement-popup" role="alert" aria-live="assertive"></div>
  </main>
);

export default Home;


///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////

/*
import React, { useEffect, useRef } from 'react';
import { startGame, resetGame } from './game';

const Hero = () => (
  <section id="home" className="hero" aria-label="Hero Section">
    <h1>Empower Minds | Inspire Humanity | Explore Science</h1>
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
        <h3>Inclusive Learning</h3>
        <p>Providing accessible education for all ages, with a focus on science, technology, and social skills.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png"
          alt="Community education group"
        />
        <h3>Community Outreach</h3>
        <p>Engaging local communities through workshops, seminars, and collaborative projects to foster growth.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png"
          alt="Science education icon"
        />
        <h3>Science Literacy</h3>
        <p>Promoting scientific understanding and critical thinking skills for a better future.</p>
      </article>
    </div>
  </section>
);

const Quiz = () => (
  <section id="quiz" aria-labelledby="quiz-heading">
    <h2 id="quiz-heading">Test Your Knowledge: Science & Humanity Quiz</h2>
    <p>Engage with fun and interactive quizzes designed to challenge your understanding of science and human values.</p>
    <button className="btn-primary" id="startQuizBtn">
      Start Quiz
    </button>
  </section>
);

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
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/976dda56-f19c-4d78-b9b1-0797d0ccaf26.png"
          alt="Scientists in laboratory"
        />
        <h3>Exploring Scientific Frontiers</h3>
        <p>Supporting innovative research projects that advance human knowledge and wellbeing.</p>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1012570-e703-40a2-a5cb-0eb072c274bf.png"
          alt="Teacher with children"
        />
        <h3>Inspiring The Next Generation</h3>
        <p>Creating hands-on educational experiences that spark curiosity and lifelong learning.</p>
      </div>
    </div>
  </section>
);

const GameSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const maxWidth = container.clientWidth;
      const maxHeight = container.clientHeight;
      let width = maxWidth;
      let height = width / aspectRatio;
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    startGame(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resetGame();
    };
  }, []);

  return (
    <section id="game-section" aria-label="Interactive Game Section">
      <div className="container">
        <h2>Play Our Interactive Science Quiz Game</h2>
        <div id="game-section-wrapper">
          <div id="game-header" role="region" aria-live="polite">
            <div>
              Score: <span id="score">0</span>
            </div>
            <div>
              Level: <span id="level">1</span>
            </div>
            <div>
              Lives: <span id="lives">3</span>
            </div>
            <div>
              Timer: <span id="timer">60</span>s
            </div>
          </div>
          <div id="game-main">
            <div id="game-sidebar">
              <section>
                <h3>Power-ups</h3>
                <div id="powerups" role="list"></div>
              </section>
              <section>
                <h3>Achievements</h3>
                <div id="achievements" role="list"></div>
              </section>
            </div>
            <div id="game-canvas-container" ref={containerRef}>
              <canvas ref={canvasRef} id="game-canvas" width="800" height="480"></canvas>
              <div id="particle-container"></div>
            </div>
          </div>
          <div id="game-bottom-controls">
            <button id="btn-pause" className="game-btn">Pause</button>
            <button id="btn-resume" className="game-btn hidden">Resume</button>
            <button id="btn-fullscreen" className="game-btn">Fullscreen</button>
            <button id="btn-sound-toggle" className="game-btn">Sound On</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer role="contentinfo">
    <div className="container">
      <p>
        © 2025 HumanityEd NGO | Advancing Education and Science for All |{' '}
        <a href="mailto:contact@humanityed.org">contact@humanityed.org</a>
      </p>
    </div>
  </footer>
);

const Home = ({ onLoginClick }) => (
  <main role="main">
    <Hero />
    <Education />
    <Quiz />
    <HumanityScience />
    <GameSection />
    <Footer />
    <div id="achievement-popup" role="alert" aria-live="assertive"></div>
  </main>
);

export default Home;


///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
/*
import React, { useEffect, useRef } from 'react';
import './Home.css';
import { startGame, resetGame } from './game';

const Navbar = () => {
  const mobileNavRef = useRef(null);
  const mobileToggleRef = useRef(null);

  const toggleMobileNav = () => {
    const mobileNav = mobileNavRef.current;
    const mobileToggle = mobileToggleRef.current;
    const shown = mobileNav.classList.toggle('show');
    mobileNav.setAttribute('aria-hidden', !shown);
    mobileToggle.setAttribute('aria-expanded', shown);
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => (link.tabIndex = shown ? 0 : -1));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        mobileNavRef.current &&
        mobileToggleRef.current &&
        !mobileNavRef.current.contains(event.target) &&
        !mobileToggleRef.current.contains(event.target)
      ) {
        mobileNavRef.current.classList.remove('show');
        mobileNavRef.current.setAttribute('aria-hidden', 'true');
        mobileToggleRef.current.setAttribute('aria-expanded', 'false');
        const mobileLinks = mobileNavRef.current.querySelectorAll('a');
        mobileLinks.forEach(link => (link.tabIndex = -1));
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <header role="banner">
      <div className="nav-bar container" role="navigation" aria-label="Primary navigation">
        <div className="logo" aria-label="NGO Education Quiz Logo">HumanityEd</div>
        <nav className="nav-desktop">
          <a href="#education" tabIndex="0">Education</a>
          <a href="#quiz" tabIndex="0">Quiz</a>
          <a href="#humanity-science" tabIndex="0">Humanity & Science</a>
          <a href="#game-section" tabIndex="0">Play Game</a>
        </nav>
        <button
          ref={mobileToggleRef}
          className="mobile-toggle"
          aria-label="Toggle menu"
          aria-expanded="false"
          onClick={toggleMobileNav}
        >
          ☰
        </button>
      </div>
      <nav ref={mobileNavRef} id="mobileNav" className="nav-mobile" aria-hidden="true">
        <a href="#education" tabIndex="-1">Education</a>
        <a href="#quiz" tabIndex="-1">Quiz</a>
        <a href="#humanity-science" tabIndex="-1">Humanity & Science</a>
        <a href="#game-section" tabIndex="-1">Play Game</a>
      </nav>
    </header>
  );
};

const Hero = () => (
  <section className="hero" aria-label="Hero Section">
    <h1>Empower Minds | Inspire Humanity | Explore Science</h1>
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
        <h3>Inclusive Learning</h3>
        <p>Providing accessible education for all ages, with a focus on science, technology, and social skills.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f8395f2-68ad-48fb-9209-b831f08c8abf.png"
          alt="Community education group"
        />
        <h3>Community Outreach</h3>
        <p>Engaging local communities through workshops, seminars, and collaborative projects to foster growth.</p>
      </article>
      <article className="card">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59241d21-0747-4976-9a06-b1f3a2d199f4.png"
          alt="Science education icon"
        />
        <h3>Science Literacy</h3>
        <p>Promoting scientific understanding and critical thinking skills for a better future.</p>
      </article>
    </div>
  </section>
);

const Quiz = () => (
  <section id="quiz" aria-labelledby="quiz-heading">
    <h2 id="quiz-heading">Test Your Knowledge: Science & Humanity Quiz</h2>
    <p>Engage with fun and interactive quizzes designed to challenge your understanding of science and human values.</p>
    <button className="btn-primary" id="startQuizBtn">
      Start Quiz
    </button>
  </section>
);

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
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/976dda56-f19c-4d78-b9b1-0797d0ccaf26.png"
          alt="Scientists in laboratory"
        />
        <h3>Exploring Scientific Frontiers</h3>
        <p>Supporting innovative research projects that advance human knowledge and wellbeing.</p>
      </div>
      <div className="content-block">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1012570-e703-40a2-a5cb-0eb072c274bf.png"
          alt="Teacher with children"
        />
        <h3>Inspiring The Next Generation</h3>
        <p>Creating hands-on educational experiences that spark curiosity and lifelong learning.</p>
      </div>
    </div>
  </section>
);

const GameSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const maxWidth = container.clientWidth;
      const maxHeight = container.clientHeight;
      let width = maxWidth;
      let height = width / aspectRatio;
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    startGame(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resetGame();
    };
  }, []);

  return (
    <section id="game-section" aria-label="Interactive Game Section">
      <div className="container">
        <h2>Play Our Interactive Science Quiz Game</h2>
        <div id="game-section-wrapper">
          <div id="game-header" role="region" aria-live="polite">
            <div>
              Score: <span id="score">0</span>
            </div>
            <div>
              Level: <span id="level">1</span>
            </div>
            <div>
              Lives: <span id="lives">3</span>
            </div>
            <div>
              Timer: <span id="timer">60</span>s
            </div>
          </div>
          <div id="game-main">
            <div id="game-sidebar">
              <section>
                <h3>Power-ups</h3>
                <div id="powerups" role="list"></div>
              </section>
              <section>
                <h3>Achievements</h3>
                <div id="achievements" role="list"></div>
              </section>
            </div>
            <div id="game-canvas-container" ref={containerRef}>
              <canvas ref={canvasRef} id="game-canvas" width="800" height="480"></canvas>
              <div id="particle-container"></div>
            </div>
          </div>
          <div id="game-bottom-controls">
            <button id="btn-pause" className="game-btn">Pause</button>
            <button id="btn-resume" className="game-btn hidden">Resume</button>
            <button id="btn-fullscreen" className="game-btn">Fullscreen</button>
            <button id="btn-sound-toggle" className="game-btn">Sound On</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer role="contentinfo">
    <div className="container">
      <p>
        © 2025 HumanityEd NGO | Advancing Education and Science for All |{' '}
        <a href="mailto:contact@humanityed.org">contact@humanityed.org</a>
      </p>
    </div>
  </footer>
);

const App = () => (
  <div className="app">
    <Navbar />
    <main role="main">
      <Hero />
      <Education />
      <Quiz />
      <HumanityScience />
      <GameSection />
    </main>
    <Footer />
    <div id="achievement-popup" role="alert" aria-live="assertive"></div>
  </div>
);

export default App;




///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////




/*import React, {useState, useEffect} from 'react';
import './Home.css';
import BookHeader from '../../assets/Book-Header2.png';
import { Link } from 'react-router-dom';


//https://cdn.dribbble.com/userupload/7376230/file/original-6d65727445770c7181836d0afa8a20df.png?resize=1024x768&vertical=center
const Home = ({onLoginClick}) => {
  const [showButtons, setShowButtons] = useState(window.innerWidth<=789);
  const [cardText, setCardText] = useState('Quiz Time!');
  const texts = ['Quiz Time!', 'Learn & Grow', 'Test Yourself'];
  let hoverCount = 0;
 
  useEffect(()=>{
    let mounted = true;
    const handleResize = () => {
      if(mounted){
      setShowButtons(window.innerWidth<=789);
    }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
      
    }
  })
  
  const handleHover = () => {
    hoverCount = (hoverCount + 1) % texts.length;
    setCardText(texts[hoverCount]);
  };

  return (
    <div className='container'>
      {/** HOme SECTION *//*}
      <section id='home' className='section home-section'>
      <div className='content-wrapper'>
        <div className='text-content'>
      <div className='logo-container'>
        <div className='logo'>S</div>
        <h1 className='logo-Name'>Sahash</h1>
      </div>
        <h4><i>Every Answer Counts, So Does Every Life.</i></h4><h4>
        <i>Where Knowledge Meets Kindness.</i></h4><h4>
        <i>Be the Brain Behind the Change.</i></h4>
        {showButtons &&(
        <div className='buttons'>
            <button className='login-btn'  onClick={onLoginClick}>Login</button>
            <div className='dropdown'>
            <button className='signup-btn'>Sign up</button>
            <div className='dropdown-content'>
              <Link to='/teacher-signup'>Teacher</Link>
              <Link to='/student-signup'>Student</Link>
            </div>
            </div>
        </div>
        )}
        </div>
        <div className="image-content">
          <img src={BookHeader} alt="Book Header" className="book-header" />
        </div>
    </div>
    </section>
   {/* ABOUT SECTION *//*}
   <div className='about-section-wrapper'>
   <section id='about' className='section about-section'>
        <div className='content-wrapper'>
          <div className='text-content'>
            <h2>About Us</h2>
            <p>Welcome to Sahash, where we believe that every answer counts, and so does every life. Our mission is to create a platform that not only provides knowledge but also fosters kindness and compassion. We are dedicated to empowering individuals to be the brain behind the change in their communities.</p>
            <p>Join us on this journey of learning and growth, where we strive to make a positive impact in the world.</p>
          </div>
          <div className='about-animation'>
            <div className='quiz-animation'>
              <div className='quiz-card' onMouseEnter={handleHover}>{cardText}</div>
            </div>
          
          
          </div>
        </div>
      </section>
      </div>
     {/** SERVICES SECTION *//*}
      <section id='services' className='section services-section'>
        <div className='content-wrapper'>
          <div className='text-content'>
            <h2>Our Services</h2>
            <p>At Sahash, we offer a range of services designed to enhance your learning experience and promote a culture of kindness. Our platform provides access to a wealth of resources, including educational materials, mentorship programs, and community engagement initiatives.</p>
            <p>We are committed to supporting individuals in their pursuit of knowledge and personal growth.</p>
          </div>
        </div>
      </section>

    {/** CONTACT SECTION *//*}
      
      <section id='contact' className='section contact-section'>
        <div className='content-wrapper'>
          <div className='text-content'>
            <h2>Contact Us</h2>
            <p>If you have any questions, suggestions, or feedback, feel free to reach out to us. We would love to hear from you!</p>
            <p>
          Have questions or want to get involved? Reach out to us at <a href="mailto:info@sahash.com">info@sahash.com</a>
          or call us at +91-123-456-7890. We’d love to hear from you!
        </p>
            </div>
          </div>
        
      </section>
      {/** FOOTER SECTION*//*}
      <footer className='footer'>
        <p>Powered by @Blue</p>
        <p>Copyright © 2025</p>
      </footer>
    </div>
    
  );
}

export default Home*/
