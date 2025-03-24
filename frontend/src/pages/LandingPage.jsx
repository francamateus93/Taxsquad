import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/ButtonPrimary";

const LandingPage = () => {
  return (
    <div className="w-full">
      <main className="flex flex-col items-center justify-center">
        {/* Hero */}
        <section className="flex flex-wrap items-center mx-auto px-8 w-full lg:max-w-screen-xl sm:max-w-screen-sm pb-20 h-screen mt-32">
          <div className="px-8 w-full lg:w-2/5">
            <div className="mb-8 max-w-lg lg:mx-0 lg:max-w-md text-center md:text-left">
              <h2 className="mb-4 font-bold text-6xl leading-14">
                Your tax management in a{" "}
                <span className="text-emerald-500">simplified</span> way.
              </h2>

              <p className="mx-0 mt-8 mb-0 leading text-xl text-center md:text-left text-slate-600">
                We help you have more control over your taxes and reduce your
                worries.
              </p>
            </div>

            <div className="text-center flex gap-4 justify-center md:justify-start text-xl md:text-left">
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>

              <button className="px-6 py-2 text-emerald-600 bg-emerald-50 rounded hover:bg-emerald-200 transition duration-200 text-base">
                More Info
              </button>
            </div>
          </div>

          <div className="px-3 mb-12 w-full lg:mb-0 lg:w-4/5">
            <div className="flex justify-center items-center"></div>
          </div>
        </section>

        {/* Pricing */}
        <section
          className="mx-auto bg-linear-to-tl from-emerald-800 to-emerald-400 pb-20 px-6 py-12 lg:px-8"
          id="pricing"
        >
          <div>
            <div className="mx-auto max-w-4xl pt-8 text-center flex flex-col gap-4 md:gap-0">
              {/* <h1 className="text-base leading-7 my-8 text-white">Pricing</h1> */}
              <p className="my-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Whether it's just you, or your entire team - we've got you
                covered.
              </p>
              <p className="mx-auto my-6 max-w-2xl text-center text-lg leading-8 text-white">
                Choose the product that works best
              </p>
            </div>
            <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <div className="ring-1 ring-white/60 hover:bg-white/5 hover:ring-2 rounded-3xl p-10 xl:p-10">
                <div className="flex items-center justify-between gap-x-4">
                  <h2
                    id="product1"
                    className="text-4xl mb-2 font-semibold leading-8 text-white"
                  >
                    Free
                  </h2>
                </div>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    0 €
                  </span>
                </p>
                <p className="text-sm md:text-base leading-6 mt-4 text-white text-start">
                  You will have some basic features available to review and
                  manage your taxes and documents.
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
                >
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    50 invoices per month
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    User finance summary
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Just quarterly taxes
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Documentation of taxes
                  </li>
                </ul>
                <a
                  href="/order"
                  aria-describedby="product1"
                  className="bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-offset-2"
                >
                  Order Now
                </a>
              </div>
              <div className="ring-1 ring-white/60 rounded-3xl p-10 xl:p-10 hover:bg-white/5 hover:ring-2">
                <div className="flex items-center justify-between gap-x-4">
                  <h2
                    id="product1"
                    className="text-4xl mb-2 font-semibold leading-8 text-white"
                  >
                    Self-employed
                  </h2>
                </div>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    39,90 €
                  </span>
                </p>
                <p className="text-sm md:text-base leading-6 mt-4 text-white text-start">
                  You will have everything you need to manage your tax life as a
                  self-employed.
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
                >
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    User finance summary
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Invoice Management
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    All quarterly and annual taxes
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Self-employed registration
                  </li>
                </ul>
                <a
                  href="/order"
                  aria-describedby="product1"
                  className="bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Order Now
                </a>
              </div>

              <div className="ring-1 ring-white/60 hover:bg-white/5 hover:ring-2 rounded-3xl p-10 xl:p-10">
                <div className="flex items-center justify-between gap-x-4">
                  <h2
                    id="product1"
                    className="text-4xl mb-2 font-semibold leading-8 text-white"
                  >
                    Companies
                  </h2>
                </div>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    69,90 €
                  </span>
                </p>
                <p className="text-sm md:text-base leading-6 mt-4 text-white text-start">
                  You will have your company under control, from incorporation
                  to the end of the fiscal year.
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
                >
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Constitution of your company
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Online billing program
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    All taxes, including corporates
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Unified accounting management
                  </li>
                </ul>
                <a
                  href="/order"
                  aria-describedby="product1"
                  className="bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6  focus-visible:outline-2 focus-visible:outline-offset-2"
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
