import React, { FormEvent, ChangeEvent } from "react";
import { useState } from "preact/hooks";
import { fetchLatestRelease } from "./reposSlice";
import { useDispatch } from "react-redux";

const AddRepo = () => {
  const [repo, setRepo] = useState("");
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepo(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!repo.trim()) {
      return;
    }

    dispatch(fetchLatestRelease(repo));
    setRepo("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={repo} onChange={onChange} />
        <button type="submit">Add Repo</button>
      </form>
    </div>
  );
};

export default AddRepo;
