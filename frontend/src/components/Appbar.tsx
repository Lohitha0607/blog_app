import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Removed FaTwitter, custom SVG for X

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      {/* Left section - Inkwell link */}
      <Link to={'/blogs'}>
        <div className="flex flex-col justify-center text-2xl font-semibold cursor-pointer">Inkwell</div>
      </Link>

      {/* Middle section - Made by Lohitha and social icons */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-700">Made by Lohitha</span>

        {/* X (Twitter rebranded) logo */}
        <a href="https://x.com/Loh0607?t=aOFcetASvJ9meVLZP3D8nQ&s=09" target="_blank" rel="noopener noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 248 204"
            className="w-6 h-6 text-black"
            fill="currentColor"
          >
            <path d="M121.2 0C188 0 248 44.3 248 102.2 248 159.7 189 204 122.3 204 56 204 0 160 0 102 0 43 56 0 121.2 0Zm26.6 51.7-31.4 48.7L85 52h-30l43.7 54.2L55 153h30l31.8-47.5L148 153h30L134.8 98.6 178 52h-30.1Z"/>
          </svg>
        </a>

        {/* LinkedIn logo */}
        <a href="https://www.linkedin.com/in/lohitha-balam-27a565247/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-blue-700 text-xl" />
        </a>

        {/* GitHub logo */}
        <a href="https://github.com/Lohitha0607" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-gray-800 text-xl" />
        </a>
      </div>

      {/* Right section - Publish button and Avatar */}
      <div className="flex items-center">
        <Link to={'/publish'}>
          <button
            type="button"
            className="text-white mr-4 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Publish
          </button>
        </Link>

        <Avatar name={"lohitha"} size={"big"}></Avatar>
      </div>
    </div>
  );
};
