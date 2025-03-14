import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  auth,
  resetPasswordWithEmail,
  updateUserEmail,
  deleteCurrentUser,
} from "../../services/auth/firebaseAuthService";
import { logout } from "../../store/authSlice";
import api from "../../services/data/Api";

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
    password: "",
    date_of_birth: "",
    identification_number: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/users/${user.uid}`);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) fetchUserProfile();
  }, [user.uid]);

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put(`/users/${user.uid}`, profile);
      setMessage("Profile updated successfully!");
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      if (user?.email) {
        await resetPasswordWithEmail(user.email);
        alert("An email was sent with instructions to reset your password.");
        setError(null);
      } else {
        alert("No email found for the current user.");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async () => {
    const newEmail = prompt("Enter new email:");
    if (newEmail) {
      try {
        await updateUserEmail(newEmail);
        await api.put(`/users/${user.uid}`, { ...profile, email: newEmail });
        setProfile((prev) => ({ ...prev, email: newEmail }));
        alert("Email updated successfully.");
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm(
      "This will permanently delete your account. Continue?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/users/${user.uid}`);
        await deleteCurrentUser();
        dispatch(logout());
        navigate("/");
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-emerald-500">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold">First Name</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div>
          <label className="font-semibold">Last Name</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            className="border rounded w-full p-2 bg-gray-100 cursor-not-allowed"
            name="email"
            value={profile.email}
            readOnly
          />
        </div>
        <div>
          <label className="font-semibold">Date of Birth</label>
          <input
            type="date"
            className="border rounded w-full p-2"
            name="date_of_birth"
            value={
              profile.date_of_birth ? profile.date_of_birth.split("T")[0] : ""
            }
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-semibold">Identification Number</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            name="identification_number"
            value={profile.identification_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-semibold">Phone</label>
          <input
            type="tel"
            className="border rounded w-full p-2"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-semibold">Address</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            name="address"
            value={profile.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-semibold">City</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            name="city"
            value={profile.city}
            onChange={handleChange}
          />
        </div>
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
