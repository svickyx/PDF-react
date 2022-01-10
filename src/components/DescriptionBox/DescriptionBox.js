import React, { useEffect, useState } from "react";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import "./DescriptionBox.css";

const DescriptionBox = ({ handleDescription }) => {
  const [chooseDate, setChooseDate] = useState();
  const [title, setTitle] = useState();
  const [number, setNumber] = useState();
  const [note, setNote] = useState();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      handleDescription({
        title: title,
        number: number,
        note: note,
        date: chooseDate,
      });
    } else {
      handleDescription(null);
    }
  }, [isCompleted, handleDescription]);

  const handleSelectedDate = (selectedDate) => {
    setChooseDate(selectedDate);
  };

  return (
    <div className="description">
      <CustomDatePicker
        handleSelectedDate={handleSelectedDate}
        isCompleted={isCompleted}
      />
      <hr />
      <input
        className="text-input"
        type="text"
        id="title"
        name="title"
        placeholder="工程項目"
        disabled={isCompleted}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setTitle("")}
      />
      <hr />
      <input
        className="text-input"
        type="text"
        id="number"
        name="number"
        placeholder="契約項次"
        disabled={isCompleted}
        onChange={(e) => setNumber(e.target.value)}
        onFocus={() => setNumber("")}
      />
      <hr />
      <input
        className="text-input"
        type="text"
        id="note"
        name="note"
        placeholder="說明"
        disabled={isCompleted}
        onChange={(e) => setNote(e.target.value)}
        onFocus={() => setNote("")}
      />
      <hr />
      <div>
        {!isCompleted ? (
          <button
            className="submit-btn"
            onClick={() => setIsCompleted(!isCompleted)}
          >
            完成
          </button>
        ) : (
          <button
            className="submit-btn"
            onClick={() => setIsCompleted(!isCompleted)}
            style={{ backgroundColor: "#E60023" }}
          >
            重寫
          </button>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
