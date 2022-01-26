import React, { useState, useMemo } from "react";
import CardListContainer from "./components/CardListContainer";
import DownloadBtns from "./components/DownloadBtns";
import FinalButtons from "./components/FinalButtons";
import ProjectTitle from "./components/ProjectTitle";
import { CardListContextProvider } from "./store/CardListContext";

const App = () => {
  const [cardListForPdf, setCardListForPdf] = useState([]);
  const [cardListForExcel, setCardListForExcel] = useState([]);
  const [projectInfo, setProjectInfo] = useState({
    projectName: "",
    designer: "",
  });
  const handleProjectInfo = (info) => {
    setProjectInfo(info);
  };

  const isAllCompleted = useMemo(() => {
    const isCardListForPdfDone = cardListForPdf.length !== 0;
    return (
      isCardListForPdfDone && projectInfo.designer && projectInfo.projectName
    );
  }, [cardListForPdf, projectInfo]);

  return (
    <CardListContextProvider>
      <div className="bg-main h-screen w-screen overflow-y-auto">
        <div className="text-xl text-center pt-3">施工照片</div>
        <div className="w-10/12 mx-auto flex flex-col py-3 md:w-9/12 lg:w-8/12">
          {isAllCompleted ? (
            <DownloadBtns
              cardListForPdf={cardListForPdf}
              cardListForExcel={cardListForExcel}
              projectInfo={projectInfo}
            />
          ) : (
            <FinalButtons
              setCardListForPdf={setCardListForPdf}
              setCardListForExcel={setCardListForExcel}
            />
          )}
          <ProjectTitle handleProjectInfo={(info) => handleProjectInfo(info)} />
          <CardListContainer />
        </div>
      </div>
    </CardListContextProvider>
  );
};

export default App;
