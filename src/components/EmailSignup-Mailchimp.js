import React, { useState } from 'react';
import './EmailSignup.css';

const EmailSignupMailchimp = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mailchimp embedded form submission
    const form = document.createElement('form');
    form.action = 'https://YOUR_MAILCHIMP_URL.mailchimp.com/subscribe/post?u=YOUR_USER_ID&amp;id=YOUR_LIST_ID';
    form.method = 'post';
    form.target = '_blank';
    
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'EMAIL';
    emailInput.value = email;
    
    form.appendChild(emailInput);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    setEmail('');
    alert('Thanks for subscribing! Check your email to confirm.');
  };

  return (
    <div className="email-signup">
      <div className="signup-content">
        <h3>Stay Connected</h3>
        <p>Get updates on new releases and shows</p>
        
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

export default EmailSignupMailchimp; 