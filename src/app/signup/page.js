"use client";

import {
  Description,
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
import { postNewUser } from "@/api/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      .max(20, "Username cannot exceed 12 characters"),
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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const people = [
    {
      id: 1,
      name: "https://firebasestorage.googleapis.com/v0/b/fir-project-28217.appspot.com/o/avatars%2F1.png?alt=media&token=d9b3b51a-a50e-45ee-b460-9872672e1f2a",
    },
    {
      id: 2,
      name: "https://firebasestorage.googleapis.com/v0/b/fir-project-28217.appspot.com/o/avatars%2F4.png?alt=media&token=43c06c01-7f04-4c2b-ae0b-f78f6af9d8bf",
    },
  ];

  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  const [enabled, setEnabled] = useState(false);

  const [body, setBody] = useState({ avatar_url: people[0].name });
  const [userError, setUserError] = useState("");

  // const onChange = (event) => {
  //   if (event.target.id === "headlessui-control-:r3:") {
  //     setBody((previousBody) => {
  //       const newBody = previousBody;
  //       newBody.name = event.target.value;
  //       return newBody;
  //     });
  //   }
  //   console.log(event.target.id, "<<<");
  // };

  const onSubmit = () => {
    postNewUser(body)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        if (err.status === 409) {
          setUserError("username already exist");
        }
      });
  };

  watch((data) => {
    if (data.type) {
      setBody((previous) => {
        const newUser = { ...previous, ...data };
        newUser.type = "artist";
        return newUser;
      });
    } else {
      setBody((previous) => {
        const newUser = { ...previous, ...data };
        newUser.type = "regular";
        return newUser;
      });
    }
    console.log(errors);
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg px-4">
      <Fieldset className="space-y-6 rounded-xl bg-black p-6 sm:p-10">
        <Legend className="text-base/7 font-semibold text-white">
          Sign Up
        </Legend>
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
          {userError && <p className="text-red-600">{userError}</p>}
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
            {...register("password")}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
          <p className="absolute text-red-700 bottom-[-55px] text-sm">
            {errors.password?.message}
          </p>
        </Field>

        <Field>
          <Label className="text-sm/6 font-medium text-white">Avatar</Label>
          <Description className="text-sm/6 text-white/50">
            Select your profile Avatar.
          </Description>
          <div className="relative">
            <Listbox
              value={selectedPerson}
              onChange={(person) => {
                setSelectedPerson(person);
                setValue("avatar_url", person.name);
              }}
            >
              <ListboxButton>
                <img src={selectedPerson.name} width={50} height={50}></img>
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                className="flex flex-row gap-2 justify-center items-center ml-7 bg-black py-1"
              >
                {people.map((person) => (
                  <ListboxOption
                    key={person.id}
                    value={person}
                    className="data-[focus]:bg-blue-100"
                  >
                    <img src={person.name} width={50} height={50}></img>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
        </Field>
        <Field className="flex items-center gap-2">
          <Checkbox
            checked={enabled}
            onChange={() => {
              const newValue = !enabled;
              setEnabled(newValue);
              setValue("type", newValue);
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
  );
}

// https://firebasestorage.googleapis.com/v0/b/fir-project-28217.appspot.com/o/avatars%2F1.png?alt=media&token=d9b3b51a-a50e-45ee-b460-9872672e1f2a
