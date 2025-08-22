import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo.svg';
import './Login.css';
import { DEMO_USER_ID, DEMO_PASSWORD, AUTH_TOKEN_KEY } from '../../utils/constants';

/**
 * Login screen
 * - Renders login form with email and password fields
 * - Validates inputs (email format, min password length)
 * - Verifies against demo credentials and, on success, stores a token and navigates to dashboard
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  /**
   * Handle login submit
   * - Prevents default form submit
   * - Validates email and password
   * - Matches credentials against demo values
   * - On success: persists token in localStorage and redirects to /dashboard
   * - On failure: shows a toast error
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid business email');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setSubmitting(true);
    try {
      // Demo credential check
      if (email === DEMO_USER_ID && password === DEMO_PASSWORD) {
        localStorage.setItem(AUTH_TOKEN_KEY, 'demo-token');
        toast.success('Welcome back!');
        navigate('/dashboard', { replace: true });
      } else {
        toast.error('Invalid credentials. Use the provided demo user and password.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-card">
          <div className="brand">
            <img src={logo} alt="FlowState" className="brand-logo" />
            <span className="brand-name">FlowState</span>
          </div>
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Enter your email below to login to your account.</p>
          <div className="alert alert-info" role="alert">
            Demo credentials — User: <b>{DEMO_USER_ID}</b> | Password: <b>{DEMO_PASSWORD}</b>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <label className="form-label">Business Email Address</label>
            <input
              type="email"
              className="input"
              placeholder="username@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="form-label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="form-row">
              <a href="#" className="link">Forgot your password?</a>
            </div>

            <button type="submit" className="btn-primary" disabled={submitting}>{submitting ? 'Logging in...' : 'Login'}</button>
          </form>
          <div className="signup-text">
            Don’t have an account? <a href="#" className="link">Sign up</a>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Drive Better Decisions with Centralized Performance &amp; Account Intelligence.</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;




