import React from 'react';
import userPic from '../../assets/user-icon.jpg';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Dashboard component for admin interface with announcements, management panels, and feedback/issues
const Dashboard = () => {
  // Hook for navigation (for future use, e.g., management panel actions)
  const navigate = useNavigate();

  // Placeholder data for announcements
  const announcements = [
    { id: 1, title: 'New Quiz Added', content: 'A new science quiz has been added to the platform.', date: '2025-07-15' },
    { id: 2, title: 'System Maintenance', content: 'Scheduled maintenance on July 20, 2025, from 2 AM to 4 AM.', date: '2025-07-14' },
    { id: 3, title: 'User Feedback Update', content: 'New feedback form features deployed.', date: '2025-07-13' },
    /*{ id: 4, title: 'New Feature Release', content: 'We have released a new feature for tracking user progress.', date: '2025-07-12' },
    { id: 5, title: 'Upcoming Webinar', content: 'Join our webinar on educational technology on July 25, 2025.', date: '2025-07-11' },*/
     //just to check that the scroll works 
  ];

  // Placeholder data for feedback
  const feedbacks = [
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Great platform, but needs more quizzes.', date: '2025-07-14' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Loved the science literacy program!', date: '2025-07-13' },
    
    { id: 3, name: 'Alex Brown', email: 'alex@example.com', message: 'Please add more interactive features.', date: '2025-07-12' },
    
  ];

  // Placeholder data for issues
  const issues = [
    { id: 1, title: 'Login Error', description: 'Some users reported issues with login.', status: 'Open', date: '2025-07-15' },
    { id: 2, title: 'Quiz Loading', description: 'Quiz page loads slowly on mobile.', status: 'In Progress', date: '2025-07-14' },
  ];

  // Placeholder data for management panels (color  handled in CSS)
  const managementPanels = [
    { id: 1, title: 'Manage Users', description: 'View and manage user accounts and permissions.' },
    { id: 2, title: 'Manage Tests', description: 'Create, edit, or delete quizzes and tests.' },
    { id: 3, title: 'Certificates & Reports', description: 'Issue certificates and generate reports.' },
    { id: 4, title: 'Manage Notifications', description: 'Send and manage system notifications.' },
  ];

  // Handle button clicks for management panels (placeholder for navigation)
  const handleActionClick = (title) => {
    console.log(`${title} clicked!`);
    if(title === 'Manage Tests'){
      navigate('/test-details');
    }
    // Future: Add more  navigation, e.g., navigate('/manage-users')
  };

  return (
    <main role="main" className="dashboard-main">
      {/* Main content container with three-column layout */}
      <div className="dashboard-content">
        {/* Left Section: Announcements */}
        <section className="announcements-section" aria-labelledby="announcements-heading">
          <h2 id="announcements-heading">Announcements</h2>
          <div className="announcements-list">
            <div className='announce-scroll'>
            {announcements.map((announcement) => (
              <article key={announcement.id} className="announcement-card">
                <h3>{announcement.title}</h3>
                <p>{announcement.content}</p>
                <span className="announcement-date">{announcement.date}</span>
              </article>
            ))}
            </div>
          </div>
        </section>

        {/* Middle Section: Welcome Admin + Management Panels */}
        <section className="middle-section">
          {/* Welcome Admin Container */}
          <div className="welcome-container">
            <div className='welcome-text'>
            <h1>Welcome Admin</h1>
            <p className="cheerful-line">Hope you're having a fantastic day of impact and innovation! 🚀</p>
          </div>
          <div className='admin-avatar'>
            <img src={userPic} alt='Admin-Avatar'/>
          </div>
          </div>
          {/* Management Panels */}
          <div className="management-grid">
            {managementPanels.map((panel, index) => (
              <article
                key={panel.id}
                className={`management-card management-card-${index + 1}`}
                onClick={() => handleActionClick(panel.title)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleActionClick(panel.title);
                   }
                }}>
            <h3>{panel.title}</h3>
            <p>{panel.description}</p>
            </article>

            ))}
          </div>
        </section>

        {/* Right Section: Feedback & Technical Issues */}
        <section className="feedback-issues-section" aria-labelledby="feedback-issues-heading">
          
          <div className="feedback-issues-container">
            {/* Feedback Subsection */}
            <div className="feedback-section-d">
              <h3>User Feedback</h3>
              <div className="feedback-scroll">
                {feedbacks.map((feedback) => (
                  <article key={feedback.id} className="feedback-card">
                    <h4>{feedback.name}</h4>
                    <p><strong>Email:</strong> {feedback.email}</p>
                    <p>{feedback.message}</p>
                    <span className="feedback-date">{feedback.date}</span>
                  </article>
                ))}
              </div>
            </div>
            <hr></hr>
            {/* Issues Subsection */}
            <div className="issues-section">
              <h3>Technical Issues</h3>
              <div className="feedback-scroll">
                {issues.map((issue) => (
                  <article key={issue.id} className="issue-card">
                   <h4>{issue.title}</h4>
                   <p>{issue.description}</p>
                   <p><strong>Status:</strong> {issue.status}</p>
                   <span className="issue-date">{issue.date}</span>
                  </article>
                ))}
            </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;