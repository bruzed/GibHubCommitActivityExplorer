import { createSlice } from "@reduxjs/toolkit";

export const RepositoriesSlice = createSlice({
  name: "repositories",
  initialState: {
    selected: [],
    statistics: [],
    color: [],
  },
  reducers: {
    addRepository: (state, action) => {
      state.selected = [...state.selected, action.payload];
    },
    addRepositoryStatistics: (state, action) => {
      state.statistics = [...state.statistics, action.payload];
    },
    addRepositoryColor: (state, action) => {
      state.color = [...state.color, action.payload];
    },
    removeRepository: (state, action) => {
      const repositoryIndex = action.payload;
      return {
        ...state,
        selected: state.selected.filter(
          (item, index) => index !== repositoryIndex,
        ),
        statistics: state.statistics.filter(
          (item, index) => index !== repositoryIndex,
        ),
        color: state.color.filter((item, index) => index !== repositoryIndex),
      };
    },
  },
});

export const {
  addRepository,
  addRepositoryStatistics,
  addRepositoryColor,
  removeRepository,
} = RepositoriesSlice.actions;

export default RepositoriesSlice.reducer;
