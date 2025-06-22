// // filepath: c:\SmartQueuePro\SmartQueuePro\Client\src\pages\AdminDashboardPage.jsx
// const AdminDashboardPage = () => {
//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       {/* תוכן נוסף */}
//     </div>
//   );
// };

// export default AdminDashboardPage;


// AdminDashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-buttons">
        <button onClick={() => navigate('/queues')}>Manage Queues</button>
        <button onClick={() => navigate('/users')}>Manage Users</button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
