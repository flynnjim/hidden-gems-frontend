function CommentCard({ comment }) {
  const date = new Date(comment.date).toLocaleDateString();
  return (
    <li className="bg-slate-300">
      <h3 className="font-bold">{comment.username}</h3>
      <p>{comment.body}</p>
      <p>{date}</p>
    </li>
  );
}
export default CommentCard;
