import { useMutation, useQuery, useQueryClient } from 'react-query';
import { axios } from '../utils/axios';
import { showToast } from '../utils/toast';

const getProjects = ({ queryKey }) => {
  let url = '/project';
  if (queryKey[1]) url += `?keyword=${queryKey[1]}`;

  return axios(url);
};

export const useProjects = (keyword) => {
  return useQuery(['projects', keyword], getProjects, {
    onError: () => {
      showToast('error', 'Lỗi khi tải dự án');
    },
    staleTime: Infinity,
    select: ({ data }) => {
      return data.project.map((workContent) => workContent);
    },
  });
};

export const useAddProject = () => {
  const queryClient = useQueryClient();

  return useMutation('add-project', (data) => axios.post('/project', data), {
    onSuccess: () => {
      showToast('success', 'Đã thêm dự án');
      queryClient.invalidateQueries(['projects']);
    },
    onError: () => {
      showToast('error', 'Lỗi khi thêm dự án');
    },
  });
};
