import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // adjust path

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4">
      <div className="flex justify-between items-center">

        {/* 🔹 Left - Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold">QuickCart</span>
        </Link>

        {/* 🔹 Right - Menu */}
        <ul className="flex gap-6 text-lg">
          <li>
            <Link to="/" className="hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-400">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;