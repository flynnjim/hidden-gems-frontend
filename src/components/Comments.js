"use client";
import { getCommentsByGemId } from "@/api/api";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

function Comments({ gem_id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    //change id dynamically
    getCommentsByGemId(2).then((response) => {
      setComments(response);
    });
  }, []); //add gem_id to dependencies array

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
