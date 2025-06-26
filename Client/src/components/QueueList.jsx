import React from 'react';

const QueueList = ({ queues, onUpdate }) => {
  const handleUpdate = (id) => {
    // לוגיקה לעדכון פרטי תור (עריכת שם/תיאור וכו')
    console.log(`Update queue ${id}`);
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
                <button className="btn btn-warning" onClick={() => handleUpdate(queue.id)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDelete(queue.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueueList;
