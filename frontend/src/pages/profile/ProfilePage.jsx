import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateUser, deleteUser } from "../../store/slices/authSlice";
import Modal from "../../components/ui/modal/Modal";
import Button from "../../components/ui/button/ButtonPrimary";
import ButtonSecondary from "../../components/ui/button/ButtonSecondary";

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

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      !profile.first_name ||
      profile.first_name.length < 3 ||
      /\d/.test(profile.first_name)
    )
      newErrors.first_name =
        "First name must have at least 3 letters and no numbers.";

    if (
      !profile.last_name ||
      profile.last_name.length < 3 ||
      /\d/.test(profile.last_name)
    )
      newErrors.last_name =
        "Last name must have at least 3 letters and no numbers.";

    if (new Date(profile.date_of_birth) > new Date("2025-01-01"))
      newErrors.date_of_birth = "Birthdate must be before 2025.";

    if (
      !profile.identification_number ||
      profile.identification_number.length < 6
    )
      newErrors.identification_number =
        "Identification number must have at least 6 characters.";

    if (!/^\+\d{6,}$/.test(profile.phone))
      newErrors.phone =
        "Phone number must start with '+' and have at least 6 digits.";

    if (
      !profile.address ||
      profile.address.length < 6 ||
      !/\d/.test(profile.address)
    )
      newErrors.address =
        "Address must have at least 6 characters and one number.";

    if (!profile.city || /\d/.test(profile.city))
      newErrors.city = "City not found.";

    if (!profile.country || /\d/.test(profile.country))
      newErrors.country = "Country not found.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validateForm()) return;

    const updatedData = { ...profile };

    if (updatedData.date_of_birth) {
      updatedData.date_of_birth = new Date(
        updatedData.date_of_birth
      ).toISOString();
    }

    dispatch(updateUser({ userId: user.id, userData: updatedData }))
      .unwrap()
      .then(() => {
        setShowModalSave(true);
        setTimeout(() => setShowModalSave(false), 4000);
      })
      .catch((err) => console.error("Update failed:", err));
  };

  const handlePasswordReset = () => {
    setShowModalPassword(true);
    setTimeout(() => setShowModalPassword(false), 4000);
  };

  const handleDelete = () => {
    dispatch(deleteUser(user.id))
      .unwrap()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
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

  return (
    <section className="container mx-auto p-6">
      <div className="max-w-5xl mx-auto p-10 bg-white rounded-2xl shadow-[0_0px_5px_rgba(0,0,0,0.1)] hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {fieldsToShow.map((key) => (
            <div key={key}>
              <label className="block font-semibold capitalize mb-1 text-start">
                {key.replace("_", " ")}*
              </label>
              <input
                type={key === "date_of_birth" ? "date" : "text"}
                name={key}
                value={profile[key]}
                placeholder={key.replace("_", " ")}
                onChange={handleChange}
                className={`p-2 md:p-3 border ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                } rounded-lg w-full text-gray-400 ${
                  key === "email" && "bg-gray-100"
                }`}
                readOnly={key === "email"}
              />
              {errors[key] && (
                <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
          <button
            onClick={handleUpdate}
            className="px-6 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 cursor-pointer transition duration-200 text-base font-semibold leading-4"
          >
            Save Changes
          </button>
          <button
            onClick={handlePasswordReset}
            className="px-6 py-2 bg-emerald-50 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-200 transition"
          >
            Change Password
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-6 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition"
          >
            Delete Account
          </button>
        </div>

        {showModalSave && (
          <Modal
            message="✅ User updated successfully!"
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
            <div className="bg-white p-10 rounded-xl shadow-xl text-center">
              <p className="text-xl text-red-600 font-bold mb-4">
                Are you sure you want to delete your account?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
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
