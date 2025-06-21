// // QueueList.jsx
// import React from 'react';
// import QueueItem from './QueueItem';

// export default function QueueList({ queues, ...handlers }) {
//   return (
//     <div className="grid md:grid-cols-3 gap-4">
//       {queues.map(queue => (
//         <QueueItem key={queue.id} queue={queue} {...handlers} />
//       ))}
//     </div>
//   );
// }

// components/QueueList.jsx
import React from 'react';
import QueueItem from './QueueItem';

export default function QueueList({
  queues,
  userEntries,
  user,
  onToggleClick,
  onDeleteClick,
  onBookClick,
  onCancelClick,
  onManageClick,
  isLoading
}) {
  if (isLoading) return <div>Loading queues...</div>;
  if (!queues.length) return <div>No queues found.</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {queues.map((queue) => {
        const isJoined = userEntries?.some(e => e.queueId === queue.id);
        return (
          <QueueItem
            key={queue.id}
            queue={queue}
            user={user}
            isJoined={isJoined}
            onToggleClick={() => onToggleClick(queue.id)}
            onDeleteClick={() => onDeleteClick(queue.id)}
            onBookClick={() => onBookClick(queue.id)}
            onCancelClick={() => onCancelClick(queue.id)}
            onManageClick={() => onManageClick(queue.id)}
          />
        );
      })}
    </div>
  );
}
