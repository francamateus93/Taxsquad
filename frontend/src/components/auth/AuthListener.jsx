import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import api from "../../services/data/Api";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
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

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../services/auth/firebaseAuthService";

// const AuthListener = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         dispatch(
//           setUser({
//             uid: user.uid,
//             email: user.email,
//             displayName: user.displayName,
//           })
//         );
//       } else {
//         dispatch(logout());
//       }
//       dispatch(setLoading(false));
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   return null;
// };

// export default AuthListener;
