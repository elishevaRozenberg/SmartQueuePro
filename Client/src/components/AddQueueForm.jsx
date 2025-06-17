import React, { useState } from 'react';

const AddQueueForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [maxSize, setMaxSize] = useState(10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/queues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, maxSize }),
      });
      if (res.ok) {
        onAdd();
        setName('');
        setMaxSize(10);
      }
    } catch (err) {
      console.error('Failed to add queue:', err);
    }
  };

  return (
    <form className="add-queue-form" onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Queue Name" required />
      <input type="number" value={maxSize} onChange={(e) => setMaxSize(Number(e.target.value))} required />
      <button type="submit">Add Queue</button>
    </form>
  );
};

export default AddQueueForm;
