import React, { useEffect, useState, useRef } from "react";
import CustomDatePicker from "../UI/CustomDatePicker";
import TextInput from "../UI/TextInput";

const Description = ({ handleDescription }) => {
  const [photoDate, setPhotoDate] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [itemNumber, setItemNumber] = useState("");
  const [note, setNote] = useState("");

  const handleDisplayDate = (displayDate) => {
    setPhotoDate(displayDate);
  };

  useEffect(() => {
    handleDescription({
      date: photoDate,
      title: itemTitle,
      number: itemNumber,
      note: note,
    });
  }, [photoDate, itemTitle, itemNumber, note]);

  return (
    <div className="w-full md:p-3">
      <CustomDatePicker handleDisplayDate={handleDisplayDate} />
      <TextInput
        id="item-title"
        name="item-title"
        placeholder="工程項目(不能超過56個字)"
        onChange={(e) => setItemTitle(e.target.value)}
      />
      <TextInput
        id="item-number"
        name="item-number"
        placeholder="契約項次"
        onChange={(e) => setItemNumber(e.target.value)}
      />
      <TextInput
        id="note"
        name="note"
        placeholder="說明(不能超過56個字)"
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
  );
};

export default Description;
