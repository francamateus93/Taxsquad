import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { logoutUser } from "../services/firebaseAuthService";
import Logo from "../assets/Logo_TaxSquad.png";
import Button from "./Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="container">
      <nav className="flex justify-between items-center md:justify-around py-4 bg-white fixed top-0 left-0 right-0 z-10 md:px-10">
        <div className="flex items-center justify-center">
          <img
            className="w-48 px-2 md:px-0 cursor-pointer"
            src={Logo}
            alt="Logo"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Navegation */}
        <div className="items-center md:space-x-10 justify-center hidden md:flex text-sm lg:text-base">
          <Link
            to="/dashboard"
            className="hover:text-emerald-500 hover:font-semibold"
          >
            Dashboard
          </Link>
          <Link
            to="/invoices"
            className="hover:text-emerald-500 hover:font-semibold"
          >
            Invoices
          </Link>
          <Link
            to="/taxes"
            className="hover:text-emerald-500 hover:font-semibold"
          >
            Taxes
          </Link>
          <Link
            to="/documents"
            className="hover:text-emerald-500 hover:font-semibold"
          >
            Documents
          </Link>
        </div>

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
            <button
              className="text-sm px-4 py-2 text-red-600 bg-red-50 rounded hover:bg-red-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

        {/* Menu Hamburguer */}
        <button
          className="p-4 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
        </button>

        {/* Menu Mobile */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden">
            <Link
              to="/dashboard"
              className="py-2"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/invoices"
              className="py-2"
              onClick={() => setMenuOpen(false)}
            >
              Invoices
            </Link>
            <Link
              to="/taxes"
              className="py-2"
              onClick={() => setMenuOpen(false)}
            >
              Taxes
            </Link>
            <Link
              to="/documents"
              className="py-2"
              onClick={() => setMenuOpen(false)}
            >
              Documents
            </Link>

            {!user ? (
              <>
                <Link
                  to="/register"
                  className="py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            ) : (
              <button className="py-2 text-red-600" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
