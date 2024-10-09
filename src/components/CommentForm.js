import { addCommentsByGemId } from "@/api/api";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { CannotLoadData } from "./ErrorMessages";
import { LoadingScreen } from "./LoadingStatuses";
import { Textarea, Field } from "@headlessui/react";
import { Alert } from "@mui/material";
import Link from "next/link";
import { Button } from "@headlessui/react";

function CommentForm({ gem_id, setComments }) {
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const usernameShow = user ? user.username : "";

  const isUserLoggedIn = !!user;

  const onTextChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (comment.trim() === "" || !user) {
      setIsError(true);
      return;
    }

    // user from userContext
    const body = {
      username: user.username,
      body: comment,
      gem_id: Number(gem_id), //change dynamically
      date: new Date(),
    };

    setIsLoading(true);

    addCommentsByGemId(body)
      .then((response) => {
        setComment("");
        setIsLoading(false);
        setComments((previousComments) => {
          const newCommentsArr = [...previousComments];
          newCommentsArr.push(response);
          return newCommentsArr;
        });
      })
      .catch((error) => {
        setIsError(true);
        setIsLadoing(false);
      });
  };
  if (isLoading) {
    return (
      <div className="container">
        <LoadingScreen />;
      </div>
    );
  }

  if (isError) {
    return <CannotLoadData />;
  }

  const buttonStyling =
    "rounded bg-customyellow p-2 text-sm text-black data-[hover]:bg-[#ffe8a7] data-[active]:bg-[#c2b16d] mb-2 mt-1 ml-2";

  return (
    <>
      {!isUserLoggedIn ? (
        <Alert severity="info" className="w-[88vw] ml-2 mr-1 mt-2 mb-2">
          You are not logged in. Please Login or Sign Up to post a comment. <br />
          <a href="/signup" className="text-hovercolor"><button className={buttonStyling}>Click here to Login</button></a>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="mt-2 ml-2 text-textcolor text-sm">
            Leave a comment below!
          </p>
          <Field>
            <Textarea
              name="comment"
              type="text"
              value={comment}
              className="w-[88vw] ml-2 mr-1 mt-2 p-2"
              placeholder="Write a comment"
              onChange={(e) => {
                onTextChange(e);
              }}
            />
          </Field>

          <Button
            type="submit"
            disabled={!user || comment.trim() === ""}
            className={buttonStyling}
          >
            Comment
          </Button>
        </form>
      )}
    </>
  );
}
export default CommentForm;
