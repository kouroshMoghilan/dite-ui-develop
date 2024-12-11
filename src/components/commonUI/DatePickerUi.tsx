import { useState } from 'react';
import { DatePicker } from "zaman";
import { DatePickerProps } from '../../types/formTypes';
import { CalendarOutlined, CloseCircleOutlined } from '@ant-design/icons';

export const DatePickerUi = ({ onChangeValue }: DatePickerProps) => {
  const [showText, setShowText] = useState(false);
  const [key, setKey] = useState(0); // Add a key state

  const onChange = (e: any) => {
    onChangeValue(e.value);
    const element = document.querySelector('.rdp__modal');
    element?.classList.add('!hidden');
    setShowText(true);
  }

  const clearData = () => {
    onChangeValue(null);
    setShowText(false);
    setKey(prevKey => prevKey + 1); // Update key to re-render DatePicker
  };

  return (
    <div className='relative date-picker' style={{ direction: "rtl" }}>
      <span className='absolute top-1/4 start-2'><CalendarOutlined /></span>
      <span className={`bg-input absolute top-1/4 text-[13px] text-gray-40 start-8 px-1 pointer-events-none text-gray-400 ${showText ? 'hidden' : ''}`}>تاریخ را وارد کنید</span>
      <DatePicker
        key={key} // Use key to force re-render
        accentColor='#5932EA'
        customShowDateFormat={showText ? 'YYYY-MM-DD' : ''}
        position='center'
        inputClass={`bg-input border-0 w-full !text-black !text-[13px] py-3 px-4 p-custom`}
        onChange={onChange}
        direction='rtl'
      />
      {
        showText &&
        <button type='button' className='absolute end-3 top-1/4' onClick={clearData}>
          <CloseCircleOutlined />
        </button>
      }
    </div>
  );
};
