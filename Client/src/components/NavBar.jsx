import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const NavBar = () => {
  const location = useLocation();
  const { user, logout } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!user;

  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    const names = fullName.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Queues', href: '/queues', auth: true },
    { name: 'Statistics', href: '/statistics', roles: ['admin', 'employee'] },
    { name: 'Admin Dashboard', href: '/admin', roles: ['admin'] },
    { name: 'About', href: '/about' },
  ];

  const filteredNavItems = navigationItems.filter(item => {
    if (!item.auth && !item.roles) return true;
    if (item.auth && isAuthenticated) return true;
    if (item.roles && user && item.roles.includes(user.role)) return true;
    return false;
  });

  const renderNavLinks = (isMobile = false) => (
    filteredNavItems.map(item => {
      const isActive = location.pathname === item.href;
      return (
        <Link
          key={item.name}
          to={item.href}
          className={`nav-link ${isActive ? 'active' : ''} ${isMobile ? 'mobile' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {item.name}
        </Link>
      );
    })
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏋️</span>
          <span className="logo-text">FitQueue</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links desktop">
          {renderNavLinks()}
        </div>

        {/* User Actions */}
        <div className="navbar-user">
          {isAuthenticated ? (
            <div className="user-dropdown">
              <button className="avatar-button">
                <div className="avatar-fallback">
                  {getInitials(user.full_name)}
                </div>
              </button>
              <div className="dropdown-menu">
                <p className="user-name">{user.full_name}</p>
                <p className="user-role">{user.role}</p>
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <Link to="/settings" className="dropdown-item">Settings</Link>
                <button onClick={logout} className="dropdown-item">Logout</button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons desktop">
              <Link to="/signin" className="btn login">Login</Link>
              <Link to="/signup" className="btn signup">Sign Up</Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="navbar-links mobile">
            {renderNavLinks(true)}
          </div>
          {!isAuthenticated && (
            <div className="auth-buttons mobile">
              <Link to="/signin" className="btn login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="btn signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
