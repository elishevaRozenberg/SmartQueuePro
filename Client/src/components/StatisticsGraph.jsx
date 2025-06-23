// // src/components/StatisticsGraph.jsx
// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';

// const StatisticsGraph = ({ data }) => {
//   return (
//     <div style={{ width: '100%', height: 300 }}>
//       <ResponsiveContainer>
//         <BarChart data={data}
//           margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="day" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="Cardio" stackId="a" fill="#f97316" />
//           <Bar dataKey="Pilates" stackId="a" fill="#10b981" />
//           <Bar dataKey="Personal Training" stackId="a" fill="#3b82f6" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default StatisticsGraph;

// StatisticsGraph.jsx
// StatisticsGraph.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const StatisticsGraph = ({ data }) => {
  const formattedData = data.map(item => ({
    date: item.date,
    avgWait: item.avg_wait_time,
    calls: item.calls_count
  }));

  return (
    <div className="statistics-graph">
      <h2>Queue Statistics by Date</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgWait" name="Avg Wait (min)" fill="#8884d8" />
          <Bar dataKey="calls" name="Total Calls" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsGraph;
