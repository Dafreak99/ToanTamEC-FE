import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '../../utils/axios';
import { showToast } from '../../utils/toast';

const initialState = {
  projects: [],
  detail: null,
};

export const getProjects = createAsyncThunk(
  'getProjects',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios('/project');
      return data;
    } catch (error) {
      console.dir(error);

      return thunkAPI.rejectWithValue({ error: error.response.data.error });
    }
  },
);

export const getProject = createAsyncThunk(
  'getProject',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios(`/project/${id}`);
      return data;
    } catch (error) {
      console.dir(error);

      return thunkAPI.rejectWithValue({ error: error.response.data.error });
    }
  },
);

export const addProject = createAsyncThunk(
  'addProject',
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post('project', formData);
      return data;
    } catch (error) {
      console.dir(error);

      return thunkAPI.rejectWithValue({ error: error.response.data.error });
    }
  },
);

export const deleteProject = createAsyncThunk(
  'deleteProject',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`project/${id}`);
      return data;
    } catch (error) {
      console.dir(error);

      return thunkAPI.rejectWithValue({ error: error.response.data.error });
    }
  },
);

export const updateProject = createAsyncThunk(
  'updateProject',
  async ({ id, formData }, thunkAPI) => {
    try {
      const { data } = await axios.put(`project/${id}`, formData);
      return data;
    } catch (error) {
      console.dir(error);

      return thunkAPI.rejectWithValue({ error: error.response.data.error });
    }
  },
);

export const addMember = createAsyncThunk(
  'addMember',
  async ({ id, formData }, thunkAPI) => {
    try {
      const { data } = await axios.post(`project/${id}/member`, {
        member: formData,
      });
      return data;
    } catch (error) {
      console.dir(error);

      return thunkAPI.rejectWithValue({ error: error.response.data.error });
    }
  },
);

export const deleteMember = createAsyncThunk(
  'deleteMember',
  async ({ projectId, memberId }, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `project/${projectId}/member/${memberId}`,
        {
          memberId,
        },
      );
      return data;
    } catch (error) {
      console.dir(error);

      return thunkAPI.rejectWithValue({ error: error.response.data.error });
    }
  },
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProject.fulfilled, (state, { payload }) => {
      state.projects.push(payload.project);
      showToast('success', 'Thêm dự án thành công!');
    });
    builder.addCase(addProject.rejected, (_, { payload }) => {
      console.log(payload);
      showToast('error', 'Lỗi khi thêm dự án!');
    });

    builder.addCase(deleteProject.fulfilled, (state, { payload }) => {
      state.projects.filter((project) => project._id !== payload.project._id);
      state.detail = null;
    });
    builder.addCase(deleteProject.rejected, (_, { payload }) => {
      console.log(payload);
      showToast('error', 'Lỗi khi xoá dự án!');
    });

    builder.addCase(updateProject.fulfilled, (state, { payload }) => {
      state.detail = { ...state.detail, ...payload.project };
    });
    builder.addCase(updateProject.rejected, (_, { payload }) => {
      console.log(payload);
      showToast('error', 'Lỗi khi cập nhật dự án!');
    });

    builder.addCase(getProjects.fulfilled, (state, { payload }) => {
      state.projects = payload.project;
    });
    builder.addCase(getProjects.rejected, (_, { payload }) => {
      console.log(payload);
      showToast('error', 'Lỗi khi tải dự án!');
    });

    builder.addCase(getProject.fulfilled, (state, { payload }) => {
      state.detail = {
        ...payload.project,
        members: [...payload.projectMember],
      };
    });
    builder.addCase(getProject.rejected, (_, { payload }) => {
      console.log(payload);
      showToast('error', 'Lỗi khi tải dự án!');
    });

    builder.addCase(addMember.fulfilled, (state, { payload }) => {
      const { projectMember } = payload;

      const index = state.detail.members.findIndex(
        (member) => member._id === projectMember._id,
      );

      if (index === -1) {
        state.detail.members.push(projectMember);
      } else {
        const { members } = state.detail;

        state.detail.members = [
          ...members.slice(0, index),
          projectMember,
          ...members.slice(index + 1),
        ];
      }
    });
    builder.addCase(addMember.rejected, (_, { payload }) => {
      console.log(payload);
      showToast('error', 'Lỗi khi thêm thành viên!');
    });

    builder.addCase(deleteMember.fulfilled, (state, { payload }) => {
      state.detail.members = [...payload.projectMembers];
    });
    builder.addCase(deleteMember.rejected, (_, { payload }) => {
      console.log(payload);
      showToast('error', 'Lỗi xoá thành viên!');
    });
  },
});

export const { toggleLoading, clearLogin } = projectSlice.actions;

export default projectSlice.reducer;
