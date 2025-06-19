import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Fetch from '../Fetch';
import UserAvatar from '../components/UserAvatar';

const api = new Fetch();

const UserProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState({
    full_name: user.full_name,
    email: user.email,
    imageUrl: user.imageUrl || '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await api.put('/users/profile', form);
      setUser(updatedUser);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Update failed: ' + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Personal Information</h1>
      <p className="mb-4 text-gray-600">Update your personal details here.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <UserAvatar fullName={form.full_name} imageUrl={form.imageUrl} size={80} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/avatar.jpg"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {form.imageUrl && (
          <div>
            <label className="block mb-1 font-medium">Preview</label>
            <img
              src={form.imageUrl}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover border"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {message && <div className="text-green-600 font-medium">{message}</div>}

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfilePage;
