import React, { useContext, useEffect, useState } from "react";
import { CardListContext } from "../../../store/CardListContext";
import ImageContainer from "./ImageContainer";
import Uploader from "./Uploader";

const ImageHandler = ({ cardIndex, image }) => {
  const { updateCard } = useContext(CardListContext);
  const [file, setFile] = useState();
  const handleCardImageUrl = (imageUrl) => {
    updateCard(cardIndex, {
      image: imageUrl,
    });
  };
  console.log(file);
  useEffect(() => {
    if (!file || image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      handleCardImageUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file, handleCardImageUrl]);

  const handleDeleteFile = () => {
    setFile();
    updateCard(cardIndex, {
      image: "",
    });
  };

  return (
    <div className="w-full">
      {image ? (
        <ImageContainer
          handleDeleteFile={handleDeleteFile}
          previewUrl={image}
        />
      ) : (
        <Uploader handleUploadedFile={setFile} />
      )}
    </div>
  );
};

export default ImageHandler;
