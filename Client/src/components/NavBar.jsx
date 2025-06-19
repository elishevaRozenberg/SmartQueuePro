import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import UserAvatar from './UserAvatar';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST', credentials: 'include' });
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left - Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        FitQueue
      </Link>

      {/* Center - Links */}
      <div className="space-x-6 hidden md:flex">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
        <Link to="/queues" className="text-gray-700 hover:text-blue-600">Queues</Link>
        <Link to="/statistics" className="text-gray-700 hover:text-blue-600">Statistics</Link>
        {user?.role === 'Admin' && (
          <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin Dashboard</Link>
        )}
      </div>

      {/* Right - Profile/Login */}
      <div className="relative">
        {user ? (
          <div className="group relative inline-block">
            <div className="cursor-pointer">
              <UserAvatar fullName={user.full_name} imageUrl={user.imageUrl} size={40} />
            </div>
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Log Out</button>
            </div>
          </div>
        ) : (
          <Link to="/signin" className="text-blue-600 hover:underline font-medium">Sign In / Sign Up</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
