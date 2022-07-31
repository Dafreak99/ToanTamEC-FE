import { Icon } from '@chakra-ui/react';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import React from 'react';
import Flatpickr from 'react-flatpickr';
import { BsFillClockFill } from 'react-icons/bs';

function TimePicker({ onChange, defaultDate = new Date(), mode = 'single' }) {
  const options = {
    defaultDate,
    locale: Vietnamese,
    time_24hr: true,
    dateFormat: 'H:i',
    mode,
    noCalendar: true,
    enableTime: true,
    onChange: (time, dateStr, instance) => {
      console.log(time);
    },
  };

  return (
    <div className='relative'>
      <Flatpickr
        className='form-input pl-9 text-slate-500 hover:text-slate-600 font-medium focus:border-slate-300 w-24'
        options={options}
      />
      <div className='absolute top-3 right-auto flex items-center pointer-events-none'>
        <Icon as={BsFillClockFill} ml='1rem' />
      </div>
    </div>
  );
}

export default TimePicker;
