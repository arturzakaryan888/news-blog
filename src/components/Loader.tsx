"use client";
import { FaSpinner } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-blue-500 w-16 h-16" />
    </div>
  );
}
