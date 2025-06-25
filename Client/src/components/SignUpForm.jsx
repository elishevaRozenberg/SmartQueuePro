import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function SignUpForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    full_name: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (form.password !== form.confirmPassword) {
    return setError("Passwords don't match.");
  }

  try {
    const { confirmPassword, ...dataToSend } = form;

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // חשוב: מאפשר שמירת סשן בין דפדפן לשרת
      body: JSON.stringify(dataToSend)
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || 'Signup failed');
    }

    const userData = await response.json();

    setUser(userData);    // שמירת המשתמש בקונטקסט
    navigate('/');        // מעבר לדף הבית או עמוד אחר
  } catch (err) {
    setError(`Signup error: ${err.message}`);
    console.error('Signup error:', err);
  }
};

  

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-sm">
        <h2 className="text-center mb-4">Sign Up</h2>

        <div className="mb-3">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Username"
          />
        </div>
        <div className="mb-3">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Full Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Confirm Password"
          />
        </div>

        {error && <div className="text-danger mb-3">{error}</div>}

        <button type="submit" className="btn btn-success w-100 py-2">
          Sign Up
        </button>
      </form>
    </div>
  );
}
