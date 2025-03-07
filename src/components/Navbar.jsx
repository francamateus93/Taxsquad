import { Link } from "react-router-dom";
import Logo from "../assets/Logo_TaxSquad.png";
import Button from "./Button";

const Navbar = () => {
  return (
    <header className="container">
      <nav className="flex justify-between items-center md:justify-around py-4 bg-white fixed top-0 left-0 right-0 z-10 md:px-10">
        <div className="flex items-center justify-center">
          <a className="cursor-pointer">
            <img className="w-48 px-2 md:px-0" src={Logo} alt="Store Logo" />
          </a>
        </div>

        <div className="items-center md:space-x-10 justify-center justify-items-start md:justify-items-center hidden md:flex w-full left-0 top-16 px-5 md:px-10 md:py-0 border-t md:border-t-0">
          <a>
            <Link
              to="dashboard"
              className="flex hover:text-emerald-500 hover:font-semibold cursor-pointer "
            >
              Dashboard
            </Link>
          </a>
          <a>
            <Link
              to="invoices"
              className="flex cursor-pointer transition hover:text-emerald-500 hover:font-semibold"
            >
              Invoices
            </Link>
          </a>
          <a>
            <Link
              to="taxes"
              className="flex hover:text-emerald-500 hover:font-semibold cursor-pointer "
            >
              Taxes
            </Link>
          </a>
          <a>
            <Link
              to="documents"
              className="flex hover:text-emerald-500 hover:font-semibold cursor-pointer "
            >
              Documents
            </Link>
          </a>
        </div>

        <div className="flex items-center space-x-5 hidden md:flex">
          <a className="flex hover:text-emerald-500 hover:font-semibold cursor-pointer ">
            Register
          </a>

          <Button>{"Login"}</Button>
        </div>

        <button className="p-4 md:hidden justify-self-end">
          <svg
            className="w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
