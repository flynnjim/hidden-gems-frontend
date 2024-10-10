"use client";
"use client";
import { postGemByUserID } from "@/api/api";
import { useState } from "react";
import { LoadingPostButton, LoadingScreen } from "./LoadingStatuses";
import { InvalidGemPost, GemPostError } from "./ErrorMessages";
import UploadImage from "./UploadImage";
import { fetchGeocode, fetchReverseGeocode } from "@/utils/geocoderApi";
import {
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
// import AddGemMap from "./AddGemMap";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
const AddGemMap = dynamic(() => import("./AddGemMap"), {
  ssr: false,
});

const schema = yup
  .object({
    title: yup.string().required("Title Required"),
    type: yup.string().required("Type Required"),
    category: yup.string().required("Category Required"),
    address: yup.string().required("Address Required"),
    description: yup
      .string()
      .required("Description Required")
      .max(350, "Over character limit"),
  })
  .required();

export const PostGem = ({ user_id }) => {
  const router = useRouter();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState(undefined);
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const [position, setPosition] = useState(null);
  const [gemData, setGemData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  function onSubmit(event) {
    const modifiedAddress = address.slice(0, address.lastIndexOf(",")).trim();
    if (!latitude) {
      setLocationError(true);
    } else {
      setIsLoading(true);
      const body = {
        ...gemData,
        latitude: latitude,
        longitude: longitude,
        img_url: uploadedImgs,
        address: modifiedAddress,
        user_id: user_id,
      };
      postGemByUserID(body)
        .then((gemData) => {
          setIsLoading(false);
          router.push(`/gems/${gemData.gem_id}`);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }

  watch((data) => {
    setGemData(data);
    if (data.address) {
      setAddress(data.address);
    }
  });

  if (error) {
    return <GemPostError />;
  }
  if (isLoading) {
    return <LoadingScreen />;
  }

  function getLatLon() {
    fetchGeocode(gemData.address).then((latLong) => {
      setLatitude(latLong[0].lat);
      setLongitude(latLong[0].lon);
      setPosition([latLong[0].lat, latLong[0].lon]);
    });
  }

  function getAddressByGeoLocator() {
    fetchReverseGeocode(latitude, longitude).then((geoLocatorAddress) => {
      const newAddress = geoLocatorAddress.display_name;
      setAddress(newAddress);
      setValue("address", newAddress);
    });
  }

  const formStyling =
    "space-y-5 rounded-xl border-solid border-cardcolor border-4  p-6 sm:p-10";

  const textBoxStyling = clsx(
    "mt-3 block rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-textcolor w-[100%]",
    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-listcolor/25"
  );

  const selectStyling = clsx(
    "mt-3 block  appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-textcolor w-[100%]",
    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",

    "*:text-black"
  );

  const submitButton =
    "rounded bg-customyellow p-2 text-sm text-black data-[hover]:bg-[#ffe8a7] data-[active]:bg-[#c2b16d] mb-2 mt-1 ml-1";

  const labelStyling = "text-sm/6 font-medium text-textcolor ml-2";

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className={formStyling}>
          <Legend className="text-lg font-medium text-textcolor ml-2">
            Post A New Gem
          </Legend>
          <Field className="relative">
            <Label className={labelStyling}>Title</Label>
            <Input {...register("title")} className={textBoxStyling} />
            <p className="absolute text-red-700 bottom-auto text-sm">
              {errors.title?.message}
            </p>
          </Field>

          <Field className="relative">
            <Label className={labelStyling}>Type of Gem</Label>
            <div>
              <Select
                defaultValue=""
                {...register("type")}
                className={selectStyling}
              >
                <option value="" disabled>
                  Please Select
                </option>
                <option value="event">Event</option>
                <option value="place">Place</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
            <p className="absolute text-red-700 bottom-auto text-sm">
              {errors.type?.message}
            </p>
          </Field>

          {gemData.type === "event" && (
            <Field>
              <Label className={labelStyling}>Date</Label>
              <Input
                type="datetime-local"
                {...register("date")}
                className={clsx(
                  "mt-3 block  rounded-lg border-none py-1.5 px-3 text-sm/6 text-textcolor fill-black/5 bg-black/5 w-[100%]",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-listcolor/25"
                )}
              />
            </Field>
          )}

          <Field className="relative">
            <Label className={labelStyling}>Category</Label>
            <div className="relative">
              <Select
                defaultValue=""
                {...register("category")}
                className={selectStyling}
              >
                <option value="" disabled>
                  Please Select
                </option>
                <option value="culture">Culture</option>
                <option value="food">Food</option>
                <option value="nature">Nature</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
            <p className="absolute text-red-700 bottom-auto text-sm">
              {errors.category?.message}
            </p>
          </Field>
          <Field className="relative">
            <Label className={labelStyling}>Address</Label>
            <Input
              value={address || ""}
              {...register("address")}
              className={textBoxStyling}
            />
            <p className="absolute text-red-700 bottom-auto text-sm">
              {errors.address?.message}
            </p>
            <div className="flex gap-5 items-center mt-2">
              <button
                type="button"
                onClick={getLatLon}
                className="bg-slate-500 rounded py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 mt-5"
              >
                Find address on map
              </button>
              {locationError && (
                <p className=" text-red-700 bottom-auto text-sm mt-4">
                  Please find location on map before submitting
                </p>
              )}
            </div>
          </Field>

          <Field className="relative">
            <Label className={labelStyling}>Click map to find location</Label>

            <Input
              value={latitude}
              {...register("latitude")}
              className={clsx(
                "mt-3   rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white hidden",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <Input
              value={longitude}
              {...register("longitude")}
              className={clsx(
                "mt-3   rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white hidden",
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

          <Field className="relative">
            <Label className={labelStyling}>Description</Label>

            <Textarea
              {...register("description")}
              className={textBoxStyling}
              rows={3}
            />
            <p className="absolute text-red-700 bottom-auto text-sm">
              {errors.description?.message}
            </p>
          </Field>
          <Field>
            <Label className={labelStyling}>Upload Images</Label>
            <UploadImage
              setUploadedImgs={setUploadedImgs}
              uploadedImgs={uploadedImgs}
            />
          </Field>
          <div className="">
            <button type="submit" className={submitButton}>
              Submit
            </button>
            {isLoading && <CircularProgress size={24} />}
          </div>
        </Fieldset>
      </form>
    </section>
  );
};
