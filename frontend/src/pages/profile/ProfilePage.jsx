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

  useEffect(() => {
    if (user) {
      const formattedDate = new Date(user.date_of_birth).toLocaleDateString(
        "en-CA"
      );
      setProfile({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        date_of_birth: formattedDate || "",
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

  const handleUpdate = () => {
    const userData = { ...profile };
    if (userData.date_of_birth) {
      const dateParts = userData.date_of_birth.split("-");
      userData.date_of_birth = new Date(
        dateParts[0],
        dateParts[1] - 1,
        dateParts[2]
      ).toISOString();
    }
    dispatch(updateUser({ userId: user.id, userData: profile }))
      .unwrap()
      .then((res) => {
        console.log("answer update", res);
        setShowModalSave(true);
        setTimeout(() => {
          setShowModalSave(false);
        }, 5000);
      })
      .catch((err) => console.error("Update failed", err));
  };

  const handlePasswordReset = () => {
    setShowModalPassword(true);
    setTimeout(() => {
      setShowModalPassword(false);
    }, 5000);
  };

  const handleDelete = () => {
    dispatch(deleteUser(user.id))
      .unwrap()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        setShowModalSave(true);
        console.error("Failed to delete user:", error);
      });
  };

  return (
    <section className="container mx-auto p-10 md:py-12 md:px-20">
      <div className="max-w-5xl mx-auto bg-white p-6">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-tighter">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-start">
          {fieldsToShow.map((key) => (
            <div key={key}>
              <label className="block font-semibold capitalize">
                {key.replace("_", " ")}:
              </label>
              <input
                type={key === "date_of_birth" ? "date" : "text"}
                name={key}
                value={profile[key]}
                placeholder={user[key]}
                onChange={handleChange}
                className={`p-2 md:p-3 border border-gray-300 rounded-lg w-full text-gray-500 ${
                  key === "email" && "bg-gray-100"
                }`}
                readOnly={key === "email"}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
          <Button onClick={handleUpdate}>Save Changes</Button>
          <ButtonSecondary onClick={handlePasswordReset}>
            Change Password
          </ButtonSecondary>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-6 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition"
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
            <div className="bg-white text-gray-600 p-10 rounded-xl relative shadow-xl max-w-md mx-auto flex flex-col gap-8">
              <p className="text-lg md:text-2xl font-medium text-center tracking-tighter text-red-600">
                Are you sure you want to delete your account? All data
                associated with this account will be deleted and cannot be
                recovered.
              </p>
              <div className="flex justify-between gap-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 font-bold text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete Account
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
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
