const GoogleLoginButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex justify-center items-center gap-3 py-2 mt-2 bg-emerald-50 text-gray-800 rounded-lg w-full hover:bg-emerald-100"
  >
    <img
      src="https://img.icons8.com/color/48/google-logo.png"
      alt="Google"
      className="w-5 h-5"
    />
    <span>Login with Google</span>
  </button>
);

export default GoogleLoginButton;
