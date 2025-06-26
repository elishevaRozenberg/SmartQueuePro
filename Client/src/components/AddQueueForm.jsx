import React, { useState } from 'react';

const AddQueueForm = ({ onAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/queues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, location }),
      });
      onAdded();
    } catch (err) {
      console.error('Error adding queue', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <input 
        type="text" 
        className="form-control mb-2" 
        placeholder="Queue Name" 
        value={name}
        onChange={e => setName(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        className="form-control mb-2" 
        placeholder="Queue Description"
        value={description}
        onChange={e => setDescription(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        className="form-control mb-2" 
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)} 
        required 
      />
      <button type="submit" className="btn btn-primary">Add Queue</button>
    </form>
  );
};

export default AddQueueForm;
