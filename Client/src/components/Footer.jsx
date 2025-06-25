import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-5 mt-5">
      <div className="container">
        <div className="row">
          {/* Pages Section */}
          <div className="col-md-3 mb-4">
            <h4 className="text-primary">Pages</h4>
            <ul className="list-unstyled">
              <li><a href="/" className="text-secondary text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-secondary text-decoration-none">About</a></li>
              <li><a href="/queues" className="text-secondary text-decoration-none">Queues</a></li>
              <li><a href="/statistics" className="text-secondary text-decoration-none">Statistics</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-3 mb-4">
            <h4 className="text-primary">Contact</h4>
            <p className="text-secondary">123 Gym Street<br />Fitness City, IL 10001<br />Email: contact@smartqueue.com</p>
          </div>

          {/* About Section */}
          <div className="col-md-3 mb-4">
            <h4 className="text-primary">About SmartQueue</h4>
            <p className="text-secondary">SmartQueue helps you schedule and manage your gym visits efficiently.</p>
          </div>

          {/* Opening Hours Section */}
          <div className="col-md-3 mb-4">
            <h4 className="text-primary">Opening Hours</h4>
            <p className="text-secondary">Sun-Thu: 06:00 - 22:00<br />Fri: 06:00 - 14:00<br />Sat: Closed</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4">
          <p className="text-secondary">&copy; {new Date().getFullYear()} SmartQueue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
