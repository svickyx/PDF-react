import { useState, useEffect } from "react";
import deleteIcon from "../../asset/logo/trash-solid.svg";

const ImageContainer = ({
  fileFromUploader,
  handleDeleteFile,
  handleCardImageUrl,
}) => {
  const [previewUrl, setPreviewUrl] = useState();

  //read file from uploader to url, and set it to previewUrl
  useEffect(() => {
    if (!fileFromUploader) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(fileFromUploader);
  }, [fileFromUploader]);

  //if(previewUrl), give it to Card
  useEffect(() => {
    handleCardImageUrl(previewUrl);
  }, [previewUrl]);

  return (
    <div className="w-full h-max-[350px] relative">
      <div
        className="absolute bg-white p-2 rounded-full left-0 top-0 z-10 flex items-center justify-center cursor-pointer"
        onClick={handleDeleteFile}
      >
        <img src={deleteIcon} alt="delete-icon" width="20" height="20" />
      </div>
      <img
        className="w-full h-auto object-contain"
        src={previewUrl}
        alt="uploaded-image"
      />
    </div>
  );
};

export default ImageContainer;
