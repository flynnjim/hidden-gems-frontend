import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export const LoadingScreen = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size="3rem" color="success" />
    </Box>
  );
};

export const LoadingPostButton = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export const DeletingCommentButton = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};
