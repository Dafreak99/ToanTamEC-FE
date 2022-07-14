import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../utils/axios";

const initialState = {
  isLoading: true,
  auth: null,
};

export const login = createAsyncThunk("login", async (formData, thunkAPI) => {
  try {
    const { data } = await axios.post("user/login", formData);
    return data;
  } catch (error) {
    console.dir(error);

    return thunkAPI.rejectWithValue({ error: error.response.data.error });
  }
});

export const getMe = createAsyncThunk("getMe", async (_, thunkAPI) => {
  try {
    const { data } = await axios("user");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.response.data.error });
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleLoading: () => {
      state.loading = !state.loading;
    },
    clearLogin: () => {
      state.isLoading = false;
      state.auth = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.auth = payload;
    });
    builder.addCase(getMe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.auth = payload.user;
    });
    builder.addCase(getMe.rejected, (state, { _payload }) => {
      state.isLoading = false;
      state.auth = null;
    });
  },
});

export const { toggleLoading, clearLogin } = userSlice.actions;

export default userSlice.reducer;
