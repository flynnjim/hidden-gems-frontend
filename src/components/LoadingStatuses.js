import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export const LoadingScreen = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size="3rem" />
    </Box>
  );
};

export const LoadingPostButton = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export const DeletingCommentButton = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export const NoComments = () => {
  return <h3>No comments here yet! Be the first to post a comment.</h3>;
};
