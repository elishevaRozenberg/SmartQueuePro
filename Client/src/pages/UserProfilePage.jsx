// function UserProfilePage() {
//   return (
//     <div>
//       <h2>User Profile</h2>
//       {/* תוכן נוסף */}
//     </div>
//   );
// }

// export default UserProfilePage;

// UserProfilePage.jsx
import React, { useEffect, useState } from 'react';
// import './UserProfilePage.css';

const UserProfilePage = ({ userId }) => {
  const [profile, setProfile] = useState({ userName: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/users/${userId}`);
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await fetch(`/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      alert('Profile updated successfully.');
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      <div className="profile-form">
        <label>
          Username:
          <input type="text" name="userName" value={profile.userName} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={profile.email} onChange={handleChange} />
        </label>
        <button onClick={handleUpdate}>Save Changes</button>
      </div>
    </div>
  );
};

export default UserProfilePage;
