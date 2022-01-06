import React, { useCallback, useState } from "react";
import DescriptionBox from "../DescriptionBox/DescriptionBox";
import Uploader from "../Uploader/Uploader";
import ImageContainer from "../ImageContainer/ImageContainer";

import "./BlockContainer.css";

const BlockContainer = ({ handleDescription, handleSetFile }) => {
  const [imgFile, setImgFile] = useState();

  const handleDeleteFile = () => {
    setImgFile();
  };
  const callbackHandleDescription = useCallback(
    (des) => handleDescription(des),
    []
  );

  return (
    <div className="block-container">
      {imgFile ? (
        <ImageContainer
          file={imgFile}
          handleSetImageUrl={handleSetFile}
          handleDeleteFile={handleDeleteFile}
        />
      ) : (
        <Uploader handlePickedFile={setImgFile} />
      )}
      <DescriptionBox handleDescription={callbackHandleDescription} />
    </div>
  );
};

export default BlockContainer;
