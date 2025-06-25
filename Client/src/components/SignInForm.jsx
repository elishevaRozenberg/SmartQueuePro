import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function SignInForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include', // חשוב מאוד – מאפשר שליחת session cookie!
    });

    if (!response.ok) {
      let message = 'Sign in failed';
      try {
        const errData = await response.json(); // ננסה לקרוא את ה־JSON
        if (errData?.message) message = errData.message; // אם יש הודעת שגיאה נשתמש בה
      } catch (_) {
        // אם התגובה לא הייתה JSON – לא נעשה כלום
      }
      throw new Error(message);
    }

    const user = await response.json(); // זה בטוח JSON תקף
    setUser(user);
    navigate(user.role === 'Admin' ? '/admin' : user.role === 'Secretary' ? '/queues' : '/');
  } catch (err) {
    setError(err.message || 'Unexpected error');
  }
};



  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <h2 className="mb-3 text-center">Sign In</h2>
      <input
        className="form-control mb-2"
        name="username"
        placeholder="Username or Email"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        className="form-control mb-3"
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      {error && <div className="text-danger mb-2">{error}</div>}
      <button type="submit" className="btn btn-primary w-100">Sign In</button>
    </form>
  );
}
