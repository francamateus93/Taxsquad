const DocumentHeader = ({ currentDocuments, filteredDocuments }) => (
  <div className="grid grid-cols-2 bg-emerald-50 rounded-t-xl px-4 py-2 tracking-tight font-semibold">
    <div className="flex items-center space-x-1 cursor-pointer">
      <p className="font-bold">Document</p>
      <img src="https://img.icons8.com/?size=24&id=85502&format=png" alt="arrow down" className="w-4 h-4" />
    </div>
    <div className="flex items-end justify-end cursor-pointer">
      <p className="text-xs md:text-sm">{currentDocuments.length} of {filteredDocuments.length} documents</p>
    </div>
  </div>
);
export default DocumentHeader;