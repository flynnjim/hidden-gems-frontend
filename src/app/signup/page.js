"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postNewUser } from "@/api/api"; // Import the postNewUser API function
import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Checkbox,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useUser } from "@/context/UserContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/api/firebase";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Required field")
      .matches(
        /^[a-zA-Z'’-]+([ a-zA-Z'’-]+)*$/,
        "Name can only contain letters, hyphens, apostrophes, and spaces"
      ),
    username: yup
      .string()
      .required("Required field")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username can only contain letters and numbers, no spaces"
      )
      .max(20, "Username cannot exceed 20 characters"),
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

export default function SignUpPage() {
  const { setUser } = useUser();
  const router = useRouter();

  const [avatarImages, setAvatarImages] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [signupError, setSignupError] = useState("");
  const [enabled, setEnabled] = useState(false);

  const submitButton =
    "rounded bg-customyellow p-2 text-sm text-black data-[hover]:bg-[#ffe8a7] data-[active]:bg-[#c2b16d] mb-2 mt-1 ml-1"

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const avatarNames = [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      "7.png",
      "8.png",
      "9.png",
    ];
    const promises = avatarNames.map((name) => {
      return getDownloadURL(ref(storage, `avatars/${name}`))
        .then((url) => url)
        .catch((error) => console.error("Error fetching avatar: ", error));
    });

    Promise.all(promises).then((urls) => {
      setAvatarImages(urls);
      setSelectedAvatar(urls[0]);
      setValue("avatar_url", urls[0]);
    });
  }, []);

  const onSubmit = (data) => {
    const newUser = { ...data, avatar_url: selectedAvatar };
    if (!newUser.user_type) {
      newUser.user_type = "regular";
    }

    postNewUser(newUser)
      .then((response) => {
        setUser(response);
        router.push(`/users/${response.user_id}`);
      })
      .catch((error) => {
        setSignupError("Failed to create user. Try a different username!");
      });
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg px-4">
      <Fieldset className="space-y-6 rounded-xl bg-black p-6 sm:p-10">
        <Legend className="text-base/7 font-semibold text-white">
          Sign Up
        </Legend>

        {signupError && <p className="text-red-600">{signupError}</p>}

        <Field className="relative">
          <Label className="text-sm/6 font-medium text-white">Name</Label>
          <Input
            {...register("name")}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
          <p className="absolute text-red-700 bottom-[-37px] text-sm">
            {errors.name?.message}
          </p>
        </Field>

        <Field className="relative">
          <Label className="text-sm/6 font-medium text-white">Username</Label>
          <Input
            {...register("username")}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
          <p className="absolute text-red-700 bottom-[-37px] text-sm">
            {errors.username?.message}
          </p>
        </Field>

        <Field className="relative">
          <Label className="text-sm/6 font-medium text-white">Email</Label>
          <Input
            {...register("email")}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
          <p className="absolute text-red-700 bottom-[-37px] text-sm">
            {errors.email?.message}
          </p>
        </Field>

        <Field className="relative">
          <Label className="text-sm/6 font-medium text-white">Password</Label>
          <Input
            type="password"
            {...register("password")}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
          <p className="absolute text-red-700 bottom-[-37px] text-sm">
            {errors.password?.message}
          </p>
        </Field>

        <Field>
          <Label className="text-sm/6 font-medium text-white">Avatar</Label>
          <div className="relative">
            <Listbox
              value={selectedAvatar}
              onChange={(avatar) => {
                setSelectedAvatar(avatar);
                setValue("avatar_url", avatar);
              }}
            >
              <ListboxButton>
                <img
                  src={selectedAvatar}
                  width={50}
                  height={50}
                  alt="Selected Avatar"
                />
              </ListboxButton>
              <ListboxOptions className="w-[200px] flex flex-row gap-2 flex-wrap justify-center items-center ml-12 bg-black py-1">
                {avatarImages.map((avatar) => (
                  <ListboxOption key={avatar} value={avatar}>
                    <img
                      src={avatar}
                      width={50}
                      height={50}
                      alt="Avatar Option"
                    />
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
            <ChevronDownIcon
              className="absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
        </Field>

        <Field className="flex items-center gap-2">
          <Checkbox
            checked={enabled}
            onChange={(e) => {
              const newUserType = e ? "artist" : "regular";
              const newValue = !enabled;
              setEnabled(newValue);
              setValue("user_type", newUserType);
            }}
            className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
          >
            <svg
              className="stroke-white opacity-0 group-data-[checked]:opacity-100"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Checkbox>
          <Label>Signup as an Artist</Label>
        </Field>

        <button
          type="submit"
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
        >
          Submit
        </button>
      </Fieldset>
    </form>
    <div className="container flex gap-4 items-center place-content-around">
    <p>Already have an account?</p>
    <a href="/login" className="text-hovercolor"><button className={submitButton}>Click here to Login</button></a>
  </div>
    </>
  );
}
