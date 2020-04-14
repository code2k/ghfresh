import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import ReposSortButton from "../sortRepos/ReposSortButton";
import SortDirectionToggle from "../sortRepos/SortDirectionToggle";

const useStyles = makeStyles(({ spacing, typography }) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginTop: spacing(4),
    marginBottom: spacing(3),
    paddingLeft: spacing(2),
    paddingRight: spacing(1),
  },
  title: {
    flexGrow: 1,
    fontWeight: typography.fontWeightMedium,
  },
}));

export const ReposListHeader = () => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography className={classes.title} component="div" noWrap>
        Repositories
      </Typography>
      <ReposSortButton />
      <SortDirectionToggle />
    </Paper>
  );
};

export default ReposListHeader;
