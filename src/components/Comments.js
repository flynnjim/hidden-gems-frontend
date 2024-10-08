"use client";
import { getCommentsByGemId } from "@/api/api";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

function Comments({ gem_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [noComments, setNoComments] = useState(false);

  useEffect(() => {
    getCommentsByGemId(gem_id)
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
    return <p>Loading ...</p>;
  }
  if (isError) {
    return <p>Something went worng</p>;
  }

  return (
    <>
      {noComments && <p>No comments found</p>}
      <ul className=" flex flex-col gap-4">
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
      <CommentForm gem_id={gem_id} setComments={setComments} />
    </>
  );
}
export default Comments;
