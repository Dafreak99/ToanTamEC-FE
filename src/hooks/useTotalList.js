import { useMutation, useQuery } from 'react-query';
import { axios } from '../utils/axios';
import { showToast } from '../utils/toast';

const getTotalList = ({ queryKey }) => {
  let url = '/total-list/project';
  if (queryKey[1]) url += `/${queryKey[1]}`;

  return axios(url);
};

export const useTotalList = (keyword) => {
  return useQuery(['total-list', keyword], getTotalList, {
    refetchOnWindowFocus: false,
    onError: () => {
      showToast('error', 'Lỗi khi tải tổng kê');
    },
    select: ({ data }) => {
      return data;
    },
  });
};

export const useAddTotalList = (onSuccess, onError) => {
  return useMutation(
    'add-total-list',
    (data) => axios.post('/total-list', data),
    {
      onSuccess,
      onError,
    },
  );
};

export const useUpdateTotalList = (onSuccess, onError) => {
  return useMutation(
    'add-total-list',
    (data) => axios.put('/total-list', data),
    {
      onSuccess,
      onError,
    },
  );
};
