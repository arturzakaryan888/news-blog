"use client";
import ThemeSwitch from "@/context/ThemeContext";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-lg px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link className="flex items-center" href={"/"}>
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              News Blog
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <div className="text-gray-800 dark:text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
