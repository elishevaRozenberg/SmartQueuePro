import React, { useState } from 'react';

const AddQueueForm = ({ onQueueAdded }) => {
  const [formData, setFormData] = useState({ name: '', description: '', estimatedWait: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/queues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (onQueueAdded) onQueueAdded(data);
      setFormData({ name: '', description: '', estimatedWait: '' });
    } catch (err) {
      console.error('Failed to add queue:', err);
    }
  };

  return (
    <div className="container mt-5">
      <form className="add-queue-form p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Create New Queue</h2>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Queue Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="estimatedWait"
            className="form-control"
            placeholder="Estimated Wait (minutes)"
            value={formData.estimatedWait}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg">Add Queue</button>
        </div>
      </form>
    </div>
  );
};

export default AddQueueForm;
