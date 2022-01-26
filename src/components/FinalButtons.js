import { useContext } from "react";
import { CardListContext } from "../store/CardListContext";

const FinalButtons = ({ setCardListForPdf, setCardListForExcel }) => {
  const { cardList } = useContext(CardListContext);
  const handleSetFinal = () => {
    let pdfCardList = [...cardList];
    let excelCardList = [...cardList];
    if (cardList.length % 3 !== 0) {
      const remain = cardList.length % 3;
      for (let i = 0; i < 3 - remain; i++) {
        pdfCardList.push({
          id: new Date().getTime() + `${i}`,
          image: "",
          date: "",
          title: "",
          number: "",
          note: "",
        });
      }
    }

    setCardListForExcel(excelCardList);
    setCardListForPdf(pdfCardList);
    localStorage.removeItem("cardList");
    localStorage.removeItem("projectInfo");
    return;
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleSetFinal}
        className="h-[30px] border-none bg-green-600 text-white py-0 px-3 rounded-lg cursor-pointer"
      >
        完成編輯
      </button>
    </div>
  );
};

export default FinalButtons;
