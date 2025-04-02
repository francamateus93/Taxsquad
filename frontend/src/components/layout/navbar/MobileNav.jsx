import { Link } from "react-router-dom";
import NavLinkItem from "./NavLinkItem";
import { FaSignOutAlt } from "react-icons/fa";
import Icon from "../../../assets/icon-perfil.png";

const MobileNav = ({ isOpen, setIsOpen, isActive, user, handleLogout }) => {
  if (!isOpen) return null;

  return (
    <nav className="absolute top-16 right-4 bg-white shadow-md border rounded-lg p-5 w-48 z-50">
      <ul className="flex flex-col gap-2 font-medium text-sm text-start border-b pb-4">
        {["/dashboard", "/invoices", "/taxes", "/documents"].map((path) => (
          <li key={path} className="hover:bg-emerald-200 p-2 rounded-lg transition">
            <NavLinkItem
              to={path}
              label={path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              isActive={isActive}
              onClick={() => setIsOpen(false)}
            />
          </li>
        ))}
      </ul>
      <ul className="mt-4">
        {!user ? (
          <>
            <li>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center gap-2 p-2">
              <img src={Icon} alt="icon profile" className="w-9" />
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
            </li>
            <li>
              <button
                className="flex items-center gap-2 p-2 w-full hover:bg-red-100"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="text-lg" />
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MobileNav;