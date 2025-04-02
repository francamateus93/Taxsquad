import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo/Logo_TaxSquad.png";

const LogoComponent = () => {
  const navigate = useNavigate();
  return (
    <img
      src={Logo}
      alt="Logo"
      className="w-36 lg:w-48 cursor-pointer"
      onClick={() => navigate("/")}
    />
  );
};

export default LogoComponent;
