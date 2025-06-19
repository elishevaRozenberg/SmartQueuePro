// // // import React from 'react';
// // // import { User, Clock, ActivityIcon } from 'lucide-react';

// // // const QueueItem = ({ queue }) => {
// // //   const {
// // //     name,
// // //     description,
// // //     status,
// // //     currentSize,
// // //     maxSize,
// // //     waitTime,
// // //     color,
// // //   } = queue;

// // //   const isFull = currentSize >= maxSize;
// // //   const QueueItem = ({ queue }) => {
// // //   const navigate = useNavigate();
// // //   }
// // //   return (
// // //    <div className="queue-card" onClick={() => navigate(`/queues/${queue.id}`)}>
// // //       <div className="queue-header">
// // //         <div className={`queue-icon ${color}`}>{/* Icon placeholder */}</div>
// // //         <div>
// // //           <h3 className="queue-title">{name}</h3>
// // //           <p className="queue-desc">{description}</p>
// // //         </div>
// // //         <span className="queue-status">{status}</span>
// // //       </div>

// // //       <div className="queue-info">
// // //         <div className="queue-size">
// // //           <User size={16} /> Queue Size: {currentSize}/{maxSize}
// // //           <div className="queue-bar">
// // //             <div className="queue-bar-fill" style={{ width: `${(currentSize / maxSize) * 100}%` }}></div>
// // //           </div>
// // //         </div>

// // //         <div className="queue-wait">
// // //           <Clock size={16} /> Est. Wait Time: <strong>{waitTime} min</strong>
// // //         </div>
// // //       </div>

// // //       <button className="queue-join-btn" disabled={isFull}>
// // //         <User size={16} /> Join Queue
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default QueueItem;
// // import React from 'react';
// // import { Users, Clock, UserPlus, XCircle, CheckCircle } from 'lucide-react';

// // const QueueItem = ({ queue, userEntry, onJoinQueue, onLeaveQueue, isLoading }) => {
// //   const currentSize = queue.currentSize ?? 0;

// //   const getStatusColor = () => {
// //     const percentage = (currentSize / queue.max_capacity) * 100;
// //     if (percentage >= 80) return 'text-red-600';
// //     if (percentage >= 60) return 'text-orange-600';
// //     return 'text-green-600';
// //   };

// //   const statusColor = getStatusColor();

// //   return (
// //     <div className="rounded-lg shadow-md border p-4 bg-white hover:shadow-lg transition-all duration-300">
// //       <div className="flex justify-between items-center mb-2">
// //         <div>
// //           <h3 className="text-lg font-bold">{queue.name}</h3>
// //           <p className="text-sm text-slate-600">{queue.description}</p>
// //         </div>
// //         <span
// //           style={{
// //             border: queue.is_active ? "1px solid #22c55e" : "1px solid #ef4444",
// //             color: queue.is_active ? "#22c55e" : "#ef4444",
// //             borderRadius: "8px",
// //             padding: "2px 8px",
// //             fontSize: "0.9em"
// //           }}
// //         >
// //           {queue.is_active ? 'Active' : 'Closed'}
// //         </span>
// //       </div>

// //       <div className="flex justify-between items-center text-sm mb-2">
// //         <div className="flex items-center gap-2">
// //           <Users className="w-4 h-4 text-slate-400" />
// //           <span className="text-slate-600">Queue Size</span>
// //         </div>
// //         <span className={`font-medium ${statusColor}`}>
// //           {currentSize}/{queue.max_capacity}
// //         </span>
// //       </div>

// //       <div className="flex justify-between items-center text-sm mb-2">
// //         <div className="flex items-center gap-2">
// //           <Clock className="w-4 h-4 text-slate-400" />
// //           <span className="text-slate-600">Est. Wait Time</span>
// //         </div>
// //         <span className="font-medium text-slate-900">{queue.estimated_wait_time} min</span>
// //       </div>

// //       {userEntry ? (
// //         <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 mb-2">
// //           <div className="flex justify-between items-center">
// //             <div className="flex items-center gap-2">
// //               <CheckCircle className="w-4 h-4 text-orange-600" />
// //               <span className="text-sm font-medium text-orange-800">You're in queue</span>
// //             </div>
// //             <span
// //               style={{
// //                 background: "#fef3c7",
// //                 color: "#b45309",
// //                 borderRadius: "8px",
// //                 padding: "2px 8px",
// //                 fontSize: "0.9em",
// //                 border: "1px solid #fde68a"
// //               }}
// //             >
// //               Position #{userEntry.position}
// //             </span>
// //           </div>
// //           <p className="text-xs text-orange-700 mt-1">
// //             Estimated call time: {userEntry.estimated_call_time ? new Date(userEntry.estimated_call_time).toLocaleTimeString() : "-"}
// //           </p>
// //         </div>
// //       ) : null}

// //       <div className="pt-2">
// //         {userEntry ? (
// //           <button
// //             onClick={() => onLeaveQueue(queue.id)}
// //             disabled={isLoading || !queue.is_active}
// //             className="w-full border border-red-200 text-red-700 rounded py-2 flex items-center justify-center gap-2 hover:bg-red-50 transition"
// //             style={{ background: "white" }}
// //           >
// //             <XCircle className="w-4 h-4" />
// //             Leave Queue
// //           </button>
// //         ) : (
// //           <button
// //             onClick={() => onJoinQueue(queue.id)}
// //             disabled={isLoading || !queue.is_active || currentSize >= queue.max_capacity}
// //             className="w-full bg-green-600 text-white rounded py-2 flex items-center justify-center gap-2 hover:bg-green-700 transition"
// //             style={{ opacity: currentSize >= queue.max_capacity ? 0.6 : 1 }}
// //           >
// //             <UserPlus className="w-4 h-4" />
// //             {currentSize >= queue.max_capacity ? 'Queue Full' : 'Join Queue'}
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };
// // export default QueueItem;
// import React, { useContext } from 'react';
// import { UserContext } from '../context/UserContext';
// import { useNavigate } from 'react-router-dom';

// export default function QueueItem({ queue, onManageClick, onToggleClick, onDeleteClick, onBookClick, onCancelClick }) {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleBooking = () => {
//     if (!user) return navigate('/signin');
//     if (user.bookedQueueId === queue.id) {
//       onCancelClick(queue.id);
//     } else {
//       onBookClick(queue.id);
//     }
//   };

//   return (
//     <div className="border rounded-xl p-4 shadow-md bg-white">
//       <h3 className="text-xl font-semibold mb-1">{queue.name}</h3>
//       <p className="text-gray-600 mb-3">{queue.description}</p>

//       <div className="space-x-2">
//         {user?.role === 'Client' && (
//           <button
//             onClick={handleBooking}
//             className="bg-green-600 text-white px-3 py-1 rounded"
//           >
//             {user.bookedQueueId === queue.id ? 'Cancel Booking' : 'Book Slot'}
//           </button>
//         )}

//         {user?.role === 'Secretary' && (
//           <>
//             <button onClick={() => onToggleClick(queue.id)} className="bg-yellow-500 text-white px-3 py-1 rounded">
//               {queue.active ? 'Close' : 'Open'} Queue
//             </button>
//             <button onClick={() => onManageClick(queue.id)} className="bg-blue-500 text-white px-3 py-1 rounded">
//               Manage
//             </button>
//           </>
//         )}

//         {user?.role === 'Admin' && (
//           <>
//             <button onClick={() => onToggleClick(queue.id)} className="bg-yellow-500 text-white px-3 py-1 rounded">
//               {queue.active ? 'Close' : 'Open'} Queue
//             </button>
//             <button onClick={() => onManageClick(queue.id)} className="bg-blue-500 text-white px-3 py-1 rounded">
//               Manage
//             </button>
//             <button onClick={() => onDeleteClick(queue.id)} className="bg-red-600 text-white px-3 py-1 rounded">
//               Delete
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// QueuePage.jsx
import React, { useEffect, useState, useContext } from 'react';
import Fetch from '../Fetch';
import QueueList from '../components/QueueList';
import AddQueueForm from '../components/AddQueueForm';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const api = new Fetch();

export default function QueuePage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [queues, setQueues] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, avgWait: 0 });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadQueues();
    loadStats();
  }, []);

  const loadQueues = async () => {
    const data = await api.get('/queues');
    setQueues(data);
  };

  const loadStats = async () => {
    const data = await api.get('/queues/stats');
    setStats(data);
  };

  const toggleQueue = async (id) => {
    await api.put(`/queues/${id}/toggle`);
    loadQueues();
  };

  const deleteQueue = async (id) => {
    await api.delete(`/queues/${id}`);
    loadQueues();
  };

  const bookQueue = async (id) => {
    if (!user) return navigate('/signin');
    await api.post(`/queues/${id}/book`);
    loadQueues();
  };

  const cancelBooking = async (id) => {
    await api.post(`/queues/${id}/cancel`);
    loadQueues();
  };

  const manageQueue = (id) => {
    navigate(`/queues/${id}`);
  };

  const addQueue = async (newQueue) => {
    await api.post('/queues', newQueue);
    setShowAddForm(false);
    loadQueues();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Queue Management</h1>

      {user?.role === 'Client' && (
        <div className="mb-6">
          <p className="text-lg text-gray-700 mb-2">Current Stats:</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Average Wait Time: {stats.avgWait} min</li>
            <li>Active Queues: {stats.active}</li>
            <li>Total in Queues: {stats.total}</li>
          </ul>
        </div>
      )}

      {(user?.role === 'Admin' || user?.role === 'Secretary') && (
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="bg-green-600 text-white px-4 py-2 rounded mb-4"
          >
            {showAddForm ? 'Cancel' : 'Add New Queue'}
          </button>
          {showAddForm && <AddQueueForm onAdd={addQueue} />}
        </div>
      )}

      <QueueList
        queues={queues}
        onToggleClick={toggleQueue}
        onDeleteClick={deleteQueue}
        onBookClick={bookQueue}
        onCancelClick={cancelBooking}
        onManageClick={manageQueue}
      />
    </div>
  );
}
