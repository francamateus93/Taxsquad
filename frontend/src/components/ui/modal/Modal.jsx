import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import checked from "../../../../public/icons8-checked.gif";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { y: -30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.9 } },
  exit: { y: 30, opacity: 0, transition: { duration: 0.8 } },
};

const Modal = ({ message, duration = 50000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className="bg-white text-gray-600 p-6 rounded-xl relative shadow-xl max-w-md mx-auto"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button
            className="absolute top-2 right-2 p-4 text-gray-600 hover:text-emerald-400 hover:font-semibold transition duration-200"
            onClick={onClose}
          >
            X
          </button>
          <div className="flex flex-col items-center gap-4 p-10">
            <div className="flex items-center justify-center">
              <img
                src={checked}
                alt="check"
                className="text-emerald-600 fill-emerald-600"
                width={50}
                height={50}
              />
              <p className="text-lg md:text-2xl font-medium text-center tracking-tight text-emerald-600">
                {message}
              </p>
            </div>
            <p className="text-sm text-center text-gray-500">Redirecting...</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;

// import { useEffect } from "react";

// const Modal = ({ message }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose?.();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="mt-4 bg-green-100 border border-green-400 text-green-700 p-3 rounded shadow-md transition duration-300">
//       {message || "Success!"}
//     </div>
//   );
// };

// export default Modal;
