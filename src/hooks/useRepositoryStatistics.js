import { useCallback, useEffect, useState } from "react";
import { octokit } from "../utils/ocktokit";
import REPOS_STATS_MOCK from "../mocks/repo-stats.json";
import REPO_STATS_ERROR from "../mocks/repo-stats-error.json";
import { USE_MOCKS } from "../utils/constants";

export default function useRepositoryStatistics() {
  const [repositoryStats, setRepositoryStats] = useState(null);
  const [isStatsLoaded, setIsStatsLoaded] = useState(false);
  const [queryParams, setQueryParams] = useState({
    owner: null,
    repo: null,
  });
  const [hasError, setHasError] = useState(false);

  let statsTimerID;

  useEffect(() => {
    if (!queryParams.owner || !queryParams.repo) {
      return;
    }

    setHasError(false);
    setIsStatsLoaded(false);

    const request = async () => {
      const res = await octokit.rest.repos.getCommitActivityStats({
        owner: queryParams.owner,
        repo: queryParams.repo,
      });

      handleResponse(queryParams.owner, queryParams.repo, res);
    };

    request();
  }, [queryParams]);

  const transformToGraphData = useCallback((owner, repo, stats) => {
    const graphData = [];
    stats.data.length &&
      stats.data.map((item) => {
        graphData.push({
          name: `${owner}/${repo}`,
          total: item.total,
          week: item.week,
        });
      });
    return graphData.length ? graphData : null;
  });

  const handleResponse = useCallback((owner, repo, res) => {
    // console.log(res);
    if (
      res.status === 200 &&
      res.headers["x-ratelimit-remaining"] > 0 &&
      !res.headers["retry-after"]
    ) {
      const graphData = transformToGraphData(owner, repo, res);
      setRepositoryStats(graphData);
    } else {
      setHasError(true);
    }

    setIsStatsLoaded(true);
  });

  const getRepositoryStats = (owner, repo, useMock = USE_MOCKS) => {
    if (useMock) {
      clearTimeout(statsTimerID);
      setIsStatsLoaded(false);
      statsTimerID = setTimeout(() => {
        setHasError(false);
        handleResponse(owner, repo, REPOS_STATS_MOCK);
        // handleResponse(owner, repo, REPO_STATS_ERROR);
      }, 100);
    } else {
      setQueryParams({ owner, repo });
    }
  };

  return { hasError, isStatsLoaded, repositoryStats, getRepositoryStats };
}
