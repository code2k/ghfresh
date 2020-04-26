import { Box, Button, Fade } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

const UpdateNotification = () => {
  const handleOnClick = () => {
    window.location.reload();
  };

  return (
    <Fade in>
      <Box mt={3} clone>
        <Alert
          onClick={handleOnClick}
          variant="outlined"
          severity="info"
          action={<Button color="primary">reload</Button>}
        >
          A new version is available!
        </Alert>
      </Box>
    </Fade>
  );
};

export default UpdateNotification;
