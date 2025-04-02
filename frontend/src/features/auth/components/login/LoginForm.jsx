import Button from "../../../../components/ui/button/ButtonPrimary";
import InputField from "./InputField";
import GoogleLoginButton from "./GoogleLoginButton";
import { Link } from "react-router-dom";

const LoginForm = ({
  form,
  touched,
  errors,
  handleChange,
  handleGoogleLogin,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 text-xs md:text-sm"
    >
      <InputField
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        touched={touched.email}
        error={errors.email}
        placeholder="info@gmail.com"
      />
      <InputField
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        touched={touched.password}
        error={errors.password}
        placeholder="Enter your Password"
      />
      <Button type="submit">Login</Button>
      <GoogleLoginButton onClick={handleGoogleLogin} />
      <p className="text-xs md:text-sm text-gray-600 mt-6 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-emerald-500 font-semibold">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
