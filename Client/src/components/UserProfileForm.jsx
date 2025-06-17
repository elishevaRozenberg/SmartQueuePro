import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserProfileForm = () => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    profile_image: '',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // טען את המידע מהשרת
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          credentials: 'include',
        });
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profile),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error updating profile.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form className="max-w-xl mx-auto p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
      <p className="text-slate-600 mb-6">Update your personal details here.</p>

      {/* Initials */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-xl font-semibold text-orange-700">
          {user?.username?.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Profile Image URL</label>
          <input
            type="text"
            name="profile_image"
            value={profile.profile_image}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700">Full Name</label>
        <input
          type="text"
          value={profile.full_name}
          readOnly
          className="mt-1 w-full p-2 border rounded bg-slate-100"
        />
        <small className="text-slate-500">Full name is managed by your login provider.</small>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded"
        />
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
      >
        Save Changes
      </button>

      {message && <p className="mt-4 text-slate-600">{message}</p>}
    </form>
  );
};

export default UserProfileForm;
