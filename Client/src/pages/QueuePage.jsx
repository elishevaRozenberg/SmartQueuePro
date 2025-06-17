import React, { useEffect, useState } from 'react';
import QueueItem from '@/components/QueueItem';
import Footer from '@/components/Footer';
import { BarChart, Users, Clock } from 'lucide-react';
import './QueuePage.css';

const QueuePage = () => {
  const [queues, setQueues] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchQueues = async () => {
    try {
      // ⚠️ כאן צריך להחליף ב-fetch אמיתי מהשרת שלך
      const response = await fetch('/api/queues');
      const data = await response.json();
      setQueues(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching queues:', error);
    }
  };

  useEffect(() => {
    fetchQueues();
  }, []);

  const totalWaiting = queues.reduce((sum, q) => sum + q.currentSize, 0);
  const avgWaitTime =
    queues.length > 0
      ? Math.round(
          queues.reduce((sum, q) => sum + q.waitTime, 0) / queues.length
        )
      : 0;

  return (
    <div className="queue-page-container">
      <header className="queue-page-header">
        <h1>Current Queues</h1>
        <p>Join a queue and track your position in real-time</p>
        <div className="queue-stats-top">
          <span>Last updated: {lastUpdated}</span>
          <button onClick={fetchQueues}>Refresh</button>
        </div>
      </header>

      <section className="queue-stats">
        <div className="stat-card">
          <BarChart className="stat-icon" />
          <div>
            <h4>Active Queues</h4>
            <p>{queues.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <Users className="stat-icon" />
          <div>
            <h4>Total Waiting</h4>
            <p>{totalWaiting}</p>
          </div>
        </div>
        <div className="stat-card">
          <Clock className="stat-icon" />
          <div>
            <h4>Avg. Wait Time</h4>
            <p>{avgWaitTime} min</p>
          </div>
        </div>
      </section>

      <section className="queue-list-section">
        {queues.map((queue) => (
          <QueueItem key={queue.id} queue={queue} />
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default QueuePage;
