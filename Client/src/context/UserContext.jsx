// // // UserContext.js
// // import { createContext, useState, useEffect } from 'react';



// // export const UserProvider = ({ children }) => {
// //   const [user, setUserState] = useState(null);

// //   useEffect(() => {
// //     const savedUser = localStorage.getItem('user');
// //     if (savedUser) {
// //       setUserState(JSON.parse(savedUser));
// //     }
// //   }, []);

// //   const setUser = (userData) => {
// //     setUserState(userData);
// //     if (userData) {
// //       localStorage.setItem('user', JSON.stringify(userData));
// //     } else {
// //       localStorage.removeItem('user');
// //     }
// //   };

// //   const logout = () => {
// //     setUser(null);
// //   };

// //   return (
// //     <UserContext.Provider value={{ user, setUser, logout }}>
// //       {children}
// //     </UserContext.Provider>
// //   );
// // };

// // export const UserContext = createContext();

// import React, { createContext, useState, useEffect } from 'react';
// import Fetch from '../Fetch';

// export const UserContext = createContext(null);

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const api = new Fetch();

//   // בעת טעינת האפליקציה – אם יש טוקן שמור, נשלוף את פרטי המשתמש
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       api.get('/auth/me')
//         .then(data => setUser(data))
//         .catch(err => console.error('Failed to fetch user info:', err));
//     }
//   }, []);

//   // פונקציית התחברות – שליחת בקשת login, שמירת הטוקן וטעינת פרטי המשתמש
//   const login = async (username, password) => {
//     const data = await api.post('/auth/login', { username, password });
//     if (data.token) {
//       localStorage.setItem('token', data.token);
//       const userData = await api.get('/auth/me');
//       setUser(userData);
//     }
//   };

//   // פונקציית הרשמה – שליחת בקשת register ולאחריה התחברות אוטומטית
//   const register = async (username, password) => {
//     await api.post('/auth/register', { username, password });
//     // לאחר הרשמה מוצלחת, נתחבר אוטומטית עם אותם פרטים
//     await login(username, password);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

import React, { createContext, useState, useEffect } from 'react';
import Fetch from '../Fetch';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const api = new Fetch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then(data => setUser(data))
        .catch(err => {
          console.error('Failed to fetch user info:', err);
          setUser(null);
        });
    }
  }, []);

  const login = async (username, password) => {
    const data = await api.post('/auth/login', { username, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
      const userData = await api.get('/auth/me');
      setUser(userData);
    }
  };

  const register = async (formData) => {
    const data = await api.post('/auth/register', formData);
    if (data.token) {
      localStorage.setItem('token', data.token);
      const userData = await api.get('/auth/me');
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}
