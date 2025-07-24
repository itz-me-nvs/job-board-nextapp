'use client'

import { useAuth } from '@/context/authContext'

export default function Header() {
  const { dispatch } = useAuth()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    dispatch({ type: 'LOGOUT' })

    // Redirect to login page
    window.location.href = '/login'
  }

  return (
    <header className="w-full bg-black border-b border-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-sm">
      <h1 className="text-xl font-semibold tracking-wide">Mini Job Board</h1>
      <button
        onClick={() => handleLogout()}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
      >
        Logout
      </button>
    </header>
  )
}
