'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { auth, db } from '@/firebase/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

const Dashboard = () => {
  const [businessDetails, setBusinessDetails] = useState(null);
  const [isClient, setIsClient] = useState(false); 
  const router = useRouter();  

  const user = auth.currentUser;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && user) {
      const fetchBusinessDetails = async () => {
        const businessRef = doc(db, "businesses", user.uid);
        const businessSnapshot = await getDoc(businessRef);
        
        if (businessSnapshot.exists()) {
          setBusinessDetails(businessSnapshot.data());
        } else {
          router.push('/register-business');
        }
      };

      fetchBusinessDetails();
    }
  }, [user, db, router, isClient]);

  if (!isClient || !businessDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Welcome to Your Dashboard, {businessDetails.name}
        </h1>
        <p className="text-lg text-gray-700 mb-2">Category: {businessDetails.category}</p>
        <p className="text-lg text-gray-700 mb-2">Location: {businessDetails.location}</p>
        <p className="text-lg text-gray-700 mb-4">Description: {businessDetails.description}</p>
        
        <button
          onClick={() => router.push('/dashboard/counselor')}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-200"
        >
          Access AI Counselor
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
