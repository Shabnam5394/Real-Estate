import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],  // Store items in cart
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(cartItem => cartItem._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;  // If item exists, increment quantity
      } else {
        state.items.push({ ...item, quantity: 1 });  // Otherwise, add new item
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);  // Remove item by ID
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
