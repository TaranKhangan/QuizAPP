/*import React from 'react';

import './Dashboard.css';

const Announcements = () => {
  // Placeholder data for announcements
  const announcements = [
    { id: 1, title: 'New Quiz Added', content: 'A new science quiz has been added to the platform.', date: '2025-07-15' },
    { id: 2, title: 'System Maintenance', content: 'Scheduled maintenance on July 20, 2025, from 2 AM to 4 AM.', date: '2025-07-14' },
    { id: 3, title: 'User Feedback Update', content: 'New feedback form features deployed.', date: '2025-07-13' },
  ];

  return (
    <section id="announcements" aria-labelledby="announcements-heading" className="announcements-section">
      <div className="container">
        <h2 id="announcements-heading">Announcements</h2>
        <div className="announcements-list">
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
  );
};

const FeedbackAndIssues = () => {
  // Placeholder data for feedback and issues
  const feedbacks = [
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Great platform, but needs more quizzes.', date: '2025-07-14' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Loved the science literacy program!', date: '2025-07-13' },
  ];
  const issues = [
    { id: 1, title: 'Login Error', description: 'Some users reported issues with login.', status: 'Open', date: '2025-07-15' },
    { id: 2, title: 'Quiz Loading', description: 'Quiz page loads slowly on mobile.', status: 'In Progress', date: '2025-07-14' },
  ];

  return (
    <section id="feedback-issues" aria-labelledby="feedback-issues-heading" className="feedback-issues-section">
      <div className="container">
        <h2 id="feedback-issues-heading">Feedback & Technical Issues</h2>
        <div className="feedback-issues-container">
          <div className="feedback-section">
            <h3>User Feedback</h3>
            {feedbacks.map((feedback) => (
              <article key={feedback.id} className="feedback-card">
                <h4>{feedback.name}</h4>
                <p><strong>Email:</strong> {feedback.email}</p>
                <p>{feedback.message}</p>
                <span className="feedback-date">{feedback.date}</span>
              </article>
            ))}
          </div>
          <div className="issues-section">
            <h3>Technical Issues</h3>
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
  );
};

const ManagementPanels = () => {
  const panels = [
    { id: 1, title: 'Manage Users', description: 'View and manage user accounts and permissions.', action: 'Go to Users' },
    { id: 2, title: 'Manage Tests', description: 'Create, edit, or delete quizzes and tests.', action: 'Go to Tests' },
    { id: 3, title: 'Certificates & Reports', description: 'Issue certificates and generate reports.', action: 'Go to Reports' },
    { id: 4, title: 'Manage Notifications', description: 'Send and manage system notifications.', action: 'Go to Notifications' },
  ];

  const handleActionClick = (title) => {
    console.log(`${title} clicked!`);
    // Add navigation or logic here (e.g., navigate to respective management page)
  };

  return (
    <section id="management" aria-labelledby="management-heading" className="management-section">
      <div className="container">
        <h2 id="management-heading">Management Panels</h2>
        <div className="management-grid">
          {panels.map((panel) => (
            <article key={panel.id} className="management-card">
              <h3>{panel.title}</h3>
              <p>{panel.description}</p>
              <button className="btn-primary" onClick={() => handleActionClick(panel.title)}>
                {panel.action}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer role="contentinfo">
    <div className="container">
      <p>
        © SAHASH 2025 | Privacy Policy | Refund/Cancellation Policy |{' '}
        +91 9473795690 |{' '}
        <a href="mailto:info@sahashindia.org" rel="noopener">info@sahashindia.org</a>
      </p>
    </div>
  </footer>
);
/*const Dashboard = ({ onLoginClick, onHomeClick }) => {
  return (
    <main role="main" className="dashboard-main">
      <Navbar
        onLoginClick={onLoginClick}
        onHomeClick={onHomeClick}
        isAdmin={true} // Pass prop to indicate admin mode
      />
      <div className="dashboard-content">
        <Announcements />
        <ManagementPanels />
        <FeedbackAndIssues />
      </div>
      <Footer />
    </main>
  );
};

export default Dashboard;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'; // Add Navbar import
import Footer from '../Home/Footer'; // Correct Footer import
import './Dashboard.css';
import '../App.css'; // Include App.css for shared styles

const Announcements = () => {
  const announcements = [
    { id: 1, title: 'New Quiz Added', content: 'A new science quiz has been added to the platform.', date: '2025-07-15' },
    { id: 2, title: 'System Maintenance', content: 'Scheduled maintenance on July 20, 2025, from 2 AM to 4 AM.', date: '2025-07-14' },
    { id: 3, title: 'User Feedback Update', content: 'New feedback form features deployed.', date: '2025-07-13' },
  ];

  return (
    <section id="announcements" aria-labelledby="announcements-heading" className="announcements-section">
      <div className="container">
        <h2 id="announcements-heading">Announcements</h2>
        <div className="announcements-list">
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
  );
};

const FeedbackAndIssues = () => {
  const feedbacks = [
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Great platform, but needs more quizzes.', date: '2025-07-14' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Loved the science literacy program!', date: '2025-07-13' },
  ];
  const issues = [
    { id: 1, title: 'Login Error', description: 'Some users reported issues with login.', status: 'Open', date: '2025-07-15' },
    { id: 2, title: 'Quiz Loading', description: 'Quiz page loads slowly on mobile.', status: 'In Progress', date: '2025-07-14' },
  ];

  return (
    <section id="feedback-issues" aria-labelledby="feedback-issues-heading" className="feedback-issues-section">
      <div className="container">
        <h2 id="feedback-issues-heading">Feedback & Technical Issues</h2>
        <div className="feedback-issues-container">
          <div className="feedback-section">
            <h3>User Feedback</h3>
            {feedbacks.map((feedback) => (
              <article key={feedback.id} className="feedback-card">
                <h4>{feedback.name}</h4>
                <p><strong>Email:</strong> {feedback.email}</p>
                <p>{feedback.message}</p>
                <span className="feedback-date">{feedback.date}</span>
              </article>
            ))}
          </div>
          <div className="issues-section">
            <h3>Technical Issues</h3>
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
  );
};

const ManagementPanels = () => {
  const panels = [
    { id: 1, title: 'Manage Users', description: 'View and manage user accounts and permissions.', action: 'Go to Users' },
    { id: 2, title: 'Manage Tests', description: 'Create, edit, or delete quizzes and tests.', action: 'Go to Tests' },
    { id: 3, title: 'Certificates & Reports', description: 'Issue certificates and generate reports.', action: 'Go to Reports' },
    { id: 4, title: 'Manage Notifications', description: 'Send and manage system notifications.', action: 'Go to Notifications' },
  ];

  const handleActionClick = (title) => {
    console.log(`${title} clicked!`);
  };

  return (
    <section id="management" aria-labelledby="management-heading" className="management-section">
      <div className="container">
        <h2 id="management-heading">Management Panels</h2>
        <div className="management-grid">
          {panels.map((panel) => (
            <article key={panel.id} className="management-card">
              <h3>{panel.title}</h3>
              <p>{panel.description}</p>
              <button className="btn-primary" onClick={() => handleActionClick(panel.title)}>
                {panel.action}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Dashboard = ({ onLoginClick, onHomeClick }) => {
  const navigate = useNavigate();

  // Define handlers for Navbar props
  const handleLoginClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
    if (onLoginClick) onLoginClick(); // Call prop if provided
  };

  const handleHomeClick = () => {
    navigate('/');
    if (onHomeClick) onHomeClick(); // Call prop if provided
  };

  return (
    <main role="main" className="dashboard-main">
      <Navbar
        onLoginClick={handleLoginClick}
        onHomeClick={handleHomeClick}
        isAdmin={true} // Pass prop to indicate admin mode
      />
      <div className="dashboard-content">
        <Announcements />
        <ManagementPanels />
        <FeedbackAndIssues />
      </div>
      <Footer />
    </main>
  );
};

export default Dashboard;*/