import { addCommentsByGemId } from "@/api/api";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import { useState } from "react";

function CommentForm({ gem_id, setComments }) {
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLadoing] = useState(false);

  const onTextChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() === "") {
      return;
    }
    // user from userContext
    const body = {
      username: "johndoe123",
      body: comment,
      gem_id: 2, //change dynamically
      date: new Date(),
    };
    setIsLadoing(true);
    addCommentsByGemId(body)
      .then((response) => {
        setComment("");
        setIsLadoing(false);
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
    return <p>Something went worng</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>username</p>
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
      <button type="submit">Post</button>
    </form>
  );
}
export default CommentForm;
