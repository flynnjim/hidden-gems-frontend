import { deleteCommentById } from "@/api/api";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingScreen } from "./LoadingStatuses";
import { CannotLoadData } from "./ErrorMessages";

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
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <CannotLoadData />
      </div>
    );
  }

  //dynamic unsername

  return (
    <li className="bg-commentcolor p-2 pl-3 pr-3 w-[100%] rounded">
      <h3 className="font-bold">{comment.username}</h3>
      <p className="text-sm">{comment.body}</p>
      <div className="flex ">
        <p className="text-xs italic mt-3">{date}  </p>
        {user && comment.username === user.username && (
          <IconButton
            aria-label="delete"
            sx={{ justifyContent: "flex-end" }}
            onClick={() => deleteCommentButton(comment.comment_id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </div>
    </li>
  );
}
export default CommentCard;
