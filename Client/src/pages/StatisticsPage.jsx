import React, { useEffect, useState } from 'react';
import StatisticsGraph from '../components/StatisticsGraph';
import Fetch from '../Fetch';

const api = new Fetch();

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await api.get('/api/statistics');
        setStatistics(data);  // עדכון הסטטיסטיקות
        setError('');
      } catch (err) {
        setError('Failed to load statistics.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center text-3xl font-bold mb-6">Statistics Overview</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        statistics.length > 0 ? (
          <StatisticsGraph data={statistics} />
        ) : (
          <p className="text-center">No statistics available.</p>
        )
      )}
    </div>
  );
}
