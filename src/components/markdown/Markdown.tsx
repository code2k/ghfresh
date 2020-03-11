import marked from "marked";
import React, { useMemo } from "react";
import useStyles from "./styles";

const Markdown = ({ markdown }: { markdown: string }) => {
  const classes = useStyles();
  const html = useMemo(() => marked(markdown), [markdown]);
  return (
    <div className={classes.root} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default Markdown;
