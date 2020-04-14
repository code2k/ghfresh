import { Box } from "@material-ui/core";
import { createSelector } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../app/rootReducer";
import RepoListItem, { RepoListItemModel } from "./RepoListItem";
import { reposSelectors } from "./reposSlice";
import ReposListHeader from "./ReposListHeader";

interface Props {
  repos: RepoListItemModel[];
}

const RepoList = ({ repos }: Props) => {
  return (
    <>
      <ReposListHeader />
      <Box mt={3} mb={6}>
        {repos.map((repo) => (
          <Box key={repo.id} mb={3}>
            <RepoListItem repo={repo} />
          </Box>
        ))}
      </Box>
    </>
  );
};

const selectRepos = (state: RootState) => state.repos;
const selectSort = (state: RootState) => state.sort;

const reposToModel = createSelector(
  [selectRepos, selectSort],
  (repos, sort): RepoListItemModel[] => {
    // copy original first
    let sorted = [...reposSelectors.selectAll(repos)];

    sorted.sort((repo1, repo2) => {
      if (sort.order === "alpha") {
        return repo1.id.localeCompare(repo2.id);
      } else if (sort.order === "date") {
        const date1 = new Date(repo1.latestRelease.published_at);
        const date2 = new Date(repo2.latestRelease.published_at);
        return date1.getTime() - date2.getTime();
      }
      return 0;
    });

    if (sort.descending) {
      sorted.reverse();
    }

    return sorted.map((repo) => {
      const info = repo.latestRelease;
      return {
        id: repo.id,
        releaseName: info.name.length > 0 ? info.name : info.tag_name,
        html: info.body,
        htmlURL: info.html_url,
        author: info.author.login,
        authorAvatarURL: info.author.avatar_url,
        authorHtmlURL: info.author.html_url,
        createdAt: new Date(info.created_at),
        publishedAt: new Date(info.published_at),
      };
    });
  }
);

const mapStateToProps = (state: RootState): Props => ({
  repos: reposToModel(state),
});

export default connect(mapStateToProps)(RepoList);
