const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
