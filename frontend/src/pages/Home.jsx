import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaSearch, FaBookmark, FaUserPlus } from "react-icons/fa";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              <span className="block">Discover Amazing</span>
              <span className="block text-blue-500">GitHub Projects</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Search, explore, and bookmark your favorite GitHub repositories
              all in one place.
            </p>
            <div className="mt-10 max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="sm:flex">
                <div className="min-w-0 flex-1">
                  <label htmlFor="search" className="sr-only">
                    Search repositories
                  </label>
                  <input
                    id="search"
                    type="text"
                    placeholder="Search repositories..."
                    className="block w-full px-4 py-3 rounded-md border border-gray-700 shadow-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    className="block w-full rounded-md border border-transparent px-5 py-3 bg-blue-600 text-base font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-10"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Background elements for visual effect */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" stroke="#4299E1" strokeWidth="2">
              <circle cx="200" cy="200" r="100" />
              <circle cx="200" cy="200" r="150" />
              <circle cx="200" cy="200" r="50" />
              <circle cx="200" cy="200" r="200" />
            </g>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Everything you need to explore and organize GitHub repositories
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-6 bg-gray-900 rounded-lg shadow-lg"
              >
                <div className="p-3 rounded-full bg-blue-600/20 mb-4">
                  <FaSearch className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="mt-2 text-xl font-medium text-white">
                  Advanced Search
                </h3>
                <p className="mt-3 text-base text-gray-400 text-center">
                  Find repositories quickly using GitHub's powerful search API.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-6 bg-gray-900 rounded-lg shadow-lg"
              >
                <div className="p-3 rounded-full bg-blue-600/20 mb-4">
                  <FaBookmark className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="mt-2 text-xl font-medium text-white">
                  Bookmarks
                </h3>
                <p className="mt-3 text-base text-gray-400 text-center">
                  Save your favorite repositories for quick access later.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-6 bg-gray-900 rounded-lg shadow-lg"
              >
                <div className="p-3 rounded-full bg-blue-600/20 mb-4">
                  <FaUserPlus className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="mt-2 text-xl font-medium text-white">
                  User Accounts
                </h3>
                <p className="mt-3 text-base text-gray-400 text-center">
                  Create an account to sync and manage your bookmarks across
                  devices.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-blue-600 py-10 px-6 sm:py-16 sm:px-12 lg:flex lg:items-center lg:p-20">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Ready to explore repositories?
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-blue-100">
                Sign up now to get started with GitFinder and discover amazing
                GitHub projects.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 lg:ml-8 flex flex-col sm:flex-row lg:flex-col space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-4">
              <Link
                to="/signup"
                className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
              >
                Sign up for free
              </Link>
              <Link
                to="/search"
                className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
              >
                Start searching
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
