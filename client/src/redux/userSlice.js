import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// Create Registration Action
export const createUser = createAsyncThunk(
  "createUser",
  async ({ name, email, password, isAdmin }, { rejectWithValue }) => {

    if(!name || !email || !password){
      alert("Enter all the fields")
      throw new Error("Enter all the fields")
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/register",
        { name, email, password, isAdmin }
      );
      console.log("CreateUser:Coming or not:", response.data);
      return { name, email, password, isAdmin };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Login  Action
export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    if (!email || !password) {
       alert("Email and password are required");
       throw new Error("Email and Password are required")
    }
    
      try {
        const response = await axios.post(
          "http://localhost:3001/api/users/login",
          { email, password }
        );
  
        const token = response.data.token;
  
        localStorage.setItem("token", token);
        console.log("Checking Token:", token);
  
        console.log("🚀 ~ file: userSlice.js:39 ~ response.data:", response.data);
        return response.data;
      } catch (error) {
        console.log("🚀 ~ file: userSlice.js:41 ~ error:", error);
        return rejectWithValue(error.response.data);
      }
    
    }
   
);

// Delete Product Action
// export const deleteProduct = createAsyncThunk(
//   "deleteProduct",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost/3001/api/products/${id}`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// Update Product Action
// export const updateProduct = createAsyncThunk(
//   "updateProduct",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `http://localhost/3001/api/products/${data.id}`,
//         data
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },

  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
