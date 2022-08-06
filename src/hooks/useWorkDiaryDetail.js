import { useMutation } from 'react-query';
import { axios } from '../utils/axios';

const updateDraftDoc = async (data) => {
  return axios.put('/work-diary-detail', data, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });
};

export const useUpdateDraftDoc = (onSuccess, onError) => {
  return useMutation('add-work-dairy', updateDraftDoc, { onSuccess, onError });
};
