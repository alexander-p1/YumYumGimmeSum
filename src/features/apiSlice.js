import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/'

/* Hämtar min API-nyckel */
export const postKey = createAsyncThunk(
  'api/postkey',
  async (apiKey, thunkAPI) => {
    try {
      const response = await fetch(`${url}keys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* Skapa en tenant */
export const createTenant = createAsyncThunk(
  'api/createTenant',
  async (tenantData, thunkAPI) => {
    try {
      const { id, ...allowedData } = tenantData;
      console.log('allowed data', allowedData)
      const response = await fetch(`${url}tenants`, {
        method: 'POST',
        headers: {
          'x-zocom': 'apiKey',
        },
        body: JSON.stringify(allowedData) 
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create tenant');
      }
      const data = await response.json();
      console.log('Tenant created:', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* Hämta menyn */
export const fetchMenu = createAsyncThunk(
  'api/fetchMenu',
  async (type, thunkAPI) => {
    try {
      const response = await fetch(`${url}menu?type=${type}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-zocom': 'apiKey',
        }
      })
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch menu');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const placeOrder = createAsyncThunk(
  'api/placeOrder',
  async ({ id, orderData }, thunkAPI) => {
    try {
      // const state = thunkAPI.getState();

      const response = await fetch(`${url}${id}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'x-zocom': 'apiKey',
        },
        body: JSON.stringify(orderData)
      });
      console.log("Order Data:", JSON.stringify(orderData));

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error response data:", errorData);
        throw new Error(errorData.message || 'Failed to place order');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

  }
)

/* createSlice */
const apiSlice = createSlice({
  name: 'api',
  initialState: {
    keyData: null,
    orderData: null,
    tenantData: null,
    menu: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postKey.fulfilled, (state, action) => {
        state.loading = false;
        state.keyData = action.payload;
      })
      .addCase(postKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTenant.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.tenantData = action.payload;
      })
      .addCase(createTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        const menuType = action.meta.arg;
        if (action.payload && action.payload.items) {
          if (menuType === 'wonton') {
            state.menu.wontons = action.payload.items;
          } else if (menuType === 'drink') {
            state.menu.drinks = action.payload.items;
          } else if (menuType === 'dip') {
            state.menu.dips = action.payload.items;
          }
        }

      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload.order;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // .addCase(placeOrder.fulfilled, (state, action) => {
    //   state.orderData = action.payload.order; // Save the order data, including eta and id
    //   state.loading = false;
    // });



  },
});







export default apiSlice.reducer;