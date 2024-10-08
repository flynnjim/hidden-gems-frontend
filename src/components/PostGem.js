"use client";
"use client";
import { postGemByUserID } from "@/api/api";
import { useState } from "react";
import { LoadingPostButton, LoadingScreen } from "./LoadingStatuses";
import { InvalidGemPost, GemPostError } from "./ErrorMessages";
import UploadImage from "./UploadImage";
import { fetchGeocode, fetchReverseGeocode } from "@/utils/geocoderApi";
import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AddGemMap from "./AddGemMap";

const schema = yup
  .object({
    title: yup.string().required("Required field"),
    type: yup.string().required("Required field"),
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,12}$/,
        "Password must be 5-12 characters, include at least one uppercase letter, one lowercase letter, and one special character"
      ),
  })
  .required();

export const PostGem = ({ user_id, setGemsData }) => {
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

  const [gemData, setGemData] = useState({});

  const [validPost, setValidPost] = useState(true);

  const [disabledButton, setDisableButton] = useState(false);

  const [isGemLoading, setIsGemLoading] = useState(false);

  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

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

  function onSubmit(event) {
    // event.preventDefault();
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

  watch((data) => {
    console.log(data);
    setGemData(data);
  });

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
    fetchGeocode(gemData.address).then((latLong) => {
      console.log(gemData.address);
      // setGemData((prData) => {
      //   const newObg = { ...prData };
      //   newObg.latitude = latLong[0].lat;
      //   newObg.longitude = latLong[0].lon;
      //   return newObg;
      // });
      setLatitude(latLong[0].lat);
      setLongitude(latLong[0].lon);
      setPosition([latLong[0].lat, latLong[0].lon]);
      // moveMapToMarker(latLong[0].lat, latLong[0].lon);
      console.log(latitude, longitude);
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
            <button onClick={resetForm}>Post a New Gem</button> <br />
            <a href={`/gems/${submittedGemId}`}>See your gem!</a>
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

            {/* {type === "event" ? (
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

            <button></button> */}

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

            {/*will need to be updated by Emily*/}
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
      <form className="w-full max-w-lg px-4" onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className="space-y-6 rounded-xl bg-black p-6 sm:p-10">
          <Legend className="text-base/7 font-semibold text-white">
            Post a new gem
          </Legend>
          <Field className="relative">
            <Label className="text-sm/6 font-medium text-white">Title</Label>
            <Input
              {...register("title")}
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <p className="absolute text-red-700 bottom-[-37px] text-sm">
              {errors.title?.message}
            </p>
          </Field>

          <Field>
            <Label className="text-sm/6 font-medium text-white">
              Type of gem
            </Label>
            <div className="relative">
              <Select
                {...register("type")}
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  // Make the text of each option black on Windows
                  "*:text-black"
                )}
              >
                <option>Event</option>
                <option>Place</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-white">Category</Label>
            <div className="relative">
              <Select
                {...register("category")}
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  // Make the text of each option black on Windows
                  "*:text-black"
                )}
              >
                <option>Culture</option>
                <option>Food</option>
                <option>Nature</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-white">Address</Label>
            <Input
              // onChange={addressInput}
              // value={address}
              // onChange={(avatar) => {
              //   addressInput()
              //   setValue("avatar_url", avatar);
              // }}
              {...register("address")}
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <button
            type="button"
            onClick={getLatLon}
            className="bg-slate-500 rounded py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
          >
            Find address on map
          </button>
          <Field>
            <Label className="text-sm/6 font-medium text-white">
              Click map to find location
            </Label>
            <Input
              value={latitude}
              // {...register("latitude")}
              onChange={(latitude) => {
                setValue("latitude", latitude);
              }}
              className={clsx(
                "mt-3  w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white hidden",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <Input
              value={longitude}
              // {...register("longitude")}
              onChange={(longitude) => {
                setValue("longitude", longitude);
              }}
              className={clsx(
                "mt-3  w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white hidden",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <AddGemMap
            position={position}
            setPosition={setPosition}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
          <button
            type="button"
            onClick={getAddressByGeoLocator}
            className="bg-slate-500 rounded py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
          >
            Find my Address
          </button>
          <Field>
            <Label className="text-sm/6 font-medium text-white">Date</Label>
            <Input
              type="date"
              {...register("date")}
              className={clsx(
                "mt-3 block w-full rounded-lg border-none py-1.5 px-3 text-sm/6 text-black fill-white bg-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>

          <Field>
            <Label className="text-sm/6 font-medium text-white">
              Description
            </Label>

            <Textarea
              {...register("description")}
              className={clsx(
                "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
              rows={3}
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-white">
              Upload images
            </Label>
            <UploadImage
              setUploadedImgs={setUploadedImgs}
              uploadedImgs={uploadedImgs}
            />
          </Field>
          <button
            type="submit"
            className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
          >
            Submit
          </button>
        </Fieldset>
      </form>
    </section>
  );
};
