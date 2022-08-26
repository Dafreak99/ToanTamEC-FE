import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '../../utils/axios';
import { showToast } from '../../utils/toast';

const initialState = {
  isLoading: true,
  auth: null,
  systemUsers: [],
  detail: null,
};

export const login = createAsyncThunk('login', async (formData, thunkAPI) => {
  try {
    const { data } = await axios.post('user/login', formData);
    return data;
  } catch (error) {
    console.dir(error);

    return thunkAPI.rejectWithValue({ error: error.response.data.error });
  }
});

export const getMe = createAsyncThunk('getMe', async (_, thunkAPI) => {
  try {
    const { data } = await axios('/user/me');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.response.data.error });
  }
});

export const getUsers = createAsyncThunk('getUsers', async (_, thunkAPI) => {
  try {
    const { data } = await axios('user?page=1&pagesize=9999');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.response.data.error });
  }
});

export const getUser = createAsyncThunk('getUser', async (id, thunkAPI) => {
  try {
    const { data } = await axios(`user?id=${id}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.response.data.error });
  }
});

export const createUser = createAsyncThunk(
  'createUser',
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post(`user/register`, formData);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    clearLogin: (state) => {
      state.isLoading = false;
      state.auth = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.auth = payload.user;
    });
    builder.addCase(getMe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.auth = payload.user;
    });
    builder.addCase(getMe.rejected, (state) => {
      state.isLoading = false;
      state.auth = null;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.systemUsers = payload.users;
    });
    builder.addCase(getUsers.rejected, (_, { payload }) => {
      console.log(payload);
      showToast('error', 'Lỗi khi tải thành viên!');
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.detail = payload.user;
    });
    builder.addCase(getUser.rejected, (_, { payload }) => {
      console.log(payload);
      showToast('error', 'Lỗi khi tải thành viên!');
    });
    builder.addCase(createUser.rejected, (_, { payload }) => {
      showToast(
        'error',
        `Lỗi khi tạo thành viên! ${
          payload.error.includes('E11000') && 'Trùng username'
        }`,
      );
    });
  },
});

export const { toggleLoading, clearLogin } = userSlice.actions;

export default userSlice.reducer;
