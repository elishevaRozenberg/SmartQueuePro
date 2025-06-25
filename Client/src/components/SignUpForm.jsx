// import React, { useState, useContext } from 'react';
// import Fetch from '../Fetch';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';

// const api = new Fetch();

// export default function SignUpForm() {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     full_name: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { setUser } = useContext(UserContext);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) {
//       return setError("Passwords don't match.");
//     }

//     try {
//       const { confirmPassword, ...dataToSend } = form;
//       // const user = await api.post('/api/users/signup', dataToSend);
//       const response = await fetch('/api/users/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(dataToSend)
//       });
//       const user = await response.json();
//       setUser(user);
//       navigate('/');
//       console.log('Successfully signed up:', user);
//     } catch (err) {
//       setError('Error signing up', err.message);
//       console.error('Error signing up', err);
//     }
//   };
//   //   try {
//   //     const response = await fetch('users/signup', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify(form)
//   //     });
//   //     const data = await response.json();
//   //     console.log('Successfully signed up:', data);
//   //   } catch (err) {
//   //     console.error('Error signing up', err);
//   //   }
//   // };


//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input name="username" value={form.username} onChange={handleChange} required
//         className="w-full px-4 py-2 border rounded" placeholder="Username" />
//       <input name="email" value={form.email} onChange={handleChange} required type="email"
//         className="w-full px-4 py-2 border rounded" placeholder="Email" />
//       <input name="full_name" value={form.full_name} onChange={handleChange} required
//         className="w-full px-4 py-2 border rounded" placeholder="Full Name" />
//       <input type="password" name="password" value={form.password} onChange={handleChange} required
//         className="w-full px-4 py-2 border rounded" placeholder="Password" />
//       <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required
//         className="w-full px-4 py-2 border rounded" placeholder="Confirm Password" />
//       {error && <div className="text-red-500">{error}</div>}
//       <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Sign Up</button>
//     </form>
//   );
// }




// // // SignUpForm.jsx
// // import React, { useState } from 'react';
// // // import './AuthForms.css';

// // const SignUpForm = () => {
// //   const [formData, setFormData] = useState({ userName: '', email: '', password: '' });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await fetch('users/signup', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData)
// //       });
// //       const data = await response.json();
// //       console.log('Successfully signed up:', data);
// //     } catch (err) {
// //       console.error('Error signing up', err);
// //     }
// //   };

// //   return (
// //     <form className="auth-form-content" onSubmit={handleSubmit}>
// //       <h2>Sign Up</h2>
// //       <input type="text" name="userName" placeholder="Username" onChange={handleChange} required />
// //       <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
// //       <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
// //       <button type="submit">Sign Up</button>
// //     </form>
// //   );
// // };

// // export default SignUpForm;

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
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Signup failed');
      }

      const result = await response.json();

      if (result.token) {
        localStorage.setItem('token', result.token);

        const meResponse = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${result.token}` }
        });
        const userData = await meResponse.json();
        setUser(userData);
        navigate('/');
      } else {
        setError('Signup succeeded but no token returned');
      }
    } catch (err) {
      setError(`Error signing up: ${err.message}`);
      console.error('Error signing up', err);
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
