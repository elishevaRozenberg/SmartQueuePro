// import React, { useState, useContext } from 'react';
// import Fetch from '../Fetch';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';

// const api = new Fetch();

// export default function SignInForm() {
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { setUser } = useContext(UserContext);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await api.post('/users/signin', form);
//       setUser(user);
//       if (user.role === 'Admin') {
//         navigate('/admin');
//       } else if (user.role === 'Secretary') {
//         navigate('/queues');
//       } else {
//         navigate('/');
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input name="username" value={form.username} onChange={handleChange} required
//         className="w-full px-4 py-2 border rounded" placeholder="Username or Email" />
//       <input type="password" name="password" value={form.password} onChange={handleChange} required
//         className="w-full px-4 py-2 border rounded" placeholder="Password" />
//       {error && <div className="text-red-500">{error}</div>}
//       <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign In</button>
//     </form>
//   );
// }


// SignInForm.jsx
import React, { useState } from 'react';
// import './AuthForms.css';

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: username, password })
      });
      const data = await response.json();
      console.log('Successfully signed in:', data);
    } catch (err) {
      console.error('Error signing in', err);
    }
  };

  return (
    <form className="auth-form-content" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
