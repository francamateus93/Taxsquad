import { useState, useEffect, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../store/slices/authSlice";
import Modal from "../components/ui/Modal";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  useEffect(() => {
    if (user) {
      const formattedDate = user.date_of_birth
        ? new Date(user.date_of_birth).toISOString().split("T")[0]
        : "";
      setProfile({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        date_of_birth: formattedDate,
        identification_number: user.identification_number || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
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

  const fieldsToShow = [
    "first_name",
    "last_name",
    "date_of_birth",
    "email",
    "identification_number",
    "phone",
    "address",
    "city",
    "country",
  ];

  const inputClass = (key) =>
    touched[key]
      ? errors[key]
        ? "border-2 border-red-500"
        : "border-2 border-emerald-500"
      : "border border-gray-200";

  return (
    <section className="container mx-auto p-6">
      <div className="max-w-5xl mx-auto p-10 bg-white rounded-2xl shadow-[0_0px_5px_rgba(0,0,0,0.1)]">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Personal Information
        </h2>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {fieldsToShow.map((key, value) => {
            const isValid = validateField(key, value);
            const showError = errors[key];

            return (
              <div key={key}>
                <label className="block font-semibold capitalize mb-1 text-start">
                  {key.replace("_", " ")}*
                </label>
                <input
                  type={key === "date_of_birth" ? "date" : "text"}
                  name={key}
                  value={profile[key]}
                  onChange={handleChange}
                  className={`p-2 ${inputClass(
                    key
                  )} rounded-lg w-full text-gray-500 transition duration-200 tracking-tight ${
                    key === "email" && "bg-gray-100"
                  }`}
                  readOnly={key === "email"}
                />
                {touched[key] && errors[key] && (
                  <p className="text-red-500 text-xs mt-1 text-start">
                    {key === "first_name" &&
                      "First name must have at least 3 letters and no numbers."}
                    {key === "last_name" &&
                      "Last name must have at least 3 letters and no numbers."}
                    {key === "date_of_birth" &&
                      "Birthdate must be before 2025."}
                    {key === "identification_number" &&
                      "ID number must be at least 6 characters."}
                    {key === "phone" &&
                      "Phone must start with + and contain at least 6 digits."}
                    {key === "address" &&
                      "Address must be at least 6 characters and contain a number."}
                    {key === "city" && "City must contain only letters."}
                    {key === "country" && "Country must contain only letters."}
                  </p>
                )}
              </div>
            );
          })}
        </form>

        <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
          <button
            onClick={handleUpdate}
            className="px-6 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition duration-200 font-semibold cursor-pointer"
          >
            Save Changes
          </button>
          <button
            onClick={handlePasswordReset}
            className="px-6 py-2 bg-emerald-50 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-200 transition cursor-pointer"
          >
            Change Password
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-6 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition cursor-pointer"
          >
            Delete Account
          </button>
        </div>

        {showModalSave && (
          <Modal
            message="User updated successfully!"
            onClose={() => setShowModalSave(false)}
          />
        )}

        {showModalPassword && (
          <Modal
            message="Password reset link sent to your email."
            onClose={() => setShowModalPassword(false)}
          />
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white text-gray-600 p-10 rounded-xl relative shadow-xl max-w-lg mx-auto flex flex-col items-center justify-center gap-4">
              <p className="text-lg md:text-2xl font-semibold text-center tracking-tighter text-red-600">
                Are you sure you want to delete your Account?
              </p>
              <p className="text-sm text-center max-w-sm text-gray-500 tracking-tight">
                All data associated with this account will be deleted and cannot
                be recovered.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 font-semibold text-white rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-300  duration-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
