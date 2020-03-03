import React, { useMemo } from "react";
import marked from "marked";

import "github-markdown-css";

const Markdown = ({ markdown }: { markdown: string }) => {
  const html = useMemo(() => marked(markdown), [markdown]);
  return (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default Markdown;
