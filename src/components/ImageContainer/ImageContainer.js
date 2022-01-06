import React, { useEffect, useState } from "react";
import deleteIcon from "../../asset/logo/trash-solid.svg";
import "./ImageContainer.css";

const ImageContainer = ({ file, handleDeleteFile, handleSetImageUrl }) => {
  const [previewUrl, setPreviewUrl] = useState();
  useEffect(() => {
    handleSetImageUrl(previewUrl);
  }, [previewUrl]);
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <div className="image-container">
      <img className="uploaded-image" src={previewUrl} alt="preview" />
      <div className="delete-icon-container">
        <img
          className="delete-icon"
          src={deleteIcon}
          alt="delete-btn"
          onClick={handleDeleteFile}
        />
      </div>
    </div>
  );
};

export default ImageContainer;
