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

  return (
    <section>
      <form className="w-full max-w-lg px-4" onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className="space-y-6 rounded-xl bg-black p-6 sm:p-10">
          <Legend className="text-base/7 font-semibold text-white ">
            Post a new gem
          </Legend>
          <Field className="relative">
            <Label className="text-sm/6 font-medium text-white ml-2">
              Title
            </Label>
            <Input
              {...register("title")}
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <p className="absolute text-red-700 bottom-auto text-sm">
              {errors.title?.message}
            </p>
          </Field>

          <Field className="relative">
            <Label className="text-sm/6 font-medium text-white ml-2">
              Type of gem
            </Label>
            <div>
              <Select
                defaultValue=""
                {...register("type")}
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  "*:text-black"
                )}
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
              <Label className="text-sm/6 font-medium text-white ml-2">
                Date
              </Label>
              <Input
                type="datetime-local"
                {...register("date")}
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none py-1.5 px-3 text-sm/6 text-black fill-white bg-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
              />
            </Field>
          )}

          <Field className="relative">
            <Label className="text-sm/6 font-medium text-white ml-2">
              Category
            </Label>
            <div className="relative">
              <Select
                defaultValue=""
                {...register("category")}
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  "*:text-black"
                )}
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
            <Label className="text-sm/6 font-medium text-white ml-2">
              Address
            </Label>
            <Input
              value={address || ""}
              {...register("address", {
                onChange: (e) => setAddress(e.target.value),
              })}
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
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
            <Label className="text-sm/6 font-medium text-white ml-2">
              Click map to find location
            </Label>

            <Input
              value={latitude}
              {...register("latitude")}
              className={clsx(
                "mt-3  w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white hidden",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <Input
              value={longitude}
              {...register("longitude")}
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

          <Field className="relative">
            <Label className="text-sm/6 font-medium text-white ml-2">
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
            <p className="absolute text-red-700 bottom-auto text-sm">
              {errors.description?.message}
            </p>
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-white ml-2">
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
          {isLoading && <CircularProgress size={24} />}
        </Fieldset>
      </form>
    </section>
  );
};
