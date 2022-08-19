import { useQuery } from 'react-query';
import { axios } from '../utils/axios';

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
