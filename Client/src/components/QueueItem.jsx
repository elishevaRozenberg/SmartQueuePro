import React from 'react';

const QueueItem = ({ queue, role, isBooked, onBook, onCancel, onStart, onPause, onDelete }) => {
  return (
    <div className="card border p-4 rounded shadow bg-white">
      <div className="card-body">
        <h3 className="card-title text-xl font-semibold text-dark">{queue.name}</h3>
        <p className="card-text text-gray-700">{queue.description}</p>
        <p className="text-sm text-gray-600">Estimated Wait: {queue.estimatedWait || queue.avg_wait || 0} minutes</p>
        <p className="text-sm text-gray-600">Active Calls: {queue.activeCalls?.length || 0}</p>
        <p className="text-sm text-gray-600">Total in Line: {queue.callCount || queue.waiting_count || 0}</p>

        <div className="mt-3">
          {!role && (
            <button 
              className="btn btn-primary"
              onClick={() => alert('Please sign in to book a queue.')}
            >
              Sign in to Book
            </button>
          )}

          {role === 'client' && (
            isBooked ? (
              <button onClick={onCancel} className="btn btn-danger">
                Cancel Booking
              </button>
            ) : (
              <button onClick={onBook} className="btn btn-success" disabled={!queue.is_active}>
                Book Now
              </button>
            )
          )}

          {(role === 'employee' || role === 'admin') && (
            <div className="d-flex gap-2 mt-2 flex-wrap">
              <button onClick={onStart} className="btn btn-warning">
                Start
              </button>
              <button onClick={onPause} className="btn btn-secondary">
                Pause
              </button>
              <button onClick={onDelete} className="btn btn-danger">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueueItem;
