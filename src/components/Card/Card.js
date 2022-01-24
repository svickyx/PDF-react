import React, { useEffect, useState, useCallback, useContext } from "react";
import Description from "./Description";
import Button from "../UI/Button";

import closeIcon from "../../asset/logo/circle-xmark-regular.svg";
import ImageHandler from "./ImageHandler/ImageHandler";
import { CardListContext } from "../../store/CardListContext";

const Card = ({
  image,
  date,
  title,
  number,
  note,
  cardIndex,
  addNewCard,
  isLast,
  deleteOrResetCard,
}) => {
  return (
    <div className="rounded-md bg-white py-4 px-4 flex flex-col mb-3">
      <div className="flex justify-end mb-2">
        <img
          onClick={() => deleteOrResetCard(cardIndex)}
          className="cursor-pointer"
          src={closeIcon}
          alt="close-icon"
          width="20"
          height="20"
        />
      </div>
      <div className="md:flex justify-between items-center">
        <ImageHandler cardIndex={cardIndex} image={image} />
        <Description cardIndex={cardIndex} {...{ date, title, number, note }} />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => addNewCard(cardIndex)}>
          {isLast ? "新增" : "insert"}
        </Button>
      </div>
    </div>
  );
};

export default Card;
