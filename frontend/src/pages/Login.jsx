import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";
import LoginForm from "../features/auth/components/login/LoginForm.jsx";
import { useLogin } from "../features/auth/hooks/useLogin.js";

const Login = () => {
  const { ...loginProps } = useLogin();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white p-8 md:py-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center tracking-tight">
          Login
        </h2>
        <p className="mb-6 text-gray-500 tracking-tight text-xs md:text-sm">
          Enter your email and password to sign in!
        </p>
        <LoginForm {...loginProps} />
      </div>
    </section>
  );
};

export default Login;
