const DeleteAccountModal = ({ onDelete, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white text-gray-600 p-10 rounded-xl shadow-xl max-w-lg mx-auto flex flex-col items-center gap-4">
      <p className="text-2xl font-semibold text-center text-red-600">
        Are you sure you want to delete your account?
      </p>
      <p className="text-sm text-center max-w-sm text-gray-500">
        All your data will be permanently deleted.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default DeleteAccountModal;
