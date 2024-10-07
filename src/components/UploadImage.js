"use client";
import { storage, storageRef } from "../api/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";

const UploadImage = () => {
  const [files, setFiles] = useState([]);
  const [tempImgUrls, setTempImgUrls] = useState([]);
  const [imgReference, setImgReference] = useState([]);
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

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
    setIsDisabled(true);
    const metaData = { contentType: "image/jpg" };
    files.map((file) => {
      const imagesRef = ref(storage, `gems/${file[0].name}`);
      return uploadBytes(imagesRef, file[0], metaData).then((snapshot) => {
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

  console.log(uploadedImgs);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  function handleSubmit(event) {
    console.log("click");
  }
  return (
    <>
      <h1>UPLOAD IMAGE</h1>
      {tempImgUrls.length > 0 && (
        <ul>
          {tempImgUrls.map((imgPreview, index) => {
            return (
              <li key={index}>
                <img width="100px" src={imgPreview} alt="Gems preview image" />
              </li>
            );
          })}
        </ul>
      )}
      <ul>
        <li>
          <input type="file" id="0" onChange={handleInput}></input>
        </li>
        <li>
          <input type="file" id="1" onChange={handleInput}></input>
        </li>
        <li>
          <input type="file" id="2" onChange={handleInput}></input>
        </li>
      </ul>
      <button onClick={handleUpload} disabled={isDisabled}>
        Upload Images
      </button>{" "}
      <br />
      <button onClick={handleSubmit} disabled={!isDisabled}>
        Submit
      </button>
    </>
  );
};

export default UploadImage;
