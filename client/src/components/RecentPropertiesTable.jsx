import React from 'react';

export default function RecentPropertiesTable({ properties }) {
  // Just slice the last 5 properties and reverse them for recent-first
  const recentProperties = properties.slice(-5).reverse();

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">🏡 Recent Properties</h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
        <table className="min-w-full text-sm text-left text-slate-700">
          <thead className="text-xs text-slate-500 uppercase bg-slate-100">
            <tr>
              <th scope="col" className="px-6 py-4">Title</th>
              <th scope="col" className="px-6 py-4">Type</th>
              <th scope="col" className="px-6 py-4">Price</th>
              <th scope="col" className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentProperties.map((property, idx) => (
              <tr
                key={property._id}
                className={`${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                } border-b hover:bg-blue-50 transition-colors duration-200`}
              >
                <td className="px-6 py-4 font-medium">{property.name}</td>
                <td className="px-6 py-4">{property.type}</td>
                <td className="px-6 py-4">{property.regularPrice}$</td>
                <td className="px-6 py-4">
                  {new Date(property.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
