const DocumentToggle = ({ documentType, setDocumentType }) => (
  <div className="flex space-x-2 mb-4 md:mb-0">
    {["quarterly", "annual"].map((type) => (
      <button
        key={type}
        onClick={() => setDocumentType(type)}
        className={\`px-6 py-2 rounded-lg cursor-pointer tracking-tighter text-center \${documentType === type
          ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600"
          : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200"
        } transition duration-200\`}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    ))}
  </div>
);
export default DocumentToggle;