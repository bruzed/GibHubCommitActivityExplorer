import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import RepositoryCard from "../repository-card/RepositoryCard.jsx";
import styles from "./RepositoryList.module.css";
import { RepositoryListContext } from "../../contexts/RepositoryListContext";
import { Search } from "react-feather";

function RepositoryList() {
  const repositories = useSelector((state) => state.repositories.selected);
  const repositoryColor = useSelector((state) => state.repositories.color);

  const { handleMouseEnter, handleMouseLeave } = useContext(
    RepositoryListContext
  );

  const hasRepositories = repositories.length > 0 ? true : false;

  return (
    <>
      {hasRepositories && (
        <ul id={styles.repositoryList}>
          {repositories.map((repository, index) => {
            return (
              <RepositoryCard
                key={repository.id}
                idx={index}
                owner={repository.owner.login}
                name={repository.name}
                stargazersCount={repository.stargazers_count}
                updatedAt={repository.updated_at}
                color={repositoryColor[index]}
                handleHoverOn={() => handleMouseEnter(index)}
                handleHoverOff={handleMouseLeave}
              />
            );
          })}
        </ul>
      )}
      {hasRepositories || (
        <div className={styles.instruction}>
          <Search size={48} />
          <p>Search for a GitHub repository to populate graph</p>
        </div>
      )}
    </>
  );
}

export default RepositoryList;
