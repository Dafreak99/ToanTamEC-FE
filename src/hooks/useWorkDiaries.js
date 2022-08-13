import {
  endOfMonth,
  format,
  getMonth,
  isBefore,
  startOfMonth,
  sub,
} from 'date-fns';
import vi from 'date-fns/locale/vi';
import { useMutation, useQuery } from 'react-query';
import { store } from '../features/store';
import { axios } from '../utils/axios';

const getWorkDiaries = ({ queryKey }) => {
  const endDate = queryKey[1];
  const startDate = sub(new Date(endDate), { days: 10 });
  const { _id } = store.getState().user.auth;

  return axios(
    `/work-diary?startDate=${startDate}&endDate=${endDate}&userId=${_id}`,
  );
};

const getActualWorkingDate = () => {
  const { endDate } = store.getState().date;
  const { _id } = store.getState().user.auth;

  const begining = format(startOfMonth(new Date(endDate)), 'yyyy-MM-dd');
  const end = format(endOfMonth(new Date(endDate)), 'yyyy-MM-dd');

  return axios(
    `/work-diary?startDate=${begining}&endDate=${end}&userId=${_id}`,
  );
};

export const useWorkDiaries = (endDate) => {
  return useQuery(['work-diaries', endDate], getWorkDiaries, {
    select: ({ data }) => {
      const accreditedDates = [];
      const iteratedDates = {};
      const logs = data.map((workDiary, i) => {
        const wDate = workDiary.workingDate;
        const [dateInW, dayMonth] = format(new Date(wDate), 'EEEEE-d/M', {
          locale: vi,
        }).split('-');

        let missingDraft = false;
        let excelDate = false;
        let status;

        workDiary.workDiaryDetail.workContents.forEach((workContent) => {
          if (missingDraft) return;
          workContent.docs.forEach((doc) => {
            if (doc.draft) {
              missingDraft = true;
              return;
            }
          });
        });

        const limit = sub(new Date(), { days: 10 });
        excelDate = isBefore(new Date(wDate), limit);
        if (missingDraft && excelDate) {
          status = 'red';
        } else if (missingDraft) {
          status = 'yellow';
        } else {
          status = 'green';
        }

        if (status === 'green') {
          // Update shift when having multiple work diaries with same working date
          if (dayMonth in iteratedDates) {
            if (
              workDiary.shift === 2 ||
              workDiary.shift + iteratedDates[dayMonth].shift === 1
            ) {
              accreditedDates[iteratedDates[dayMonth].location].shift = 2;
            }
          } else {
            iteratedDates[dayMonth] = {
              location: i,
              shift: workDiary.shift,
            };
            accreditedDates[i] = {
              workingDate: {
                dateInW,
                dayMonth,
              },
              shift: workDiary.shift,
            };
          }
        }
        return {
          ...workDiary,
          status,
          workingDate: {
            dateInW,
            dayMonth,
          },
        };
      });

      return {
        logs,
        accreditedDates,
      };
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

export const useCountActualWorkingDate = (currentDate) => {
  const month = getMonth(new Date(currentDate)) + 1;

  return useQuery(['actual-working-dates', month], getActualWorkingDate, {
    select: ({ data }) => {
      const iteratedDates = {};
      const accreditedDates = [];

      data.forEach((workDiary, i) => {
        const wDate = workDiary.workingDate;
        let missingDraft = false;
        let excelDate = false;
        let status;

        workDiary.workDiaryDetail.workContents.forEach((workContent) => {
          if (missingDraft) return;
          workContent.docs.forEach((doc) => {
            if (doc.draft) {
              missingDraft = true;
              return;
            }
          });
        });

        const limit = sub(new Date(), { days: 10 });
        excelDate = isBefore(new Date(wDate), limit);

        if (missingDraft && excelDate) {
          status = 'red';
        } else if (missingDraft) {
          status = 'yellow';
        } else {
          status = 'green';
        }

        if (status === 'green') {
          const { shift, workingDate } = workDiary;
          const existed = workingDate in iteratedDates;

          if (existed) {
            if (shift === 2 || shift + iteratedDates[workingDate].shift === 1) {
              accreditedDates[iteratedDates[workingDate].location].shift = 2;
            }
          } else {
            iteratedDates[workingDate] = {
              location: i,
              shift,
            };

            accreditedDates[i] = {
              workingDate,
              shift,
            };
          }
        }
      });

      return accreditedDates.reduce((initial, accum) => {
        return initial + (accum.shift === 2 ? 1 : 0.5);
      }, 0);
    },
  });
};
