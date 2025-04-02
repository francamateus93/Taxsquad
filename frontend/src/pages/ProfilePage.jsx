import Modal from "../components/ui/Modal";
import DeleteAccountModal from "../features/profile/components/DeleteAccountModal";
import ProfileForm from "../features/profile/components/ProfileForm";
import { useProfile } from "../features/profile/hook/useProfile";

const ProfilePage = () => {
  const {
    profile,
    errors,
    touched,
    handleChange,
    handleUpdate,
    handlePasswordReset,
    handleDelete,
    showModalSave,
    showModalPassword,
    showDeleteModal,
    setShowModalDelete,
    setShowDeleteModal,
    setShowModalSave,
    setShowModalPassword,
  } = useProfile();

  return (
    <section className="container mx-auto p-6">
      <div className="max-w-5xl mx-auto p-10 bg-white rounded-2xl shadow-[0_0px_5px_rgba(0,0,0,0.1)]">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Personal Information
        </h2>

        <ProfileForm
          profile={profile}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
        />

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
          <DeleteAccountModal
            onDelete={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
