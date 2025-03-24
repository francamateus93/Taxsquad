const Error = ({ message }) => {
  return (
    <div className="flex justify-center items-center text-red-600 font-semibold p-4">
      <p>{message || "Something went wrong."}</p>
    </div>
  );
};

export default Error;
