

// // components/QueueList.jsx
// import React from 'react';
// import QueueItem from './QueueItem';

// export default function QueueList({
//   queues,
//   userEntries,
//   user,
//   onToggleClick,
//   onDeleteClick,
//   onBookClick,
//   onCancelClick,
//   onManageClick,
//   isLoading
// }) {
//   if (isLoading) return <div>Loading queues...</div>;
//   if (!queues.length) return <div>No queues found.</div>;

//   return (
//     <div className="grid grid-cols-1 gap-4">
//       {queues.map((queue) => {
//         const isJoined = userEntries?.some(e => e.queueId === queue.id);
//         return (
//           <QueueItem
//             key={queue.id}
//             queue={queue}
//             user={user}
//             isJoined={isJoined}
//             onToggleClick={() => onToggleClick(queue.id)}
//             onDeleteClick={() => onDeleteClick(queue.id)}
//             onBookClick={() => onBookClick(queue.id)}
//             onCancelClick={() => onCancelClick(queue.id)}
//             onManageClick={() => onManageClick(queue.id)}
//           />
//         );
//       })}
//     </div>
//   );
// }


// QueueList.jsx
import React from 'react';
// import './QueueList.css';

const QueueList = ({ queues, role }) => {
  const handleUpdate = (id) => {
    // logic to update queue info
    console.log(`Update queue ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/queues/${id}`, { method: 'DELETE' });
      console.log(`Deleted queue ${id}`);
    } catch (err) {
      console.error('Failed to delete queue:', err);
    }
  };

  const handleAddQueue = () => {
    // open modal or navigate to create form
    console.log('Add new queue');
  };

  return (
    <div className="queue-list">
      <button onClick={handleAddQueue}>Add Queue</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Estimated Wait</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queues.map(queue => (
            <tr key={queue._id}>
              <td>{queue.name}</td>
              <td>{queue.description}</td>
              <td>{queue.estimatedWait} min</td>
              <td>
                <button onClick={() => handleUpdate(queue._id)}>Update</button>
                <button onClick={() => handleDelete(queue._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueueList;
