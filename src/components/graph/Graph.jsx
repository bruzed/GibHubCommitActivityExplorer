import React, { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import styles from "./Graph.module.css";
import { RepositoryListContext } from "../../contexts/RepositoryListContext";

function Graph() {
  const repositoryStats = useSelector((state) => state.repositories.statistics);
  const repositoryColor = useSelector((state) => state.repositories.color);

  const { hoveredItems } = useContext(RepositoryListContext);

  const getFormattedStats = useCallback((stats) => {
    const data = [];
    const dataKeys = [];

    stats.map((repo) => {
      repo.map((item, index) => {
        data[index] = {
          ...data[index],
          [item.name]: item.total,
          week: moment.unix(item.week).format("MM/DD"),
        };
      });
      dataKeys.push(repo[0].name);
    });
    return { dataKeys, data };
  });

  const { dataKeys, data } = getFormattedStats(repositoryStats);

  return (
    <>
      {repositoryStats && (
        <div id={styles.graph}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis fontSize={12} dataKey="week" />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              {dataKeys.map((item, index) => {
                const hasHoveredItems = Object.keys(hoveredItems).length;
                let isHovered = "";
                if (hasHoveredItems) {
                  isHovered = hoveredItems[index]
                    ? styles.hoverOn
                    : styles.hoverOff;
                }

                return (
                  <Line
                    key={item}
                    type="monotone"
                    dataKey={item}
                    stroke={repositoryColor[index]}
                    className={isHovered}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}

export default Graph;
