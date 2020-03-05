import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import React from "react";

interface Props {
  repoID: string;
  open: boolean;
  handleCancel: () => void;
  handleOK: () => void;
}

const RemoveDialog = ({ repoID, open, handleCancel, handleOK }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="xs"
      aria-labelledby="remove-dialog-title"
      aria-describedby="remove-dialog-description"
    >
      <DialogTitle id="remove-dialog-title">
        Remove this repository?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="remove-dialog-description">
          Do you really want to remove "<strong>{repoID}</strong>" from your
          repositories list?
        </DialogContentText>
      </DialogContent>
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

export default RemoveDialog;
