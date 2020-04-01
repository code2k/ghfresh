import { IconButton, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddIcon } from "../../components/Icons";
import { addNewRepo } from "../repos/reposSlice";
import AddRepoDialog from "./AddRepoDialog";

const AddRepo = () => {
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  const handleCancel = () => {
    setShowDialog(false);
  };

  const handleAdd = (repo: string) => {
    setShowDialog(false);
    dispatch(addNewRepo(repo));
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  return (
    <>
      <Tooltip title="Add GitHub repository">
        <IconButton color="inherit" onClick={openDialog}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <AddRepoDialog
        open={showDialog}
        handleCancel={handleCancel}
        handleAdd={handleAdd}
      />
    </>
  );
};

export default AddRepo;
