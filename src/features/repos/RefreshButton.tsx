import {
  CircularProgress,
  IconButton,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { createSelector } from "@reduxjs/toolkit";
import React from "react";
import { connect, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { AppDispatch } from "../../app/store";
import { RefreshIcon } from "../../components/Icons";
import { reposSelectors, updateAll } from "./reposSlice";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: "inline-block",
  },
  button: {
    display: "flex",
    alignItems: "center",
  },
  progress: {
    color: palette.type === "light" ? palette.info.main : palette.info.dark,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
}));

interface Props {
  isLoading: boolean;
  isEmpty: boolean;
  updateAll: () => void;
}

export const RefreshButton = ({ isLoading, isEmpty, updateAll }: Props) => {
  const classes = useStyles();
  const online = useSelector((state: RootState) => state.online);

  const onClick = () => {
    updateAll();
  };

  return (
    <Tooltip className={classes.root} title="Update all repositories">
      <span>
        <IconButton
          color="inherit"
          className={classes.button}
          disabled={isLoading || isEmpty || !online}
          onClick={onClick}
        >
          <RefreshIcon />
          {isLoading && (
            <CircularProgress size={48} className={classes.progress} />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};

const selectIsLoading = createSelector(reposSelectors.selectAll, (repos) =>
  repos.some((repo) => repo.loading)
);

const mapStateToProps = (state: RootState) => ({
  isLoading: selectIsLoading(state.repos),
  isEmpty: state.repos.ids.length === 0,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  updateAll: () => dispatch(updateAll),
});

export default connect(mapStateToProps, mapDispatch)(RefreshButton);
