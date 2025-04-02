import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../store/slices/authSlice";
import api from "../services/data/Api";

const authListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setUser(JSON.parse(user)));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return null;
};

export default authListener;
