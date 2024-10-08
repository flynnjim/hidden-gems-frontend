import { deleteCommentById } from "@/api/api";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

function CommentCard({ comment, setComments }) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLadoing] = useState(false);
  const { user } = useUser();

  const date = new Date(comment.date).toLocaleDateString();
  const deleteCommentButton = (comment_id) => {
    setIsLadoing(true);
    deleteCommentById(comment_id)
      .then(() => {
        setComments((previousComments) => {
          const newComments = [...previousComments].filter(
            (comment) => comment.comment_id !== comment_id
          );
          return newComments;
        });
        setIsLadoing(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLadoing(false);
      });
  };

  if (isLoading) {
    return <p>Loading deleted comment...</p>;
  }
  if (isError) {
    return <p>Something went worng with delete comment</p>;
  }

  //dynamic unsername

  return (
    <li className="bg-slate-300">
      <h3 className="font-bold">{comment.username}</h3>
      <p>{comment.body}</p>
      <p>{date}</p>
      {user && comment.username === user.username && (
        <button
          type="button"
          onClick={() => deleteCommentButton(comment.comment_id)}
          className="text-black"
        >
          Delete{" "}
        </button>
      )}
    </li>
  );
}
export default CommentCard;
