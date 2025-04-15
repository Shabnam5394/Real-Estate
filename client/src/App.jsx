import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Overview from './pages/AdminDashboard/Overview';
import PropertyManagement from './pages/AdminDashboard/PropertyManagement';
import Settings from './pages/AdminDashboard/Settings';

import Users from './pages/AdminDashboard/Users';
import Reports from './pages/AdminDashboard/Reports';
import Booking from './pages/Booking';
import CartPage from './pages/CartPage';
import { ToastContainer } from 'react-toastify';
import AgentBookings from './components/AgentBookings';

//  Custom wrapper to access location
function AppContent() {
  <ToastContainer />
  const location = useLocation();

  const hideHeader = location.pathname.startsWith('/admindashboard');

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/booking/:listingId" element={<Booking></Booking>}></Route>

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
          <Route path="/agent/bookings" element={<AgentBookings />} />
          
        </Route>

        {/* Admin dashboard with nested routes */}
        <Route path="/admindashboard" element={<AdminDashboard />}>
          {/* Redirect default dashboard to overview */}
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="properties" element={<PropertyManagement></PropertyManagement>}></Route>
          <Route path="reports" element={<Reports></Reports>}></Route>
          <Route path="settings" element={<Settings></Settings>}></Route>

          <Route path="users" element={<Users></Users>}></Route>

          {/* You can add more nested routes here like users, properties, etc. */}
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
