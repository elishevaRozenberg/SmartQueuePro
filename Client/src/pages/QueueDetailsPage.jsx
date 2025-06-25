import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Clock } from 'lucide-react';
import Fetch from '../Fetch';

const api = new Fetch();

export default function QueueDetailsPage() {
  const { id } = useParams();
  const [queue, setQueue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadQueueDetails = async () => {
      try {
        const data = await api.get(`/api/queues/${id}`);
        setQueue(data);
        setError('');
      } catch {
        setError('Failed to load queue details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadQueueDetails();
  }, [id]);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="text-danger p-4">{error}</div>;
  if (!queue) return <div className="p-4">Queue not found.</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h3 font-weight-bold">{queue.name}</h2>
          <span
            className={`badge ${
              queue.is_active ? 'bg-success' : 'bg-danger'
            }`}
          >
            {queue.is_active ? 'Active' : 'Closed'}
          </span>
        </div>

        {queue.description && (
          <p className="text-muted mb-4">{queue.description}</p>
        )}

        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex align-items-center text-muted">
            <Users className="me-2" />
            <span className="font-weight-semibold">Max Capacity:</span>
          </div>
          <span className="font-weight-bold">{queue.max_capacity}</span>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex align-items-center text-muted">
            <Clock className="me-2" />
            <span className="font-weight-semibold">Estimated Wait Time:</span>
          </div>
          <span className="font-weight-bold">
            {queue.estimated_wait_time || 0} min
          </span>
        </div>

        {/* Optional: Add more queue-specific details or management buttons here */}
      </div>
    </div>
  );
}
