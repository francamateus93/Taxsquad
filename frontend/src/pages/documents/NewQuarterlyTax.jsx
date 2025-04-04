import { useQuarterly } from "../../features/quarterly/hook/useQuarterly";
import QuarterlyForm from "../../features/quarterly/components/QuarterlyForm";
import QuarterlyActions from "../../features/quarterly/components/QuarterlyActions";
import Modal from "../../components/ui/Modal";

const NewQuarterlyTax = () => {
  const {
    form,
    errors,
    touched,
    showModal,
    setShowModal,
    handleChange,
    handleSubmit,
  } = useQuarterly();

  return (
    <section className="container mx-auto p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-[0_0px_5px_rgba(0,0,0,0.1)] hover:shadow-xl transition duration-300">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-tighter">
          Quarterly Tax
        </h2>

        <form onSubmit={handleSubmit} className="text-start">
          <QuarterlyForm
            form={form}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
          />

          <QuarterlyActions />
        </form>

        {showModal && (
          <Modal
            message="Quarterly tax saved successfully!"
            onClose={() => {
              setShowModal(false);
              navigate("/documents");
            }}
          />
        )}
      </div>
    </section>
  );
};

export default NewQuarterlyTax;
