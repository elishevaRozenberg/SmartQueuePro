// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';

// export default function SettingsPage() {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) navigate('/signin');
//   }, [user]);

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Settings</h1>
//       <p className="text-gray-700 mb-4">Manage your account settings and preferences here.</p>

//       <div className="space-y-4">
//         <button
//           onClick={() => navigate('/profile')}
//           className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
//         >
//           👤 Update Personal Info
//         </button>

//         {/* ניתן להוסיף בעתיד */}
//         {/* <button className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100">
//           🔔 Notification Settings
//         </button> */}

//         {/* <button className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100">
//           🔒 Change Password
//         </button> */}
//       </div>
//     </div>
//   );
// }


// SettingsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './SettingsPage.css';

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-options">
        <button onClick={() => navigate('/profile')}>Edit Profile</button>
      </div>
    </div>
  );
};

export default SettingsPage;
