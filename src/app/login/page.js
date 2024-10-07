"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import clsx from "clsx";
import { getAllUsers } from "@/api/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "@/context/UserContext";

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
  const { setUser } = useUser();
  const [loginError, setLoginError] = useState("");

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
        console.log(user, "before if");

        if (user) {
          console.log(user, "after if, before set user");

          setUser(user);
          console.log(user, "after if, after set user");
          console.log(`/users/${user.username}`);

          router.push(`/users/${user.user_id}`);
        } else {
          setLoginError("Invalid username or password.");
        }
      })
      .catch((err) => {
        setLoginError("Failed to load users.");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg px-4">
      <Fieldset className="space-y-6 rounded-xl bg-black p-6 sm:p-10">
        <Legend className="text-base/7 font-semibold text-white">Login</Legend>

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

        {loginError && <p className="text-red-600">{loginError}</p>}

        <button
          type="submit"
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
        >
          Login
        </button>
      </Fieldset>
    </form>
  );
}
