import React from "react";
import { Link } from "react-router-dom";
import ButtonSecondary from "../components/ui/button/ButtonSecondary";

const NotFoundPage = () => {
  return (
    <section className="h-screen container mx-auto p-10 md:py-12 md:px-20 mt-32">
      <div className="flex flex-col items-center justify-center mb-2">
        <h2 className="text-7xl md:text-9xl font-black text-emerald-600 tracking-tighter">
          404
        </h2>
        <p className="text-2xl md:text-4xl font-bold text-emerald-600 tracking-tighter mb-4 md:mb-8">
          Page Not Found
        </p>
      </div>
      <Link to="/dashboard">
        <ButtonSecondary>Back to Home</ButtonSecondary>
      </Link>
    </section>
  );
};

export default NotFoundPage;
