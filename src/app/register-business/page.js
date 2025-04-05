"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RegisterBusiness = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [businessData, setBusinessData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    image: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "businesses", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          router.push("/dashboard");
        }
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "businesses", user.uid);
      await setDoc(docRef, {
        ...businessData,
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
      });
      router.push("/dashboard");
    } catch (err) {
      console.error("Error registering business:", err);
    }
  };

  return (
            <>
            <Navbar/>
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fddede" }}>
      <div className="rounded-2xl shadow-xl flex max-w-4xl p-6" style={{ backgroundColor: "#fff5f7" }}>
        {/* Left Section */}
        <div className="w-1/2 flex flex-col items-center justify-center p-4 rounded-l-2xl">
          <img src="/images/register.png" alt="Business illustration" className="w-full max-w-xs" />
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-4 text-center text-black">Register Your Business</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Business Name"
              value={businessData.name}
              onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
              className="w-full p-2 border rounded text-black placeholder-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Category (e.g., Salon, Restaurant)"
              value={businessData.category}
              onChange={(e) => setBusinessData({ ...businessData, category: e.target.value })}
              className="w-full p-2 border rounded text-black placeholder-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Location (City, State)"
              value={businessData.location}
              onChange={(e) => setBusinessData({ ...businessData, location: e.target.value })}
              className="w-full p-2 border rounded text-black placeholder-gray-500"
              required
            />
            <textarea
              placeholder="Brief Description"
              value={businessData.description}
              onChange={(e) => setBusinessData({ ...businessData, description: e.target.value })}
              className="w-full p-2 border rounded text-black placeholder-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={businessData.image}
              onChange={(e) => setBusinessData({ ...businessData, image: e.target.value })}
              className="w-full p-2 border rounded text-black placeholder-gray-500"
            />
            <button
              type="submit"
              className="text-white px-4 py-2 rounded w-full"
              style={{ backgroundColor: "#520606" }}
            >
              Register Business
            </button>
          </form>
        </div>
      </div>
    </div>
        <Footer/>
        </>
  );
};

export default RegisterBusiness;
