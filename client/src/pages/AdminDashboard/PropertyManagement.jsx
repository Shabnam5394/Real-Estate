// src/pages/admin/Properties.jsx

import { useEffect, useState } from 'react';

export default function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('http://localhost:5000/properties/get');
        const data = await res.json();
        console.log('Fetched properties:', data);

        setProperties(data);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      }
    };


    fetchProperties();
  }, []);

  const handleApproval = async (id, status) => {
    const newStatus = status === 'approved' ? 'pending' : 'approved';

    try {
      const res = await fetch(`http://localhost:5000/api/properties/status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setProperties((prev) =>
          prev.map((p) =>
            p._id === id ? { ...p, status: newStatus } : p
          )
        );
      }
    } catch (err) {
      console.error('Error updating property status:', err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Manage Property Listings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(properties) && properties.map((property) => (
    <tr key={property._id} className="border-t hover:bg-slate-100">
      <td className="px-6 py-4">{property.name}</td>
      <td className="px-6 py-4">{property.address}</td>
      <td className="px-6 py-4">₹{property.regularPrice}</td>
      <td className="px-6 py-4 capitalize">{property.status}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => handleApproval(property._id, property.status)}
          className={`px-4 py-1 rounded text-white ${
            property.status === 'approved' ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          {property.status === 'approved' ? 'Reject' : 'Approve'}
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
