import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../../store/slices/authSlice";
import api from "../../services/data/Api";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const { data } = await api.get("/users/me");
          dispatch(setUser(data));
        } catch (err) {
          console.error(err);
          dispatch(logout());
        }
      }
    };

    loadUser();
  }, [dispatch]);

  return null;
};

export default AuthListener;
