import NavLinkItem from "./NavLinkItem";

const DesktopNav = ({ isActive }) => (
  <ul className="hidden md:flex space-x-8 font-medium text-lg tracking-tight">
    {[
      { to: "/dashboard", label: "Dashboard" },
      { to: "/invoices", label: "Invoices" },
      { to: "/taxes", label: "Taxes" },
      { to: "/documents", label: "Documents" },
    ].map((link) => (
      <li key={link.to}>
        <NavLinkItem {...link} isActive={isActive} />
      </li>
    ))}
  </ul>
);

export default DesktopNav;
