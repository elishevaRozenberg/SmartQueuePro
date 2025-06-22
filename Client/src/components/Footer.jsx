// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Dumbbell, MapPin, Phone, Mail, Clock } from 'lucide-react';
// //import { createPageUrl } from '@/utils';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-grid">

//           {/* Brand Section */}
//           <div className="footer-section">
//             <div className="footer-brand">
//               <div className="footer-logo-icon">
//                 <Dumbbell className="footer-icon" />
//               </div>
//               <span className="footer-logo-text">FitQueue</span>
//             </div>
//             <p className="footer-description">
//               Modern queue management for your fitness journey.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="footer-section">
//             <h3 className="footer-heading">Quick Links</h3>
//             <div className="footer-links">
//               <Link to="/" className="footer-link">Home</Link>
//               {/* <Link to={createPageUrl('Queues')} className="footer-link">Queue Status</Link>
//               <Link to={createPageUrl('About')} className="footer-link">About Us</Link>
//               <Link to={createPageUrl('Login')} className="footer-link">Member Login</Link> */}
//             </div>
//           </div>

//           {/* Contact Info */}
//           <div className="footer-section">
//             <h3 className="footer-heading">Contact</h3>
//             <div className="footer-contact">
//               <div className="footer-contact-item">
//                 <MapPin className="footer-icon" />
//                 <span>123 Fitness Ave, Gym City</span>
//               </div>
//               <div className="footer-contact-item">
//                 <Phone className="footer-icon" />
//                 <span>(555) 123-4567</span>
//               </div>
//               <div className="footer-contact-item">
//                 <Mail className="footer-icon" />
//                 <span>info@fitqueue.com</span>
//               </div>
//             </div>
//           </div>

//           {/* Hours */}
//           <div className="footer-section">
//             <h3 className="footer-heading">Hours</h3>
//             <div className="footer-hours">
//               <div className="footer-hours-item">
//                 <Clock className="footer-icon" />
//                 <span>San - Fri: 5:00 AM - 11:00 PM</span>
//               </div>
//               <div className="footer-hours-item indent">
//                 <span>Sat: 20:00 PM - 23:00 PM</span>
//               </div>
//             </div>
//           </div>

//         </div>

//         <div className="footer-bottom">
//           <p className="footer-copy">
//             © 2025 FitQueue. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// Footer.jsx
import React from 'react';
// import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Pages</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/queues">Queues</a></li>
          <li><a href="/statistics">Statistics</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Contact</h4>
        <p>123 Gym Street<br/>Fitness City, IL 10001<br/>Email: contact@smartqueue.com</p>
      </div>

      <div className="footer-section">
        <h4>About SmartQueue</h4>
        <p>SmartQueue helps you schedule and manage your gym visits efficiently.</p>
      </div>

      <div className="footer-section">
        <h4>Opening Hours</h4>
        <p>Sun-Thu: 06:00 - 22:00<br/>Fri: 06:00 - 14:00<br/>Sat: Closed</p>
      </div>
    </footer>
  );
};

export default Footer;
