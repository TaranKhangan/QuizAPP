import React, {useState, useEffect} from 'react';
import './Home.css';
import BookHeader from '../../assets/Book-Header2.png';
import { Link } from 'react-router-dom';



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
      {/** HOme SECTION */}
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
   {/* ABOUT SECTION */}
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
     {/** SERVICES SECTION */}
      <section id='services' className='section services-section'>
        <div className='content-wrapper'>
          <div className='text-content'>
            <h2>Our Services</h2>
            <p>At Sahash, we offer a range of services designed to enhance your learning experience and promote a culture of kindness. Our platform provides access to a wealth of resources, including educational materials, mentorship programs, and community engagement initiatives.</p>
            <p>We are committed to supporting individuals in their pursuit of knowledge and personal growth.</p>
          </div>
        </div>
      </section>

    {/** CONTACT SECTION */}
      
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
      {/** FOOTER SECTION*/}
      <footer className='footer'>
        <p>Powered by @Blue</p>
        <p>Copyright © 2025</p>
      </footer>
    </div>
    
  );
}

export default Home
