import React from 'react';

export default function StatsCard({ title, value, icon, bg }) {
  return (
    <div className={`flex items-center gap-4 p-6 rounded-xl shadow-md text-white ${bg}`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl">{value}</p>
      </div>
    </div>
  );
}
