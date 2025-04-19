import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { searchAPI, bookmarkAPI } from "../utils/api";
import {
  FaStar,
  FaCodeBranch,
  FaEye,
  FaCode,
  FaLink,
  FaExclamationCircle,
  FaBookmark,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import axios from "axios";

const RepoDetail = ({ isAuthenticated }) => {
  const { owner, repo } = useParams();
  const [repoData, setRepoData] = useState(null);
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      setLoading(true);
      try {
        // Fetch repo details from GitHub API
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
          }
        );

        setRepoData({
          id: response.data.id,
          name: response.data.name,
          full_name: response.data.full_name,
          description: response.data.description,
          stars: response.data.stargazers_count,
          forks: response.data.forks_count,
          watchers: response.data.watchers_count,
          language: response.data.language,
          html_url: response.data.html_url,
          topics: response.data.topics,
          created_at: response.data.created_at,
          updated_at: response.data.updated_at,
          license: response.data.license,
          open_issues: response.data.open_issues_count,
          owner: {
            login: response.data.owner.login,
            avatar_url: response.data.owner.avatar_url,
            html_url: response.data.owner.html_url,
          },
        });

        // Try to fetch README
        try {
          const readmeResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/readme`,
            {
              headers: {
                Accept: "application/vnd.github.html+json",
              },
            }
          );
          setReadme(readmeResponse.data);
        } catch (readmeError) {
          console.log("No README found or access denied");
          setReadme(
            '<div class="p-4 bg-gray-800 rounded">No README found for this repository.</div>'
          );
        }

        // Check if repo is bookmarked (for authenticated users)
        if (isAuthenticated) {
          try {
            const bookmarksResponse = await bookmarkAPI.getBookmarks();
            const isBookmarked = bookmarksResponse.data.some(
              (bookmark) => bookmark.repoId === response.data.id
            );
            setIsBookmarked(isBookmarked);
          } catch (error) {
            console.error("Error checking bookmark status:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching repository details:", error);
        setError("Failed to load repository details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [owner, repo, isAuthenticated]);

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      alert("Please login to bookmark repositories");
      return;
    }

    try {
      if (isBookmarked) {
        // Remove bookmark
        await bookmarkAPI.deleteBookmark(repoData.id);
        setIsBookmarked(false);
      } else {
        // Add bookmark
        await bookmarkAPI.addBookmark(repoData);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      alert("Failed to update bookmark");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
        <FaExclamationCircle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Repository Not Found
        </h2>
        <p className="text-gray-400 mb-6">
          The repository you're looking for doesn't exist or is private.
        </p>
        <Link to="/search" className="btn-primary">
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {repoData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Repository Header */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start">
                  <img
                    src={repoData.owner.avatar_url}
                    alt={`${repoData.owner.login}'s avatar`}
                    className="h-14 w-14 rounded-full mr-4"
                  />
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      <a
                        href={repoData.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition-colors"
                      >
                        {repoData.name}
                      </a>
                    </h1>
                    <p className="text-gray-400">
                      <a
                        href={repoData.owner.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition-colors"
                      >
                        {repoData.owner.login}
                      </a>{" "}
                      / {repoData.name}
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-2">
                  <a
                    href={repoData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600"
                  >
                    <FaLink className="mr-2" /> View on GitHub
                  </a>
                  <button
                    onClick={handleBookmark}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      isBookmarked
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    <FaBookmark className="mr-2" />
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </button>
                </div>
              </div>

              {/* Repository Description */}
              <p className="mt-6 text-gray-300">
                {repoData.description || "No description provided"}
              </p>

              {/* Repository Stats */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-700 rounded-md p-3 flex items-center">
                  <FaStar className="text-yellow-400 mr-2" />
                  <div>
                    <p className="text-white font-semibold">
                      {repoData.stars.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">Stars</p>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-md p-3 flex items-center">
                  <FaCodeBranch className="text-blue-400 mr-2" />
                  <div>
                    <p className="text-white font-semibold">
                      {repoData.forks.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">Forks</p>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-md p-3 flex items-center">
                  <FaEye className="text-green-400 mr-2" />
                  <div>
                    <p className="text-white font-semibold">
                      {repoData.watchers.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">Watchers</p>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-md p-3 flex items-center">
                  <FaExclamationCircle className="text-red-400 mr-2" />
                  <div>
                    <p className="text-white font-semibold">
                      {repoData.open_issues.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">Issues</p>
                  </div>
                </div>
              </div>

              {/* Repository Metadata */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-300">
                  <FaCode className="mr-2 text-purple-400" />
                  <span>Language: {repoData.language || "Not specified"}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaCalendarAlt className="mr-2 text-blue-400" />
                  <span>
                    Created:{" "}
                    {new Date(repoData.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Topics */}
              {repoData.topics && repoData.topics.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-white font-medium mb-2">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {repoData.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* README Section */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">README</h2>
              <div
                className="readme-content prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: readme }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RepoDetail;
