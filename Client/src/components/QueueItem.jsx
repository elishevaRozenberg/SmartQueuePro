
// // components/QueueItem.jsx
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
//         <p className="text-gray-600">Status: {queue.isActive ? 'Active' : 'Inactive'}</p>
//         <p className="text-gray-600">Waiting: {queue.waitingCount} people</p>
//         <p className="text-gray-600">Average wait: {queue.avgWait || 0} minutes</p>
//       </div>

//       <div className="flex gap-2 mt-4 md:mt-0 flex-wrap">
//         {user.role === 'Client' && (
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
//               disabled={!queue.isActive}
//             >
//               Join
//             </button>
//           )
//         )}

//         {(user.role === 'Secretary' || user.role === 'Admin') && (
//           <>
//             <button
//               onClick={onToggleClick}
//               className="bg-yellow-500 text-white px-3 py-1 rounded"
//             >
//               {queue.isActive ? 'Deactivate' : 'Activate'}
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

import React from 'react';

export default function QueueItem({
  queue,
  user,
  isJoined,
  onToggleClick,
  onDeleteClick,
  onBookClick,
  onCancelClick,
  onManageClick,
}) {
  return (
    <div className="border p-4 rounded shadow-sm bg-white flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-slate-900">{queue.name}</h3>
        <p className="text-gray-600">Status: {queue.is_active ? 'Active' : 'Inactive'}</p>
        <p className="text-gray-600">Waiting: {queue.waiting_count || 0} people</p>
        <p className="text-gray-600">Average wait: {queue.avg_wait || 0} minutes</p>
      </div>

      <div className="flex gap-2 mt-4 md:mt-0 flex-wrap">
        {user.role === 'client' && (
          isJoined ? (
            <button
              onClick={onCancelClick}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={onBookClick}
              className="bg-blue-500 text-white px-3 py-1 rounded"
              disabled={!queue.is_active}
            >
              Join
            </button>
          )
        )}

        {(user.role === 'secretary' || user.role === 'admin') && (
          <>
            <button
              onClick={onToggleClick}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              {queue.is_active ? 'Deactivate' : 'Activate'}
            </button>

            <button
              onClick={onManageClick}
              className="bg-gray-600 text-white px-3 py-1 rounded"
            >
              Manage
            </button>

            <button
              onClick={onDeleteClick}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

