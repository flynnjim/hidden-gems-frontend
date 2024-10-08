"use client";
"use client";
import { postGemByUserID } from "@/api/api";
import { useState } from "react";
import { LoadingPostButton, LoadingScreen } from "./LoadingStatuses";
import { InvalidGemPost, GemPostError } from "./ErrorMessages";
import UploadImage from "./UploadImage";
import { fetchGeocode, fetchReverseGeocode } from "@/utils/geocoderApi";
import AddGemMap from "./AddGemMap";

export const PostGem = ({ user_id }) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);
  const [date, setDate] = useState(null);
  const [type, setType] = useState("");
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const [position, setPosition] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedGemId, setSubmittedGemId] = useState(null);

  const [validPost, setValidPost] = useState(true);

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
      console.log("if");
    } else {
      setSubmitted(true);
      setDisableButton(false);
      // setValidPost(true);
      setIsGemLoading(true);
      postGemByUserID(
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
          setIsGemLoading(false);
          setSubmittedGemId(gemData.gem_id);
          setSubmitted(true);
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
  if (isGemLoading) {
    return <LoadingScreen />;
  }

  // Error Handling
  // function PostErrorHandling() {
  //   // if (!isloggedIn) {
  //   //   return <NotLoggedIn />
  //   // } else
  //   if (!validPost) {
  //     return <InvalidGemPost />;
  //   } else if (error) {
  //     return <GemPostError message={error.message} />;
  //   }
  // }
  // function PostErrorHandling() {
  //   // if (!isloggedIn) {
  //   //   return <NotLoggedIn />
  //   // } else
  //   if (!validPost) {
  //     return <InvalidGemPost />;
  //   } else if (error) {
  //     return <GemPostError message={error.message} />;
  //   }
  // }

  function getLatLon() {
    fetchGeocode(address).then((latLong) => {
      setLatitude(latLong[0].lat);
      setLongitude(latLong[0].lon);
      setPosition([latLong[0].lat, latLong[0].lon]);
    });
  }

  function getAddressByGeoLocator() {
    fetchReverseGeocode(latitude, longitude).then((geoLocatorAddress) => {
      setAddress(geoLocatorAddress.display_name);
    });
  }

  return (
    <section>
      <h2>Post a New Gem</h2>
      <section>
        {submitted ? (
          <section>
            <p>You have posted a new Gem!</p>
            <button onClick={resetForm}>Post another Gem</button> <br/>
            <a href={`/gems/${submittedGemId}`}>See your Gem here!</a>
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
              name="type"
              id="type"
              onChange={typeInput}
              value={type}
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
              onChange={categoryInput}
              value={category}
            >
              <option value="" disabled defaultValue>
                Please select
              </option>
              <option value="culture">Culture</option>
              <option value="food">Food</option>
              <option value="nature">Nature</option>
            </select>
            <br></br>

            {/* user should be given option to manually input address if they dont want to share their location */}
            <label htmlFor="address">Address: </label>
            <input
              id="address"
              type="text"
              name="address"
              onChange={addressInput}
              value={address}
            ></input>
            <button type="button" onClick={getLatLon}>
              GET Lat and Lon
            </button>
            <br></br>

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
            <button type="button" onClick={getAddressByGeoLocator}>
              Find my Address
            </button>
            <br></br>

            <AddGemMap
              position={position}
              setPosition={setPosition}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />

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

            <label htmlFor="img_url">Upload an Image</label>
            <UploadImage
              setUploadedImgs={setUploadedImgs}
              uploadedImgs={uploadedImgs}
            />
            <br></br>

            <button type="submit">Submit</button>
          </form>
        )}
      </section>
    </section>
  );
};
