import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

interface MyDatePickerProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({ startDate, setStartDate }) => {
  return (
    <div>
      <DatePicker
        className="form-control form-control-sm mt-2"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy - HH:mm"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1}
        timeCaption="time"
      />
    </div>
  );
};

export default MyDatePicker;
