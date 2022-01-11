import React, { useCallback, useEffect, useMemo, useState } from "react";
import BlockContainer from "../../components/BlockContainer/BlockContainer";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { CSVLink, CSVDownload } from "react-csv";
import ComponentToPrint from "../ComponentToPrint/ComponentToPrint";
import ProjectName from "../../components/ProjectName/ProjectName";

import "./ComponentToEdit.css";

const ComponentToShow = () => {
  const [imagesUrls, setImagesUrls] = useState(() => Array(3).fill(null));
  const [completedDescriptions, setCompletedDescriptions] = useState(() =>
    Array(3).fill(null)
  );
  const [projectInfo, setProjectInfo] = useState({
    projectName: "",
    designer: "",
  });

  const handleProjectInfo = (info) => {
    setProjectInfo(info);
  };

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
    // const isImagesDone = imagesUrls.filter((file) => !file).length === 0;
    return (
      isDescriptionsDone && projectInfo.designer && projectInfo.projectName
    );
  }, [completedDescriptions, projectInfo]);

  return (
    <div className="page-container">
      <h3 style={{ textAlign: "center" }}>施工照片</h3>
      {isAllCompleted && (
        <div style={{ textAlign: "center" }}>
          <PDFDownloadLink
            document={
              <ComponentToPrint
                projectInfo={projectInfo}
                imagesUrls={imagesUrls}
                completedDescriptions={completedDescriptions}
              />
            }
            fileName="image.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "加載中......" : <button>點擊這裡下載PDF</button>
            }
          </PDFDownloadLink>
        </div>
      )}
      <ProjectName handleProjectInfo={(info) => handleProjectInfo(info)} />
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
