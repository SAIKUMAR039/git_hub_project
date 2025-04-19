import { FaGithub, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <FaGithub className="h-6 w-6 text-white" />
            <span className="ml-2 text-gray-300 text-sm">
              GitFinder © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            Made with <FaHeart className="h-4 w-4 text-red-500 mx-1" /> for
            GitHub enthusiasts
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
