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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);  // כפתור למעבר למסך עדכון
  const [queueToUpdate, setQueueToUpdate] = useState(null); // כדי לדעת איזה תור לעדכן

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      loadData();
      const interval = setInterval(loadData, 30000);
      return () => clearInterval(interval);
    }
  }, [user, navigate]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const queuesData = await api.get('/api/queues');
      setQueues(queuesData);

      if (user?.role?.toLowerCase() === 'client') {
        const entries = await api.get(`/api/calls/user/${user.id}`);
        setUserEntries(entries || []);
      } else {
        setUserEntries([]);
      }
      setError('');
    } catch (err) {
      console.error('Error loading queues:', err);
      setError('Failed to load queue data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookQueue = async (queueId) => {
    try {
      await api.post('/api/calls', { queue_id: queueId, user_id: user.id });
      await loadData();
    } catch (err) {
      setError('Failed to book the queue.');
    }
  };

  const handleCancelBooking = async (queueId) => {
    try {
      const call = userEntries.find(c => c.queue_id === queueId);
      if (!call) return;
      await api.delete(`/api/calls/${call.id}`);
      await loadData();
    } catch (err) {
      setError('Failed to cancel booking.');
    }
  };

  const handleUpdateQueue = async (queueId, updatedQueueData) => {
    try {
      await api.put(`/api/queues/${queueId}`, updatedQueueData); // קריאה לעדכון תור
      await loadData();
      setShowUpdateForm(false); // סגירת טופס עדכון אחרי העדכון
    } catch (err) {
      setError('Failed to update the queue.');
    }
  };

  const handleDeleteQueue = async (queueId) => {
    try {
      await api.delete(`/api/queues/${queueId}`);
      await loadData();
    } catch (err) {
      setError('Failed to delete the queue.');
    }
  };

  const handleShowUpdateForm = (queue) => {
    setQueueToUpdate(queue);  // הצגת הנתונים של התור שברצונך לעדכן
    setShowUpdateForm(true);  // שינוי מצב כדי להציג את טופס העדכון
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Queues</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* ניהול תורים לעובד/אדמין */}
      {(user.role === 'admin' || user.role === 'employee') && (
        <>
          <button
            onClick={() => setShowAddForm(prev => !prev)}
            className="btn btn-success mb-3"
          >
            {showAddForm ? 'Cancel' : 'Add New Queue'}
          </button>
          {showAddForm && <AddQueueForm onAdded={loadData} />}
          <QueueList queues={queues} onUpdate={loadData} />
        </>
      )}

      {user.role === 'secretary' && (
        <>
          <button onClick={() => setShowAddForm(prev => !prev)} className="btn btn-success mb-3">
            {showAddForm ? 'Cancel' : 'Add New Queue'}
          </button>
          {showAddForm && <AddQueueForm onAdded={loadData} />}
          <QueueList queues={queues} onUpdate={loadData} />
        </>
      )}

      {/* תצוגת תורים ללקוח */}
      {user.role.toLowerCase() === 'client' && (
        <div className="mb-4">
          <h4>Active Queues: {queues.filter(q => q.is_active).length}</h4>
          <h5>Your Bookings: {userEntries.length}</h5>
        </div>
      )}

      {/* טופס עדכון תור */}
      {showUpdateForm && queueToUpdate && (
        <div>
          <h3>Update Queue</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateQueue(queueToUpdate.id, { name: e.target.name.value, description: e.target.description.value });
          }}>
            <input name="name" defaultValue={queueToUpdate.name} className="form-control mb-2" required />
            <input name="description" defaultValue={queueToUpdate.description} className="form-control mb-2" required />
            <button type="submit" className="btn btn-primary">Update Queue</button>
          </form>
        </div>
      )}

      <div className="row">
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
            onUpdate={() => handleShowUpdateForm(queue)} // הפעלת עדכון
          />
        ))}
      </div>
    </div>
  );
}
