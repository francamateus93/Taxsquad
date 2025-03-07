import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="w-full">
      <div className="bg-white text-black">
        <main class="flex flex-col items-center justify-center mt-32">
          <Navbar />
          <section class="flex flex-wrap items-center -mx-3 font-sans px-4 mx-auto w-full lg:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md pb-20">
            <div class="px-3 w-full lg:w-2/5">
              <div class="mx-auto mb-8 max-w-lg text-center lg:mx-0 lg:max-w-md lg:text-left">
                <h2 class="mb-4 text-3xl font-bold text-left lg:text-5xl">
                  Exclusive Agency For
                  <span class="text-5xl text-blue-500 leading-relaxeds">
                    Technology
                  </span>
                  Provide Solution
                </h2>

                <p class="visible mx-0 mt-3 mb-0 text-sm leading-relaxed text-left text-slate-400">
                  Helping you maximize operations management with digitization
                </p>
              </div>

              <div class="text-center lg:text-left">
                <a class="block visible py-4 px-8 mb-4 text-xs font-semibold tracking-wide leading-none text-white bg-blue-500 rounded cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block">
                  Key Features
                </a>

                <a class="block visible py-4 px-8 text-xs font-semibold leading-none bg-white rounded border border-solid cursor-pointer sm:inline-block border-slate-200 text-slate-500">
                  How We Work?
                </a>
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
