import { useCallback, useState } from "react";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import { Repository } from "./Models/Repository";
import Results from "./components/Results/Results";
import { SearchCriteria } from "./Models/Search";

function App() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const handleSearch = useCallback(async (searchCriteria: SearchCriteria) => {
    if (!searchCriteria.search) {
      setIsEmpty(true);
      setRepositories([]);
      return;
    }
    setIsEmpty(false);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          searchCriteria.search
        )}&per_page=${searchCriteria.perPage}&sort=${
          searchCriteria.sortBy
        }&order=${searchCriteria.order}`
      );

      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`);
      }

      const data = await response.json();
      setRepositories(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const handleFilterChange = useCallback(
    async (searchCriteria: SearchCriteria) => {
      if (!searchCriteria.search) return; // Don't search if no search term
      handleSearch(searchCriteria);
    },
    [handleSearch]
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <Search onSearch={handleSearch} onFilterChange={handleFilterChange} />
      {!isEmpty && (
        <Results error={error} loading={loading} repositories={repositories} />
      )}
    </div>
  );
}
export default App;
