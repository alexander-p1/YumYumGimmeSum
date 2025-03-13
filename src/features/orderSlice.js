import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    cartItems: [],
    totalAmount: 0,
    eta: null,
    orderValue: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.cartItems.find(item => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload);
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    },

  }
});

export const { addToCart, removeFromCart, clearCart } = orderSlice.actions;
export default orderSlice.reducer;