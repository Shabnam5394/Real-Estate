import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/user/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.offer ? item.discountPrice : item.regularPrice) * item.quantity;
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">🛒 Your Favorite List</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-lg text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border rounded-xl shadow hover:shadow-md transition duration-300 bg-white"
            >
              <div className="flex items-center gap-4 w-full md:w-2/3">
                <img
                  src={item.imageUrls[0]}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg transition-transform hover:scale-105 duration-300"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.type === 'rent' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {item.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <p className="text-lg font-bold text-green-600">
                    ${item.offer ? item.discountPrice.toLocaleString() : item.regularPrice.toLocaleString()}
                  </p>
                  
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200"
                >
                  Remove
                </button>
                <button
                  onClick={() => navigate(`/booking/${item._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
                >
                  Checkout
                </button>
              </div>
            </div>
          ))}


        </div>
      )}
    </div>
  );
}
