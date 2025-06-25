import React from 'react';

const QueueList = ({ queues, onUpdate }) => {
  const handleUpdate = (id) => {
    console.log(`Update queue ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/queues/${id}`, { method: 'DELETE' });
      console.log(`Deleted queue ${id}`);
      if (onUpdate) onUpdate(); // Refresh the list after deletion
    } catch (err) {
      console.error('Failed to delete queue:', err);
    }
  };

  return (
    <div className="container mt-5">
      <button 
        onClick={() => console.log('Add new queue')} 
        className="btn btn-primary mb-4"
      >
        Add Queue
      </button>
      <table className="table table-bordered table-striped">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Estimated Wait</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queues.map(queue => (
            <tr key={queue.id}>
              <td>{queue.name}</td>
              <td>{queue.description}</td>
              <td>{queue.estimatedWait || 0} min</td>
              <td>
                <button 
                  onClick={() => handleUpdate(queue.id)} 
                  className="btn btn-warning btn-sm mr-2"
                >
                  Update
                </button>
                <button 
                  onClick={() => handleDelete(queue.id)} 
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueueList;
