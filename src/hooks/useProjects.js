import { useMutation, useQuery, useQueryClient } from 'react-query';
import { axios } from '../utils/axios';
import { showToast } from '../utils/toast';

export const useProjects = (onSuccess, onError) => {
  return useQuery('projects', () => axios('/project'), {
    onSuccess,
    onError,
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
