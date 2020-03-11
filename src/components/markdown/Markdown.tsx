import marked from "marked";
import React, { useMemo } from "react";
import useStyles from "./styles";

const renderer = new marked.Renderer();

renderer.link = (href: string, title: string, text: string) => {
  return `<a href="${href}" title="${title ||
    ""}" target="__blank" rel="noopener"/>${text}</a>`;
};

const mention = /([^[])@([a-z\-\d]+)/gi;
const pull = /([^[])#([\d]+)/gi;

const replaceShortcuts = (markdown: string, repoID: string): string => {
  let newMD = markdown.replace(mention, "$1[@$2](https://github.com/$2)");
  newMD = newMD.replace(pull, `$1[#$2](https://github.com/${repoID}/pull/$2)`);
  return newMD;
};

const Markdown = ({
  markdown,
  repoID
}: {
  markdown: string;
  repoID: string;
}) => {
  const classes = useStyles();
  const html = useMemo(
    () => marked(replaceShortcuts(markdown, repoID), { renderer }),
    [markdown, repoID]
  );
  return (
    <div className={classes.root} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default Markdown;
