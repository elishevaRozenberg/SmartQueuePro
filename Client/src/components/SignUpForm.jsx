import React, { useState, useContext } from 'react';
import Fetch from '../Fetch';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const api = new Fetch();

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
      const user = await api.post('/users/signup', dataToSend);
      setUser(user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="username" value={form.username} onChange={handleChange} required
        className="w-full px-4 py-2 border rounded" placeholder="Username" />
      <input name="email" value={form.email} onChange={handleChange} required type="email"
        className="w-full px-4 py-2 border rounded" placeholder="Email" />
      <input name="full_name" value={form.full_name} onChange={handleChange} required
        className="w-full px-4 py-2 border rounded" placeholder="Full Name" />
      <input type="password" name="password" value={form.password} onChange={handleChange} required
        className="w-full px-4 py-2 border rounded" placeholder="Password" />
      <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required
        className="w-full px-4 py-2 border rounded" placeholder="Confirm Password" />
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Sign Up</button>
    </form>
  );
}
