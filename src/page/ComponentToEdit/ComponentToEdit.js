import React, { useCallback, useMemo, useState } from "react";
import BlockContainer from "../../components/BlockContainer/BlockContainer";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import "./ComponentToEdit.css";
import ComponentToPrint from "../ComponentToPrint/ComponentToPrint";

const ComponentToShow = ({ handlePdfViewer }) => {
  const [imagesUrls, setImagesUrls] = useState(() => Array(3).fill(null));
  const [completedDescriptions, setCompletedDescriptions] = useState(() =>
    Array(3).fill(null)
  );
  const handleSetFile = (i, file) => {
    const updateimagesUrls = [...imagesUrls];
    updateimagesUrls.splice(i, 1, file);
    setImagesUrls(updateimagesUrls);
  };

  const handleDescription = useCallback((i, des) => {
    setCompletedDescriptions((preState) => {
      const updateDes = [...preState];
      updateDes.splice(i, 1, des);
      return updateDes;
    });
  }, []);
  const isAllCompleted = useMemo(() => {
    const isDescriptionsDone =
      completedDescriptions.filter((des) => !des).length === 0;
    const isImagesDone = imagesUrls.filter((file) => !file).length === 0;
    return isDescriptionsDone && isImagesDone;
  }, [imagesUrls, completedDescriptions]);
  return (
    <div className="page-container">
      <div className="title-container">
        <h3>竣工照片</h3>
        <p>工程名稱：教學區週邊排水溝及運動場東側通道連鎖磚改善工程</p>
        <p>施工廠商：和諅營造股份有限公司</p>
      </div>
      {isAllCompleted && (
        <div style={{ textAlign: "center" }}>
          <PDFDownloadLink
            document={
              <ComponentToPrint
                imagesUrls={imagesUrls}
                completedDescriptions={completedDescriptions}
              />
            }
            fileName=".pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? <a>加載中......</a> : <button>點擊這裡下載PDF</button>
            }
          </PDFDownloadLink>
        </div>
      )}
      <div className="body">
        {imagesUrls.map((_, i) => (
          <BlockContainer
            key={"block" + i}
            handleSetFile={(file) => handleSetFile(i, file)}
            handleDescription={(des) => handleDescription(i, des)}
          />
        ))}
      </div>
    </div>
  );
};

export default ComponentToShow;
