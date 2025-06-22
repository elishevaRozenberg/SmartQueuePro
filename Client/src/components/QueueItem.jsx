
// import React from 'react';

// export default function QueueItem({
//   queue,
//   user,
//   isJoined,
//   onToggleClick,
//   onDeleteClick,
//   onBookClick,
//   onCancelClick,
//   onManageClick,
// }) {
//   return (
//     <div className="border p-4 rounded shadow-sm bg-white flex flex-col md:flex-row justify-between items-start md:items-center">
//       <div className="flex-1">
//         <h3 className="text-xl font-semibold text-slate-900">{queue.name}</h3>
//         <p className="text-gray-600">Status: {queue.is_active ? 'Active' : 'Inactive'}</p>
//         <p className="text-gray-600">Waiting: {queue.waiting_count || 0} people</p>
//         <p className="text-gray-600">Average wait: {queue.avg_wait || 0} minutes</p>
//       </div>

//       <div className="flex gap-2 mt-4 md:mt-0 flex-wrap">
//         {user.role === 'client' && (
//           isJoined ? (
//             <button
//               onClick={onCancelClick}
//               className="bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Cancel
//             </button>
//           ) : (
//             <button
//               onClick={onBookClick}
//               className="bg-blue-500 text-white px-3 py-1 rounded"
//               disabled={!queue.is_active}
//             >
//               Join
//             </button>
//           )
//         )}

//         {(user.role === 'secretary' || user.role === 'admin') && (
//           <>
//             <button
//               onClick={onToggleClick}
//               className="bg-yellow-500 text-white px-3 py-1 rounded"
//             >
//               {queue.is_active ? 'Deactivate' : 'Activate'}
//             </button>

//             <button
//               onClick={onManageClick}
//               className="bg-gray-600 text-white px-3 py-1 rounded"
//             >
//               Manage
//             </button>

//             <button
//               onClick={onDeleteClick}
//               className="bg-red-600 text-white px-3 py-1 rounded"
//             >
//               Delete
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// QueueItem.jsx
import React, { useState } from 'react';
// import './QueueItem.css';

const QueueItem = ({ queue, role }) => {
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = async () => {
    try {
      await fetch('/calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queueId: queue._id })
      });
      setIsBooked(true);
    } catch (err) {
      console.error('Failed to book:', err);
    }
  };

  const handleCancel = async () => {
    try {
      await fetch(`/calls/${queue._id}`, { method: 'DELETE' });
      setIsBooked(false);
    } catch (err) {
      console.error('Failed to cancel booking:', err);
    }
  };

  return (
    <div className="queue-item">
      <h3>{queue.name}</h3>
      <p>{queue.description}</p>
      <p>Estimated Wait: {queue.estimatedWait} minutes</p>
      <p>Active Calls: {queue.activeCalls?.length || 0}</p>
      <p>Total in Line: {queue.callCount || 0}</p>

      {role === 'client' && (
        isBooked ? (
          <button onClick={handleCancel}>Cancel Booking</button>
        ) : (
          <button onClick={handleBook}>Book Now</button>
        )
      )}

      {role === 'employee' || role === 'admin' ? (
        <div className="queue-admin-buttons">
          <button>Start</button>
          <button>Pause</button>
          <button>Delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default QueueItem;

