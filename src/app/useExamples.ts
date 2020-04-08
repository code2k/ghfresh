import { useDispatch } from "react-redux";
import { addNewRepo } from "../features/repos/reposSlice";

const examples = [
  "iamkun/dayjs",
  "markedjs/marked",
  "mui-org/material-ui",
  "preactjs/preact",
  "reduxjs/react-redux",
  "reduxjs/redux-toolkit",
];

export default () => {
  const dispatch = useDispatch();
  return () => {
    examples.forEach((repo) => {
      dispatch(addNewRepo(repo));
    });
  };
};
