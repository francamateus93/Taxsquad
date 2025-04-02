import { useAnnual } from "../features/annual/hook/useAnnual";
import Modal from "../components/ui/Modal";
import AnnualForm from "../features/annual/components/AnnualForm";
import AnnualActions from "../features/annual/components/AnnualActions";

const NewAnnualTax = () => {
  const {
    form,
    errors,
    touched,
    handleChange,
    handleSubmit,
    showModal,
    setShowModal,
    maritalStatusOptions,
    autonomousCommunities,
  } = useAnnual();

  return (
    <section className="container mx-auto p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-tighter">
          Annual Tax
        </h2>

        <form onSubmit={handleSubmit}>
          <AnnualForm
            form={form}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            maritalStatusOptions={maritalStatusOptions}
            autonomousCommunities={autonomousCommunities}
          />

          <AnnualActions />
        </form>

        {showModal && (
          <Modal
            message="Annual tax saved successfully!"
            onClose={() => {
              setShowModal(false);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default NewAnnualTax;
