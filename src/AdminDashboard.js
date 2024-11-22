import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); // User data
  const [roles, setRoles] = useState([]); // Role data
  const [permissions, setPermissions] = useState(['Read', 'Write', 'Delete']);

  const addUser = (user) => setUsers([...users, user]);
  const deleteUser = (userId) => setUsers(users.filter((user) => user.id !== userId));
  const addRole = (role) => setRoles([...roles, role]);

  const UserForm = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('Active');

    const handleSubmit = (e) => {
      e.preventDefault();
      addUser({ id: Date.now(), name, status });
      setName('');
      setStatus('Active');
    };

    return (
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="User Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="form-select mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button className="btn btn-primary" type="submit">
          Add User
        </button>
      </form>
    );
  };

  const RoleForm = () => {
    const [roleName, setRoleName] = useState('');
    const [rolePermissions, setRolePermissions] = useState([]);

    const togglePermission = (perm) =>
      setRolePermissions((prev) =>
        prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
      );

    const handleSubmit = (e) => {
      e.preventDefault();
      addRole({ id: Date.now(), name: roleName, permissions: rolePermissions });
      setRoleName('');
      setRolePermissions([]);
    };

    return (
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        {permissions.map((perm) => (
          <div className="form-check" key={perm}>
            <input
              type="checkbox"
              className="form-check-input"
              checked={rolePermissions.includes(perm)}
              onChange={() => togglePermission(perm)}
            />
            <label className="form-check-label">{perm}</label>
          </div>
        ))}
        <button className="btn btn-primary" type="submit">
          Add Role
        </button>
      </form>
    );
  };

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <h3>User Management</h3>
          <UserForm />
          <ul className="list-group">
            {users.map((user) => (
              <li className="list-group-item d-flex justify-content-between" key={user.id}>
                {user.name} ({user.status})
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Role Management</h3>
          <RoleForm />
          <ul className="list-group">
            {roles.map((role) => (
              <li className="list-group-item" key={role.id}>
                {role.name} ({role.permissions.join(', ')})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;