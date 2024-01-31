import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "./repositories/RepositoriesSlice";

export default configureStore({
  reducer: {
    repositories: AppReducer,
  },
});
