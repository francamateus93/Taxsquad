import DocumentsHeader from "../features/documents/components/DocumentHeader.jsx";
import DocumentListNavigation from "../features/documents/components/DocumentListNavigation.jsx";
import DocumentsList from "../features/documents/components/DocumentsList.jsx";
import DeleteModal from "../features/documents/components/DeleteModal.jsx";
import Pagination from "../features/documents/components/Pagination.jsx";
import { useDocuments } from "../features/documents/hooks/useDocuments.js";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";
import Error from "../components/ui/Error.jsx";

const DocumentsPages = () => {
  const {
    documentType,
    setDocumentType,
    dateFilter,
    setDateFilter,
    currentPage,
    setCurrentPage,
    openMenuId,
    menuRef,
    loading,
    error,
    filteredDocuments,
    totalPages,
    currentDocuments,
    toggleMenu,
    handleDownload,
    handleEmail,
    handleConfirmDelete,
    handleDelete,
    showModalDelete,
    setShowModalDelete,
  } = useDocuments();

  return (
    <section className="container mx-auto p-6 space-y-6">
      <DocumentsHeader
        documentType={documentType}
        setDocumentType={setDocumentType}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      <DocumentListNavigation
        currentDocuments={currentDocuments}
        filteredDocuments={filteredDocuments}
      />

      {loading && <LoadingSpinner />}
      {error && <Error message={error} />}
      {!loading && !error && (
        <DocumentsList
          currentDocuments={currentDocuments}
          documentType={documentType}
          openMenuId={openMenuId}
          toggleMenu={toggleMenu}
          menuRef={menuRef}
          handleDownload={handleDownload}
          handleEmail={handleEmail}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}

      {showModalDelete && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setShowModalDelete(false)}
        />
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
};

export default DocumentsPages;
