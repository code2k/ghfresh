import { Dispatch, useEffect, useState } from "react";
import { useDebounce } from "use-debounce/lib";
import { searchRepos } from "../../github/githubAPI";

const useRepoSearch = (
  initialValue: string
): [string, Dispatch<string>, string[]] => {
  const [input, setInput] = useState<string>(initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debouncedInput] = useDebounce(input, 500);

  // remove suggestions if the input is to short
  useEffect(() => {
    if (input.length <= 3) {
      setSuggestions([]);
    }
  }, [input]);

  // search on debounced searchTerm change
  useEffect(() => {
    if (debouncedInput.length <= 3) {
      return;
    }

    (async () => {
      try {
        const results = await searchRepos(debouncedInput);
        setSuggestions(results);
      } catch (err) {
        setSuggestions([err]);
      }
    })();
  }, [debouncedInput]);

  return [input, setInput, suggestions];
};

export default useRepoSearch;
