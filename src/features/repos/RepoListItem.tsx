import {
  Avatar,
  Card,
  CardHeader,
  Collapse,
  IconButton,
  makeStyles
} from "@material-ui/core";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import ExternalLink from "../../components/ExternalLink";
import { DeleteIcon, ExpandMoreIcon } from "../../components/Icons";
import Markdown from "../../components/markdown/Markdown";
import RemoveDialog from "./RemoveDialog";
import { removeRepo } from "./reposSlice";

// https://day.js.org/docs/en/plugin/relative-time
dayjs.extend(relativeTime);

const useStyles = makeStyles(({ spacing, transitions, typography }) => ({
  author: {
    marginRight: spacing(0.75),
    display: "flex",
    alignItems: "center",
    fontWeight: typography.fontWeightMedium
  },
  avatar: {
    marginRight: spacing(1),
    width: "24px",
    height: "24px"
  },
  header: {
    padding: spacing(2)
  },
  repoTitle: {
    fontSize: "1.25rem"
  },
  releaseName: {
    fontSize: "1rem"
  },
  info: {
    display: "flex",
    alignItems: "center",
    paddingLeft: spacing(2),
    paddingRight: spacing(1),
    paddingBottom: spacing(2),
    fontSize: "0.9375rem"
  },
  markdown: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingBottom: spacing(2)
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
  releaseName: string;
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
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const publishedAt = dayjs(repo.publishedAt);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRemoveClick = () => {
    setOpenDialog(true);
  };

  const handleDialogCancel = useCallback(() => {
    setOpenDialog(false);
  }, [setOpenDialog]);

  const handleDialogOK = useCallback(() => {
    setOpenDialog(false);
    dispatch(removeRepo(repo.id));
  }, [dispatch, repo, setOpenDialog]);

  return (
    <Card elevation={3}>
      <CardHeader
        classes={{
          root: classes.header,
          title: classes.repoTitle,
          subheader: classes.releaseName
        }}
        title={
          <ExternalLink
            color="textPrimary"
            href={`https://github.com/${repo.id}`}
          >
            {repo.id}
          </ExternalLink>
        }
        subheader={
          <ExternalLink color="textPrimary" href={repo.htmlURL}>
            {repo.releaseName}
          </ExternalLink>
        }
        action={
          <IconButton onClick={handleRemoveClick}>
            <DeleteIcon />
          </IconButton>
        }
      />
      <div className={classes.info}>
        <ExternalLink
          className={classes.author}
          color="textPrimary"
          href={repo.authorHtmlURL}
        >
          <Avatar
            classes={{ root: classes.avatar }}
            alt={repo.author}
            src={`${repo.authorAvatarURL}&s=24`}
          />
          {repo.author}
        </ExternalLink>{" "}
        released this&nbsp;
        <span title={publishedAt.toString()}>{dayjs().to(publishedAt)}</span>.
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
      </div>
      <Collapse
        className={classes.markdown}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <Markdown markdown={repo.html} repoID={repo.id} />
      </Collapse>
      <RemoveDialog
        repoID={repo.id}
        open={openDialog}
        handleOK={handleDialogOK}
        handleCancel={handleDialogCancel}
      />
    </Card>
  );
};

export default RepoListItem;
