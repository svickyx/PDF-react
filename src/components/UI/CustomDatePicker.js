import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ handleDisplayDate, date }) => {
  const fromTwDateToUCDate = (twDate) => {
    if (twDate) {
      const [y, m, dd] = twDate.split(".");
      const ucDate = new Date(+y + 1911, +m - 1, +dd);
      return ucDate;
    }
    return null;
  };
  const handleDateChange = (date) => {
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
      selected={fromTwDateToUCDate(date)}
      onChange={handleDateChange}
    />
  );
};

export default CustomDatePicker;
