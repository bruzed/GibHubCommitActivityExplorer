import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRepository,
  addRepositoryStatistics,
  addRepositoryColor,
  removeRepository,
} from "../../store/repositories/RepositoriesSlice";
import SuggestionList from "./suggestion-list/SuggestionList.jsx";
import { Search } from "react-feather";
import styles from "./SearchBar.module.css";
import useRepositories from "../../hooks/useRepositories";
import useRepositoryStatistics from "../../hooks/useRepositoryStatistics";
import { randomColor } from "randomcolor";
import ErrorMessage from "../error-message/ErrorMessage.jsx";

function SearchBar() {
  const selectedRepositories = useSelector(
    (state) => state.repositories.selected
  );

  const { isLoaded, repositories, getRepositories } =
    useRepositories(selectedRepositories);
  const { hasError, isStatsLoaded, repositoryStats, getRepositoryStats } =
    useRepositoryStatistics();

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const [selectedRepoIdx, setSelectedRepoIdx] = useState(null);

  let timerID;

  useEffect(() => {
    if (!repositoryStats) {
      return;
    }

    dispatch(addRepositoryStatistics(repositoryStats));
  }, [repositoryStats, dispatch]);

  useEffect(() => {
    if (isStatsLoaded && hasError) {
      dispatch(removeRepository([...selectedRepositories].length - 1));
    }
  }, [hasError, isStatsLoaded]);

  const handleInput = useCallback((event) => {
    setSearchTerm(event.target.value);

    clearTimeout(timerID);
    timerID = setTimeout(() => {
      getRepositories(event.target.value);
    }, 500);
  });

  const handleSuggestionSelected = useCallback((repository) => {
    setSearchTerm("");

    dispatch(addRepository(repository));

    const color = randomColor();
    dispatch(addRepositoryColor(color));

    const { owner, name } = repository;
    getRepositoryStats(owner.login, name);
  });

  return (
    <>
      <div id={styles.searchBar}>
        <div className={styles.topBar}>
          <input
            id={styles.searchInput}
            name="search-term"
            type="text"
            placeholder="Search a Github Repository..."
            value={searchTerm}
            className={searchTerm ? styles.listVisible : ""}
            onChange={handleInput}
          />

          <button
            id={styles.submitButton}
            className={searchTerm ? styles.listVisible : ""}
          >
            <Search className={styles.searchIcon} />
          </button>
        </div>

        {searchTerm && (
          <SuggestionList
            repositoriesLoaded={isLoaded}
            repositories={repositories}
            handleSelected={handleSuggestionSelected}
          />
        )}
      </div>
      {isStatsLoaded && hasError && (
        <ErrorMessage message="Oops! There was an error loading the commit history for the selected repository." />
      )}
    </>
  );
}

export default SearchBar;
