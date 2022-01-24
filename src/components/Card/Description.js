import React, { useEffect, useState, useContext } from "react";
import { CardListContext } from "../../store/CardListContext";
import CustomDatePicker from "../UI/CustomDatePicker";
import TextInput from "../UI/TextInput";

const Description = ({ cardIndex, title, number, note }) => {
  const { updateCard } = useContext(CardListContext);

  const handleDisplayDate = (displayDate) => {
    handleUpdateCard("date", displayDate);
  };
  const handleUpdateCard = (key, value) => {
    updateCard(cardIndex, { [key]: value });
  };

  return (
    <div className="w-full md:p-3">
      <CustomDatePicker handleDisplayDate={handleDisplayDate} />
      <TextInput
        id="item-title"
        name="item-title"
        placeholder="工程項目(不能超過56個字)"
        value={title}
        onChange={(e) => handleUpdateCard("title", e.target.value)}
      />
      <TextInput
        id="item-number"
        name="item-number"
        placeholder="契約項次"
        value={number}
        onChange={(e) => handleUpdateCard("number", e.target.value)}
      />
      <TextInput
        id="note"
        name="note"
        placeholder="說明(不能超過56個字)"
        value={note}
        onChange={(e) => handleUpdateCard("note", e.target.value)}
      />
    </div>
  );
};

export default Description;
