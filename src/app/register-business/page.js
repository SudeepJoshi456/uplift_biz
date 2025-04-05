'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const RegisterBusiness = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [businessData, setBusinessData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    image: ''
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, 'businesses', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // If business is already registered, redirect to dashboard
          router.push('/dashboard');
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, 'businesses', user.uid);
      await setDoc(docRef, {
        ...businessData,
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString()
      });

      router.push('/dashboard');
    } catch (err) {
      console.error('Error registering business:', err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register Your Business</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Business Name"
          value={businessData.name}
          onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Category (e.g., Salon, Restaurant)"
          value={businessData.category}
          onChange={(e) => setBusinessData({ ...businessData, category: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location (City, State)"
          value={businessData.location}
          onChange={(e) => setBusinessData({ ...businessData, location: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Brief Description"
          value={businessData.description}
          onChange={(e) => setBusinessData({ ...businessData, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={businessData.image}
          onChange={(e) => setBusinessData({ ...businessData, image: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Register Business
        </button>
      </form>
    </div>
  );
};

export default RegisterBusiness;
