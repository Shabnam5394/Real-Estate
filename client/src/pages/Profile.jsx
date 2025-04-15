import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserSuccess, signOutUserFailure } from "../redux/user/userSlice.js";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Profile({setUser}) {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // To redirect after deletion
  const [userListings, setUserListings]=useState([]);
  const [showListingsError,setShowListingError]=useState(false);

  console.log("Current User Data:", currentUser);

  // State for input fields
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission for updating profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    try {
      const res = await axios.put(`http://localhost:5000/api/update/${currentUser._id}`, formData);
      console.log("Updated User Response:", res.data); // Debugging
      
      // setUser(res.data.data);  // Update local state after API call
      dispatch(updateUserSuccess(res.data.data)); // Update Redux state with new user data
      alert("Profile updated successfully!");
    } catch (error) {
      dispatch(updateUserFailure());
      console.error("Error updating user:", error);
      alert("Failed to update profile");
    }
  };

    const imageUrl = currentUser.avatar?.startsWith("http")
    ? currentUser.avatar
    : `http://localhost:5000/uploads/${currentUser.avatar}`;

  // Handle user deletion
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    dispatch(deleteUserStart());

    try {
      await axios.delete(`http://localhost:5000/api/delete/${currentUser._id}`);
      dispatch(deleteUserSuccess());
      alert("Account deleted successfully!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.error("Error deleting user:", error);
      alert("Failed to delete account");
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.get(`http://localhost:5000/api/auth/signout`, { withCredentials: true });
      dispatch(signOutUserSuccess()); // ✅ Clears user from Redux store
      navigate("/signin"); // ✅ Redirects to sign-in page
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleShowListings = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/getUserProperty/${currentUser._id}`);
      const result = await res.json();
  
      if (!result.data) {
        console.error("Failed to fetch listings");
        setShowListingError(true);
        return;
      }
  
      console.log("Listings fetched successfully:", result.data);
      setUserListings(result.data); // <-- ✅ data contains the array of listings
    } catch (error) {
      console.error("Error fetching listings:", error);
      setShowListingError(true);
    }
};

const handleListingDelete = async(listingId)=>{
  try{
    const res = await fetch(`http://localhost:5000/api/deleteproperties/${listingId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }

    setUserListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );

  }catch(err){
    console.log(err)
  }
}




  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onClick={() => fileRef.current.click()}
          src={imageUrl}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          
          type="submit"
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteAccount}>
          Delete account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>Sign out</span>
      </div>
      
      
      <button onClick={handleShowListings} className="text-green-700 w-full">Show Listing</button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
               Your Listings
          </h1>
          {userListings.map((listing)=>(
            <div
               key={listing._id}
               className="border rounded-lg p-3 flex justify-between items-center gap-4"           
            >
              <Link to={`/listing/${listing._id}`}>
                <img 
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16 object-contain"
                    >
                </img>
              </Link>
              <Link
                  className="text-slate-700 font-semibold hover:underline truncate flex-1"
                  to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col items-center">

                <button onClick={()=>handleListingDelete(listing._id)} className="text-red-700 uppercase">
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`} >
                   <button className="text-green-700 uppercase">Edit</button>
                </Link>
              
              </div>
        
        </div>
      ))}
    
    </div>
  )}
  </div>
  )}

  //7:9