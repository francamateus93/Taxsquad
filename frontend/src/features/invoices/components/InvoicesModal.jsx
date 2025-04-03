import React from "react";

const InvoiceModal = ({ showModal, handleDelete, onCancel }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-gray-600 p-10 rounded-xl relative shadow-xl max-w-lg mx-auto flex flex-col items-center justify-center gap-4">
        <p className="text-lg md:text-2xl font-semibold text-center tracking-tighter text-red-600">
          Are you sure you want to delete this Invoice?
        </p>
        <p className="text-sm text-center max-w-sm text-gray-500 tracking-tight">
          All data associated with this invoice will be deleted and cannot be
          recovered.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 font-semibold text-white rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-300  duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
