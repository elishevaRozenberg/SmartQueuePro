import React from 'react';
import './QueuePage.css';
import { User, Clock, ActivityIcon } from 'lucide-react';

const QueueItem = ({ queue }) => {
  const {
    name,
    description,
    status,
    currentSize,
    maxSize,
    waitTime,
    color,
  } = queue;

  const isFull = currentSize >= maxSize;
  const QueueItem = ({ queue }) => {
  const navigate = useNavigate();
  }
  return (
   <div className="queue-card" onClick={() => navigate(`/queues/${queue.id}`)}>
      <div className="queue-header">
        <div className={`queue-icon ${color}`}>{/* Icon placeholder */}</div>
        <div>
          <h3 className="queue-title">{name}</h3>
          <p className="queue-desc">{description}</p>
        </div>
        <span className="queue-status">{status}</span>
      </div>

      <div className="queue-info">
        <div className="queue-size">
          <User size={16} /> Queue Size: {currentSize}/{maxSize}
          <div className="queue-bar">
            <div className="queue-bar-fill" style={{ width: `${(currentSize / maxSize) * 100}%` }}></div>
          </div>
        </div>

        <div className="queue-wait">
          <Clock size={16} /> Est. Wait Time: <strong>{waitTime} min</strong>
        </div>
      </div>

      <button className="queue-join-btn" disabled={isFull}>
        <User size={16} /> Join Queue
      </button>
    </div>
  );
};

export default QueueItem;
