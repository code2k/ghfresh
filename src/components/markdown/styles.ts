import { makeStyles } from "@material-ui/core";

export default makeStyles(({ palette }) => {
  const isDark = palette.type === "dark";
  return {
    root: {
      lineHeight: "1.5rem",
      fontSize: "1rem",
      wordWrap: "break-word",
      "& a": {
        color: palette.primary.main,
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline"
        }
      },
      "& p": {
        margin: "1em 0"
      },
      "& img": {
        border: "0",
        MsInterpolationMode: "bicubic",
        verticalAlign: "middle"
      },
      "& h1": {
        fontSize: "2em",
        paddingBottom: ".3em",
        borderBottom: "1px solid " + palette.grey[isDark ? 700 : 200]
      },
      "& h2": {
        fontSize: "1.5em",
        paddingBottom: ".3em",
        borderBottom: "1px solid " + palette.grey[isDark ? 700 : 200]
      },
      "& h3": {
        fontSize: "1.2em"
      },
      "& h4": {
        fontSize: "1em"
      },
      "& h5": {
        fontSize: "0.9em"
      },
      "& h6": {
        fontSize: "0.8em"
      },
      "& blockquote": {
        margin: "0",
        paddingLeft: "3em",
        borderLeft: `0.5em ${palette.grey[isDark ? 700 : 200]} solid`
      },
      "& hr": {
        display: "block",
        border: "0",
        borderBottom: "1px solid " + palette.grey[isDark ? 700 : 200],
        margin: "1em 0",
        padding: "0"
      },
      "& pre": {
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      },
      "& code": {
        padding: ".2em .4em",
        margin: 0,
        backgroundColor: palette.grey[isDark ? 700 : 200],
        borderRadius: "3px",
        fontFamily: "monospace, monospace",
        fontSize: "0.98em"
      },
      "& kbd": {
        fontFamily: "monospace, monospace",
        fontSize: "0.98em"
      },
      "& samp": {
        fontFamily: "monospace, monospace",
        _fontFamily: "'courier new', monospace",
        fontSize: "0.98em"
      },
      "& b": {
        fontWeight: "bold"
      },
      "& strong": {
        fontWeight: "bold"
      },
      "& sub": {
        bottom: "-0.25em"
      },
      "& sup": {
        top: "-0.5em"
      },
      "& ul": {
        margin: "1em 0",
        padding: "0 0 0 2em"
      },
      "& ol": {
        margin: "1em 0",
        padding: "0 0 0 2em"
      },
      "& li": {
        marginTop: "0.25em",
        "& p": {
          "&:last-child": {
            margin: "0"
          }
        }
      },
      "& dd": {
        margin: "0 0 0 2em"
      },
      "& table": {
        borderCollapse: "collapse",
        borderSpacing: "0"
      },
      "& td": {
        verticalAlign: "top"
      }
    }
  };
});
