import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { searchAPI, bookmarkAPI } from "../utils/api";
import {
  FaStar,
  FaCodeBranch,
  FaBookmark,
  FaCode,
  FaFilter,
  FaSortAmountDown,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Search = ({ isAuthenticated }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarkedRepos, setBookmarkedRepos] = useState({});

  // Filtering and sorting
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("stars");
  const [showFilters, setShowFilters] = useState(false);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    // Get query from URL params
    const query = searchParams.get("query");
    if (query) {
      setSearchQuery(query);
      searchRepositories(query);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookmarks();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Apply filters and sorting whenever repos, languageFilter, or sortBy changes
    if (repos.length > 0) {
      let filtered = [...repos];

      // Apply language filter
      if (languageFilter !== "all") {
        filtered = filtered.filter((repo) => repo.language === languageFilter);
      }

      // Apply sorting
      filtered.sort((a, b) => {
        if (sortBy === "stars") {
          return b.stars - a.stars;
        } else if (sortBy === "forks") {
          return b.forks - a.forks;
        } else if (sortBy === "updated") {
          return new Date(b.updated_at) - new Date(a.updated_at);
        }
        return 0;
      });

      setFilteredRepos(filtered);
    }
  }, [repos, languageFilter, sortBy]);

  const fetchBookmarks = async () => {
    try {
      const response = await bookmarkAPI.getBookmarks();
      const bookmarkMap = {};
      response.data.forEach((bookmark) => {
        bookmarkMap[bookmark.repoId] = true;
      });
      setBookmarkedRepos(bookmarkMap);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const searchRepositories = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await searchAPI.searchRepos(query);
      setRepos(response.data);
      setFilteredRepos(response.data);

      // Extract unique languages from repos
      const uniqueLanguages = [
        ...new Set(response.data.map((repo) => repo.language).filter(Boolean)),
      ];
      setLanguages(uniqueLanguages);
    } catch (error) {
      console.error("Error searching repositories:", error);
      setError(
        "An error occurred while searching for repositories. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchRepositories(searchQuery);
      setSearchParams({ query: searchQuery });
    }
  };

  const handleBookmark = async (repo) => {
    if (!isAuthenticated) {
      toast.error("Please login to bookmark repositories");
      return;
    }

    try {
      if (bookmarkedRepos[repo.id]) {
        // Remove bookmark
        await bookmarkAPI.deleteBookmark(repo.id);
        setBookmarkedRepos((prev) => {
          const newBookmarks = { ...prev };
          delete newBookmarks[repo.id];
          return newBookmarks;
        });
        toast.success("Repository removed from bookmarks");
      } else {
        // Add bookmark
        await bookmarkAPI.addBookmark(repo);
        setBookmarkedRepos((prev) => ({ ...prev, [repo.id]: true }));
        toast.success("Repository added to bookmarks");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error("Failed to update bookmark");
    }
  };

  const resetFilters = () => {
    setLanguageFilter("all");
    setSortBy("stars");
    setFilteredRepos(repos);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Search GitHub Repositories
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Find repositories that match your interests
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSubmit} className="flex items-center">
            <div className="relative flex-grow">
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-3 px-4 bg-gray-800 text-white shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="ml-3 inline-flex items-center rounded-md bg-blue-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </form>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Filters Section */}
        {filteredRepos.length > 0 && (
          <div className="mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center mb-4 text-blue-500 hover:text-blue-400"
            >
              <FaFilter className="mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="language-filter"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Filter by Language
                    </label>
                    <select
                      id="language-filter"
                      value={languageFilter}
                      onChange={(e) => setLanguageFilter(e.target.value)}
                      className="block w-full rounded-md border-0 py-2 px-3 bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Languages</option>
                      {languages.map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="sort-by"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Sort By
                    </label>
                    <select
                      id="sort-by"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="block w-full rounded-md border-0 py-2 px-3 bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="stars">Most Stars</option>
                      <option value="forks">Most Forks</option>
                      <option value="updated">Recently Updated</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-md"
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRepos.length > 0 ? (
              filteredRepos.map((repo) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700 relative"
                >
                  {/* Bookmark button */}
                  <button
                    onClick={() => handleBookmark(repo)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                      bookmarkedRepos[repo.id]
                        ? "text-yellow-400 hover:text-yellow-500"
                        : "text-gray-400 hover:text-yellow-400"
                    }`}
                    aria-label={
                      bookmarkedRepos[repo.id]
                        ? "Remove bookmark"
                        : "Add bookmark"
                    }
                  >
                    <FaBookmark className="h-5 w-5" />
                  </button>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-1 truncate pr-8">
                      <Link
                        to={`/repo/${repo.owner.login}/${repo.name}`}
                        className="hover:text-blue-500 transition-colors"
                      >
                        {repo.name}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-400 mb-4">
                      {repo.full_name}
                    </p>

                    <p className="text-gray-300 text-sm line-clamp-3 min-h-[4.5rem]">
                      {repo.description || "No description available"}
                    </p>

                    <div className="mt-6 flex items-center text-sm text-gray-400">
                      {repo.language && (
                        <div className="flex items-center mr-4">
                          <FaCode className="mr-1" />
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center mr-4">
                        <FaStar className="mr-1" />
                        <span>{repo.stars.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <FaCodeBranch className="mr-1" />
                        <span>{repo.forks.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        GitHub
                      </a>
                      <Link
                        to={`/repo/${repo.owner.login}/${repo.name}`}
                        className="flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : searchQuery ? (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-white">
                  No repositories found
                </h3>
                <p className="mt-2 text-gray-400">
                  Try a different search term or filter
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
