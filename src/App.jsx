import Graph from "./components/graph/Graph.jsx";
import RepositoryList from "./components/repository-list/RepositoryList.jsx";
import styles from "./App.module.css";
import SearchBar from "./components/search-bar/SearchBar.jsx";
import RepositoryListContextProvider from "./contexts/RepositoryListContext";

const App = () => {
  return (
    <>
      <RepositoryListContextProvider>
        <div className={styles.main}>
          <div className={styles.header}>
            <h1>GitHub Commit Activity Explorer</h1>
          </div>
          <div className={styles.container}>
            <div className={styles.leftCol}>
              <SearchBar />
              <RepositoryList />
            </div>
            <div className={styles.rightCol}>
              <Graph />
            </div>
          </div>
        </div>
      </RepositoryListContextProvider>
    </>
  );
};

export default App;
