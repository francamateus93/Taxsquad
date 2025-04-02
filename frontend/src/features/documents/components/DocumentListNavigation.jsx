const DocumentListNavigation = ({ currentDocuments, filteredDocuments }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow hover:shadow-xl transition duration-300 relative">
      <div className="grid grid-cols-2 bg-emerald-50 rounded-t-xl px-4 py-2 tracking-tight font-semibold">
        <div className="flex items-center space-x-1 cursor-pointer">
          <p className="text-start font-bold text-sm md:text-base">Document</p>
          <img
            src="https://img.icons8.com/?size=24&id=85502&format=png"
            alt="arrow down"
            className="w-4 h-4"
          />
        </div>
        <p className="text-xs md:text-sm text-end">
          {currentDocuments.length} of {filteredDocuments.length} documents
        </p>
      </div>
    </div>
  );
};

export default DocumentListNavigation;
