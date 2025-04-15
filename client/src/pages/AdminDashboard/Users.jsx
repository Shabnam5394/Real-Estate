import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users');
        const data = await res.json();
        setUsers(data.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === 'approved' ? 'blocked' : 'approved';
  
      const res = await fetch(`http://localhost:5000/api/user/status/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: updatedStatus }),
      });
  
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, status: updatedStatus } : u
          )
        );
      }
    } catch (err) {
      console.error('Failed to update user status:', err);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-slate-100">
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">{user.role || 'user'}</td>
                <td className="px-6 py-4 capitalize">{user.status || 'pending'}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleUserStatus(user._id, user.status)}
                    className={`px-4 py-1 rounded text-white ${
                      user.status === 'approved' ? 'bg-red-600' : 'bg-green-600'
                    }`}
                  >
                    {user.status === 'approved' ? 'Block' : 'Approve'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
