import { Link } from "react-router-dom";
import NavLinkItem from "./NavLinkItem";
import { FaSignOutAlt } from "react-icons/fa";
import Icon from "../../../assets/icon-perfil.png";

const MobileNav = ({ isOpen, setIsOpen, isActive, user, handleLogout }) => {
  if (!isOpen) return null;

  return (
    <nav className="absolute top-16 right-4 bg-white shadow-md rounded-lg p-5 w-52 z-50">
      <ul className="flex flex-col gap-2 font-medium text-sm text-start border-b border-b-gray-200 pb-4">
        {["/dashboard", "/invoices", "/taxes", "/documents"].map((path) => (
          <li
            key={path}
            className="hover:bg-emerald-200 p-2 rounded-lg transition"
          >
            <NavLinkItem
              to={path}
              label={path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              isActive={isActive}
              onClick={() => setIsOpen(false)}
            />
          </li>
        ))}
      </ul>
      <ul className="mt-4 text-lg font-medium">
        {!user ? (
          <>
            <li className="hover:bg-emerald-200 font-semibold text-emerald-500 text-start p-2 rounded-lg transition">
              <Link to="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </li>
            <li className="hover:bg-emerald-200 font-semibold text-emerald-500 text-start p-2 rounded-lg transition">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
          </>
        ) : (
          <div className="flex flex-col gap-1">
            <li className="flex items-center gap-2 p-1 text-lg font-medium hover:bg-emerald-200 rounded-lg transition">
              <img src={Icon} alt="icon profile" className="w-8" />
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
            </li>
            <li className="flex items-center gap-2 p-1 text-lg font-medium hover:bg-red-100 hover:text-red-800/80 rounded-lg transition">
              <button
                className="flex items-center gap-2 p-1 w-full cursor-pointer"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="text-lg" />
                Logout
              </button>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default MobileNav;
