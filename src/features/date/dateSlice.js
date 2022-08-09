import { createSlice } from '@reduxjs/toolkit';
import { add, format, sub } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = startDate;

  while (currentDate <= stopDate) {
    const [dateInW, day] = format(currentDate, 'EEEEE-dd', {
      locale: viLocale,
    }).split('-');
    dateArray.push({ dateInW, day });
    currentDate = add(currentDate, { days: 1 });
  }

  return dateArray;
}

const initialState = {
  endDate: format(new Date(), 'yyyy-MM-dd'),
  dates: getDates(sub(new Date(), { days: 9 }), new Date()),
};

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setEndDate: (state, { payload }) => {
      state.endDate = format(new Date(payload), 'yyyy-MM-dd');
      state.dates = getDates(
        sub(new Date(payload), { days: 9 }),
        new Date(payload),
      );
    },
  },
});

export const { setEndDate } = dateSlice.actions;

export default dateSlice.reducer;
