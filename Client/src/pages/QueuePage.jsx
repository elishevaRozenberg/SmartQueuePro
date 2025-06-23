

// import React, { useEffect, useState, useContext } from 'react';
// import { UserContext } from '../context/UserContext';
// import QueueList from '../components/QueueList';
// import AddQueueForm from '../components/AddQueueForm';
// import { useNavigate } from 'react-router-dom';
// import Fetch from '../Fetch';

// const api = new Fetch();

// export default function QueuePage() {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   const [queues, setQueues] = useState([]);
//   const [userEntries, setUserEntries] = useState([]); // אלו הקריאות (calls) שהמשתמש הזמין
//   const [stats, setStats] = useState({ total: 0, active: 0, avgWait: 0 });
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       console.log('User detected:', user);
//       loadData();
//       const interval = setInterval(loadData, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [user]);

//   const loadData = async () => {
//     setIsLoading(true);
//     try {
//       console.log('Loading queues...');
//       const queuesData = await api.get('/queues');
//       console.log('Queues data received:', queuesData);
//       setQueues(queuesData);

//       if (user.role.toLowerCase() === 'client') {
//         console.log(`Loading calls for user ID: ${user.id}`);
//         const entriesData = await api.get(`/calls/user/${user.id}`);
//         console.log('User calls received:', entriesData);
//         setUserEntries(entriesData);
//       } else {
//         setUserEntries([]);
//       }

//       const statsData = await api.get('/queues/stats');
//       console.log('Stats data received:', statsData);

//       // וודא שאת משתמשת בשמות שדות שמתאימים לשרת:
//       setStats({
//         active: statsData.active || 0,
//         total: statsData.total || 0,
//         avgWait: statsData.avgWait || 0,
//       });

//       setError('');
//     } catch (err) {
//       console.error('Error loading data:', err);
//       setError('Failed to load queue data.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // הפונקציה שמוסיפה קריאה חדשה (call) לטור מסוים עבור המשתמש
//   const handleBookQueue = async (queueId) => {
//     try {
//       console.log(`Booking queue ${queueId} for user ${user.id}`);
//       await api.post('/calls', { queue_id: queueId, user_id: user.id });
//       await loadData();
//     } catch (err) {
//       console.error('Error booking queue:', err);
//       setError('Failed to book the queue.');
//     }
//   };

//   // הפונקציה שמבטלת את ההצטרפות של המשתמש לקריאה (call)
//   const handleCancelBooking = async (queueId) => {
//     try {
//       const userCall = userEntries.find(c => c.queue_id === queueId);
//       if (!userCall) {
//         console.warn('No user call found to cancel for queue:', queueId);
//         return;
//       }

//       console.log(`Canceling call ${userCall.id} for user ${user.id}`);
//       await api.delete(`/calls/${userCall.id}`);
//       await loadData();
//     } catch (err) {
//       console.error('Error canceling booking:', err);
//       setError('Failed to cancel booking.');
//     }
//   };

//   // הפונקציות לניהול תורים (למנהלים בלבד)
//   const handleToggleQueue = async (id) => {
//     try {
//       console.log(`Toggling queue status for queue ID: ${id}`);
//       await api.put(`/queues/${id}/toggle`);
//       await loadData();
//     } catch (err) {
//       console.error('Error toggling queue status:', err);
//       setError('Failed to toggle queue status.');
//     }
//   };

//   const handleDeleteQueue = async (id) => {
//     try {
//       console.log(`Deleting queue ID: ${id}`);
//       await api.delete(`/queues/${id}`);
//       await loadData();
//     } catch (err) {
//       console.error('Error deleting queue:', err);
//       setError('Failed to delete queue.');
//     }
//   };

//   const handleManageQueue = (id) => {
//     console.log(`Navigating to manage queue ID: ${id}`);
//     navigate(`/queues/${id}`);
//   };

//   const handleAddQueue = async (newQueue) => {
//     try {
//       console.log('Adding new queue:', newQueue);
//       await api.post('/queues', newQueue);
//       setShowAddForm(false);
//       await loadData();
//     } catch (err) {
//       console.error('Error adding new queue:', err);
//       setError('Failed to add new queue.');
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-slate-900">Queue Management</h1>
//         <button
//           onClick={loadData}
//           className="border px-4 py-2 rounded text-sm bg-white hover:bg-slate-50"
//         >
//           Refresh
//         </button>
//       </div>

//       {error && <div className="text-red-600 mb-4">{error}</div>}

//       {user?.role.toLowerCase() === 'client' && (
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Queue Statistics</h2>
//           <ul className="list-disc list-inside text-gray-700">
//             <li>Active queues: {stats.active}</li>
//             <li>People currently waiting: {stats.total}</li>
//             <li>Average wait time: {stats.avgWait} minutes</li>
//           </ul>
//         </div>
//       )}

//       {(user?.role.toLowerCase() === 'secretary' || user?.role.toLowerCase() === 'admin') && (
//         <>
//           <button
//             onClick={() => setShowAddForm((prev) => !prev)}
//             className="bg-green-600 text-white px-4 py-2 rounded mb-4"
//           >
//             {showAddForm ? 'Cancel' : 'Add New Queue'}
//           </button>
//           {showAddForm && <AddQueueForm onAdd={handleAddQueue} />}
//         </>
//       )}

//       <QueueList
//         queues={queues}
//         userEntries={userEntries}
//         user={user}
//         onToggleClick={handleToggleQueue}
//         onDeleteClick={handleDeleteQueue}
//         onBookClick={handleBookQueue}
//         onCancelClick={handleCancelBooking}
//         onManageClick={handleManageQueue}
//         isLoading={isLoading}
//       />
//     </div>
//   );
// }


// QueuePage.jsx
// QueuePage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import QueueList from '../components/QueueList';
import AddQueueForm from '../components/AddQueueForm';
import { useNavigate } from 'react-router-dom';
import Fetch from '../Fetch';
import QueueItem from '../components/QueueItem';

const api = new Fetch();

export default function QueuePage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [queues, setQueues] = useState([]);
  const [userEntries, setUserEntries] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, avgWait: 0 });
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
      const interval = setInterval(loadData, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const queuesData = await api.get('/queues');
      setQueues(queuesData);

      if (user.role.toLowerCase() === 'client') {
        const entriesData = await api.get(`/calls/user/${user.id}`);
        setUserEntries(entriesData);
      } else {
        setUserEntries([]);
      }

      const statsData = await api.get('/queues/stats');
      setStats({
        active: statsData.active || 0,
        total: statsData.total || 0,
        avgWait: statsData.avgWait || 0,
      });

      setError('');
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load queue data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookQueue = async (queueId) => {
    try {
      await api.post('/calls', { queue_id: queueId, user_id: user.id });
      await loadData();
    } catch (err) {
      console.error('Error booking queue:', err);
      setError('Failed to book the queue.');
    }
  };

  const handleCancelBooking = async (queueId) => {
    try {
      const userCall = userEntries.find(c => c.queue_id === queueId);
      if (!userCall) return;
      await api.delete(`/calls/${userCall.id}`);
      await loadData();
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError('Failed to cancel booking.');
    }
  };

  return (
    <div className="queue-page">
      <h1>Queues</h1>
      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="queue-stats">
            <p>Total Queues: {stats.total}</p>
            <p>Active Queues: {stats.active}</p>
            <p>Average Wait Time: {stats.avgWait} minutes</p>
          </div>

          <div className="queue-items">
            {queues.map(queue => (
              <QueueItem
                key={queue.id}
                queue={queue}
                userRole={user.role}
                isBooked={userEntries.some(e => e.queue_id === queue.id)}
                onBook={() => handleBookQueue(queue.id)}
                onCancel={() => handleCancelBooking(queue.id)}
              />
            ))}
          </div>

          {(user.role === 'admin' || user.role === 'employee') && (
            <>
              <button onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Hide Add Queue Form' : 'Add New Queue'}
              </button>
              {showAddForm && <AddQueueForm onAdded={loadData} />}
              <QueueList queues={queues} onUpdate={loadData} />
            </>
          )}
        </>
      )}
    </div>
  );
}
