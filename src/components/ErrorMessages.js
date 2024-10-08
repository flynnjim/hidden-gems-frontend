import Link from "next/link";

// General

export const CannotLoadData = ({ message }) => {
  return (
    <div>
      <h2>Error</h2>
      <h3>Something went wrong! Could not load data.</h3>
      <p>{message}</p>
    </div>
  );
};

export const NotLoggedIn = () => {
  return <p disabled>Please login to make this change.</p>;
};

// Rating

export const RatingError = ({ message }) => {
  return (
    <div>
      <h2>Error</h2>
      <h3>Unexpected error! Your rating has not been registered.</h3>
      <p>{message}</p>
    </div>
  );
};

// Comments

export const InvalidComment = () => {
  return <p>Please enter a valid comment.</p>;
};

export const CommentError = ({ message }) => {
  return (
    <div>
      <h2>Error</h2>
      <h3>Unexpected error! Your comment has not been registered.</h3>
      <p>{message}</p>
    </div>
  );
};

export const DeleteCommentError = ({ message }) => {
  return (
    <div>
      <h2>Error</h2>
      <h3>Unexpected error! Your comment has not been deleted.</h3>
      <p>{message}</p>
    </div>
  );
};

export const NotLoggedInComment = () => {
  return <p>Please login to post a comment.</p>;
};

// Posting a Gem

export const InvalidGemPost = () => {
  return (
    <p>
      This post cannot be submitted. Please check that you have entered all the
      details correctly.
    </p>
  );
};

export const GemPostError = () => {
  return (
    <div>
      <h2>Something has gone wrong! Your gem was not added.</h2>
      <Link href="/add-gem">Click here to go back</Link>
    </div>
  );
};

export const GemNotLoggedIn = () => {
  return (
    <div>
      <h2>Error: Please login before adding a gem</h2>
      <Link href="/login">Click here to login</Link>
    </div>
  );
};
