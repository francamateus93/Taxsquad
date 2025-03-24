import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateUser, deleteUser } from "../../store/slices/authSlice";
import Button from "../../components/buttons/ButtonPrimary";
import ButtonSecondary from "../../components/buttons/ButtonSecondary";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);

  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
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
  });

  useEffect(() => {
    if (user) {
      setProfile({ ...user });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateUser({ userId: user.id, userData: profile }))
      .unwrap()
      .then(() => {
        setModalMessage("Profile updated successfully!");
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
      })
      .catch((error) => {
        setModalMessage(error.message);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
      });
  };

  const handlePasswordReset = () => {
    setModalMessage(
      "We have sent an email with instructions to reset your password."
    );
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const handleDelete = () => {
    dispatch(deleteUser(user.id))
      .unwrap()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        setModalMessage(error.message);
        setShowDeleteModal(true);
        setTimeout(() => setShowDeleteModal(false), 3000);
      });
  };

  return (
    <section className="container mx-auto p-10 md:py-12 md:px-20">
      <div className="max-w-3xl mx-auto bg-white p-6">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-tighter">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(profile).map(([key, value]) => (
            <div key={key}>
              <label className="block font-semibold capitalize">
                {key.replace("_", " ")}:
              </label>
              <input
                type={key === "date_of_birth" ? "date" : "text"}
                name={key}
                value={value || ""}
                placeholder={key.replace("_", " ")}
                onChange={handleChange}
                className={`p-2 md:p-3 border border-gray-300 rounded-lg w-full ${
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

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <p>{modalMessage}</p>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg space-y-6">
              <h2 className="text-xl font-semibold text-red-600">
                Delete your account
              </h2>
              <p>
                Are you sure you want to delete your account? All data
                associated with this account will be deleted and cannot be
                recovered.
              </p>
              <div className="flex justify-between gap-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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

export default Profile;
