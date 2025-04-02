import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout, setUser } from "../../../store/slices/authSlice";
import {
  getCurrentUser,
  logoutUser,
} from "../../../services/auth/firebaseAuthService";

export const useNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        dispatch(setUser({ email: currentUser.email, uid: currentUser.uid }));
      }
    };
    fetchUser();
  }, [dispatch]);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/");
  };

  return { isOpen, setIsOpen, isActive, handleLogout, user };
};
