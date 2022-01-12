import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";

const CustomDatePicker = ({ handleSelectedDate, isCompleted }) => {
  const [startDate, setStartDate] = useState();

  //update date if changes
  const handleDateChange = (date) => {
    setStartDate(date);
    const year = date.getFullYear() - 1911;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const selectedDate = `${year}.${month}.${day}`;
    handleSelectedDate(selectedDate);
  };
  return (
    <>
      <DatePicker
        className="date-picker"
        dateFormat="yyyy/MM/dd"
        selected={startDate}
        onChange={handleDateChange}
        placeholderText="新增日期"
        disabled={isCompleted}
      />
    </>
  );
};

export default CustomDatePicker;
