import { useRef } from "react";
import uploadIcon from "../../asset/logo/circle-arrow-up-solid.svg";

const Uploader = ({ handleUploadedFile }) => {
  const uploaderRef = useRef();
  const ClickToUploadFile = () => {
    uploaderRef.current.click();
  };
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    handleUploadedFile(uploadedFile);
  };
  return (
    <div
      className="w-full h-[350px] bg-main rounded-lg
     cursor-pointer flex flex-col"
      onClick={ClickToUploadFile}
    >
      <div className="m-auto flex flex-col items-center">
        <img src={uploadIcon} alt="upload-icon" width="30" height="30" />
        <p className="mt-2">選擇照片上傳</p>
      </div>
      <input
        ref={uploaderRef}
        className="hidden"
        type="file"
        id="upload-file"
        name="upload-file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Uploader;
