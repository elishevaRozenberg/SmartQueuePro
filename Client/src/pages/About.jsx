// import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Dumbbell, MapPin, Mail, Phone, Users, Zap, Heart } from 'lucide-react';

// const About = () => {
//   return (
//     <div className="about-container">
//       <div className="about-header">
//         <h1 className="about-title">About FitQueue</h1>
//         <p className="about-subtitle">
//           We're passionate about fitness and technology, and we believe your gym time should be spent working out, not waiting.
//         </p>
//       </div>

//       <div className="about-mission">
//         <div className="mission-text">
//           <h2 className="section-title">Our Mission</h2>
//           <p className="section-paragraph">
//             Our mission is to revolutionize the gym experience by eliminating unnecessary waiting times. We provide a seamless, digital solution that empowers members to manage their class and equipment schedules effortlessly, allowing them to focus on what truly matters: their health and fitness goals.
//           </p>
//           <p className="section-paragraph">
//             By leveraging smart technology, we aim to create a more efficient, enjoyable, and productive environment for both gym-goers and staff.
//           </p>
//         </div>
//         <div className="mission-image">
//           <img
//             src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop"
//             alt="Gym interior"
//             className="image-cover"
//           />
//           <div className="image-overlay" />
//         </div>
//       </div>

//       <div className="about-values">
//         <h2 className="section-title center">Our Core Values</h2>
//         <div className="values-grid">
//           <div className="value-item">
//             <div className="value-icon value-icon-orange">
//               <Zap className="icon" />
//             </div>
//             <h3 className="value-title">Efficiency</h3>
//             <p className="value-description">Maximizing your time at the gym.</p>
//           </div>
//           <div className="value-item">
//             <div className="value-icon value-icon-green">
//               <Heart className="icon" />
//             </div>
//             <h3 className="value-title">Member-First</h3>
//             <p className="value-description">Your fitness journey is our priority.</p>
//           </div>
//           <div className="value-item">
//             <div className="value-icon value-icon-blue">
//               <Users className="icon" />
//             </div>
//             <h3 className="value-title">Community</h3>
//             <p className="value-description">Building a supportive fitness environment.</p>
//           </div>
//         </div>
//       </div>

//       <div className="about-contact">
//         <h2 className="section-title center">Contact Us</h2>
//         <Card className="contact-card">
//           <CardContent className="contact-content">
//             <div className="contact-details">
//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <MapPin className="icon" />
//                 </div>
//                 <div>
//                   <h4 className="contact-label">Address</h4>
//                   <p className="contact-info">123 Fitness Ave, Gym City</p>
//                 </div>
//               </div>
//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <Phone className="icon" />
//                 </div>
//                 <div>
//                   <h4 className="contact-label">Phone</h4>
//                   <p className="contact-info">(555) 123-4567</p>
//                 </div>
//               </div>
//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <Mail className="icon" />
//                 </div>
//                 <div>
//                   <h4 className="contact-label">Email</h4>
//                   <p className="contact-info">info@fitqueue.com</p>
//                 </div>
//               </div>
//             </div>
//             <div className="contact-map">
//               <iframe
//                 width="100%"
//                 height="100%"
//                 frameBorder="0"
//                 scrolling="no"
//                 marginHeight="0"
//                 marginWidth="0"
//                 src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
//                 title="Google Maps"
//               ></iframe>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default About;
import React from 'react';
import { Dumbbell, MapPin, Mail, Phone, Users, Zap, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About FitQueue</h1>
        <p className="about-subtitle">
          We're passionate about fitness and technology, and we believe your gym time should be spent working out, not waiting.
        </p>
      </div>

      <div className="about-mission">
        <div className="mission-text">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-paragraph">
            Our mission is to revolutionize the gym experience by eliminating unnecessary waiting times. We provide a seamless, digital solution that empowers members to manage their class and equipment schedules effortlessly, allowing them to focus on what truly matters: their health and fitness goals.
          </p>
          <p className="section-paragraph">
            By leveraging smart technology, we aim to create a more efficient, enjoyable, and productive environment for both gym-goers and staff.
          </p>
        </div>
        <div className="mission-image">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop"
            alt="Gym interior"
            className="image-cover"
          />
          <div className="image-overlay" />
        </div>
      </div>

      <div className="about-values">
        <h2 className="section-title center">Our Core Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <div className="value-icon value-icon-orange">
              <Zap className="icon" />
            </div>
            <h3 className="value-title">Efficiency</h3>
            <p className="value-description">Maximizing your time at the gym.</p>
          </div>
          <div className="value-item">
            <div className="value-icon value-icon-green">
              <Heart className="icon" />
            </div>
            <h3 className="value-title">Member-First</h3>
            <p className="value-description">Your fitness journey is our priority.</p>
          </div>
          <div className="value-item">
            <div className="value-icon value-icon-blue">
              <Users className="icon" />
            </div>
            <h3 className="value-title">Community</h3>
            <p className="value-description">Building a supportive fitness environment.</p>
          </div>
        </div>
      </div>

      <div className="about-contact">
        <h2 className="section-title center">Contact Us</h2>
        <div className="contact-card">
          <div className="contact-content">
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin className="icon" />
                </div>
                <div>
                  <h4 className="contact-label">Address</h4>
                  <p className="contact-info">123 Fitness Ave, Gym City</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone className="icon" />
                </div>
                <div>
                  <h4 className="contact-label">Phone</h4>
                  <p className="contact-info">(555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail className="icon" />
                </div>
                <div>
                  <h4 className="contact-label">Email</h4>
                  <p className="contact-info">info@fitqueue.com</p>
                </div>
              </div>
            </div>
            <div className="contact-map">
              <iframe
                width="100%"
                height="100%"
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