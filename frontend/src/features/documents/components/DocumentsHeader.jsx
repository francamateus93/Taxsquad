const DocumentsHeader = ({
  documentType,
  setDocumentType,
  dateFilter,
  setDateFilter,
}) => (
  <div className="flex flex-col md:flex-row md:justify-between md:items-end space-x-2">
    {/* Buttons */}
    <div className="flex space-x-2 mb-4 md:mb-0">
      {["quarterly", "annual"].map((type) => (
        <button
          key={type}
          onClick={() => setDocumentType(type)}
          className={`px-6 py-2 rounded-lg cursor-pointer tracking-tighter text-center ${
            documentType === type
              ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600"
              : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200"
          } transition duration-200`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>

    {/* Filter by date */}
    <div className="flex justify-end space-x-1 px-4 text-gray-500">
      <label htmlFor="dateFilter" className="font-semibold text-sm">
        Filter:
      </label>
      <input
        id="dateFilter"
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="border-none text-sm"
      />
    </div>
  </div>
);

export default DocumentsHeader;
