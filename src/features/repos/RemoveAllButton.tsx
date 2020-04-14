import { Button } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import RemoveAllDialog from "./RemoveAllDialog";
import { removeAllRepos } from "./reposSlice";

interface Props {
  className?: string;
}

export const ReposSortButton = (props: Props) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogCancel = useCallback(() => {
    setOpenDialog(false);
  }, [setOpenDialog]);

  const handleDialogOK = useCallback(() => {
    setOpenDialog(false);
    dispatch(removeAllRepos());
  }, [dispatch, setOpenDialog]);

  const handleClick = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Button
        className={props.className}
        size="small"
        color="primary"
        onClick={handleClick}
      >
        Remove All
      </Button>
      <RemoveAllDialog
        open={openDialog}
        handleCancel={handleDialogCancel}
        handleOK={handleDialogOK}
      />
    </>
  );
};

export default ReposSortButton;
