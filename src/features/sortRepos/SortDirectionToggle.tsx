import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { ExpandMoreIcon } from "../../components/Icons";
import { toggleDescending } from "./sortReposSlice";

const useStyles = makeStyles(({ transitions }) => ({
  ascending: {
    transform: "rotate(180deg)",
    marginLeft: "auto",
    transition: transitions.create("transform", {
      duration: transitions.duration.shortest
    })
  },
  descending: {
    transform: "rotate(0deg)"
  }
}));

interface Props {
  descending: boolean;
  toggleDescending: () => void;
}

export const SortDirectionToggle = ({
  descending,
  toggleDescending
}: Props) => {
  const classes = useStyles();
  const onClick = () => {
    toggleDescending();
  };

  return (
    <Tooltip title="Toggle ascending/descending">
      <IconButton
        className={clsx(classes.ascending, {
          [classes.descending]: descending
        })}
        onClick={onClick}
      >
        <ExpandMoreIcon />
      </IconButton>
    </Tooltip>
  );
};

const selectDescending = (state: RootState) => state.sort.descending;

const mapStateToProps = (state: RootState) => ({
  descending: selectDescending(state)
});

const mapDispatch = { toggleDescending };

export default connect(mapStateToProps, mapDispatch)(SortDirectionToggle);
