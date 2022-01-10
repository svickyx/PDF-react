import React, { useRef } from "react";
import logo from "../../asset/logo/circle-arrow-up-solid.svg";

import "./Uploader.css";

const Uploader = ({ handlePickedFile }) => {
  const uploaderRef = useRef();
  const handleUploadEvent = () => {
    uploaderRef.current.click();
  };

  const handleUploaderedImage = (event) => {
    const pickedFile = event.target.files[0];
    handlePickedFile(pickedFile);
  };
  return (
    <div className="uploader" onClick={handleUploadEvent}>
      <div className="upload-btn-container">
        <img className="upload-btn" src={logo} alt="upload-btn" />
        <p>選擇照片上傳</p>
      </div>
      <input
        ref={uploaderRef}
        style={{ display: "none" }}
        type="file"
        id="file-1"
        name="file-1"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleUploaderedImage}
      />
    </div>
  );
};

export default Uploader;
