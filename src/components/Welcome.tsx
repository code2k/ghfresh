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

const useStyles = makeStyles(({ spacing, typography }) => ({
  root: {
    marginTop: spacing(4),
    textAlign: "center",
  },
  action: {
    marginTop: spacing(4),
    marginLeft: spacing(2),
    marginRight: spacing(2),
    display: "inline-block",
    padding: spacing(2),
    width: "150px",
    textAlign: "center",
  },
  info: {
    marginTop: spacing(4),
    fontStyle: "italic",
  },
  listItem: {
    fontSize: "1rem",
  },
  title: {
    fontWeight: typography.fontWeightMedium,
    marginBottom: spacing(1),
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
          Monitor GitHub repositories for new releases
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
        <Typography variant="h6" className={classes.info} noWrap>
          How does this work?
        </Typography>
        <ol>
          <li className={classes.listItem}>Add one or more repositories</li>
          <li className={classes.listItem}>Bookmark this page</li>
          <li className={classes.listItem}>
            Visit this page to see what's new
          </li>
        </ol>
        <Typography variant="h6" className={classes.info} noWrap>
          Note:
        </Typography>
        <Typography variant="body1" noWrap>
          Your data is stored in your browser's local storage. Only you can
          access it.
        </Typography>
      </Box>
    </Fade>
  );
};

export default Welcome;
