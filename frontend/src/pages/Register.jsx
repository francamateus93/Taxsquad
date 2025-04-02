import { useRegister } from "../features/auth/hooks/useRegister.js";
import { Link } from "react-router-dom";
import RegisterForm from "../features/auth/components/register/RegisterForm.jsx";

const Register = () => {
  const {
    form,
    touched,
    errors,
    loading,
    error,
    acceptedTerms,
    setAcceptedTerms,
    handleChange,
    handleSubmit,
    inputClass,
  } = useRegister();

  return (
    <section className="container mx-auto p-6">
      <div className="max-w-xl mx-auto p-10 bg-white rounded-2xl mt-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center tracking-tight">
          Register
        </h2>
        <RegisterForm
          form={form}
          touched={touched}
          errors={errors}
          acceptedTerms={acceptedTerms}
          setAcceptedTerms={setAcceptedTerms}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          inputClass={inputClass}
          loading={loading}
          error={error}
        />
        <p className="text-xs md:text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-500 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
