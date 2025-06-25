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
  // מתאם את הנתונים מהמארח כך שיהיה ניתן להציג אותם
  const formattedData = data.map(item => ({
    date: item.date,  // תאריך
    avgWait: item.avg_wait_time,  // זמן המתנה ממוצע
    calls: item.calls_count  // מספר קריאות
  }));

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Queue Statistics by Date</h2>
      <div className="statistics-graph p-4 border rounded shadow-sm bg-white">
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
    </div>
  );
};

export default StatisticsGraph;
