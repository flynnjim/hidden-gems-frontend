"use client";

import { useState } from "react";
import { useRouter} from "next/navigation";
import { Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import clsx from "clsx";
import { getAllUsers } from "@/api/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

const schema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username can only contain letters and numbers, no spaces"
      )
      .max(20, "Username cannot exceed 20 characters"),

    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters")
      .max(12, "Password cannot exceed 12 characters"),
  })
  .required();

export default function LoginPage() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [loginError, setLoginError] = useState("");
  
  const submitButton =
    "rounded bg-customyellow p-2 text-sm text-black data-[hover]:bg-[#ffe8a7] data-[active]:bg-[#c2b16d] mb-2 mt-1 ml-1"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    getAllUsers()
      .then((users) => {
        const user = users.find(
          (user) =>
            user.username === data.username && user.password === data.password
        );

        if (user) {
          setUser(user);
          router.push(`/users/${user.user_id}`);
        } else {
          setLoginError("Invalid username or password.");
        }
      })
      .catch((err) => {
        setLoginError("Failed to load users.");
      });
  };

  if (user) {
    return (
      <Link href={`/users/${user.user_id}`} className="text-textcolor underline">
        You&apos;re already logged in. Click <Link className="cardcolor" href="/users/:user_id">here</Link> to go to your Account
      </ Link>
    );
  }

  const formStyling =
    "space-y-5 rounded-xl border-solid border-cardcolor border-4 sm:p-10";

  const textBoxStyling = clsx(
    "mt-3 block rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-textcolor w-[75vw]",
    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-listcolor/25"
  );

  const submitButton =
    "rounded bg-customyellow p-2 text-sm text-black data-[hover]:bg-[#ffe8a7] data-[active]:bg-[#c2b16d] mb-2 mt-1 ml-1";

  const labelStyling = "text-sm/6 font-medium text-textcolor ml-2";

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"w-full max-w-lg px-4"}
      >
        <Fieldset className={formStyling}>
          <Legend className="text-base/7 font-semibold text-textcolor">
            Login
          </Legend>

          <Field className="relative">
            <Label className={labelStyling}>Username</Label>
            <Input {...register("username")} className={textBoxStyling} />
            <p className="absolute text-red-700 bottom-[-37px] text-sm">
              {errors.username?.message}
            </p>
          </Field>

          <Field className="relative">
            <Label className={labelStyling}>Password</Label>
            <Input
              type="password"
              {...register("password")}
              className={textBoxStyling}
            />
            <p className="absolute text-red-700 bottom-[-37px] text-sm">
              {errors.password?.message}
            </p>
          </Field>

          {loginError && <p className="text-red-600">{loginError}</p>}

        <button
          type="submit"
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
        >
          Login
        </button>
      </Fieldset>
    </form>
    <div className="container flex gap-4 items-center place-content-around">
      <p>Don&apos;t have an account?</p>
      <a href="/signup" className="text-hovercolor"><button className={submitButton}>Click here to Sign Up</button></a>
    </div>
    </div>
  );
}
