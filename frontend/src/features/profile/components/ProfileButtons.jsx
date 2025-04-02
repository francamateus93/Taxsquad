const ProfileButtons = ({
  handleUpdate,
  handlePasswordReset,
  setShowDeleteModal,
}) => {
  return (
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
  );
};

export default ProfileButtons;
