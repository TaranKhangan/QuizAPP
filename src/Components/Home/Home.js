import React, {useState, useEffect} from 'react';
import './Home.css';
import BookHeader from '../../assets/Book-Header2.png';
import { Link } from 'react-router-dom';



const Home = ({onLoginClick}) => {
  const [showButtons, setShowButtons] = useState(window.innerWidth<=789);
 
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
  return (
    <div className='container'>
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
    </div>
  );
}

export default Home
