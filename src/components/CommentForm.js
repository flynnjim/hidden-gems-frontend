import { addCommentsByGemId } from "@/api/api";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import { useState } from "react";
import { useUser } from "@/context/UserContext";


function CommentForm({ gem_id, setComments }) {
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLadoing] = useState(false);
  const { user } = useUser();

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
      username: user.username,
      body: comment,
      gem_id: Number(gem_id), //change dynamically
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
      <p>{user.username} leave a comment below!</p>
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
