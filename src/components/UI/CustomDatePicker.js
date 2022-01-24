import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ handleDisplayDate }) => {
  const [selectedDate, setSelectedDate] = useState();
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const year = date.getFullYear() - 1911;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const displayDate = `${year}.${month}.${day}`;
    handleDisplayDate(displayDate);
  };
  return (
    <DatePicker
      className="px-3 py-2 mb-1 w-full rounded-md border-b border-main"
      placeholderText="新增日期"
      selected={selectedDate}
      onChange={handleDateChange}
    />
  );
};

export default CustomDatePicker;
