// import { createContext, useState } from 'react';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//     const logout = () => setUser(null);
//   return (
//     <UserContext.Provider value={{ user, setUser , logout}}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// UserContext.js
import { createContext, useState, useEffect } from 'react';



export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUserState(JSON.parse(savedUser));
    }
  }, []);

  const setUser = (userData) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserContext = createContext();