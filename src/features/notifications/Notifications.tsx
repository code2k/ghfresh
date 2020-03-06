import { Slide, Snackbar } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { nextNotification } from "./notificationsSlice";

const TransitionUp = (props: TransitionProps) => {
  return <Slide {...props} direction="up" />;
};

const Notifications = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const current = useSelector(
    (state: RootState) => state.notifications.current
  );
  const queue = useSelector((state: RootState) => state.notifications.queue);

  // run on queue change
  useEffect(() => {
    // close current if there are more in queue
    if (queue.length > 0) {
      setOpen(false);
    }
  }, [queue, setOpen]);

  // run on current notification change
  useEffect(() => {
    if (current) {
      setOpen(true);
    }
  }, [current, setOpen]);

  const handleEntered = () => {
    if (queue.length > 0) {
      setOpen(false);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    // notification has disappeared -> trigger next notification
    dispatch(nextNotification());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        onEntered={handleEntered}
        onExited={handleExited}
        TransitionComponent={TransitionUp}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={current && current.type ? current.type : "info"}
        >
          {current?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notifications;
