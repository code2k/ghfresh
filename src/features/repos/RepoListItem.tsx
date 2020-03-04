import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
  Button
} from "@material-ui/core";

import { ExpandMoreIcon } from "../../components/Icons";
import Markdown from "../../components/Markdown";

const useStyles = makeStyles(({ spacing, transitions }) => ({
  card: {
    padding: spacing(0),
    borderRadius: 4
  },
  header: {
    padding: spacing(1)
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: transitions.create("transform", {
      duration: transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

export interface RepoListItemModel {
  id: string;
  htmlURL: string;
  tagName: string;
  name: string;
  author: string;
  authorHtmlURL: string;
  authorAvatarURL: string;
  createdAt: Date;
  publishedAt: Date;
  html: string;
}

interface Props {
  repo: RepoListItemModel;
}

const RepoListItem = ({ repo }: Props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card} elevation={3}>
      <CardHeader
        className={classes.header}
        avatar={<Avatar src={repo.authorAvatarURL} />}
        title={repo.id}
        subheader={repo.name}
      />
      <CardContent>
        <Typography component="p">
          Published at: {repo.publishedAt.toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          size="small"
          color="primary"
          href={repo.htmlURL}
          target="__blank"
          rel="noopener"
        >
          Github
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Markdown markdown={repo.html} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RepoListItem;
