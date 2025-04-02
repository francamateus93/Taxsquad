const Error = ({ message }) => {
  return (
    <div className="flex text-xl justify-center items-center text-emerald-600 font-semibold p-4 tracking-tighter hover:text-emerald-400 transition duration-200">
      <p>{message || "Something went wrong."}</p>
    </div>
  );
};

export default Error;
