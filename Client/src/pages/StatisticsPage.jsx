// // src/pages/StatisticsPage.jsx
// import React, { useEffect, useState } from 'react';
// import StatisticsGraph from '../components/StatisticsGraph';
// import '../App.css';

// const StatisticsPage = () => {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const fetchStatistics = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/api/statistics');
//         const data = await res.json();
//         setStats(data);
//       } catch (error) {
//         console.error('Error fetching statistics:', error);
//       }
//     };
//     fetchStatistics();
//   }, []);

//   if (!stats) return <div className="text-center p-8">Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-4xl font-bold mb-8 text-center">Queue Statistics</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//         <div className="bg-white shadow rounded-lg p-6 text-center">
//           <h2 className="text-sm text-slate-500">Total Users Today</h2>
//           <p className="text-3xl font-bold text-slate-800">{stats.totalUsersToday}</p>
//         </div>
//         <div className="bg-white shadow rounded-lg p-6 text-center">
//           <h2 className="text-sm text-slate-500">Peak Hour</h2>
//           <p className="text-2xl font-bold text-slate-800">{stats.peakHour}</p>
//         </div>
//         <div className="bg-white shadow rounded-lg p-6 text-center">
//           <h2 className="text-sm text-slate-500">Avg. Wait Time</h2>
//           <p className="text-2xl font-bold text-slate-800">{stats.avgWaitTime} min</p>
//         </div>
//       </div>

//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Weekly Queue Usage</h2>
//         <StatisticsGraph data={stats.weeklyUsage} />
//       </div>
//     </div>
//   );
// };

// export default StatisticsPage;


// StatisticsPage.jsx
import React, { useEffect, useState } from 'react';
import StatisticsGraph from '../components/StatisticsGraph';
// import './StatisticsPage.css';

const StatisticsPage = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await fetch('/statistics');
        const data = await res.json();
        setStatistics(data);
      } catch (err) {
        console.error('Failed to fetch statistics:', err);
      }
    };
    fetchStatistics();
  }, []);

  return (
    <div className="statistics-page">
      <h1>Current Statistics</h1>
      <StatisticsGraph data={statistics} />
    </div>
  );
};

export default StatisticsPage;
