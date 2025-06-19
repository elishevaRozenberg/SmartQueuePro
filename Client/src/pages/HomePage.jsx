// // import React from 'react';

// // import { Link } from 'react-router-dom';
// // import {
// //   Clock,
// //   Users,
// //   Smartphone,
// //   CheckCircle,
// //   ArrowRight,
// //   Zap,
// //   Shield,
// //   Heart,
// // } from 'lucide-react';

// // const Home = () => {
// //   const features = [
// //     {
// //       icon: <Clock size={32} />,
// //       title: 'Real-time Queue Updates',
// //       description: 'See your position and estimated wait time in real-time',
// //     },
// //     {
// //       icon: <Smartphone size={32} />,
// //       title: 'Mobile Friendly',
// //       description: 'Join queues from anywhere using your mobile device',
// //     },
// //     {
// //       icon: <Users size={32} />,
// //       title: 'Multiple Queue Types',
// //       description: 'Separate queues for Cardio, Personal Training, and Pilates',
// //     },
// //     {
// //       icon: <CheckCircle size={32} />,
// //       title: 'Smart Notifications',
// //       description: 'Get notified when it\'s your turn',
// //     },
// //   ];

// //   const stats = [
// //     { icon: <Heart size={28} />, label: 'Happy Members', value: '2,500+' },
// //     { icon: <Clock size={28} />, label: 'Avg. Wait Time', value: '< 5 min' },
// //     { icon: <Zap size={28} />, label: 'Daily Sessions', value: '150+' },
// //     { icon: <Shield size={28} />, label: 'Success Rate', value: '99.9%' },
// //   ];

// //   return (
// //     <div className={styles.container}>
// //       {/* Hero */}
// //       <section className={styles.hero}>
// //         <div className={styles.badge}>Smart Queue Management</div>
// //         <h1>
// //           Skip the Wait,<br />
// //           <span className={styles.highlight}>Embrace the Workout</span>
// //         </h1>
// //         <p>
// //           Join queues remotely, track your position in real-time, and maximize your gym experience
// //           with our intelligent queue management system.
// //         </p>
// //         <div className={styles.heroButtons}>
// //           <Link to="/signin" className={styles.primaryButton}>
// //             Get Started <ArrowRight size={16} />
// //           </Link>
// //           <Link to="/signin" className={styles.outlineButton}>
// //             Sign In
// //           </Link>
// //         </div>
// //       </section>

// //       {/* Stats */}
// //       <section className={styles.statsSection}>
// //         <div className={styles.statsGrid}>
// //           {stats.map((s, i) => (
// //             <div key={i} className={styles.statBox}>
// //               <div className={styles.statIcon}>{s.icon}</div>
// //               <div className={styles.statValue}>{s.value}</div>
// //               <div className={styles.statLabel}>{s.label}</div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Features */}
// //       <section className={styles.featuresSection}>
// //         <h2>Why Choose FitQueue?</h2>
// //         <p>Experience the future of gym queue management with our innovative features</p>
// //         <div className={styles.featuresGrid}>
// //           {features.map((f, i) => (
// //             <div key={i} className={styles.featureCard}>
// //               <div className={styles.featureIcon}>{f.icon}</div>
// //               <h3>{f.title}</h3>
// //               <p>{f.description}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* CTA */}
// //       <section className={styles.cta}>
// //         <h2>Ready to Transform Your Gym Experience?</h2>
// //         <p>Join thousands of members who have already upgraded their fitness routine</p>
// //         <Link to="/signin" className={styles.ctaButton}>
// //           Start Your Journey <ArrowRight size={16} />
// //         </Link>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Home;
// import React from "react";
// import { Clock, Smartphone, Users, CheckCircle } from "lucide-react";

// const HomePage = () => {
//   const features = [
//     {
//       icon: <Clock size={32} />,
//       title: 'Real-time Queue Updates',
//       description: 'See your position and estimated wait time in real-time',
//     },
//     {
//       icon: <Smartphone size={32} />,
//       title: 'Mobile Friendly',
//       description: 'Join queues from anywhere using your mobile device',
//     },
//     {
//       icon: <Users size={32} />,
//       title: 'Multiple Queue Types',
//       description: 'Separate queues for Cardio, Personal Training, and Pilates',
//     },
//     {
//       icon: <CheckCircle size={32} />,
//       title: 'Smart Notifications',
//       description: "Get notified when it's your turn",
//     },
//   ];

//   return (
//     <div>
//       <h1>Welcome to SmartQueuePro!</h1>
//       <p>Manage your gym queues easily and efficiently.</p>
//       <div>
//         {features.map((feature, idx) => (
//           <div key={idx}>
//             {feature.icon}
//             <h3>{feature.title}</h3>
//             <p>{feature.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default HomePage;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center px-4 py-10 bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Smart Queue Management</h1>
      <h2 className="text-xl md:text-2xl text-blue-600 mb-6">Skip the Wait, Embrace the Workout</h2>

      <p className="max-w-2xl text-gray-600 mb-8">
        Join queues remotely, track your position in real-time, and maximize your gym experience with our intelligent queue management system.
      </p>

      <button
        onClick={() => navigate('/queues')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
      >
        View Queues
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">2,500+</div>
          <div className="text-gray-600">Happy Members</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">&lt; 5 min</div>
          <div className="text-gray-600">Average Wait Time</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">150+</div>
          <div className="text-gray-600">Daily Sessions</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">99.9%</div>
          <div className="text-gray-600">Success Rate</div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mt-16 mb-6">Why Choose FitQueue?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <Feature title="Real-time Queue Updates" desc="See your position and estimated wait time in real-time" />
        <Feature title="Mobile Friendly" desc="Join queues from anywhere using your mobile device" />
        <Feature title="Multiple Queue Types" desc="Separate queues for Cardio, Personal Training, and Pilates" />
        <Feature title="Smart Notifications" desc="Get notified when it's your turn" />
      </div>
    </div>
  );
};

const Feature = ({ title, desc }) => (
  <div className="bg-white p-6 rounded-2xl shadow">
    <h4 className="text-lg font-bold text-blue-700 mb-2">{title}</h4>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default HomePage;