import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Admin Dashboard</h1>
      <div className="d-flex justify-content-center gap-4">
        <button 
          onClick={() => navigate('/queues')} 
          className="btn btn-primary btn-lg"
        >
          Manage Queues
        </button>
        <button 
          onClick={() => navigate('/users')} 
          className="btn btn-secondary btn-lg"
        >
          Manage Users
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
