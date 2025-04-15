import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,

  } from 'recharts';
  
  export default function PropertyChart({ data }) {
    return (
      <div className="bg-white shadow-xl rounded-2xl p-6 mt-10 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">🗓️ Weekly Listings Trend</h2>
  
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            {/* Gradient for line */}
            <defs>
              <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0.2} />
              </linearGradient>
            </defs>
  
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              stroke="#94a3b8"
              fontSize={12}
              tickMargin={10}
            />
            <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#f1f5f9', borderRadius: '8px', border: 'none' }}
              labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
              itemStyle={{ color: '#2563eb' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="count"
              name="Properties"
              stroke="url(#colorLine)"
              strokeWidth={4}
              dot={{ r: 6, stroke: '#2563eb', strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 8 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  