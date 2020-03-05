import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { ChangeEvent, FormEvent, useMemo } from "react";
import { useDispatch } from "react-redux";
import isRepoString from "../../github/isRepoString";
import { addNewRepo } from "../repos/reposSlice";
import useRepoSearch from "./useRepoSearch";

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
  const dispatch = useDispatch();
  const [repo, setRepo, suggestions] = useRepoSearch("");

  const isValid = useMemo(() => isRepoString(repo), [repo]);

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
