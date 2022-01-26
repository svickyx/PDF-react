import React, { useCallback, useContext, useEffect, useState } from "react";
import { CardListContext } from "../store/CardListContext";
import Card from "./Card/Card";

const CardListContainer = () => {
  const { cardList, addNewCard, deleteOrResetCard } =
    useContext(CardListContext);
  console.log(cardList);
  return (
    <div>
      {cardList.map((props, i) => (
        <Card
          key={"card" + props.id}
          {...props}
          cardIndex={i}
          addNewCard={addNewCard}
          deleteOrResetCard={deleteOrResetCard}
          isLast={i === cardList.length - 1}
        />
      ))}
    </div>
  );
};

export default CardListContainer;
