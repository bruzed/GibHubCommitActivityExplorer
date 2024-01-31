import React, { useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import styles from "./RepositoryCard.module.css";
import { Star, Trash2 } from "react-feather";
import moment from "moment";
import numeral from "numeral";
import { removeRepository } from "../../store/repositories/RepositoriesSlice";
import { RepositoryListContext } from "../../contexts/RepositoryListContext";

function RepositoryCard({
  idx,
  owner,
  name,
  stargazersCount,
  updatedAt,
  color,
  handleHoverOn,
  handleHoverOff,
}) {
  const starCount = numeral(stargazersCount).format("0.0a");
  const hoursAgo = moment(updatedAt).startOf("hour").fromNow();

  const dispatch = useDispatch();
  const { hoveredItems } = useContext(RepositoryListContext);

  const handleDeleteButton = useCallback((idx) => {
    dispatch(removeRepository(idx));
  });

  const hasHoveredItems = Object.keys(hoveredItems).length;
  let isHovered = "";
  if (hasHoveredItems) {
    isHovered = hoveredItems[idx] ? styles.hoverOn : styles.hoverOff;
  }

  return (
    <li
      id={styles.repositoryCard}
      style={{ backgroundColor: `${color}` }}
      onMouseEnter={handleHoverOn}
      onMouseLeave={handleHoverOff}
      className={isHovered}
    >
      <div
        className={styles.innerContainer}
        style={{ borderColor: `${color}` }}
      >
        <div className={styles.metadata}>
          <div className={styles.repositoryName}>
            <span className={styles.owner}>{owner}</span>
            <span className={styles.slash}>/</span>
            <span className={styles.name}>{name}</span>
          </div>
          <div className={styles.repositoryStats}>
            <div className={styles.stargazersCount}>
              <Star className={styles.star} size={14} />
              {starCount}
            </div>
            <div className={styles.updatedAt}>Updated {hoursAgo}</div>
          </div>
        </div>

        <button
          className={styles.deleteButton}
          onClick={() => handleDeleteButton(idx)}
        >
          <Trash2 size={24} />
        </button>
      </div>
    </li>
  );
}

RepositoryCard.propTypes = {
  idx: PropTypes.number.isRequired,
  owner: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stargazersCount: PropTypes.number.isRequired,
  updatedAt: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handleHoverOn: PropTypes.func,
  handleHoverOff: PropTypes.func,
};

export default RepositoryCard;
