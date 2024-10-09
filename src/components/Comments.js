"use client";
import { getCommentsByGemId } from "@/api/api";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { CannotLoadData } from "./ErrorMessages";
import { LoadingScreen } from "./LoadingStatuses";

function Comments({ gem_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [noComments, setNoComments] = useState(false);

  useEffect(() => {
    getCommentsByGemId(gem_id, "date", "desc")
      .then((response) => {
        setComments(response);
        setNoComments(false);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsLoading(false);
          setNoComments(true);
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      });
  }, [gem_id, comments]);

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

  return (
    <>
      <CommentForm gem_id={gem_id} setComments={setComments} />
      {noComments && (
        <p className="text-textcolor text-sm ml-2">
          No comments yet. Be the first to leave a comment!
        </p>
      )}
      <ul className=" flex flex-col gap-4 ml-2 mr-2">
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              setComments={setComments}
            />
          );
        })}
      </ul>
    </>
  );
}
export default Comments;
