import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../services/data/Api";
import {
  resetPasswordWithEmail,
  updateUserEmail,
  deleteCurrentUser,
} from "../../services/auth/firebaseAuthService";
import { logout } from "../../store/authSlice";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

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
    const fetchUserProfile = async () => {
      if (!user?.uid) return;

      setLoading(true);
      try {
        const { data } = await api.get(`/users/${user.uid}`);
        setProfile({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || user.email || "",
          date_of_birth: data.date_of_birth
            ? data.date_of_birth.split("T")[0]
            : "",
          identification_number: data.identification_number || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user.uid, user.email]);

  const handleSave = async () => {
    try {
      await api.put(`/users/${user.uid}`, profile);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(`Error updating profile: ${err.message}`);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await resetPasswordWithEmail(user.email);
      alert("An email was sent with instructions to reset your password.");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleEmailChange = async () => {
    const newEmail = prompt("Enter new email:", profile.email);
    if (newEmail && newEmail !== profile.email) {
      try {
        await updateUserEmail(newEmail);
        await api.put(`/users/${user.uid}`, { ...profile, email: newEmail });
        setProfile((prev) => ({ ...prev, email: newEmail }));
        alert("Email updated successfully. Check your inbox.");
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm("This will permanently delete your account. Continue?")
    ) {
      try {
        await api.delete(`/users/${user.uid}`);
        await deleteCurrentUser();
        dispatch(logout());
        navigate("/");
      } catch (error) {
        alert(`Error deleting account: ${error.message}`);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(profile).map(([key, value]) => (
          <div key={key}>
            <label className="font-semibold capitalize">
              {key.replace("_", " ")}
            </label>
            <input
              type={key === "date_of_birth" ? "date" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
              className={`border rounded w-full p-2 ${
                key === "email" ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              readOnly={key === "email"}
            />
          </div>
        ))}
      </div>

      <div className="flex space-x-2 mt-6">
        <button
          className="bg-emerald-600 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save Changes
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleEmailChange}
        >
          Change Email
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={handlePasswordReset}
        >
          Change Password
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
