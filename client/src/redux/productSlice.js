import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { addProduct } from "../../../controllers/productController";

// Create Product Action
export const createProduct = createAsyncThunk(
  "createProduct",
  async ({ title, description, price }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/products", {
        title,
        description,
        price,
      });
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
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/api/products", {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("Product Slice side data:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// read product by id
export const showProductById = createAsyncThunk(
  "showProduct",

  async (id, { rejectWithValue }) => {
    try {
      console.log("Im inside ");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3001/api/products/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
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
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3001/api/products/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
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
  async ({ value, id }, { rejectWithValue }) => {
    try {
      console.log("update coming from productSlice!!");
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3001/api/products/${id}`,
        value,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log("get from function:lasdjfjjs", response.data);
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
    // show by id
    [showProductById.pending]: (state) => {
      state.loading = true;
    },
    [showProductById.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [showProductById.rejected]: (state, action) => {
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
      // state.product=action.payload
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      console.log('Updated Product Payload:', action.payload);
      state.loading = false;
      // state.product = state.product.map((e) =>
      //   e.id === action.payload.id ? action.payload : e
      // );
      
      const updatedProduct111 = {...action.payload.product};
      console.log("upp:",updatedProduct111);
      // console.log("checking state:",state);

      console.log('STATE',state.product)
      
      // state.product[updatedProduct111._id] = updatedProduct111;

      // state.product
      
      // const {id, ...updatedProductData}=action.payload;
      // state.product[id]=updatedProductData
      
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
