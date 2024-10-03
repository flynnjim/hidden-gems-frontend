"use client";
import { getCommentsByGemId } from "@/api/api";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

function Comments({ gem_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    //change id dynamically
    getCommentsByGemId(2)
      .then((response) => {
        setComments(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []); //add gem_id to dependencies array

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  if (isError) {
    return <p>Something went worng</p>;
  }

  return (
    <>
      <ul className=" flex flex-col gap-4">
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </ul>
      <CommentForm gem_id={gem_id} setComments={setComments} />
    </>
  );
}
export default Comments;
