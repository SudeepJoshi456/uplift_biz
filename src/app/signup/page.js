'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user') // 'user' or 'business'
  const router = useRouter()

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password)
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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <div className="flex gap-4 mb-4">
        <button onClick={() => setRole('user')} className={`px-3 py-1 border ${role === 'user' && 'bg-gray-300'}`}>User</button>
        <button onClick={() => setRole('business')} className={`px-3 py-1 border ${role === 'business' && 'bg-gray-300'}`}>Business Owner</button>
      </div>

      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="border w-full p-2 mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="border w-full p-2 mb-4"
      />

      <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2 w-full">Sign Up</button>

      <p className="text-center text-sm mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 underline">Login here</Link>
      </p>
    </div>
  )
}
