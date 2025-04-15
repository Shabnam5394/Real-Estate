import { useState, useEffect } from 'react';
import StatsCard from '../../components/StatsCard';
import RecentPropertiesTable from '../../components/RecentPropertiesTable';
import PropertyChart from '../../components/PropertyChart';
import { FaHome, FaUsers, FaCalendarDay, FaTags } from 'react-icons/fa';

export default function Overview() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [listingsToday, setListingsToday] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [allProperties, setAllProperties] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await fetch('http://localhost:5000/api/users');
        const usersData = await usersRes.json();
        setTotalUsers(usersData.data.length);

        const propertiesRes = await fetch('http://localhost:5000/properties/get');
        const propertiesData = await propertiesRes.json();

        setAllProperties(propertiesData);
        setTotalProperties(propertiesData.length);

        const today = new Date().toISOString().split('T')[0];
        const todayListings = propertiesData.filter(
          (property) =>
            new Date(property.createdAt).toISOString().split('T')[0] === today
        );
        setListingsToday(todayListings.length);

        const categorySet = new Set(propertiesData.map((property) => property.type));
        setTotalCategories(categorySet.size);

        const last7Days = [...Array(7)].map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const count = propertiesData.filter(
            (p) => new Date(p.createdAt).toISOString().split('T')[0] === dateStr
          ).length;
          return { date: dateStr, count };
        }).reverse();

        setChartData(last7Days);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    fetchStats();
  }, []);

  const recentProperties = allProperties
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 ">Dashboard Overview</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Properties" value={totalProperties} icon={<FaHome />} bg="bg-blue-600" />
        <StatsCard title="Total Users" value={totalUsers} icon={<FaUsers />} bg="bg-green-600" />
        <StatsCard title="Listings Today" value={listingsToday} icon={<FaCalendarDay />} bg="bg-purple-600" />
        <StatsCard title="Property Categories" value={totalCategories} icon={<FaTags />} bg="bg-rose-600" />
      </div>

      {/* Chart */}
      <div className="mb-10">
        <PropertyChart data={chartData} />
      </div>

      {/* Recent Properties Table */}
      <RecentPropertiesTable properties={recentProperties} />
    </div>
  );
}
