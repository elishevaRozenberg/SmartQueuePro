import React, { useEffect, useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleRoleUpdate = async (id, newRole) => {
    try {
      await fetch(`/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      setUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user));
    } catch (err) {
      console.error('Failed to update role:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Management</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Online</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                    className="form-select"
                  >
                    <option value="client">Client</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>{user.isOnline ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
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
    </div>
  );
};

export default UserManagement;
