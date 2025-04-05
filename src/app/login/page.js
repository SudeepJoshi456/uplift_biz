'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF, FaApple } from 'react-icons/fa'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      if (role === 'user') {
        router.push('/home')
      } else {
        router.push('/register-business')
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fddede' }}>
      <div className="rounded-2xl shadow-xl flex max-w-4xl p-6" style={{ backgroundColor: '#fff5f7' }}>
        {/* Left Section */}
        <div className="w-1/2 flex flex-col items-center justify-center p-4 rounded-l-2xl">
          <img src="images/signup-image.png" alt="Cute mascot" className="w-full max-w-xs" />
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-6">
          <h2 className="text-3xl font-bold mb-4 text-center text-black">Login</h2>

          <div className="flex gap-4 mb-4 justify-center">
            <button onClick={() => setRole('user')} className={`px-4 py-2 rounded-full border text-black ${role === 'user' ? 'bg-gray-300' : ''}`}>User</button>
            <button onClick={() => setRole('business')} className={`px-4 py-2 rounded-full border text-black ${role === 'business' ? 'bg-gray-300' : ''}`}>Business Owner</button>
          </div>

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

          <button onClick={handleLogin} className="bg-pink-400 text-white px-4 py-2 rounded w-full">Login</button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">Or Continue With</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <button className="bg-white p-2 rounded-full shadow border"><FcGoogle size={20} /></button>
            <button className="bg-white p-2 rounded-full shadow border"><FaFacebookF size={20} /></button>
            <button className="bg-white p-2 rounded-full shadow border"><FaApple size={20} /></button>
          </div>

          <p className="text-center text-sm text-black">
            Don't have an account?{' '}
            <Link href="/signup" className="text-pink-600 underline">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
