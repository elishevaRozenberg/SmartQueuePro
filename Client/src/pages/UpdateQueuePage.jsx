import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Fetch from '../Fetch';  // ודא שיש לך מחלקת Fetch

const api = new Fetch();

export default function UpdateQueuePage() {
  const { id } = useParams();  // מזהה התור
  const [queue, setQueue] = useState({ name: '', description: '', location: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // טוען את פרטי התור בעמוד טעינה ראשונית
  useEffect(() => {
    const loadQueueDetails = async () => {
      try {
        const response = await api.get(`/api/queues/${id}`);
        if (response) {
          setQueue(response);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load queue details');
      }
    };
    loadQueueDetails();
  }, [id]);

  // פוקנציה לעדכון התור
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/api/queues/${id}`, queue);
      if (response) {
        navigate('/queues');  // מעביר לדף תורים אחרי העדכון
      }
    } catch (err) {
      console.error(err);
      setError('Failed to update queue');
    }
  };

  // עדכון פרטי התור בזמן שהמשתמש משנה אותם
  const handleChange = (e) => {
    setQueue({ ...queue, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update Queue</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleUpdate}>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={queue.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={queue.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={queue.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Queue
        </button>
      </form>
    </div>
  );
}
