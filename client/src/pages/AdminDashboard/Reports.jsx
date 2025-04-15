import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import jsPDF from "jspdf";
import Papa from "papaparse";

const COLORS = ["#4f46e5", "#16a34a", "#f59e0b", "#ef4444"];

export default function Reports() {
  const [report, setReport] = useState({
    propertyReport: { total: 0, approved: 0, pending: 0, rent: 0, sale: 0 },
    userReport: { total: 0, withListings: 0 },
  });

  const [stats, setStats] = useState([]);
  const [filteredStats, setFilteredStats] = useState([]);
  const [timeRange, setTimeRange] = useState("6");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [reportRes, statsRes] = await Promise.all([
          fetch("http://localhost:5000/properties/admin/reports"),
          fetch("http://localhost:5000/properties/admin/stats"),
        ]);

        if (!reportRes.ok || !statsRes.ok) {
          throw new Error("Failed to fetch data from the server.");
        }

        const reportData = await reportRes.json();
        const statsData = await statsRes.json();

        setReport(reportData);
        setStats(statsData);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        setError("Something went wrong while fetching the report data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const range = parseInt(timeRange);
    const sliced = stats.slice(-range); // Last N months
    setFilteredStats(sliced);
  }, [timeRange, stats]);

  const { propertyReport, userReport } = report;

  const pieData = [
    { name: "Approved", value: propertyReport.approved },
    { name: "Pending", value: propertyReport.pending },
    { name: "Rent", value: propertyReport.rent },
    { name: "Sale", value: propertyReport.sale },
  ];

  const exportToPDF = () => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();

    doc.setFontSize(18);
    doc.text("Admin Reports", 20, 10);

    doc.setFontSize(12);
    doc.text(`Generated on: ${timestamp}`, 20, 18);

    doc.setFontSize(14);
    doc.text("Property Stats", 10, 30);
    doc.text(`Total Listings: ${propertyReport.total}`, 10, 40);
    doc.text(`Approved: ${propertyReport.approved}`, 10, 50);
    doc.text(`Pending: ${propertyReport.pending}`, 10, 60);
    doc.text(`Rent: ${propertyReport.rent}`, 10, 70);
    doc.text(`Sale: ${propertyReport.sale}`, 10, 80);

    doc.text("User Stats", 10, 100);
    doc.text(`Total Users: ${userReport.total}`, 10, 110);
    doc.text(`Users w/ Listings: ${userReport.withListings}`, 10, 120);

    doc.save("admin-report.pdf");
  };

  const exportToCSV = () => {
    const csvData = [
      { Metric: "Total Listings", Value: propertyReport.total },
      { Metric: "Approved", Value: propertyReport.approved },
      { Metric: "Pending", Value: propertyReport.pending },
      { Metric: "Rent", Value: propertyReport.rent },
      { Metric: "Sale", Value: propertyReport.sale },
      { Metric: "Total Users", Value: userReport.total },
      { Metric: "Users with Listings", Value: userReport.withListings },
    ];

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "admin-report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-lg text-gray-600">Loading report data...</div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">📈 Admin Reports Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-5 text-center">
          <h3 className="text-gray-500">Total Listings</h3>
          <p className="text-2xl font-bold text-indigo-600">{propertyReport.total}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-5 text-center">
          <h3 className="text-gray-500">Approved Listings</h3>
          <p className="text-2xl font-bold text-green-600">{propertyReport.approved}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-5 text-center">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold text-blue-600">{userReport.total}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-5 text-center">
          <h3 className="text-gray-500">Agents</h3>
          <p className="text-2xl font-bold text-purple-600">{userReport.withListings}</p>
        </div>
      </div>

      {/* Time Filter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">📊 Listings Over Time</h2>
        <select
          className="border border-gray-300 rounded px-3 py-1 text-sm"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
          <option value="12">Last 12 Months</option>
        </select>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="listings" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🏠 Property Type Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-4 mt-6">
        <button onClick={exportToPDF} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Export as PDF
        </button>
        <button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Export as CSV
        </button>
      </div>
    </div>
  );
}
