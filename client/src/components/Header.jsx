import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserSuccess } from "../redux/user/userSlice.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Header() {
  const cart = useSelector((state) => state.cart.items); // Access `items` directly, not `cart.cart`

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/signout", { withCredentials: true });
      dispatch(signOutUserSuccess()); // ✅ Clear user from Redux store
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    console.log(cart);
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-800 shadow-md sticky top-0 z-10'>
      <div className='flex justify-between items-center max-w-7xl mx-auto p-4'>
        <Link to='/' className="flex items-center">
          <h1 className='text-white text-xl sm:text-2xl font-semibold tracking-wide'>
            <span className='text-slate-100'>Real</span>
            <span className='text-slate-200'>Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-white p-2 rounded-lg flex items-center shadow-md'>
          <input
            type='text'
            placeholder='Search properties...'
            className='bg-transparent focus:outline-none w-24 sm:w-64 p-2 rounded-md shadow-inner'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="text-indigo-600 hover:text-indigo-800">
            <FaSearch className='text-xl' />
          </button>
        </form>
        <ul className='flex gap-4 text-white items-center'>
          <Link to='/'>
            <li className='hidden sm:inline text-lg hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-lg hover:underline'>
              About
            </li>
          </Link>
          <Link to="/cart" className="relative flex items-center">
            <FaHeart className="text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {currentUser ? (
            <div className="flex items-center gap-4">
              <Link to='/profile'>
                <img
                  className='rounded-full h-8 w-8 object-cover border-2 border-white'
                  src={currentUser.avatar || "/default-avatar.png"}
                  alt="profile"
                />
              </Link>
              <button 
  onClick={handleSignOut} 
  className="flex items-center gap-1 px-3 py-1 text-sm bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-md hover:scale-105 hover:from-red-600 hover:to-red-800 transition-all duration-300 ease-in-out"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V4m0 0H5a2 2 0 00-2 2v12a2 2 0 002 2h8" />
  </svg>
  Sign Out
</button>


            </div>
          ) : (
            <Link to='/signin'>
              <li className='hidden sm:inline text-lg hover:underline'>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
