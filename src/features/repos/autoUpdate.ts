import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateAll } from "./reposSlice";

/**
 * Auto update interval.
 *
 * Default is 1 hour
 */
const updateInvertval = parseInt(process.env.REACT_APP_AUTO || "3600") * 1000;

const useAutoUpdate = () => {
  const timer = useRef<NodeJS.Timeout>();
  const dispatch = useDispatch();

  useEffect(() => {
    timer.current = setInterval(() => {
      dispatch(updateAll);
    }, updateInvertval);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [dispatch]);
};

export default useAutoUpdate;
