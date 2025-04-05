'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { auth, db } from '@/firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: '#fddede' }}>
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fddede' }}>
  <div className="rounded-2xl shadow-xl flex flex-col max-w-4xl w-full p-6 gap-4" style={{ backgroundColor: '#fff5f7' }}>
    <h1 className="text-3xl font-bold text-center text-black">Welcome, {businessDetails.name}</h1>

    <div className="flex justify-between gap-6">
      {/* Business Details Card */}
      <div className="bg-white p-4 rounded-xl shadow w-1/2 flex flex-col justify-between h-full">
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3 text-black"
              placeholder="Business Name"
            />
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3 text-black"
              placeholder="Category"
            />
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3 text-black"
              placeholder="Location"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3 text-black"
              placeholder="Description"
            ></textarea>
            <button
              onClick={handleUpdate}
              className="text-white py-2 px-4 rounded w-full mb-2"
              style={{ backgroundColor: '#520606' }}
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
            <p className="text-lg text-black mb-2">Category: {businessDetails.category}</p>
            <p className="text-lg text-black mb-2">Location: {businessDetails.location}</p>
            <p className="text-lg text-black mb-4">Description: {businessDetails.description}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-white py-2 px-4 rounded-lg w-full"
              style={{ backgroundColor: '#520606' }}
            >
              Edit Business Details
            </button>
          </>
        )}
      </div>

      {/* AI Counselor Card */}
      <div className="bg-white p-4 shadow text-center h-full flex flex-col justify-between w-1/2">
        {/* Full-width image above the button */}
        <img 
          src="/images/ai-counselor.png" 
          alt="AI Counselor" 
          className="w-full object-cover h-48 rounded-t-xl mb-4" 
        />
        <h2 className="text-xl font-semibold text-black mb-2">Consult with AI Counselor</h2>
        <p className="text-gray-600 mb-4">Get personalized business guidance using our smart AI assistant.</p>
        <button
          onClick={() => router.push('/dashboard/counselor')}
          className="text-white py-2 px-4 rounded-lg w-full"
          style={{ backgroundColor: '#520606' }}
        >
          Access AI Counselor
        </button>
      </div>

    </div>
  </div>
</div>
<Footer/>
</>
  );
};

export default Dashboard;
