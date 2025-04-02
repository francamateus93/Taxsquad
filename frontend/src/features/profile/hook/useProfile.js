import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUser } from "../../../store/slices/authSlice";

export const useProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    identification_number: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (user) {
      const formattedDate = user.date_of_birth
        ? new Date(user.date_of_birth).toISOString().split("T")[0]
        : "";
      setProfile({
        ...user,
        date_of_birth: formattedDate,
      });
    }
  }, [user]);

  const validateField = (name, value) => {
    switch (name) {
      case "first_name":
      case "last_name":
        return value.length >= 3 && !/\d/.test(value);
      case "date_of_birth":
        return new Date(value) < new Date("2025-01-01");
      case "identification_number":
        return value.length >= 6;
      case "phone":
        return /^\+\d{6,}$/.test(value);
      case "address":
        return value.length >= 6 && /\d/.test(value);
      case "city":
      case "country":
        return /^[A-Za-z\s]+$/.test(value);
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: value }));
    const isValid = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(profile).forEach(([name, value]) => {
      newErrors[name] = !validateField(name, value);
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleUpdate = () => {
    if (!validateForm()) return;

    const formattedDate = new Date(profile.date_of_birth)
      .toISOString()
      .split("T")[0];

    dispatch(
      updateUser({
        userId: user.id,
        userData: {
          ...profile,
          date_of_birth: formattedDate,
        },
      })
    )
      .unwrap()
      .then(() => {
        setShowModalSave(true);
        setTimeout(() => setShowModalSave(false), 3000);
      })
      .catch((err) => console.error("Update failed:", err));
  };

  const handlePasswordReset = () => {
    setShowModalPassword(true);
    setTimeout(() => setShowModalPassword(false), 3000);
  };

  const handleDelete = () => {
    dispatch(deleteUser(user.id))
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => console.error("Failed to delete user:", error));
  };

  return {
    profile,
    errors,
    touched,
    showModalSave,
    showModalPassword,
    showDeleteModal,
    setShowDeleteModal,
    setShowModalPassword,
    setShowModalSave,
    handleChange,
    handleUpdate,
    handlePasswordReset,
    handleDelete,
    validateForm,
    validateField,
  };
};

export default useProfile;
