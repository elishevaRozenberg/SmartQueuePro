import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignInSignUpPage from './pages/SignInSignUpPage';
// import AdminDashboardPage from './pages/AdminDashboardPage';
// import QueuePage from './pages/QueuePage';
// import QueueDetailsPage from './pages/QueueDetailsPage';
// import StatisticsPage from './pages/StatisticsPage';
// import UserProfilePage from './pages/UserProfilePage';
// import SettingsPage from './pages/SettingsPage';
import About from './pages/About';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <NavBar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInSignUpPage />} />
          {/* <Route path="/admin" element={<AdminDashboardPage />} /> */}
          {/* <Route path="/queues" element={<QueuePage />} /> */}
          {/* <Route path="/queues/:id" element={<QueueDetailsPage />} /> */}
          {/* <Route path="/statistics" element={<StatisticsPage />} /> */}
          {/* <Route path="/profile" element={<UserProfilePage />} /> */}
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