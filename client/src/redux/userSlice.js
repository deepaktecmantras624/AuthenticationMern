import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// Create Registration Action
export const createUser = createAsyncThunk(
  "createUser",
  async ({name, email,password}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/register",
        {name,email,password}
        );
        console.log("CreateUser:Coming or not:",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Login  Action
export const loginUser = createAsyncThunk(
  "showProduct",
  async ({email,password}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        {email, password}
      );

      const token = response.data.token;
      

      localStorage.setItem("token", token);
      console.log("Checking Token:",token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
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
      state.user.push(action.payload)
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
      state.error = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
