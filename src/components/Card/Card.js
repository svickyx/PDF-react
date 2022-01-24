import React, { useState } from "react";
import ImageContainer from "./ImageContainer";
import Uploader from "./Uploader";
import Description from "./Description";
import Button from "../UI/Button";

import closeIcon from "../../asset/logo/circle-xmark-regular.svg";

const Card = () => {
  const [file, setFile] = useState();
  //   const [cardContent, setCardContent] = useState({
  //     image: "",
  //     date: "",
  //     title: "",
  //     number: "",
  //     note: "",
  //   });

  const handleDeleteFile = () => {
    setFile();
  };

  const handleCardImageUrl = (previewUrl) => {
    console.log(previewUrl);
  };
  const handleDescription = (description) => {
    console.log(description);
  };

  return (
    <div className="rounded-md bg-white py-4 px-4 flex flex-col">
      <div className="flex justify-end mb-2">
        <img
          className="cursor-pointer"
          src={closeIcon}
          alt="close-icon"
          width="20"
          height="20"
        />
      </div>
      <div className="md:flex justify-between items-center">
        {file ? (
          <ImageContainer
            fileFromUploader={file}
            handleDeleteFile={handleDeleteFile}
            handleCardImageUrl={handleCardImageUrl}
          />
        ) : (
          <Uploader handleUploadedFile={setFile} />
        )}
        <Description handleDescription={handleDescription} />
      </div>
      <div className="flex justify-end">
        <Button>新增</Button>
      </div>
    </div>
  );
};

export default Card;
