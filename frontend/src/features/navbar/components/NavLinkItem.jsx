import { Link } from "react-router-dom";

const NavLinkItem = ({ to, label, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`hover:text-emerald-500 py-2 hover:font-semibold transition duration-200 ${
      isActive(to) ? "font-bold text-emerald-500" : ""
    }`}
  >
    {label}
  </Link>
);

export default NavLinkItem;
