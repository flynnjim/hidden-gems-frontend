"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { fetchGems } from "@/api/api";
// import GemCard from "@/components/GemCard";
const GemCard = dynamic(() => import("@/components/GemCard"), {
  ssr: false,
});

export default function MyAccountPage() {
  const { user, logOut } = useUser();
  const [userGems, setUserGems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const submitButton =
    "rounded bg-customyellow p-2 text-sm text-black data-[hover]:bg-[#ffe8a7] data-[active]:bg-[#c2b16d] mb-2 mt-1 ml-1"

  useEffect(() => {
    if (user) {
      fetchGems()
        .then((gems) => {
          const filteredGems = gems.filter(
            (gem) => gem.user_id === user.user_id
          );
          setUserGems(filteredGems);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        <p>You are not logged in. Please Login or Sign Up to view your account.</p>
        <a href="/login" className="text-hovercolor"><button className={submitButton}>Click here to Login</button></a>
      </div>
    )
  }

  if (isLoading) {
    return <p>Loading gems...</p>;
  }

  return (
    <div className="account-page">
      <h1>Welcome, {user.name}!</h1>
      <br/>
      <p>NAME: {user.name}</p>
      <p>EMAIL: {user.email}</p>
      <p>ACCOUNT TYPE: {user.user_type}</p>
      <img
        src={user.avatar_url}
        alt="User Avatar"
        className="w-24 h-24 rounded-full"
      />

      <button
        onClick={logOut}
        className="rounded bg-red-600 py-2 px-4 text-sm text-white"
      >
        Log Out
      </button>

      <h2 className="mt-8 text-2xl">Gems Posted by You: </h2>
      {userGems.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {userGems.map((gem) => (
            <li key={gem.gem_id} className="border p-4 rounded">
              <GemCard gem={gem} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">You have not posted any Gems yet. Click <Link className="text-cardcolor" href="/add-gem">here</Link> to post a new Gem.</p>
      )}
    </div>
  );
}
