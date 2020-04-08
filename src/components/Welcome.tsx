import {
  Box,
  Fade,
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import AddRepo from "../features/addRepo/AddRepo";
import { PlaylistAddIcon } from "./Icons";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
  action: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: "inline-block",
    padding: theme.spacing(2),
    width: "150px",
    textAlign: "center",
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(1),
  },
}));

interface Props {
  addExamples: () => void;
}

const Welcome = ({ addExamples }: Props) => {
  const classes = useStyles();
  return (
    <Fade in>
      <Box className={classes.root}>
        <Typography variant="h5">
          Monitor GitHub repositories for new releases:
        </Typography>
        <Box>
          <Paper className={classes.action} elevation={2}>
            <Typography className={classes.title} noWrap>
              Add repository
            </Typography>
            <AddRepo />
          </Paper>
          <Paper className={classes.action} elevation={3}>
            <Typography className={classes.title} noWrap>
              Add examples
            </Typography>
            <Tooltip title="Add example repositories">
              <IconButton color="inherit" onClick={addExamples}>
                <PlaylistAddIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </Box>
      </Box>
    </Fade>
  );
};

export default Welcome;
