import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { bookmarkAPI } from "../utils/api";
import { FaStar, FaCodeBranch, FaTrash, FaCode } from "react-icons/fa";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const response = await bookmarkAPI.getBookmarks();
      setBookmarks(response.data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      setError("Failed to fetch bookmarks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookmarkId, repoId) => {
    try {
      await bookmarkAPI.deleteBookmark(repoId);
      setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== bookmarkId));
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      setError("Failed to delete bookmark. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Your Bookmarked Repositories
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Access your favorite GitHub repositories anytime
          </p>
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

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks.length > 0 ? (
              bookmarks.map((bookmark) => (
                <motion.div
                  key={bookmark._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-white mb-2 truncate">
                          <a
                            href={bookmark.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500 transition-colors"
                          >
                            {bookmark.name}
                          </a>
                        </h2>
                        <p className="text-sm text-gray-400 mb-1">
                          {bookmark.full_name}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleDelete(bookmark._id, bookmark.repoId)
                        }
                        className="p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove bookmark"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-4">
                      <p className="text-gray-300 text-sm line-clamp-3 min-h-[4.5rem]">
                        {bookmark.description || "No description available"}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center text-sm text-gray-400">
                      {bookmark.language && (
                        <div className="flex items-center mr-4">
                          <FaCode className="mr-1" />
                          <span>{bookmark.language}</span>
                        </div>
                      )}
                      <div className="flex items-center mr-4">
                        <FaStar className="mr-1" />
                        <span>{bookmark.stars?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex items-center">
                        <FaCodeBranch className="mr-1" />
                        <span>{bookmark.forks?.toLocaleString() || 0}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <a
                        href={bookmark.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        View Repository
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-white">
                  No bookmarks found
                </h3>
                <p className="mt-2 text-gray-400">
                  Search for repositories and bookmark them to see them here
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
