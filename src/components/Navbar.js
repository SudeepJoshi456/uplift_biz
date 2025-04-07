'use client';

import Link from "next/link";
import { Store } from "lucide-react";
import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebase"; // Import your Firebase auth instance
import { signOut } from "firebase/auth"; // Import signOut function from Firebase
import { useRouter } from 'next/navigation'



export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push('/home')
      setIsLoggedIn(false); // Update the state
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
          {/* Show Business SignUp only if user is not logged in */}
          {!isLoggedIn ? (
            <Link href="/signup">
              <button className="ml-4 flex items-center gap-2 bg-transparent hover:bg-white/10 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105">
                <Store className="w-5 h-5" />
                <span>Business SignUp</span>
              </button>
            </Link>
          ) : (
            <>
              {/* Show Dashboard button if user is logged in */}
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
              >
                Dashboard
              </Link>
              {/* Show Logout button if user is logged in */}
              <button
                onClick={handleLogout}
                className="ml-4 text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
