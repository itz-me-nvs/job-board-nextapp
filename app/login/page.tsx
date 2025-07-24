'use client'

import Loader from '@/components/loader'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const { dispatch } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return alert('Please enter credentials.')

    setLoading(true)
    localStorage.setItem('token', 'mock-jwt-token')
    localStorage.setItem('currentUser', email)

    setTimeout(() => {
      dispatch({ type: 'LOGIN', payload: email })
      setLoading(false)
      router.push('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 rounded-lg shadow-lg bg-white text-black"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          className="w-full mb-4 px-3 py-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full mb-4 px-3 py-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {loading ? <Loader /> : (
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Login
          </button>
        )}
      </form>
    </div>
  )
}
