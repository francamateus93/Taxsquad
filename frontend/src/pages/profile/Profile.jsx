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
import Button from "../../components/buttons/Button";
import ButtonSecondary from "../../components/buttons/ButtonSecondary";

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
    <section className="container mx-auto p-12">
      <div className="w-full bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-tight">
          Personal information
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 text-start text-xs md:text-sm">
          {Object.entries(profile).map(([key, value]) => (
            <div key={key}>
              <label className="flex font-semibold capitalize">
                {key.replace("_", " ")}*
              </label>
              <input
                type={key === "date_of_birth" ? "date" : "text"}
                name={key}
                value={value}
                onChange={handleChange}
                className="p-2 md:p-3 mb-2 border border-gray-300 rounded-lg w-full"
                readOnly={key === "email"}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between space-x-2 mt-6">
          <Button onClick={handleSave}>Save Changes</Button>
          <ButtonSecondary onClick={handleEmailChange}>
            Change Email
          </ButtonSecondary>
          <ButtonSecondary onClick={handlePasswordReset}>
            Change Password
          </ButtonSecondary>
          <ButtonSecondary onClick={handleDeleteAccount}>
            Delete Account
          </ButtonSecondary>
        </div>
      </div>
    </section>
  );
};

export default Profile;
