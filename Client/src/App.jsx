
// Root App.jsx
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import About from './pages/About';
import AdminDashboardPage from './pages/AdminDashboardPage';
import HomePage from './pages/HomePage';
import QueuePage from './pages/QueuePage';
import QueueDetailsPage from './pages/QueueDetailsPage';
import SettingsPage from './pages/SettingsPage';
import SignInSignUpPage from './pages/SignInSignUpPage';
import StatisticsPage from './pages/StatisticsPage';
import UserProfilePage from './pages/UserProfilePage';
import UserManagement from './pages/UserManagement';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(UserContext);
  if (!user) return <Navigate to="/signin" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/queues" element={<QueuePage />} />
          <Route path="/queues/:id" element={<QueueDetailsPage />} />
          <Route path="/signin" element={<SignInSignUpPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/login" element={<Navigate to="/signin" replace />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
