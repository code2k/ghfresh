import {
  AppBar,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";
import React from "react";
import AddRepo from "../features/addRepo/AddRepo";
import ThemeToggle from "../features/theme/ThemeToggle";
import { GitHubIcon } from "./Icons";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.type === "light" ? blue[700] : grey[800]
  },
  title: {
    flexGrow: 1
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="sticky">
      <Container maxWidth="md">
        <Toolbar variant="dense" disableGutters>
          <Typography className={classes.title} variant="h6" noWrap>
            GHFresh
          </Typography>
          <AddRepo />
          <ThemeToggle />
          <Tooltip title="GitHub">
            <IconButton
              color="inherit"
              edge="end"
              component="a"
              href="https://github.com/code2k"
              target="__blank"
              rel="noopener"
              aria-label="github"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
