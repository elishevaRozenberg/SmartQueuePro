import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Phone, Mail, Clock } from 'lucide-react';
//import { createPageUrl } from '@/utils';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">

          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-brand">
              <div className="footer-logo-icon">
                <Dumbbell className="footer-icon" />
              </div>
              <span className="footer-logo-text">FitQueue</span>
            </div>
            <p className="footer-description">
              Modern queue management for your fitness journey.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              {/* <Link to={createPageUrl('Queues')} className="footer-link">Queue Status</Link>
              <Link to={createPageUrl('About')} className="footer-link">About Us</Link>
              <Link to={createPageUrl('Login')} className="footer-link">Member Login</Link> */}
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact</h3>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <MapPin className="footer-icon" />
                <span>123 Fitness Ave, Gym City</span>
              </div>
              <div className="footer-contact-item">
                <Phone className="footer-icon" />
                <span>(555) 123-4567</span>
              </div>
              <div className="footer-contact-item">
                <Mail className="footer-icon" />
                <span>info@fitqueue.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="footer-section">
            <h3 className="footer-heading">Hours</h3>
            <div className="footer-hours">
              <div className="footer-hours-item">
                <Clock className="footer-icon" />
                <span>San - Fri: 5:00 AM - 11:00 PM</span>
              </div>
              <div className="footer-hours-item indent">
                <span>Sat: 20:00 PM - 23:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2025 FitQueue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
