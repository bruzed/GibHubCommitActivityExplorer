import React, { createContext, useState } from "react";

export const RepositoryListContext = createContext({
  hoveredItems: {},
  handleMouseEnter: null,
  handleMouseLeave: null,
});

export default function RepositoryListContextProvider({ children }) {
  const [hoveredItems, setHoveredItems] = useState({});

  const handleMouseEnter = (index) => {
    setHoveredItems({
      ...hoveredItems,
      [index]: true,
    });
  };

  const handleMouseLeave = () => {
    setHoveredItems({});
  };

  return (
    <RepositoryListContext.Provider
      value={{ hoveredItems, handleMouseEnter, handleMouseLeave }}
    >
      {children}
    </RepositoryListContext.Provider>
  );
}
