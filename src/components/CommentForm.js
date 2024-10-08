import { addCommentsByGemId } from "@/api/api";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

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
    return <p>Loading ...</p>;
  }
  if (isError) {
    return <p>Something went wrong or you are not logged in</p>;
  }

  return (
    <>
      {!isUserLoggedIn ? (
        <p>You need to be logged in to post a comment</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>{usernameShow} leave a comment below!</p>
          <label>
            leave comment
            <textarea
              value={comment}
              className="border-stone-900 border-2"
              onChange={(e) => {
                onTextChange(e);
              }}
            ></textarea>
          </label>
          <button
            type="submit"
            disabled={!user || comment.trim() === ""}
            className={`mt-2 ${
              !user || comment.trim() === "" ? "bg-gray-500" : "bg-blue-500"
            }`}
          >
            Post
          </button>
        </form>
      )}
    </>
  );
}
export default CommentForm;
