import { Dispatch, useEffect, useState } from "react";
import { useDebounce } from "use-debounce/lib";
import { searchRepos } from "../../github/githubAPI";

const useRepoSearch = (
  initialValue: string
): [string, Dispatch<string>, string[], boolean] => {
  const [input, setInput] = useState<string>(initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debouncedInput] = useDebounce(input, 500);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    (async () => {
      try {
        const results = await searchRepos(debouncedInput);
        setSuggestions(results);
      } catch (err) {
        setSuggestions([err]);
      }
      setLoading(false);
    })();
  }, [debouncedInput]);

  return [input, setInput, suggestions, loading];
};

export default useRepoSearch;
