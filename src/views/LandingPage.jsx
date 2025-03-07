import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

const LandingPage = () => {
  return (
    <div className="w-full">
      <div className="bg-white">
        <main class="flex flex-col items-center justify-center mt-32">
          <Navbar />
          <section class="flex flex-wrap items-center mx-3 font-sans px-4 mx-auto w-full lg:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md pb-20">
            <div class="px-3 w-full lg:w-3/5">
              <div class="mb-8 max-w-lg text-center lg:mx-0 lg:max-w-md text-center md:text-left">
                <h2 class="mb-4 font-bold text-6xl leading-14">
                  Your tax management in a{" "}
                  <span className="text-emerald-500">simplified</span> way.
                </h2>

                <p class="mx-0 mt-8 mb-0 leading text-xl text-center md:text-left text-slate-600">
                  We help you have more control over your taxes and reduce your
                  worries.
                </p>
              </div>

              <div class="text-center flex justify-center md:justify-start text-2xl md:text-left">
                <Button>Get Started</Button>
              </div>
            </div>

            <div class="px-3 mb-12 w-full lg:mb-0 lg:w-3/5">
              <div class="flex justify-center items-center"></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
