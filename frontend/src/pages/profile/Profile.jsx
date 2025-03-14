import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../services/data/Api";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      setSuccess("Profile updated successfully!");
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-emerald-500">{success}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold">First Name</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
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
            // readOnly
          />
        </div>
        <div>
          <label className="font-semibold">Date of Birth</label>
          <input
            type="date"
            className="border rounded w-full p-2"
            name="date_of_birth"
            value={profile.date_of_birth.split("T")[0]}
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

      <button
        onClick={handleSave}
        className="mt-6 bg-emerald-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
