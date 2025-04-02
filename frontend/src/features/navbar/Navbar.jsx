import LogoComponent from "./components/Logo";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import AuthButtons from "./components/AuthButtons";
import { useNavbar } from "./hook/useNavbar";

const Navbar = () => {
  const { isOpen, setIsOpen, isActive, handleLogout, user } = useNavbar();

  return (
    <header className="container">
      <nav className="flex justify-between items-center py-4 bg-white border-b border-b-gray-200 fixed w-full z-20 px-4 md:px-8">
        <LogoComponent />
        <DesktopNav isActive={isActive} />
        <div className="hidden md:flex items-center gap-2">
          <AuthButtons user={user} handleLogout={handleLogout} />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden px-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
        </button>
        <MobileNav
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isActive={isActive}
          user={user}
          handleLogout={handleLogout}
        />
      </nav>
    </header>
  );
};

export default Navbar;
