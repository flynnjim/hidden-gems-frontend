"use client";
import { postGemByUserID } from "@/api/api";
import { useState } from "react";
import { LoadingPostButton, LoadingScreen } from "./LoadingStatuses";
import { InvalidGemPost, GemPostError } from "./ErrorMessages";
import UploadImage from "./UploadImage";

export const PostGem = ({ user_id, setGemsData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [uploadedImgs, setUploadedImgs] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const [validPost, setValidPost] = useState(false);

  const [disabledButton, setDisableButton] = useState(false);

  const [isGemLoading, setIsGemLoading] = useState(false);

  const [error, setError] = useState(null);

  const resetForm = () => {
    setSubmitted(false);
    setTitle("");
    setDescription("");
    setCategory("");
    setImgUrl("");
    setLatitude("");
    setLongitude("");
    setAddress("");
    setDate("");
    setType("");
  };

  function titleInput(event) {
    setTitle(event.target.value);
  }
  function descriptionInput(event) {
    setDescription(event.target.value);
  }
  function addressInput(event) {
    setAddress(event.target.value);
  }
  function categoryInput(event) {
    setCategory(event.target.value);
  }
  function dateInput(event) {
    setDate(event.target.value);
  }
  function typeInput(event) {
    console.log(event.target.value);
    setType(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validPost) {
      setDisableButton(true);
    } else {
      setSubmitted(true);
      setDisableButton(false);
      setValidPost(true);
      setIsGemLoading(true);
      return postGemByUserID(
        title,
        description,
        category,
        uploadedImgs,
        latitude,
        longitude,
        address,
        date,
        user_id,
        type
      )
        .then((gemData) => {
          setGemsData((currentGems) => {
            setIsGemLoading(false);
            return [gemData.data.gem, ...currentGems];
          });
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    }
  }

  if (isGemLoading) {
    return <LoadingScreen />;
  }

  // Error Handling
  function PostErrorHandling() {
    // if (!isloggedIn) {
    //   return <NotLoggedIn />
    // } else
    if (!validPost) {
      return <InvalidGemPost />;
    } else if (error) {
      return <GemPostError message={error.message} />;
    }
  }

  function SubmitButton() {
    if (disabledButton) {
      return <button disabled>Submit</button>;
    } else if (isGemLoading) {
      return <LoadingPostButton />;
    } else {
      return <button type="submit">Submit</button>;
    }
  }

  return (
    <section>
      <h2>Post a New Gem</h2>
      <section>
        {submitted ? (
          <section>
            {" "}
            <p>You have posted a new Gem!</p>{" "}
            <button onClick={resetForm}>Post a New Gem</button>
          </section>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input
              id="title"
              type="text"
              name="title"
              onChange={titleInput}
              value={title}
            ></input>
            <br></br>

            <label htmlFor="type">Type of Gem: </label>
            <select
              select
              name="type"
              id="type"
              value={type}
              onChange={typeInput}
            >
              <option value="" disabled defaultValue>
                Please select
              </option>
              <option value="event">Event</option>
              <option value="place">Place</option>
            </select>
            <br></br>

            <label htmlFor="category">Category: </label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={categoryInput}
            >
              <option value="" disabled defaultValue>
                Please select
              </option>
              <option value="culture">Culture</option>
              <option value="food">Food</option>
              <option value="nature">Nature</option>
            </select>
            <br></br>

            {/* might not be needed if relying on map, though user should be given option to manually input address if they dont want to share their location */}
            <label htmlFor="address">Address: </label>
            <input
              id="address"
              type="text"
              name="address"
              onChange={addressInput}
              value={address}
            ></input>
            <br></br>

            {/*will need to be updated by Flynn*/}
            <label htmlFor="location">GPS Location: </label>
            <input
              id="location"
              placeholder="latitude"
              type="text"
              name="latitude"
              value={latitude}
            ></input>
            <input
              id="location"
              placeholder="longitude"
              type="text"
              name="longitude"
              value={longitude}
            ></input>
            <br></br>

            {type === "event" ? (
              <div>
                <label htmlFor="date">Date of Event: </label>
                <input
                  id="date"
                  type="datetime-local"
                  name="date"
                  onChange={dateInput}
                  value={date}
                ></input>
              </div>
            ) : null}

            <label htmlFor="description">Description: </label>
            <textarea
              id="description"
              type="textarea"
              name="description"
              onChange={descriptionInput}
              value={description}
            ></textarea>
            <br></br>

            {/*will need to be updated by Emily*/}
            <label htmlFor="img_url">Upload an Image</label>

            <UploadImage
              setUploadedImgs={setUploadedImgs}
              uploadedImgs={uploadedImgs}
            />
            <br></br>

            <SubmitButton />
          </form>
        )}
      </section>
    </section>
  );
};
