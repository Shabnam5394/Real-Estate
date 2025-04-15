import { Outlet, useLocation, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx'; // ✅ useTheme from context

export default function AdminDashboard() {
  const { sidebarPosition, layout, fontSize, darkMode } = useTheme(); // ✅ added darkMode
  const location = useLocation();

  const menuItems = [
    { label: 'Overview', path: '/admindashboard/overview' },
    { label: 'Users', path: '/admindashboard/users' },
    { label: 'Properties', path: '/admindashboard/properties' },
    { label: 'Reports', path: '/admindashboard/reports' },
    { label: 'Settings', path: '/admindashboard/settings' },
  ];

  return (
    <div
      className={`flex min-h-screen ${
        sidebarPosition === 'right' ? 'flex-row-reverse' : 'flex-row'
      } ${layout === 'compact' ? 'p-2' : 'p-6'} ${
        fontSize === 'small'
          ? 'text-sm'
          : fontSize === 'large'
          ? 'text-lg'
          : 'text-base'
      } ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-black'}`}
    >
      {/* Sidebar + Content Wrapper */}
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <div className={`w-64 p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-slate-900 text-white'}`}>
          <h2 className="text-2xl font-bold mb-10 text-center">Admin Panel</h2>
          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-slate-700 font-semibold'
                      : 'hover:bg-slate-800 hover:text-gray-200'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 p-6 overflow-auto ${
            darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-black'
          } transition-colors duration-300`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
