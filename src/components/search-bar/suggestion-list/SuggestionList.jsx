import React, { useCallback } from "react";
import styles from "./SuggestionList.module.css";
import { AlertCircle, Loader } from "react-feather";
import ErrorMessage from "../../error-message/ErrorMessage.jsx";

function SuggestionList({ repositoriesLoaded, repositories, handleSelected }) {
  const handleClick = useCallback((item) => {
    handleSelected(item);
  });

  return (
    <div className={styles.main}>
      {repositoriesLoaded || (
        <div className={styles.loaderContainer}>
          <Loader className={styles.loader} size={32} />
        </div>
      )}

      {(repositories && repositoriesLoaded) || (
        <ErrorMessage message="Oops! Something went wrong, please try again." />
      )}

      {repositories && repositoriesLoaded && (
        <ul>
          {repositories.map((item) => {
            return (
              <li key={item.id} onClick={() => handleClick(item)}>
                <span className={styles.owner}>{item.owner.login}</span>
                <span className={styles.slash}>/</span>
                <span className={styles.name}>{item.name}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SuggestionList;
