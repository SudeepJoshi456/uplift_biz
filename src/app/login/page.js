'use client';
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <div className="flex gap-4 mb-4">
        <button onClick={() => setRole('user')} className={`px-3 py-1 border ${role === 'user' && 'bg-gray-300'}`}>User</button>
        <button onClick={() => setRole('business')} className={`px-3 py-1 border ${role === 'business' && 'bg-gray-300'}`}>Business Owner</button>
      </div>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border w-full p-2 mb-2" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border w-full p-2 mb-2" />
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2">Login</button>
    </div>
  )
}
