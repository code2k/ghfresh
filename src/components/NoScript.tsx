import { Box, Typography } from "@material-ui/core";
import React from "react";

const NoScript = () => {
  return (
    <noscript>
      <Box marginY={8}>
        <Typography variant="body1">
          <em>Please enable JavaScript to use GHFresh.</em>
        </Typography>
      </Box>
    </noscript>
  );
};

export default NoScript;
