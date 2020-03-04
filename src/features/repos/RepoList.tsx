import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";

import RepoListItem, { RepoListItemModel } from "./RepoListItem";
import { RootState } from "../../app/rootReducer";

interface Props {
  repos: RepoListItemModel[];
}

const RepoList = ({ repos }: Props) => {
  return (
    <Box mt={4}>
      {repos.map(repo => (
        <Box mb={3}>
          <RepoListItem repo={repo} />
        </Box>
      ))}
    </Box>
  );
};

const selectRepos = (state: RootState) => state.repos;

const reposToModel = createSelector(selectRepos, (repos): RepoListItemModel[] =>
  repos.map(repo => {
    const info = repo.latestRelease;
    return {
      id: repo.id,
      tagName: info.tag_name,
      name: info.name,
      html: info.body,
      htmlURL: info.html_url,
      author: info.author.login,
      authorAvatarURL: info.author.avatar_url,
      authorHtmlURL: info.author.html_url,
      createdAt: new Date(info.created_at),
      publishedAt: new Date(info.published_at)
    };
  })
);

const mapStateToProps = (state: RootState): Props => ({
  repos: reposToModel(state)
});

export default connect(mapStateToProps)(RepoList);
