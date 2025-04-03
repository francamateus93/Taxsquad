import { useInvoices } from "../features/invoices/hook/useInvoices";
import InvoicesHeader from "../features/invoices/components/InvoicesHeader";
import InvoicesList from "../features/invoices/components/InvoicesList";
7;
import InvoicePagination from "../features/invoices/components/InvoicesPagination.jsx";
import InvoiceModal from "../features/invoices/components/InvoicesModal";

const InvoicesPage = () => {
  const {
    paginatedInvoices,
    invoiceType,
    setInvoiceType,
    dateFilter,
    setDateFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    toggleMenu,
    openMenuId,
    handleInvoiceClick,
    handleDownload,
    handleEmail,
    handleConfirmDelete,
    showModalDelete,
    setShowModalDelete,
    handleDelete,
    menuRef,
  } = useInvoices();

  return (
    <section className="container mx-auto p-6 space-y-6">
      <InvoicesHeader
        invoiceType={invoiceType}
        setInvoiceType={setInvoiceType}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      <InvoicesList
        paginatedInvoices={paginatedInvoices}
        toggleMenu={toggleMenu}
        openMenuId={openMenuId}
        menuRef={menuRef}
        handleDownload={handleDownload}
        handleEmail={handleEmail}
        handleConfirmDelete={handleConfirmDelete}
        handleInvoiceClick={handleInvoiceClick}
      />
      {showModalDelete && (
        <InvoiceModal
          showModal={showModalDelete}
          handleDelete={handleDelete}
          onCancel={() => setShowModalDelete(false)}
        />
      )}

      {totalPages > 1 && (
        <InvoicePagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
};

export default InvoicesPage;
