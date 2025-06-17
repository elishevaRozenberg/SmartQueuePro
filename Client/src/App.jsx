
 import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignInSignUpPage from './pages/SignInSignUpPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
 import QueuePage from './pages/QueuePage';
 import QueueDetailsPage from './pages/QueueDetailsPage';
import StatisticsPage from './pages/StatisticsPage';
import UserProfilePage from './pages/UserProfilePage';
// import SettingsPage from './pages/SettingsPage';
import About from './pages/About';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <NavBar />
      מפ
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInSignUpPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} /> 
          <Route path="/queues" element={<QueuePage />} /> 
           <Route path="/queues/:id" element={<QueueDetailsPage />} /> 
          <Route path="/statistics" element={<StatisticsPage />} /> 
          <Route path="/profile" element={<UserProfilePage />} />
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
          <Route path="/about" element={<About />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;

// import React, { useContext } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import Footer from './components/Footer';
// import HomePage from './pages/HomePage';
// import SignInSignUpPage from './pages/SignInSignUpPage';
// import About from './pages/About';
// import './App.css';
// import { UserContext } from './context/UserContext';

// const App = () => {
//   const { user } = useContext(UserContext);

//   return (
//     <div className="app-container">
//       {user && <NavBar />}

//       <main className="main-content">
//         <Routes>
//           <Route
//             path="/"
//             element={user ? <HomePage /> : <Navigate to="/signin" />}
//           />
//           <Route
//             path="/signin"
//             element={!user ? <SignInSignUpPage /> : <Navigate to="/" />}
//           />
//           <Route
//             path="/about"
//             element={user ? <About /> : <Navigate to="/signin" />}
//           />
//           {/* הוספת הגנה על עמודים אחרים בעתיד */}
//         </Routes>
//       </main>

//       {user && <Footer />}
//     </div>
//   );
// };

// export default App;
