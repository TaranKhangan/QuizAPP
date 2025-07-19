import React from 'react';
//import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Dashboard component for admin interface with announcements, management panels, and feedback/issues
const Dashboard = () => {
  // Hook for navigation (for future use, e.g., management panel actions)
  //const navigate = useNavigate();

  // Placeholder data for announcements
  const announcements = [
    { id: 1, title: 'New Quiz Added', content: 'A new science quiz has been added to the platform.', date: '2025-07-15' },
    { id: 2, title: 'System Maintenance', content: 'Scheduled maintenance on July 20, 2025, from 2 AM to 4 AM.', date: '2025-07-14' },
    { id: 3, title: 'User Feedback Update', content: 'New feedback form features deployed.', date: '2025-07-13' },
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

  // Placeholder data for management panels (color removed, handled in CSS)
  const managementPanels = [
    { id: 1, title: 'Manage Users', description: 'View and manage user accounts and permissions.', action: 'Go to Users' },
    { id: 2, title: 'Manage Tests', description: 'Create, edit, or delete quizzes and tests.', action: 'Go to Tests' },
    { id: 3, title: 'Certificates & Reports', description: 'Issue certificates and generate reports.', action: 'Go to Reports' },
    { id: 4, title: 'Manage Notifications', description: 'Send and manage system notifications.', action: 'Go to Notifications' },
  ];

  // Handle button clicks for management panels (placeholder for navigation)
  const handleActionClick = (title) => {
    console.log(`${title} clicked!`);
    // Future: Add navigation, e.g., navigate('/manage-users')
  };

  return (
    <main role="main" className="dashboard-main">
      {/* Main content container with three-column layout */}
      <div className="dashboard-content">
        {/* Left Section: Announcements */}
        <section className="announcements-section" aria-labelledby="announcements-heading">
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
        </section>

        {/* Middle Section: Welcome Admin + Management Panels */}
        <section className="middle-section" aria-labelledby="middle-heading">
          <h2 id="middle-heading" className="visually-hidden">Admin Controls</h2>
          {/* Welcome Admin Container */}
          <div className="welcome-container">
            <h1>Welcome Admin</h1>
          </div>
          {/* Management Panels */}
          <div className="management-grid">
            {managementPanels.map((panel, index) => (
              <article
                key={panel.id}
                className={`management-card management-card-${index + 1}`} // Unique class for each card
              >
                <h3>{panel.title}</h3>
                <p>{panel.description}</p>
                <button className="btn-primary" onClick={() => handleActionClick(panel.title)}>
                  {panel.action}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Right Section: Feedback & Technical Issues */}
        <section className="feedback-issues-section" aria-labelledby="feedback-issues-heading">
          <h2 id="feedback-issues-heading" className="visually-hidden">Feedback & Technical Issues</h2>
          <div className="feedback-issues-container">
            {/* Feedback Subsection */}
            <div className="feedback-section">
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
            {/* Issues Subsection */}
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
        </section>
      </div>
    </main>
  );
};

export default Dashboard;