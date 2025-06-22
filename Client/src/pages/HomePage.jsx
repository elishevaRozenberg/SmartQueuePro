
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center text-center px-4 py-10 bg-gray-50">
//       <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Smart Queue Management</h1>
//       <h2 className="text-xl md:text-2xl text-blue-600 mb-6">Skip the Wait, Embrace the Workout</h2>

//       <p className="max-w-2xl text-gray-600 mb-8">
//         Join queues remotely, track your position in real-time, and maximize your gym experience with our intelligent queue management system.
//       </p>

//       <button
//         onClick={() => navigate('/queues')}
//         className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
//       >
//         View Queues
//       </button>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
//         <div className="text-center">
//           <div className="text-3xl font-bold text-blue-600">2,500+</div>
//           <div className="text-gray-600">Happy Members</div>
//         </div>
//         <div className="text-center">
//           <div className="text-3xl font-bold text-blue-600">&lt; 5 min</div>
//           <div className="text-gray-600">Average Wait Time</div>
//         </div>
//         <div className="text-center">
//           <div className="text-3xl font-bold text-blue-600">150+</div>
//           <div className="text-gray-600">Daily Sessions</div>
//         </div>
//         <div className="text-center">
//           <div className="text-3xl font-bold text-blue-600">99.9%</div>
//           <div className="text-gray-600">Success Rate</div>
//         </div>
//       </div>

//       <h3 className="text-2xl font-semibold text-gray-800 mt-16 mb-6">Why Choose FitQueue?</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
//         <Feature title="Real-time Queue Updates" desc="See your position and estimated wait time in real-time" />
//         <Feature title="Mobile Friendly" desc="Join queues from anywhere using your mobile device" />
//         <Feature title="Multiple Queue Types" desc="Separate queues for Cardio, Personal Training, and Pilates" />
//         <Feature title="Smart Notifications" desc="Get notified when it's your turn" />
//       </div>
//     </div>
//   );
// };

// const Feature = ({ title, desc }) => (
//   <div className="bg-white p-6 rounded-2xl shadow">
//     <h4 className="text-lg font-bold text-blue-700 mb-2">{title}</h4>
//     <p className="text-gray-600">{desc}</p>
//   </div>
// );

// export default HomePage;

// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="welcome-section">
        <h1>Welcome to SmartQueue</h1>
        <p>Plan and manage your gym appointments with ease and efficiency.</p>
        <button onClick={() => navigate('/queues')}>Go to Queues</button>
      </section>
    </div>
  );
};

export default HomePage;