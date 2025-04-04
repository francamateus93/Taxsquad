import Modal from "../components/ui/Modal";
import DeleteAccountModal from "../features/profile/components/DeleteAccountModal";
import ProfileForm from "../features/profile/components/ProfileForm";
import ProfileButtons from "../features/profile/components/ProfileButtons";
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
    setShowDeleteModal,
    setShowModalSave,
    setShowModalPassword,
  } = useProfile();

  return (
    <section className="container mx-auto p-5">
      <div className="max-w-5xl mx-auto px-4 py-6 md:p-10 bg-white rounded-2xl shadow-[0_0px_5px_rgba(0,0,0,0.1)]">
        <h2 className="text-2xl font-bold mb-5 md:mb-8 text-center">
          Personal Information
        </h2>

        <ProfileForm
          profile={profile}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
        />

        <ProfileButtons
          handleUpdate={handleUpdate}
          handlePasswordReset={handlePasswordReset}
          setShowDeleteModal={setShowDeleteModal}
        />

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
