"use client";

import { PostGem } from "@/components/PostGem";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { GemNotLoggedIn } from "@/components/ErrorMessages";

export default function AddGem() {
  const { user } = useContext(UserContext);
  const user_id = user ? user.user_id : null;
  if (!user_id) {
    return <GemNotLoggedIn />;
  } else return <PostGem user_id={user_id} />;
}
