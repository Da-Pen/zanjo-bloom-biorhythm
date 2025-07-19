import React, { useState } from 'react';
import './EmailSignup.css';

const EmailSignupEmailJS = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Initialize EmailJS (add script tag to public/index.html)
      const response = await window.emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID', 
        {
          user_email: email,
          message: `New newsletter signup: ${email}`,
        },
        'YOUR_PUBLIC_KEY'
      );

      if (response.status === 200) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
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

export default EmailSignupEmailJS; 