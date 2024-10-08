export const LoadingScreen = () => {
  return (
    // <>
    // need to edit this for accessibility with tailwind
    // <h2><span aria-hidden="true">Loading...</span></h2>
    // <p><span className="visually-hidden">Website is currently loading</span></p>
    // </>
    <>
      <h2>
        <span>Loading...</span>
      </h2>
    </>
  );
};

export const LoadingPostButton = () => {
  return (
    <>
      <button disabled>Posting...</button>
    </>
  );
};

export const DeletingCommentButton = () => {
  return (
    <>
      <button disabled>Deleting...</button>
    </>
  );
};

export const NoComments = () => {
  return <h3>No comments here yet! Be the first to post a comment.</h3>;
};
