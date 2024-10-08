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
import AddGemMap from "./AddGemMap";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    title: yup.string().required("Required field"),
    type: yup.string().required("Required field"),
    category: yup.string().required("Required field"),
    address: yup.string().required("Required field"),
    latitude: yup.string().required("Please find address on map"),
    description: yup.string().required("Required field"),
    address: yup.string().required("Required field"),
  })
  .required();

export const PostGem = ({ user_id }) => {
  const router = useRouter();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const [position, setPosition] = useState(null);
  const [gemData, setGemData] = useState({});
  const [isGemLoading, setIsGemLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  function onSubmit(event) {
    setIsGemLoading(true);
    const body = {
      ...gemData,
      latitude: latitude,
      longitude: longitude,
      img_url: uploadedImgs,
      address: address,
      user_id: user_id,
    };
    console.log(body);
    postGemByUserID(body)
      .then((gemData) => {
        setIsGemLoading(false);
        router.push(`/gems/${gemData.gem_id}`);
      })
      .catch((err) => {
        setError(err);
      });
  }

  watch((data) => {
    setGemData(data);
  });

  if (error) {
    return <GemPostError />;
  }

  if (isGemLoading) {
    return <LoadingScreen />;
  }
  if (isGemLoading) {
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
      setAddress(geoLocatorAddress.display_name);
    });
  }

  return (
    <section>
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
                defaultValue="Please Select"
                {...register("type")}
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  // Make the text of each option black on Windows
                  "*:text-black"
                )}
              >
                <option value="Please Select" disabled>
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
          </Field>
          {gemData.type === "event" && (
            <Field>
              <Label className="text-sm/6 font-medium text-white">Date</Label>
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

          <Field>
            <Label className="text-sm/6 font-medium text-white">Category</Label>
            <div className="relative">
              <Select
                defaultValue="Please Select"
                {...register("category")}
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  // Make the text of each option black on Windows
                  "*:text-black"
                )}
              >
                <option value="Please Select" disabled>
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
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-white">Address</Label>
            <Input
              value={address}
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
