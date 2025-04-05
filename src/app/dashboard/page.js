'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { auth, db } from '@/firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [businessDetails, setBusinessDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', location: '', description: '' });
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
          const data = businessSnapshot.data();
          setBusinessDetails(data);
          setForm(data);
        } else {
          router.push('/register-business');
        }
      };

      fetchBusinessDetails();
    }
  }, [user, router, isClient]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const businessRef = doc(db, "businesses", user.uid);
      await updateDoc(businessRef, form);
      setBusinessDetails(form);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating business:", error);
    }
  };

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

        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-2"
              placeholder="Business Name"
            />
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-2"
              placeholder="Category"
            />
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-2"
              placeholder="Location"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              placeholder="Description"
            ></textarea>
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-700 mb-2"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-sm text-gray-500 underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-700 mb-2">Category: {businessDetails.category}</p>
            <p className="text-lg text-gray-700 mb-2">Location: {businessDetails.location}</p>
            <p className="text-lg text-gray-700 mb-4">Description: {businessDetails.description}</p>

            <button
              onClick={() => router.push('/dashboard/counselor')}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-200 mb-3"
            >
              Access AI Counselor
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg w-full hover:bg-yellow-600 transition duration-200"
            >
              Edit Business Details
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
