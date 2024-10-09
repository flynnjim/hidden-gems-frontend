"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { fetchGems } from "@/api/api";
import { LoadingScreen } from "@/components/LoadingStatuses";
const GemCard = dynamic(() => import("@/components/GemCard"), {
  ssr: false,
});

export default function MyAccountPage() {
  const { user, logOut } = useUser();
  const [userGems, setUserGems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }
  const submitButton =
    "rounded bg-customyellow p-2 text-sm text-black data-[hover]:bg-[#ffe8a7] data-[active]:bg-[#c2b16d] mb-2 mt-2 ml-3";

  return (
    <div className="account-page text-textcolor">
      <h1>Welcome, {user.name}!</h1>
      <br />
      <div className="flex gap-5">
        <img
          src={user.avatar_url}
          alt="User Avatar"
          className="w-24 h-24 rounded-full"
        />
        <div className="mt-2">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Account Type: {user.user_type}</p>
        </div>
      </div>
      <button onClick={logOut} className={submitButton}>
        Log Out
      </button>

      <h2 className="mt-4 text-base mb-2">Gems Posted by You:</h2>
      {userGems.length > 0 ? (
        <ul className="flex space-x-4 bg-listcolor overflow-x-auto whitespace-nowrap w-[90vw]">
          {userGems.map((gem) => (
            <li
              key={gem.gem_id}
              className="inline-block px-4 py-2 ml-4 mb-4 mr-4 mt-4"
            >
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
