import { useState, useEffect } from "react";
import deleteIcon from "../../../asset/logo/trash-solid.svg";

const ImageContainer = ({ handleDeleteFile, previewUrl }) => {
  //read file from uploader to url, and set it to previewUrl

  return (
    <div className="w-full h-max-[350px] relative">
      <div
        className="absolute bg-white p-2 rounded-full left-0 top-0 z-10 flex items-center justify-center cursor-pointer"
        onClick={handleDeleteFile}
      >
        <img src={deleteIcon} alt="delete-icon" width="20" height="20" />
      </div>
      <img
        className="h-[350px] w-auto object-contain m-auto"
        src={previewUrl}
        alt="uploader"
      />
    </div>
  );
};

export default ImageContainer;
