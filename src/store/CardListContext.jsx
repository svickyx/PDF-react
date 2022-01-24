import { createContext, useCallback, useState } from "react";

export const CardListContext = createContext({
  cardList: [],
  updateCard: (i, cardContent) => {},
  addNewCard: (i) => {},
  deleteOrResetCard: (i) => {},
});

export const CardListContextProvider = ({ children }) => {
  const [cardList, setCardList] = useState([
    {
      id: new Date().getTime(),
      image: "",
      date: "",
      title: "",
      number: "",
      note: "",
    },
  ]);

  const updateCard = useCallback((i, toUpdate) => {
    setCardList((pre) => {
      const updatedCardList = [...pre];
      const newCardContent = { ...updatedCardList[i], ...toUpdate };
      updatedCardList.splice(i, 1, newCardContent);
      return updatedCardList;
    });
  }, []);
  const addNewCard = useCallback((i) => {
    setCardList((pre) => {
      const updatedCardList = [...pre];
      updatedCardList.splice(i + 1, 0, {
        id: new Date().getTime(),
        image: "",
        date: "",
        title: "",
        number: "",
        note: "",
      });
      return updatedCardList;
    });
  }, []);
  const deleteOrResetCard = useCallback((i) => {
    setCardList((pre) => {
      const updatedCardList = [...pre];
      if (updatedCardList.length === 1) {
        updatedCardList.splice(i, 1, {
          id: new Date().getTime(),
          image: "",
          date: "",
          title: "",
          number: "",
          note: "",
        });
      } else {
        updatedCardList.splice(i, 1);
      }
      return updatedCardList;
    });
  }, []);
  return (
    <CardListContext.Provider
      value={{
        cardList,
        updateCard,
        addNewCard,
        deleteOrResetCard,
      }}
    >
      {children}
    </CardListContext.Provider>
  );
};
