import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import api from "../../services/data/Api";
import { logout, updateUser, deleteUser } from "../../store/slices/authSlice";
import Button from "../../components/buttons/ButtonPrimary";
import ButtonSecondary from "../../components/buttons/ButtonSecondary";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);

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
    setProfile(user);
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleUpdate = () => {
    dispatch(updateUser({ userId: user.id, userData: profile }));
  };

  const handleDelete = () => {
    dispatch(deleteUser(user.id))
      .unwrap()
      .then(() => {
        dispatch(logout());
        navigate("/");
      });
  };

  return (
    <section className="container p-10 md:py-12 md:px-20">
      <div className="max-w-3xl mx-auto bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-tighter">
          Personal information
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 text-start text-xs md:text-sm">
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

        <div className="grid grid-cols-1 gap-4 lg:flex md:justify-between space-x-2 mt-6">
          <Button onClick={handleUpdate}>Save Changes</Button>
          <ButtonSecondary onClick={handlePasswordReset}>
            Change Password
          </ButtonSecondary>
          <button
            onClick={handleDelete}
            className="px-6 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-200 transition duration-200 cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
