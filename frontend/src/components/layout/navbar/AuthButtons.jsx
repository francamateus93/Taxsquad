import { Link } from "react-router-dom";
import Button from "../../ui/button/ButtonPrimary";
import ButtonSecondary from "../../ui/button/ButtonSecondary";
import { FaSignOutAlt } from "react-icons/fa";
import Icon from "../../../assets/icon-perfil.png";

const AuthButtons = ({ user, handleLogout }) =>
  !user ? (
    <>
      <Link to="/register">
        <ButtonSecondary>Register</ButtonSecondary>
      </Link>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </>
  ) : (
    <div className="flex items-center gap-4">
      <Link to="/profile">
        <img src={Icon} alt="profile" className="w-10 hover:scale-110" />
      </Link>
      <FaSignOutAlt
        className="text-xl cursor-pointer hover:text-red-600"
        onClick={handleLogout}
      />
    </div>
  );

export default AuthButtons;
