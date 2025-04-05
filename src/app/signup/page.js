'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF, FaApple } from 'react-icons/fa'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('business')
  const router = useRouter()

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password)
      router.push('/register-business')
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
         <>
                    <Navbar/>
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fddede' }}>
      <div className="rounded-2xl shadow-xl flex max-w-4xl p-6" style={{ backgroundColor: '#fff5f7' }}>
        {/* Left Section */}
        <div className="w-1/2 flex flex-col items-center justify-center p-4 rounded-l-2xl">
          <img src="images/signup-image.png" alt="Cute mascot" className="w-full max-w-xs" />
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-6">
          <h2 className="text-3xl font-bold mb-4 text-center text-black">Sign Up</h2>

          {/* <div className="flex gap-4 mb-4 justify-center">
            <button onClick={() => setRole('user')} className={`px-4 py-2 rounded-full border text-black ${role === 'user' ? 'bg-gray-300' : ''}`}>User</button>
            <button onClick={() => setRole('business')} className={`px-4 py-2 rounded-full border text-black ${role === 'business' ? 'bg-gray-300' : ''}`}>Business Owner</button>
          </div> */}

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="border w-full p-2 mb-3 rounded text-black placeholder-gray-500"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="border w-full p-2 mb-3 rounded text-black placeholder-gray-500"
          />

        <button onClick={handleSignup} className="text-white px-4 py-2 rounded w-full" style={{ backgroundColor: "#520606" }}>Sign Up</button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">Or Continue With</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <button className="bg-white p-2 rounded-full shadow border"><FcGoogle size={20} /></button>
          </div>

          <p className="text-center text-sm text-black">
            Already have an account?{' '}
            <Link href="/login" className="underline" style={{ color: "#520606" }}>
  Login here
</Link>          </p>
        </div>
      </div>
    </div>
          <Footer/>
                </>
  )
}
