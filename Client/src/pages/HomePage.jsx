// import React from 'react';

// import { Link } from 'react-router-dom';
// import {
//   Clock,
//   Users,
//   Smartphone,
//   CheckCircle,
//   ArrowRight,
//   Zap,
//   Shield,
//   Heart,
// } from 'lucide-react';

// const Home = () => {
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
//       description: 'Get notified when it\'s your turn',
//     },
//   ];

//   const stats = [
//     { icon: <Heart size={28} />, label: 'Happy Members', value: '2,500+' },
//     { icon: <Clock size={28} />, label: 'Avg. Wait Time', value: '< 5 min' },
//     { icon: <Zap size={28} />, label: 'Daily Sessions', value: '150+' },
//     { icon: <Shield size={28} />, label: 'Success Rate', value: '99.9%' },
//   ];

//   return (
//     <div className={styles.container}>
//       {/* Hero */}
//       <section className={styles.hero}>
//         <div className={styles.badge}>Smart Queue Management</div>
//         <h1>
//           Skip the Wait,<br />
//           <span className={styles.highlight}>Embrace the Workout</span>
//         </h1>
//         <p>
//           Join queues remotely, track your position in real-time, and maximize your gym experience
//           with our intelligent queue management system.
//         </p>
//         <div className={styles.heroButtons}>
//           <Link to="/signin" className={styles.primaryButton}>
//             Get Started <ArrowRight size={16} />
//           </Link>
//           <Link to="/signin" className={styles.outlineButton}>
//             Sign In
//           </Link>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className={styles.statsSection}>
//         <div className={styles.statsGrid}>
//           {stats.map((s, i) => (
//             <div key={i} className={styles.statBox}>
//               <div className={styles.statIcon}>{s.icon}</div>
//               <div className={styles.statValue}>{s.value}</div>
//               <div className={styles.statLabel}>{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Features */}
//       <section className={styles.featuresSection}>
//         <h2>Why Choose FitQueue?</h2>
//         <p>Experience the future of gym queue management with our innovative features</p>
//         <div className={styles.featuresGrid}>
//           {features.map((f, i) => (
//             <div key={i} className={styles.featureCard}>
//               <div className={styles.featureIcon}>{f.icon}</div>
//               <h3>{f.title}</h3>
//               <p>{f.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className={styles.cta}>
//         <h2>Ready to Transform Your Gym Experience?</h2>
//         <p>Join thousands of members who have already upgraded their fitness routine</p>
//         <Link to="/signin" className={styles.ctaButton}>
//           Start Your Journey <ArrowRight size={16} />
//         </Link>
//       </section>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { Clock, Smartphone, Users, CheckCircle } from "lucide-react";

const HomePage = () => {
  const features = [
    {
      icon: <Clock size={32} />,
      title: 'Real-time Queue Updates',
      description: 'See your position and estimated wait time in real-time',
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Mobile Friendly',
      description: 'Join queues from anywhere using your mobile device',
    },
    {
      icon: <Users size={32} />,
      title: 'Multiple Queue Types',
      description: 'Separate queues for Cardio, Personal Training, and Pilates',
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Smart Notifications',
      description: "Get notified when it's your turn",
    },
  ];

  return (
    <div>
      <h1>Welcome to SmartQueuePro!</h1>
      <p>Manage your gym queues easily and efficiently.</p>
      <div>
        {features.map((feature, idx) => (
          <div key={idx}>
            {feature.icon}
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomePage;