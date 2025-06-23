import React, { useState, useContext } from 'react';
import Fetch from '../Fetch';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const api = new Fetch();

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
      const user = await api.post('/users/signin', form);
      setUser(user);
      if (user.role === 'Admin') {
        navigate('/admin');
      } else if (user.role === 'Secretary') {
        navigate('/queues');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="username" value={form.username} onChange={handleChange} required
        className="w-full px-4 py-2 border rounded" placeholder="Username or Email" />
      <input type="password" name="password" value={form.password} onChange={handleChange} required
        className="w-full px-4 py-2 border rounded" placeholder="Password" />
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign In</button>
    </form>
  );
}


// // SignInForm.jsx
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
//         className="w-full px-4 py-2 border rounded" placeholder="Username" />
//       <input type="password" name="password" value={form.password} onChange={handleChange} required
//         className="w-full px-4 py-2 border rounded" placeholder="Password" />
//       {error && <div className="text-red-500">{error}</div>}
//       <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign In</button>
//     </form>
//   );
// }
