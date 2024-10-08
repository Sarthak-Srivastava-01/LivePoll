import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className='fixed top-4 w-full '>

            {/* ========== HEADER ========== */}
            <header className="inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full before:absolute before:inset-0 before:max-w-[66rem] before:mx-2 before:lg:mx-auto before:rounded-[26px] before:bg-neutral-800/30 before:backdrop-blur-md">
                <nav className="relative max-w-[66rem] w-full py-2.5 ps-5 pe-2 md:flex md:items-center md:justify-between md:py-0 mx-2 lg:mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            className="text-white flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                            href="/"
                            aria-label="Preline"
                        >
                            Live Poll
                        </Link>
                        {/* End Logo */}
                        <div className="md:hidden">
                            <button
                                type="button"
                                className="hs-collapse-toggle size-8 flex justify-center items-center text-sm font-semibold rounded-full bg-neutral-800 text-white disabled:opacity-50 disabled:pointer-events-none"
                                id="hs-navbar-floating-dark-collapse"
                                aria-expanded="false"
                                aria-controls="hs-navbar-floating-dark"
                                aria-label="Toggle navigation"
                                data-hs-collapse="#hs-navbar-floating-dark"
                            >
                                <svg
                                    className="hs-collapse-open:hidden shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1={3} x2={21} y1={6} y2={6} />
                                    <line x1={3} x2={21} y1={12} y2={12} />
                                    <line x1={3} x2={21} y1={18} y2={18} />
                                </svg>
                                <svg
                                    className="hs-collapse-open:block hidden shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* Collapse */}
                    <div
                        id="hs-navbar-floating-dark"
                        className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
                        aria-labelledby="hs-navbar-floating-dark-collapse"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-end py-2 md:py-0 md:ps-7">
                            <Link
                                className="p-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300 focus:outline-none focus:text-neutral-300"
                                href="/"
                                aria-current="page"
                            >
                                Home
                            </Link>
                            <Link
                                className="p-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300 focus:outline-none focus:text-neutral-300"
                                href="/about"
                            >
                                About Us
                            </Link>
                            <Link
                                className="p-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300 focus:outline-none focus:text-neutral-300"
                                href="/contact"
                            >
                                Contact Us
                            </Link>
                            <div>
                                <Link
                                    className="group inline-flex items-center gap-x-2 py-2 px-3  font-medium text-sm text-[#ff0000] rounded-full focus:outline-none"
                                    href="/login"
                                >
                                    Login
                                </Link>
                            </div>
                            <div>
                                <Link
                                    className="bg-[#ff0000] group inline-flex items-center gap-x-2 py-2 px-3 font-medium text-sm text-white rounded-full focus:outline-none"
                                    href="/sign-up"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* End Collapse */}
                </nav>
            </header>
            {/* ========== END HEADER ========== */}
        </div>
    )
}

export default Navbar