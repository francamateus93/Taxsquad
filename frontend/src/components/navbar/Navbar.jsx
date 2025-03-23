import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../store/slices/authSlice.js";
import {
  logoutUser,
  getCurrentUser,
} from "../../services/auth/firebaseAuthService.js";
import Logo from "../../assets/logo/Logo_TaxSquad.png";
import Button from "../buttons/ButtonPrimary.jsx";
import Icon from "../../assets/icon-perfil.jpg";
import ButtonSecondary from "../buttons/ButtonSecondary.jsx";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchUsers = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        dispatch(setUser({ email: currentUser.email, uid: currentUser.uid }));
      }
    };
    fetchUsers();
  }, [dispatch]);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="container">
      <nav className="flex justify-between items-center py-4 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 md:px-5">
        <div className="flex items-center justify-center px-4">
          <img
            className="w-36 lg:w-48 md:px-0 cursor-pointer"
            src={Logo}
            alt="Logo"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Navigation */}
        <nav className="items-center md:space-x-10 justify-center hidden md:flex text-lg tracking-tight">
          <ul className="flex space-x-8 font-medium">
            <li>
              <Link
                to="/dashboard"
                className={`hover:text-emerald-500 hover:font-semibold transition duration-200 ${
                  isActive("/dashboard") ? "font-semibold text-emerald-500" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/invoices"
                className={`hover:text-emerald-500 hover:font-semibold transition duration-200 ${
                  isActive("/invoices") ? "font-semibold text-emerald-500" : ""
                }`}
              >
                Invoices
              </Link>
            </li>
            <li>
              <Link
                to="/taxes"
                className={`hover:text-emerald-500 hover:font-semibold transition duration-200 ${
                  isActive("/taxes") ? "font-semibold text-emerald-500" : ""
                }`}
              >
                Taxes
              </Link>
            </li>
            <li>
              <Link
                to="/documents"
                className={`hover:text-emerald-500 hover:font-semibold transition duration-200 ${
                  isActive("/documents") ? "font-semibold text-emerald-500" : ""
                }`}
              >
                Documents
              </Link>
            </li>
          </ul>
        </nav>

        {/* Login / Logout */}
        <div className="items-center space-x-2 hidden md:flex">
          {!user ? (
            <>
              <Link to="/register">
                <ButtonSecondary className="text-sm px-4 py-2 text-emerald-600 bg-emerald-50 rounded hover:bg-emerald-200 transition duration-200">
                  Register
                </ButtonSecondary>
              </Link>
              <Link to="/login">
                <Button>{"Login"}</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <img
                  src={Icon}
                  alt="icon profile"
                  className="w-10 hover:scale-120 transition duration-200"
                />
              </Link>
              <div className="flex gap-2 items-center justify-center">
                <FaSignOutAlt
                  className="text-xl hover:text-red-700"
                  onClick={handleLogout}
                  alt="logout"
                  title="Logout"
                />
              </div>
            </div>
          )}
        </div>

        {/* Toggle */}
        <button className="px-4 md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-10 h-10 rounded-lg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
        </button>

        {/* Menu Mobile */}
        {isOpen && (
          <nav className="absolute top-17 right-4 bg-white shadow-lg border border-gray-200 flex flex-col items-start justify-between md:hidden p-5 my-1 rounded-lg w-48">
            <ul className="flex flex-col gap-2 font-medium text-sm text-start border-b border-b-gray-200 pb-4 w-full">
              <li className="p-2 rounded-lg hover:bg-emerald-200 transition duration-200">
                <Link
                  to="/dashboard"
                  className={`py-2 ${
                    isActive("/dashboard") ? "font-bold text-emerald-600" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li className="p-2 rounded-lg hover:bg-emerald-200 transition duration-200">
                <Link
                  to="/invoices"
                  className={`py-2 ${
                    isActive("/invoices") ? "font-bold text-emerald-600" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Invoices
                </Link>
              </li>
              <li className="p-2 rounded-lg hover:bg-emerald-200 transition duration-200">
                <Link
                  to="/taxes"
                  className={`py-2 ${
                    isActive("/taxes") ? "font-bold text-emerald-600" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Taxes
                </Link>
              </li>
              <li className="p-2 rounded-lg hover:bg-emerald-200 transition duration-200">
                <Link
                  to="/documents"
                  className={`py-2 ${
                    isActive("/documents") ? "font-bold text-emerald-600" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Documents
                </Link>
              </li>
            </ul>

            {!user ? (
              <ul className="flex flex-col gap-2 mt-4 text-start">
                <li className="hover:text-emerald-500 hover:font-semibold transition duration-200">
                  <Link
                    to="/register"
                    className="py-2 font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </li>
                <li className="hover:text-emerald-500 hover:font-semibold transition duration-200">
                  <Link
                    to="/login"
                    className="py-2 font-semibold text-start"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-col gap-2 items-start text-sm mt-4 w-full">
                <li className="w-full">
                  <Link
                    to="/profile"
                    className="rounded-lg hover:bg-emerald-200 transition duration-200 flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <img src={Icon} alt="icon profile" className="w-9" />
                    <span className="font-medium">Profile</span>
                  </Link>
                </li>
                <li className="w-full">
                  <button
                    className="w-full font-medium rounded-lg hover:bg-red-100 transition duration-200 flex items-center space-x-2 p-2"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="text-lg mr-2" />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </nav>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
