import { format, sub } from 'date-fns';
import vi from 'date-fns/locale/vi';
import { useMutation, useQuery } from 'react-query';
import { store } from '../features/store';
import { axios } from '../utils/axios';

const getWorkDiaries = () => {
  const endDate = format(new Date(), 'yyyy-MM-dd');
  const startDate = format(sub(new Date(endDate), { days: 10 }), 'yyyy-MM-dd');
  const userId = store.getState().user.auth._id;

  return axios(
    `/work-diary?startDate=${startDate}&endDate=${endDate}&userId=${userId}`,
  );
};

export const useWorkDiaries = () => {
  return useQuery('work-diaries', getWorkDiaries, {
    staleTime: 30000000,
    select: ({ data }) => {
      return data.map((workDiary) => {
        const [dateInW, day] = format(
          new Date(workDiary.workingDate),
          'EEEEE-dd',
          {
            locale: vi,
          },
        ).split('-');
        return {
          ...workDiary,
          workingDate: {
            dateInW,
            day,
          },
        };
      });
    },
  });
};

export const useAddWorkDiary = (onSuccess, onError) => {
  return useMutation(
    'add-work-dairy',
    (data) => axios.post('/work-diary/', data),
    { onSuccess, onError },
  );
};
