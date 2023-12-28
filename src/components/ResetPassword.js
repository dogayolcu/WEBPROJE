import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match.');
      return;
    }


    const validationErrors = validatePassword(newPassword);
    if (validationErrors.length > 0) {
      setMessage(validationErrors.join(' '));
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/v1/users/reset-password', {
        email,
        verificationCode,
        newPassword
      });
      setMessage('Your password has been reset successfully.');
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
    }
  };

  function validatePassword(password) {
    const errors = [];

    if (password.length < 8 || password.length > 20) {
      errors.push('Password must be between 8 and 20 characters long.');
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    if (!hasUpper) {
      errors.push('Password must contain at least one uppercase letter.');
    }

    if (!hasLower) {
      errors.push('Password must contain at least one lowercase letter.');
    }

    if (!hasDigit) {
      errors.push('Password must contain at least one digit.');
    }

    if (!hasSpecial) {
      errors.push('Password must contain at least one special character.');
    }

    return errors;
  }

  return (
    <div className="container mt-4">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="verificationCode">Verification Code:</label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
