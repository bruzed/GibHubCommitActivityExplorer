import { useCallback, useEffect, useState } from "react";
import { octokit } from "../utils/ocktokit";
import REPOS_MOCK from "../mocks/repositories.json";
import { USE_MOCKS } from "../utils/constants";

export default function useRepositories(selectedRepositories) {
  const [repositories, setRepositories] = useState(null);
  const [queryString, setQueryString] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  let mockTimerID;

  useEffect(() => {
    if (!queryString) {
      return;
    }

    setHasError(false);
    setIsLoaded(false);

    const request = async () => {
      const res = await octokit.rest.search.repos({
        q: queryString,
        sort: "stars",
        order: "desc",
      });
      handleResponse(res);
    };

    request();
  }, [queryString]);

  const handleResponse = useCallback((res) => {
    if (
      res.status === 200 &&
      res.headers["x-ratelimit-remaining"] > 0 &&
      !res.headers["retry-after"]
    ) {
      const existingIds = selectedRepositories.map((repo) => repo.id);
      const filtered = res.data.items.filter(
        (item) => !existingIds.includes(item.id),
      );
      setRepositories(filtered);
    } else {
      setHasError(true);
    }

    setIsLoaded(true);
  });

  const getRepositories = (queryString, useMock = USE_MOCKS) => {
    if (useMock) {
      clearTimeout(mockTimerID);
      setHasError(false);
      setIsLoaded(false);
      mockTimerID = setTimeout(() => {
        handleResponse(REPOS_MOCK);
      }, 100);
    } else {
      const q = encodeURIComponent(queryString);
      setQueryString(q);
    }
  };

  return { hasError, isLoaded, repositories, getRepositories };
}
