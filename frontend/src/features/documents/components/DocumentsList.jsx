const DocumentsList = ({
  currentDocuments,
  documentType,
  openMenuId,
  toggleMenu,
  menuRef,
  handleDownload,
  handleEmail,
  handleConfirmDelete,
}) => {
  if (currentDocuments.length === 0) {
    return (
      <p className="bg-white text-center p-4 rounded-lg text-gray-500">
        No documents found.
      </p>
    );
  }

  return currentDocuments.map((doc) => (
    <div
      key={doc.id}
      className="grid grid-cols-1 items-center text-start p-2 md:p-3 rounded-lg hover:bg-emerald-100 duration-200 cursor-pointer relative border-b border-b-gray-100"
    >
      <div className="flex justify-between items-center md:gap-4 text-sm md:text-base">
        <p className="font-semibold md:w-66">
          {documentType === "quarterly"
            ? `Quarter ${doc.quarter} - ${doc.year}`
            : `Annual Income Tax - ${doc.year}`}
        </p>
        <div className="flex items-center justify-end gap-10 md:w-46 relative z-0">
          <p className="text-end text-sm md:text-base md:w-44 relative z-0">
            {doc.created_at
              ? new Date(doc.created_at).toLocaleDateString()
              : ""}
          </p>
          <button
            onClick={() => toggleMenu(doc.id)}
            className="relative bg-gray-50 w-7 h-7 rounded-full cursor-pointer"
          >
            ⋮
          </button>
        </div>
      </div>
      {openMenuId === doc.id && (
        <div
          ref={menuRef}
          className="absolute top-2 right-2 w-32 bg-white shadow flex flex-col rounded-lg p-2 z-[1000] text-sm text-gray-500"
        >
          <button
            onClick={() => handleDownload(doc)}
            className="hover:bg-emerald-100 px-2 py-2 rounded-md text-start cursor-pointer"
          >
            Download
          </button>
          <button
            onClick={() => handleEmail(doc)}
            className="hover:bg-emerald-100 px-2 py-2 rounded-md text-start cursor-pointer"
          >
            Send Email
          </button>
          <button
            onClick={() => handleConfirmDelete(doc)}
            className="text-red-500 hover:bg-red-100 px-2 py-2 rounded-md text-start cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  ));
};

export default DocumentsList;
