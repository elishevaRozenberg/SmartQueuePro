import React from 'react';
import { Dumbbell, MapPin, Mail, Phone, Users, Zap, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="about-header text-center mb-6">
        <h1 className="display-4 font-weight-bold">About FitQueue</h1>
        <p className="lead text-muted">
          We're passionate about fitness and technology, and we believe your gym time should be spent working out, not waiting.
        </p>
      </div>

      <div className="about-mission mb-5 row">
        <div className="col-md-6">
          <h2 className="h3 font-weight-bold mb-3">Our Mission</h2>
          <p className="text-muted">
            Our mission is to revolutionize the gym experience by eliminating unnecessary waiting times. We provide a seamless, digital solution that empowers members to manage their class and equipment schedules effortlessly, allowing them to focus on what truly matters: their health and fitness goals.
          </p>
          <p className="text-muted">
            By leveraging smart technology, we aim to create a more efficient, enjoyable, and productive environment for both gym-goers and staff.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop"
            alt="Gym interior"
            className="img-fluid rounded shadow-sm"
          />
        </div>
      </div>

      <div className="about-values text-center mb-5">
        <h2 className="h3 font-weight-bold mb-4">Our Core Values</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <Zap className="text-warning mb-3" size={40} />
                <h5 className="card-title">Efficiency</h5>
                <p className="card-text">Maximizing your time at the gym.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <Heart className="text-danger mb-3" size={40} />
                <h5 className="card-title">Member-First</h5>
                <p className="card-text">Your fitness journey is our priority.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <Users className="text-primary mb-3" size={40} />
                <h5 className="card-title">Community</h5>
                <p className="card-text">Building a supportive fitness environment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-contact">
        <h2 className="h3 text-center font-weight-bold mb-4">Contact Us</h2>
        <div className="card">
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <MapPin className="text-muted mr-3" size={30} />
                  <div>
                    <h5 className="font-weight-bold">Address</h5>
                    <p className="text-muted">123 Fitness Ave, Gym City</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <Phone className="text-muted mr-3" size={30} />
                  <div>
                    <h5 className="font-weight-bold">Phone</h5>
                    <p className="text-muted">(555) 123-4567</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <Mail className="text-muted mr-3" size={30} />
                  <div>
                    <h5 className="font-weight-bold">Email</h5>
                    <p className="text-muted">info@fitqueue.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                width="100%"
                height="400"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
