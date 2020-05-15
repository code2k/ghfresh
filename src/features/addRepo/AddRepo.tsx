import { IconButton, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { AddIcon } from "../../components/Icons";
import { addNewRepo } from "../repos/reposSlice";
import AddRepoDialog from "./AddRepoDialog";

const AddRepo = () => {
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const online = useSelector((state: RootState) => state.online);

  useEffect(() => {
    if (!online && showDialog) {
      // application has entered offline state
      // -> close dialog
      setShowDialog(false);
    }
  }, [online, showDialog]);

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
        <span>
          <IconButton color="inherit" onClick={openDialog} disabled={!online}>
            <AddIcon />
          </IconButton>
        </span>
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
