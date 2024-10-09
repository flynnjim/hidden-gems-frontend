import Link from "next/link";
import Alert from "@mui/material/Alert";

// General

export const CannotLoadData = ({ message }) => {
  return (
    <div>
      <p>{message}</p>
      <Alert severity="error">
        Something went wrong!
        <br />
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
      Error: Must be logged in. <br />
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
  return <p>Please login to post a comment.</p>;
};

// Gems

export const GemError = () => {
  return (
    <Alert severity="error">
      Gem does not exist. <Link href="/gems">RETURN</Link>
    </Alert>
  );
};

export const GemPostError = () => {
  return (
    <div>
      <h2>Something has gone wrong! Your gem was not added.</h2>
      <Link className="underline" href="/add-gem">
        Click here to go back
      </Link>
    </div>
  );
};

export const GemNotLoggedIn = () => {
  return (
    <div className="container space-x-2">
      <Alert severity="error">
        Error: Please login before adding a gem. <br />
        <Link className="underline" href="/login">
          Login
        </Link>
      </Alert>
    </div>
  );
};
