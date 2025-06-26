import React, { useState } from 'react';

const QueueList = ({ queues, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);  // סטטוס האם הטופס פתוח
  const [queueToUpdate, setQueueToUpdate] = useState(null);  // הנתונים של התור שצריך לעדכן

  const handleUpdate = (queue) => {
    // הצגת טופס העדכון עם פרטי התור שנבחר
    setQueueToUpdate(queue);
    setIsUpdating(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updatedQueue = {
      name: e.target.name.value,
      description: e.target.description.value,
    };

    try {
      // קריאה ל-API לעדכון התור
      await fetch(`/api/queues/${queueToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQueue),
      });

      // עדכון המידע בעמוד
      onUpdate();
      setIsUpdating(false);  // סגירת טופס העדכון
      setQueueToUpdate(null);  // ניקוי המידע של התור המעודכן
    } catch (err) {
      console.error('Failed to update queue:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/queues/${id}`, { method: 'DELETE' });
      onUpdate();
    } catch (err) {
      console.error('Failed to delete queue:', err);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Queue Management</h2>

      {/* טופס עדכון */}
      {isUpdating && queueToUpdate && (
        <div>
          <h3>Update Queue</h3>
          <form onSubmit={handleUpdateSubmit}>
            <input
              name="name"
              defaultValue={queueToUpdate.name}
              className="form-control mb-2"
              required
            />
            <input
              name="description"
              defaultValue={queueToUpdate.description}
              className="form-control mb-2"
              required
            />
            <button type="submit" className="btn btn-primary">Update Queue</button>
            <button type="button" className="btn btn-secondary" onClick={() => setIsUpdating(false)}>Cancel</button>
          </form>
        </div>
      )}

      {/* רשימת התורים */}
      {!isUpdating && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queues.map(queue => (
              <tr key={queue.id}>
                <td>{queue.name}</td>
                <td>{queue.description}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleUpdate(queue)}>
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(queue.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QueueList;
