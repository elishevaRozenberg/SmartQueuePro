import React from 'react';
import QueueItem from './QueueItem';

const QueueList = ({ queues, isLoading }) => {
  if (isLoading) return <p>Loading queues...</p>;
  if (!queues.length) return <p>No active queues available.</p>;

  return (
    <div className="queue-grid">
      {queues.map((queue) => (
        <QueueItem key={queue.id} queue={queue} />
      ))}
    </div>
  );
};

export default QueueList;
