import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { SortAlphaIcon, SortDateIcon, SortIcon } from "../../components/Icons";
import { ReposSortOrder, setReposSortOrder } from "./sortReposSlice";

interface Props {
  order: ReposSortOrder;
  setReposSortOrder: (order: ReposSortOrder) => void;
}

interface OptionsType {
  order: ReposSortOrder;
  title: string;
  icon: JSX.Element;
}

const options: OptionsType[] = [
  { order: "alpha", title: "Sort by Name", icon: <SortAlphaIcon /> },
  { order: "date", title: "Sort by Date", icon: <SortDateIcon /> },
  { order: "none", title: "Unsorted", icon: <SortIcon /> }
];

export const ReposSortButton = ({ order, setReposSortOrder }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  let selectedIndex = options.findIndex(v => v.order === order);

  const onClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.SyntheticEvent, index: number) => {
    setAnchorEl(null);
    setReposSortOrder(options[index].order);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Tooltip title="Select sort order">
      <span>
        <IconButton
          aria-haspopup="true"
          aria-controls="order-menu"
          aria-label="sort order"
          onClick={onClick}
        >
          {options[selectedIndex].icon}
        </IconButton>
        <Menu
          id="order-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          variant="selectedMenu"
        >
          {options.map((option, index) => (
            <MenuItem
              key={option.order}
              selected={index === selectedIndex}
              onClick={event => handleMenuItemClick(event, index)}
            >
              {option.title}
            </MenuItem>
          ))}
        </Menu>
      </span>
    </Tooltip>
  );
};

const selectOrder = (state: RootState) => state.sort.order;

const mapStateToProps = (state: RootState) => ({
  order: selectOrder(state)
});

const mapDispatch = { setReposSortOrder };

export default connect(mapStateToProps, mapDispatch)(ReposSortButton);
