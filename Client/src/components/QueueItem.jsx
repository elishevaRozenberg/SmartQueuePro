// import React from 'react';

// const QueueItem = ({ queue, userRole, isBooked, onBook, onCancel }) => {
//   return (
//     <div className="queue-item border p-4 rounded shadow bg-white mb-4">
//       <h3 className="text-xl font-semibold text-slate-900">{queue.name}</h3>
//       <p className="text-gray-700 mb-1">{queue.description}</p>
//       <p className="text-sm text-gray-600">Estimated Wait: {queue.estimatedWait || queue.avg_wait || 0} minutes</p>
//       <p className="text-sm text-gray-600">Active Calls: {queue.activeCalls?.length || 0}</p>
//       <p className="text-sm text-gray-600">Total in Line: {queue.callCount || queue.waiting_count || 0}</p>

//       <div className="mt-3">
//         {!userRole && (
//           <button
//             className="bg-blue-500 text-white px-3 py-1 rounded"
//             onClick={() => alert('Please sign in to book a queue.')}
//           >
//             Sign in to Book
//           </button>
//         )}

//         {userRole === 'client' && (
//           isBooked ? (
//             <button
//               onClick={onCancel}
//               className="bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Cancel Booking
//             </button>
//           ) : (
//             <button
//               onClick={onBook}
//               className="bg-green-500 text-white px-3 py-1 rounded"
//               disabled={!queue.is_active}
//             >
//               Book Now
//             </button>
//           )
//         )}

//         {(userRole === 'employee' || userRole === 'admin') && (
//           <div className="flex gap-2 mt-2 flex-wrap">
//             <button className="bg-yellow-500 text-white px-3 py-1 rounded">Start</button>
//             <button className="bg-gray-500 text-white px-3 py-1 rounded">Pause</button>
//             <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QueueItem;

import React from 'react';

const QueueItem = ({ queue, role, isBooked, onBook, onCancel, onStart, onPause, onDelete }) => {
  return (
    <div className="queue-item border p-4 rounded shadow bg-white">
      <h3 className="text-xl font-semibold text-slate-900">{queue.name}</h3>
      <p className="text-gray-700">{queue.description}</p>
      <p className="text-sm text-gray-600">Estimated Wait: {queue.estimatedWait || queue.avg_wait || 0} minutes</p>
      <p className="text-sm text-gray-600">Active Calls: {queue.activeCalls?.length || 0}</p>
      <p className="text-sm text-gray-600">Total in Line: {queue.callCount || queue.waiting_count || 0}</p>

      <div className="mt-3">
        {/* אם אין משתמש (לא סביר כאן כי מוגן) */}
        {!role && (
          <button 
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => alert('Please sign in to book a queue.')}
          >
            Sign in to Book
          </button>
        )}

        {/* כפתורי לקוח: הרשמה לתור או ביטול הרשמה */}
        {role === 'client' && (
          isBooked ? (
            <button onClick={onCancel} className="bg-red-500 text-white px-3 py-1 rounded">
              Cancel Booking
            </button>
          ) : (
            <button onClick={onBook} className="bg-green-500 text-white px-3 py-1 rounded" disabled={!queue.is_active}>
              Book Now
            </button>
          )
        )}

        {/* כפתורי ניהול לעובד/אדמין */}
        {(role === 'employee' || role === 'admin') && (
          <div className="flex gap-2 mt-2 flex-wrap">
            <button onClick={onStart} className="bg-yellow-500 text-white px-3 py-1 rounded">
              Start
            </button>
            <button onClick={onPause} className="bg-gray-500 text-white px-3 py-1 rounded">
              Pause
            </button>
            <button onClick={onDelete} className="bg-red-600 text-white px-3 py-1 rounded">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueueItem;
