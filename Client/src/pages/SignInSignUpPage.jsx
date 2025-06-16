// SignInSignUpPage.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const SignInSignUpPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    full_name: '',
  });
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ username: '', password: '', email: '', confirmPassword: '', full_name: '' });
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          return setError("Passwords don't match");
        }

        const res = await axios.post('http://localhost:3000/users', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
        });

        setUser(res.data);
        navigate('/home');
      } else {
        const res = await axios.post('http://localhost:3000/signin', {
          username: formData.username,
          password: formData.password,
        });

        setUser(res.data);
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full p-2 border rounded"
          />
          {isSignUp && (
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-2 border rounded"
            />
          )}
          {isSignUp && (
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              required
              className="w-full p-2 border rounded"
            />
          )}
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            required
            className="w-full p-2 border rounded"
          />
          {isSignUp && (
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              type="password"
              required
              className="w-full p-2 border rounded"
            />
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {isSignUp ? 'Register' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button className="text-blue-600 hover:underline" onClick={toggleMode}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUpPage;
