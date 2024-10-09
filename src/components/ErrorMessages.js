import Link from "next/link";
import Alert from "@mui/material/Alert";

// General

export const CannotLoadData = ({ message }) => {
  return (
    <div>
      <Alert severity="error">
        Something went wrong.
        <p>{message}</p>
        <br />Return 
        <Link className="underline" href="/">
          Home
        </Link>
      </Alert>
    </div>
  );
};

export const NotLoggedIn = () => {
  return (
    <Alert severity="error">
      Error: You must be logged in to take this action.<br />
      <Link className="underline" href="/login">
        Login
      </Link>
    </Alert>
  );
};

// Rating

export const RatingError = ({ message }) => {
  return (
    <div>
      <Alert severity="error">
        Unexpected error! Your rating has not been registered.
      </Alert>
      <p>{message}</p>
    </div>
  );
};

// Comments

export const CommentError = ({ message }) => {
  return (
    <div>
      <Alert severity="error">
        Unexpected error! Your comment has not been registered.
      </Alert>
      <p>{message}</p>
    </div>
  );
};

export const DeleteCommentError = ({ message }) => {
  return (
    <div>
      <Alert severity="error">
        Unexpected error! Your comment has not been deleted.
      </Alert>
      <p>{message}</p>
    </div>
  );
};

export const NotLoggedInComment = () => {
  return <p>Please Login to post a comment.</p>;
};

// Gems

export const GemError = ({message}) => {
  return (
    <Alert severity="error">
        Gem not Found. Click <Link className="cardcolor underline" href="/gems">here</Link> to return to Gems page
    </Alert>
  );
};

export const GemPostError = () => {
  return (
    <div>
      <h2>Unexpected error! Your gem has not been posted.</h2>
      Click <Link className="cardcolor underline" href="/add-gem">here</Link> to return to the form
    </div>
  );
};

export const GemNotLoggedIn = () => {
  return (
    <div className="container space-x-2">
      <Alert severity="error">
      Error: You must be logged to post a new Gem <br />
        Click <Link className="cardcolor underline" href="/login">here</Link> to Login
      </Alert>
    </div>
  );
};
