'use client';

import Link from "next/link";
import { Store } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-transparent backdrop-blur-md shadow-2xl border-b border-white/10 p-4 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-300 transform hover:scale-105">
          UpliftBiz
        </h1>
        <div className="space-x-6 flex items-center">
          <Link
            href="/home"
            className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            Home
          </Link>
          <Link
            href="/categories"
            className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            About
          </Link>
          <Link href="/signup">
            <button className="ml-4 flex items-center gap-2 bg-transparent hover:bg-[#fff5f7] text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105">
              <Store className="w-5 h-5" />
              <span>Business SignUp</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
