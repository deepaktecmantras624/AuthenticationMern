import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { addProduct } from "../../../controllers/productController";

// Create Product Action
export const createProduct = createAsyncThunk(
  "createProduct",
  async ({title, description, price}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/products",
        {title,description, price}
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Read Product Action
export const showProduct = createAsyncThunk(
  "showProduct",
  
  async (arge, { rejectWithValue }) => {
    try {
        console.log("Im inside ");
        const token=localStorage.getItem("token")
      const response = await axios.get("http://localhost:3001/api/products",
      {
        headers:{
          Authorization:`${token}`,
    }});
    console.log("Product Slice side data:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Delete Product Action
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/products/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update Product Action
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/products/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    product: [],
    loading: false,
    error: null,
  },

  extraReducers: {
    [showProduct.pending]: (state) => {
      state.loading = true;
    },
    [showProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [showProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createProduct.pending]: (state) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product.push(action.payload);
    // state.product=action.payload
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.product = state.product.filter((e) => e.id !== id);
      }
      console.log("Delete Action:", action.payload);
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = state.product.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;