import { useQuery } from 'react-query';
import { axios } from '../utils/axios';

export const useWorkContents = (onSuccess, onError) => {
  return useQuery('work-contents', () => axios('/work-content'), {
    onSuccess,
    onError,
    staleTime: Infinity,
    select: ({ data }) => {
      return data.workContents.map((workContent) => workContent);
    },
  });
};
