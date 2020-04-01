import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { ChangeEvent, FormEvent, useMemo } from "react";
import isRepoString from "../../github/isRepoString";
import useRepoSearch from "./useRepoSearch";

interface Props {
  open: boolean;
  handleAdd: (repo: string) => void;
  handleCancel: () => void;
}

const AddRepoDialog = ({ open, handleAdd, handleCancel }: Props) => {
  const [repo, setRepo, suggestions] = useRepoSearch("");

  const isValid = useMemo(() => isRepoString(repo), [repo]);

  const onChange = (e: ChangeEvent<{}>, value: string | null) => {
    setRepo(value || "");
  };

  const addRepo = () => {
    if (!isValid) {
      return;
    }
    handleAdd(repo);
    setRepo("");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addRepo();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="xs"
      fullWidth
      disablePortal
      aria-labelledby="add-repo-label"
    >
      <DialogContent>
        <form onSubmit={onSubmit}>
          <Autocomplete
            id="add-repo"
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
                autoFocus
                label="Add GitHub repository"
                margin="normal"
                inputProps={params.inputProps}
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button disabled={!isValid} onClick={addRepo} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRepoDialog;
