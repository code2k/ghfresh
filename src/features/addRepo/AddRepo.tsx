import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "preact/hooks";
import React, { ChangeEvent, FormEvent, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { searchRepos } from "../../github/githubAPI";
import isRepoString from "../../github/isRepoString";
import { addNewRepo } from "../repos/reposSlice";

const useStyles = makeStyles(theme => ({
  form: {
    width: 400
  },
  button: {
    // float: "right",
    // marginLeft: theme.spacing(1)
  }
}));

const AddRepo = () => {
  const classes = useStyles();
  const [repo, setRepo] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchTerm] = useDebounce(repo, 500);
  const dispatch = useDispatch();

  const isValid = useMemo(() => isRepoString(repo), [repo]);

  // remove suggestions if the input is to short
  useEffect(() => {
    if (repo.length <= 3) {
      setSuggestions([]);
    }
  }, [repo]);

  // search on debounced searchTerm change
  useEffect(() => {
    if (searchTerm.length <= 3) {
      return;
    }

    (async () => {
      try {
        const results = await searchRepos(searchTerm);
        setSuggestions(results);
      } catch (err) {
        setSuggestions([err]);
      }
    })();
  }, [searchTerm]);

  const onChange = (e: ChangeEvent<{}>, value: string | null) => {
    setRepo(value || "");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    dispatch(addNewRepo(repo));
    setRepo("");
  };

  return (
    <Box>
      <form className={classes.form} onSubmit={onSubmit}>
        <Autocomplete
          inputValue={repo}
          onInputChange={onChange}
          autoHighlight
          size="small"
          options={suggestions}
          clearOnEscape
          freeSolo
          disableListWrap
          renderInput={params => (
            <TextField
              {...params}
              label="Add GitHub repo"
              margin="normal"
              inputProps={params.inputProps}
            />
          )}
        />
        <Button
          disabled={!isValid}
          className={classes.button}
          variant="outlined"
          type="submit"
        >
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AddRepo;
