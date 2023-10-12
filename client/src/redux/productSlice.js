import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { addProduct } from "../../../controllers/productController";

// Create Product Action
export const createProduct = createAsyncThunk(
  "createProduct",
  async ({ title, description, price, imageUrl}, { rejectWithValue }) => {
    if(!title || !description || !price){
      alert("Enter All Product Fields")
      throw new Error("Enter All Product Fields")
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3001/api/products", {
        title,
        description,
        price,
        imageUrl
      },{
        headers: {
          Authorization: `${token}`,
        },
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
  "showProductById",

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
  async ({id,values}, { rejectWithValue }) => {
    
    try {
      console.log("🚀 ~ file: productSlice.js:100 ~ value:", values)
      console.log("update coming from productSlice!!");
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3001/api/products/${id}`,
        values,
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
    singleId:[]
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
      console.log("🚀 ~ file: productSlice.js:136 ~ state:", JSON.parse(JSON.stringify(state)))
      state.loading = false;
      state.singleId = action.payload;
      console.log("🚀 ~ file: productSlice.js:139 ~ state.product:", JSON.parse(JSON.stringify(state)))
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
    [updateProduct.fulfilled]:(state,action)=>{
      state.loading=false;
      console.log("🚀 ~ file: productSlice.js:179 ~ state.product=state.product.map ~ state.product:", state.product,action)
      const afterProduct=JSON.parse(JSON.stringify(state.product))
      console.log("🚀 ~ file: productSlice.js:184 ~ state.product=afterProduct.map ~ afterProduct:", afterProduct)
    },
   
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
