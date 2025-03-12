import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        cartItems: [],
        totalAmount: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const itemExists = state.cartItems.find(item => item.id === action.payload.id);
            if (itemExists) {
              // If item already exists, increase quantity
              itemExists.quantity += 1;
            } else {
              // Otherwise add new item with quantity 1
              state.cartItems.push({ ...action.payload, quantity: 1 });
            }
            // Recalculate total
            state.totalAmount = state.cartItems.reduce(
              (total, item) => total + item.price * item.quantity, 
              0
            );
          },
          removeFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload);
            if (state.cartItems[itemIndex].quantity > 1) {
              // If more than 1, just reduce quantity
              state.cartItems[itemIndex].quantity -= 1;
            } else {
              // If only 1 left, remove from cart
              state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            }
            // Recalculate total
            state.totalAmount = state.cartItems.reduce(
              (total, item) => total + item.price * item.quantity, 
              0
            );
          },
          clearCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
          }
        }
      });
      
      export const { addToCart, removeFromCart, clearCart, orderReducer } = orderSlice.actions;
      export default orderSlice.reducer;