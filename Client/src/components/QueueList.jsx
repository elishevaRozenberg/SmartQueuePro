// QueueList.jsx
import React from 'react';
import QueueItem from './QueueItem';

export default function QueueList({ queues, ...handlers }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {queues.map(queue => (
        <QueueItem key={queue.id} queue={queue} {...handlers} />
      ))}
    </div>
  );
}

