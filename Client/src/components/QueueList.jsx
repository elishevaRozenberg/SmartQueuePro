import React from 'react';
import QueueItem from './QueueItem';

const QueueList = ({ queues, userEntries, onJoinQueue, onLeaveQueue, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {queues.map(queue => {
        const userEntry = userEntries.find(entry => entry.queue_id === queue.id && entry.status === 'waiting');
        return (
          <QueueItem
            key={queue.id}
            queue={queue}
            userEntry={userEntry}
            onJoinQueue={onJoinQueue}
            onLeaveQueue={onLeaveQueue}
            isLoading={isLoading}
          />
        );
      })}
    </div>
  );
};

export default QueueList;
