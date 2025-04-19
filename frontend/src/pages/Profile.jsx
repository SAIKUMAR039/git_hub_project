import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaKey, FaBookmark } from "react-icons/fa";
import { bookmarkAPI } from "../utils/api";

const Profile = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [bookmarksCount, setBookmarksCount] = useState(0);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Get bookmarks count
    fetchBookmarksCount();
  }, []);

  const fetchBookmarksCount = async () => {
    try {
      const response = await bookmarkAPI.getBookmarks();
      setBookmarksCount(response.data.length);
    } catch (error) {
      console.error("Error fetching bookmarks count:", error);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    // Simulating password change - in a real app, you would call an API
    setTimeout(() => {
      // Password change simulation (success)
      toast.success("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setLoading(false);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmed) {
      // Simulating account deletion - in a real app, you would call an API
      toast.success("Account deleted successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
            <div className="flex items-center">
              <div className="bg-white/20 p-4 rounded-full">
                <FaUser className="h-10 w-10 text-white" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-white">User Profile</h1>
                {user && <p className="text-blue-100">{user.email}</p>}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Account Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gray-700 p-4 rounded-lg border border-gray-600"
              >
                <div className="flex items-center">
                  <div className="bg-blue-600/20 p-3 rounded-full">
                    <FaBookmark className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-400 text-sm">Bookmarks</p>
                    <p className="text-2xl font-bold text-white">
                      {bookmarksCount}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                onClick={() => navigate("/bookmarks")}
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-600/20 p-3 rounded-full">
                      <FaBookmark className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-400 text-sm">View Bookmarks</p>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4.a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* Change Password Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-white mb-4">
                Change Password
              </h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Current Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      required
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-300"
                  >
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Confirm New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>

            {/* Danger Zone */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-white mb-4">Danger Zone</h2>
              <div className="bg-gray-700 p-4 rounded-lg border border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Delete Account</h3>
                    <p className="text-gray-400 text-sm">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
