import React, { useState } from 'react';
import './EmailSignup.css';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Google Forms submission - replace YOUR_GOOGLE_FORM_ID with your actual form ID
      const formData = new FormData();
      formData.append('entry.YOUR_ENTRY_ID', email); // Replace with your form's entry ID
      
      const response = await fetch('https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/formResponse', {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Important for Google Forms
      });

      // Google Forms with no-cors always appears successful
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="email-signup">
      <div className="signup-content">
        <h3>Stay Connected</h3>
        <p>Get updates on new releases and shows</p>
        
        {status === 'success' && (
          <div className="success-message">
            Thanks for signing up! ✨
          </div>
        )}
        
        {status === 'error' && (
          <div className="error-message">
            Something went wrong. Please try again.
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="email-input"
            />
            <button type="submit" className="signup-btn">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailSignup; 