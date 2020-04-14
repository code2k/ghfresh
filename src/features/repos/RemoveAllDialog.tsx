import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React from "react";

interface Props {
  open: boolean;
  handleCancel: () => void;
  handleOK: () => void;
}

const RemoveAllDialog = ({ open, handleCancel, handleOK }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="xs"
      aria-labelledby="remove-all-dialog-title"
      aria-describedby="remove-all-dialog-description"
    >
      <DialogTitle id="remove-all-dialog-title">
        Remove all Repositories?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOK} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveAllDialog;
