
// // QueuePage.jsx

// const api = new Fetch();

// export default function QueuePage() {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   const [queues, setQueues] = useState([]);
//   const [userEntries, setUserEntries] = useState([]);
//   const [stats, setStats] = useState({ total: 0, active: 0, avgWait: 0 });
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       loadData();
//       const interval = setInterval(loadData, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [user]);

//   const loadData = async () => {
//     setIsLoading(true);
//     try {
//       const queuesData = await api.get('/queues');
//       setQueues(queuesData);

//       if (user.role.toLowerCase() === 'client') {
//         const entriesData = await api.get(`/calls/user/${user.id}`);
//         setUserEntries(entriesData);
//       } else {
//         setUserEntries([]);
//       }

//       const statsData = await api.get('/queues/stats');
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

//   const handleBookQueue = async (queueId) => {
//     try {
//       await api.post('/calls', { queue_id: queueId, user_id: user.id });
//       await loadData();
//     } catch (err) {
//       console.error('Error booking queue:', err);
//       setError('Failed to book the queue.');
//     }
//   };

//   const handleCancelBooking = async (queueId) => {
//     try {
//       const userCall = userEntries.find(c => c.queue_id === queueId);
//       if (!userCall) return;
//       await api.delete(`/calls/${userCall.id}`);
//       await loadData();
//     } catch (err) {
//       console.error('Error cancelling booking:', err);
//       setError('Failed to cancel booking.');
//     }
//   };

//   return (
//     <div className="queue-page">
//       <h1>Queues</h1>
//       {error && <p className="error">{error}</p>}
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className="queue-stats">
//             <p>Total Queues: {stats.total}</p>
//             <p>Active Queues: {stats.active}</p>
//             <p>Average Wait Time: {stats.avgWait} minutes</p>
//           </div>

//           <div className="queue-items">
//             {queues.map(queue => (
//               <QueueItem
//                 key={queue.id}
//                 queue={queue}
//                 userRole={user?.role}
//                 isBooked={userEntries.some(e => e.queue_id === queue.id)}
//                 onBook={() => handleBookQueue(queue.id)}
//                 onCancel={() => handleCancelBooking(queue.id)}
//               />

//             ))}
//           </div>

//           {(user.role === 'admin' || user.role === 'employee') && (
//             <>
//               <button onClick={() => setShowAddForm(!showAddForm)}>
//                 {showAddForm ? 'Hide Add Queue Form' : 'Add New Queue'}
//               </button>
//               {showAddForm && <AddQueueForm onAdded={loadData} />}
//               <QueueList queues={queues} onUpdate={loadData} />
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import QueueList from '../components/QueueList';
import QueueItem from '../components/QueueItem';
import AddQueueForm from '../components/AddQueueForm';
import Fetch from '../Fetch';


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
      // ריענון אוטומטי כל 30 שניות
      const interval = setInterval(loadData, 30000);
      return () => clearInterval(interval);
    } else {
      // אם אין משתמש מחובר, נעבור לדף התחברות
      navigate('/login');
    }
  }, [user, navigate]);

  // טוען את רשימת התורים, הקריאות של המשתמש והסטטיסטיקות
  const loadData = async () => {
    try {
      setIsLoading(true);
      const queuesData = await api.get('/queues');
      setQueues(queuesData);

      if (user.role.toLowerCase() === 'client') {
        // שליפת התורים שהמשתמש הנוכחי נרשם אליהם (calls לפי user)
        const entriesData = await api.get(`/calls/user/${user.id}`);
        setUserEntries(entriesData);
      } else {
        setUserEntries([]);
      }

      const statsData = await api.get('/queues/stats');
      setStats({
        active: statsData.active || 0,
        total: statsData.total || 0,
        avgWait: statsData.avgWait || 0
      });
      setError('');
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load queue data.');
    } finally {
      setIsLoading(false);
    }
  };

  // הזמנת תור (עבור לקוח) – בקשת POST ליצירת קריאה חדשה לתור
  const handleBookQueue = async (queueId) => {
    try {
      await api.post('/calls', { queue_id: queueId, user_id: user.id });
      await loadData();
    } catch (err) {
      console.error('Error booking queue:', err);
      setError('Failed to book the queue.');
    }
  };

  // ביטול תור (עבור לקוח) – מחיקת הקריאה הקיימת של המשתמש בתור
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

  // קריאה למשתמש הבא בתור (Start) – עדכון השרת לקריאת הבא
  const handleCallNext = async (queueId) => {
    try {
      await api.patch(`/calls/${queueId}/next`);
      await loadData();
    } catch (err) {
      console.error('Error calling next user:', err);
      setError('Failed to call next person.');
    }
  };

  // הפעלת/השבתת תור (Pause/Resume) – עדכון סטטוס is_active של התור
  const handleToggleQueue = async (queueId) => {
    try {
      await api.put(`/queues/${queueId}/toggle`);
      await loadData();
    } catch (err) {
      console.error('Error toggling queue status:', err);
      setError('Failed to toggle queue status.');
    }
  };

  // מחיקת תור – שליחת בקשת DELETE לשרת
  const handleDeleteQueue = async (queueId) => {
    try {
      await api.delete(`/queues/${queueId}`);
      await loadData();
    } catch (err) {
      console.error('Error deleting queue:', err);
      setError('Failed to delete queue.');
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="queue-page container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Queues</h1>

      {error && <p className="error text-red-600 mb-4">{error}</p>}

      {/* סטטיסטיקות עבור לקוח רגיל */}
      {user.role.toLowerCase() === 'client' && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Queue Statistics</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Active queues: {stats.active}</li>
            <li>People currently waiting: {stats.total}</li>
            <li>Average wait time: {stats.avgWait} minutes</li>
          </ul>
        </div>
      )}

      {/* אפשרויות ניהול עבור תפקיד עובד/אדמין */}
      {(user.role === 'admin' || user.role === 'employee') && (
        <>
          <button 
            onClick={() => setShowAddForm(prev => !prev)}
            className="bg-green-600 text-white px-4 py-2 rounded mb-4"
          >
            {showAddForm ? 'Cancel' : 'Add New Queue'}
          </button>
          {showAddForm && <AddQueueForm onAdded={loadData} />}
          {/* טבלת ניהול תורים */}
          <QueueList queues={queues} onUpdate={loadData} />
        </>
      )}

      {/* רשימת כרטיסי תור - לכל המשתמשים */}
      <div className="queue-items grid gap-4">
        {queues.map(queue => (
          <QueueItem
            key={queue.id}
            queue={queue}
            role={user.role}
            isBooked={!!userEntries.find(e => e.queue_id === queue.id)}
            onBook={() => handleBookQueue(queue.id)}
            onCancel={() => handleCancelBooking(queue.id)}
            onStart={() => handleCallNext(queue.id)}
            onPause={() => handleToggleQueue(queue.id)}
            onDelete={() => handleDeleteQueue(queue.id)}
          />
        ))}
      </div>
    </div>
  );
}

