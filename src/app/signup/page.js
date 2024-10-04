"use client";

import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Button,
  Checkbox,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { postNewUser } from "@/api/api";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

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

  const [enabled, setEnabled] = useState(true);

  const [body, setBody] = useState({});

  const onChange = (event) => {
    if (event.target.id === "headlessui-control-:r3:") {
      setBody((previousBody) => {
        const newBody = previousBody;
        newBody.name = event.target.value;
        return newBody;
      });
    }
    console.log(event.target.id, "<<<");
  };

  const handleSubmit = (e) => {
    console.log(body);
    e.preventDefault();
    router.push("/");
  };
  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
      onChange={(event) => {
        onChange(event);
      }}
      className="w-full max-w-lg px-4"
    >
      <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
        <Legend className="text-base/7 font-semibold text-white">
          Sign Up
        </Legend>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Name</Label>
          <Input
            name="name"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Username</Label>
          <Input
            name="username"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Email</Label>
          <Input
            name="email"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Password</Label>
          <Input
            name="password"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
        </Field>

        <Field>
          <Label className="text-sm/6 font-medium text-white">Avatar</Label>
          <Description className="text-sm/6 text-white/50">
            Select your profile Avatar.
          </Description>
          <div className="relative">
            <Listbox
              name="Avatar"
              value={selectedPerson}
              onChange={setSelectedPerson}
            >
              <ListboxButton>
                <img src={selectedPerson.name} width={50} height={50}></img>
              </ListboxButton>
              <ListboxOptions anchor="bottom">
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
            name="checkbox"
            checked={enabled}
            onChange={setEnabled}
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
