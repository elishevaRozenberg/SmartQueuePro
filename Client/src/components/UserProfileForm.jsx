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
      const updatedUser = await api.put('/api/users/profile', form);
      setUser(updatedUser);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Update failed: ' + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-3xl font-semibold mb-6">Personal Information</h1>
      <p className="text-center mb-4 text-gray-600">Update your personal details here.</p>

      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-center mb-4">
          <UserAvatar fullName={form.full_name} imageUrl={form.imageUrl} size={80} />
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/avatar.jpg"
            className="form-control"
          />
        </div>

        {form.imageUrl && (
          <div className="mb-3">
            <label className="form-label">Preview</label>
            <img
              src={form.imageUrl}
              alt="Profile Preview"
              className="w-32 h-32 rounded-circle object-cover border"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {message && <div className="text-success font-medium">{message}</div>}

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 py-2">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfilePage;
