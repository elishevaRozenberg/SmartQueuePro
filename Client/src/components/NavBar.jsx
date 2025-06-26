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
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm w-100">
  <div className="container-fluid w-100">
    {/* Left - Logo */}
    <Link to="/" className="navbar-brand text-primary font-weight-bold">
      FitQueue
    </Link>

    {/* Toggle Button for Mobile */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Center - Links */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-secondary hover:text-primary">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link text-secondary hover:text-primary">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/queues" className="nav-link text-secondary hover:text-primary">Queues</Link>
        </li>
        <li className="nav-item">
          <Link to="/statistics" className="nav-link text-secondary hover:text-primary">Statistics</Link>
        </li>
        {user?.role === 'Admin' && (
          <li className="nav-item">
            <Link to="/admin" className="nav-link text-secondary hover:text-primary">Admin Dashboard</Link>
          </li>
        )}
      </ul>
    </div>

    {/* Right - Profile/Login */}
    <div className="d-flex">
      {user ? (
        <div className="dropdown">
          <button className="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <UserAvatar fullName={user.full_name} imageUrl={user.imageUrl} size={40} />
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
            <li>
              <Link to="/profile" className="dropdown-item">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="dropdown-item">Log Out</button>
            </li>
          </ul>
        </div>
      ) : (
        <Link to="/signin" className="btn btn-link text-primary">Sign In / Sign Up</Link>
      )}
    </div>
  </div>
</nav>

  );
};

export default NavBar;
