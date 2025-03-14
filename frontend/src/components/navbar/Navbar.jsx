import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, login } from "../../store/authSlice";
import {
  logoutUser,
  getCurrentUser,
} from "../../services/auth/firebaseAuthService.js";
import Logo from "../../assets/logo/Logo_TaxSquad.png";
import Button from "../buttons/Button";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        dispatch(login({ email: currentUser.email, uid: currentUser.uid }));
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
      <nav className="flex justify-between items-center py-4 bg-white fixed top-0 left-0 right-0 z-50 md:px-5">
        <div className="flex items-center justify-center">
          <img
            className="w-48 px-2 md:px-0 cursor-pointer"
            src={Logo}
            alt="Logo"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Navegação */}
        <nav className="items-center md:space-x-10 justify-center hidden md:flex text-sm lg:text-base">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/dashboard"
                className="hover:text-emerald-500 hover:font-semibold"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/invoices"
                className="hover:text-emerald-500 hover:font-semibold"
              >
                Invoices
              </Link>
            </li>
            <li>
              <Link
                to="/taxes"
                className="hover:text-emerald-500 hover:font-semibold"
              >
                Taxes
              </Link>
            </li>
            <li>
              <Link
                to="/documents"
                className="hover:text-emerald-500 hover:font-semibold"
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
                <button className="text-sm px-4 py-2 text-emerald-600 bg-emerald-50 rounded hover:bg-emerald-200">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <Button>{"Login"}</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <FaUserCircle className="text-2xl text-gray-700 hover:text-emerald-500 cursor-pointer" />
              </Link>
              <button
                className="text-sm px-4 py-2 text-red-600 bg-red-50 rounded hover:bg-red-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Menu Hamburguer */}
        <button className="p-4 md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
        </button>

        {/* Menu Mobile */}
        {isOpen && (
          <nav className="absolute top-16 left-0 w-full bg-white flex flex-col items-center md:hidden">
            <ul>
              <li>
                <Link
                  to="/dashboard"
                  className="py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/invoices"
                  className="py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Invoices
                </Link>
              </li>
              <li>
                <Link
                  to="/taxes"
                  className="py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Taxes
                </Link>
              </li>
              <li>
                <Link
                  to="/documents"
                  className="py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Documents
                </Link>
              </li>
            </ul>

            {!user ? (
              <div>
                <ul>
                  <li>
                    <Link
                      to="/register"
                      className="py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="py-2 flex flex-col items-center space-y-2">
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-emerald-500 flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserCircle className="text-xl" />
                  <span>Profile</span>
                </Link>
                <button className="text-red-600" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </nav>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
