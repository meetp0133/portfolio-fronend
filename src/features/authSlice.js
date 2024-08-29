import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../api/auth'

export const loginUserThunk = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const data = await loginUser(userData);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const registerUserThunk = createAsyncThunk('user/register', async (formData, { rejectWithValue }) => {
  try {
    const data = await registerUser(formData);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectAuthStatus = (state) => state.auth.status; // Selector to get 'status'
export default userSlice.reducer;
