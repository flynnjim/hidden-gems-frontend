"use client";
import { storage, storageRef } from "../api/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const UploadImage = ({ setUploadedImgs, uploadedImgs }) => {
  const imgPlaceholder =
    "https://firebasestorage.googleapis.com/v0/b/fir-project-28217.appspot.com/o/icons%2Fplaceholder-image.jpg?alt=media&token=bcf22e57-3dd8-4fa3-b70b-442006777b38";
  const [files, setFiles] = useState([]);
  const [tempImgUrls, setTempImgUrls] = useState([
    imgPlaceholder,
    imgPlaceholder,
    imgPlaceholder,
  ]);
  const [imgReference, setImgReference] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef0 = useRef(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);

  function handleInput(event) {
    setFiles((previousFiles) => {
      const newArray = [...previousFiles];
      newArray[event.target.id] = event.target.files;
      return newArray;
    });
    const images = event.currentTarget.files;
    const temporaryUrl = window.URL.createObjectURL(images[0]);

    setTempImgUrls((previousTempImgs) => {
      const newArray = [...previousTempImgs];
      newArray[event.target.id] = temporaryUrl;
      return newArray;
    });
  }

  function handleUpload(event) {
    setIsLoading(true);
    setIsDisabled(true);
    const metaData = { contentType: "image/jpg" };
    files.map((file) => {
      const imagesRef = ref(storage, `gems/${file[0].name}`);
      return uploadBytes(imagesRef, file[0], metaData).then((snapshot) => {
        setIsLoading(false);
        const imgPath = snapshot.metadata.fullPath;
        setTempImgUrls([]);
        setImgReference((previousImgReference) => [
          ...previousImgReference,
          ref(storageRef, imgPath),
        ]);
      });
    });
  }

  useEffect(() => {
    const promises = [];
    if (imgReference.length > 0) {
      imgReference.forEach((reference) => {
        const promise = getDownloadURL(ref(storage, reference)).then((url) => {
          return url;
        });
        promises.push(promise);
      });
      Promise.all(promises).then((urls) => {
        setUploadedImgs(urls);
      });
    }
  }, [imgReference]);

  function handleFileSelect() {
    if (fileInputRef0.current) {
      fileInputRef0.current.click();
    }
  }

  function handleFileSelect1() {
    if (fileInputRef1.current) {
      fileInputRef1.current.click();
    }
  }

  function handleFileSelect2() {
    if (fileInputRef2.current) {
      fileInputRef2.current.click();
    }
  }

  const uploadButton =
    "py-0.5 px-2 border-2 border-slate-300 text-textcolor bg-slate-200 rounded-full";

  return (
    <>
      {tempImgUrls.length > 0 && (
        <ul className="flex justify-between">
          {tempImgUrls.map((imgPreview, index) => {
            return (
              <li key={index} className="w-[100px] h-[100px] border-2">
                <img
                  className="w-[100px] h-[100px] object-cover"
                  src={imgPreview}
                  alt="Gems preview image"
                />
              </li>
            );
          })}
        </ul>
      )}
      {uploadedImgs.length > 0 && (
        <ul className="flex justify-between">
          {uploadedImgs.map((imgPreview, index) => {
            return (
              <li key={index} className="w-[100px] h-[100px]">
                <img
                  width="100px"
                  src={imgPreview}
                  alt="Gems preview image"
                  className="w-[100px] h-[100px] object-cover"
                />
              </li>
            );
          })}
        </ul>
      )}
      <ul className="flex justify-between">
        <li>
          <input
            type="file"
            id="0"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            ref={fileInputRef0}
            onChange={handleInput}
          />
          <button
            className="mt-1 ml-8 py-0.5 px-2 border-2 border-listcolor/5 text-textcolor bg-black/5 rounded-full"
            onClick={handleFileSelect}
            disabled={isDisabled}
            type="button"
          >
            +
          </button>
        </li>
        <li>
          <input
            type="file"
            id="1"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleInput}
            ref={fileInputRef1}
            className="hidden"
          />
          <button
            className="mt-1 py-0.5 px-2 border-2 border-listcolor/5 text-textcolor bg-black/5 rounded-full"
            onClick={handleFileSelect1}
            disabled={isDisabled}
            type="button"
          >
            +
          </button>
        </li>
        <li>
          <input
            type="file"
            id="2"
            onChange={handleInput}
            accept=".jpg,.jpeg,.png,.webp"
            ref={fileInputRef2}
            className="hidden"
          />
          <button
            className="mt-1 mr-8 py-0.5 px-2 border-2 border-listcolor/5 text-textcolor bg-black/5 rounded-full"
            onClick={handleFileSelect2}
            disabled={isDisabled}
            type="button"
          >
            +
          </button>
        </li>
      </ul>
      <br />
      <button
        onClick={handleUpload}
        disabled={isDisabled}
        className="bg-slate-500 rounded py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
      >
        Upload Images
      </button>
      {isLoading && <CircularProgress size={24} />}
      <br />
    </>
  );
};

export default UploadImage;
