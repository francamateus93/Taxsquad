import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

const LandingPage = () => {
  return (
    <div className="w-full">
      <main class="flex flex-col items-center justify-center">
        <Navbar />

        {/* Hero */}
        <section class="flex flex-wrap items-center mx-3 px-4 w-full lg:max-w-screen-xl sm:max-w-screen-sm pb-20 h-screen mt-32">
          <div class="px-3 w-full lg:w-3/5">
            <div class="mb-8 max-w-lg lg:mx-0 lg:max-w-md text-center md:text-left">
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

        {/* Pricing */}
        <section class="mt-4" id="pricing">
          <div class="mx-auto bg-emerald-700 pb-20 max-w-7xl px-6 py-12 lg:px-8">
            <div class="mx-auto max-w-4xl pt-8 text-center flex flex-col gap-4 md:gap-0">
              {/* <h1 class="text-base leading-7 my-8 text-white">Pricing</h1> */}
              <p class="my-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Whether it's just you, or your entire team - we've got you
                covered.
              </p>
              <p class="mx-auto my-6 max-w-2xl text-center text-lg leading-8 text-white">
                Choose the product that works best
              </p>
            </div>
            <div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <div class="ring-1 ring-white/60 hover:bg-white/5 hover:ring-2 rounded-3xl p-10 xl:p-10">
                <div class="flex items-center justify-between gap-x-4">
                  <h2
                    id="product1"
                    class="text-4xl mb-2 font-semibold leading-8 text-white"
                  >
                    Free
                  </h2>
                </div>
                <p class="mt-6 flex items-baseline gap-x-1">
                  <span class="text-5xl font-bold tracking-tight text-white">
                    0 €
                  </span>
                </p>
                <p class="text-sm md:text-base leading-6 mt-4 text-white text-start">
                  You will have some basic features available to review and
                  manage your taxes and documents.
                </p>
                <ul
                  role="list"
                  class="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
                >
                  <li class="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    50 invoices per month
                  </li>
                  <li class="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    User finance summary
                  </li>
                  <li class="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Just quarterly taxes
                  </li>
                  <li class="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Documentation of taxes
                  </li>
                </ul>
                <a
                  href="/order"
                  aria-describedby="product1"
                  class="bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-offset-2"
                >
                  Order Now
                </a>
              </div>
              <div class="ring-1 ring-white/60 rounded-3xl p-10 xl:p-10 hover:bg-white/5 hover:ring-2">
                <div class="flex items-center justify-between gap-x-4">
                  <h2
                    id="product1"
                    class="text-4xl mb-2 font-semibold leading-8 text-white"
                  >
                    Self-employed
                  </h2>
                </div>
                <p class="mt-6 flex items-baseline gap-x-1">
                  <span class="text-5xl font-bold tracking-tight text-white">
                    39,90 €
                  </span>
                </p>
                <p class="text-sm md:text-base leading-6 mt-4 text-white text-start">
                  You will have everything you need to manage your tax life as a
                  self-employed.
                </p>
                <ul
                  role="list"
                  class="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
                >
                  <li class="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    User finance summary
                  </li>
                  <li class="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Invoice Management
                  </li>
                  <li class="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    All quarterly and annual taxes
                  </li>
                  <li class="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Self-employed registration
                  </li>
                </ul>
                <a
                  href="/order"
                  aria-describedby="product1"
                  class="bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Order Now
                </a>
              </div>

              <div class="ring-1 ring-white/60 hover:bg-white/5 hover:ring-2 rounded-3xl p-10 xl:p-10">
                <div class="flex items-center justify-between gap-x-4">
                  <h2
                    id="product1"
                    class="text-4xl mb-2 font-semibold leading-8 text-white"
                  >
                    Companies
                  </h2>
                </div>
                <p class="mt-6 flex items-baseline gap-x-1">
                  <span class="text-5xl font-bold tracking-tight text-white">
                    69,90 €
                  </span>
                </p>
                <p class="text-sm md:text-base leading-6 mt-4 text-white text-start">
                  You will have your company under control, from incorporation
                  to the end of the fiscal year.
                </p>
                <ul
                  role="list"
                  class="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
                >
                  <li class="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Constitution of your company
                  </li>
                  <li class="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Online billing program
                  </li>
                  <li class="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    All taxes, including corporates
                  </li>
                  <li class="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Unified accounting management
                  </li>
                </ul>
                <a
                  href="/order"
                  aria-describedby="product1"
                  class="bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6  focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
