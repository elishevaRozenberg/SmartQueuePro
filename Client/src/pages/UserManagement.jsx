    // UserManagementPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import Fetch from '../Fetch';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const api = new Fetch();

export default function UserManagementPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', full_name: '', role: 'Client' });

  useEffect(() => {
    if (!user || user.role !== 'Admin') navigate('/');
    else loadUsers();
  }, [user]);

  const loadUsers = async () => {
    const data = await api.get('/users');
    setUsers(data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    loadUsers();
  };

  const handleRoleChange = async (id, newRole) => {
    await api.put(`/users/${id}/role`, { role: newRole });
    loadUsers();
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    await api.post('/users/admin-create', newUser);
    setNewUser({ username: '', email: '', full_name: '', role: 'Client' });
    loadUsers();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <form onSubmit={handleAddUser} className="grid grid-cols-2 gap-4 mb-6">
        <input type="text" placeholder="Username" required value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} className="border p-2 rounded" />
        <input type="email" placeholder="Email" required value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Full Name" required value={newUser.full_name}
          onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })} className="border p-2 rounded" />
        <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="border p-2 rounded">
          <option value="Client">Client</option>
          <option value="Secretary">Secretary</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="col-span-2 bg-green-600 text-white py-2 rounded">Add User</button>
      </form>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Full Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Online</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.username}</td>
              <td className="p-2 border">{u.full_name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Client">Client</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td className="p-2 border text-center">{u.isOnline ? '✅' : '❌'}</td>
              <td className="p-2 border">
                <button onClick={() => handleDelete(u.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}