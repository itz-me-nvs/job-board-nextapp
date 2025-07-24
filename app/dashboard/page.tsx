'use client'

import Header from '@/components/header'
import Loader from '@/components/loader'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Job {
  id: string
  title: string
  description: string
  salary: number
  location: string
  email: string
  company: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { state } = useAuth()
  const { user, isAuthenticated, isInitialized } = state

  const [jobs, setJobs] = useState<Job[]>([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    salary: 0,
    location: '',
  })

  useEffect(() => {
    if (!isInitialized) return // wait for context to be initialized

    if (!isAuthenticated || !user) {
      router.push('/login')
      return
    }

    const allJobs: Job[] = JSON.parse(localStorage.getItem('jobs') || '[]')
    setJobs(allJobs.filter((job) => job.email === user))
  }, [showModal, isAuthenticated, user, isInitialized, router])

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    const newJob: Job = {
      id: uuidv4(),
      ...form,
      email: user,
      company: user.split('@')[0],
    }

    const allJobs: Job[] = JSON.parse(localStorage.getItem('jobs') || '[]')
    localStorage.setItem('jobs', JSON.stringify([...allJobs, newJob]))

    setTimeout(() => {
      setLoading(false)
      setShowModal(false)
      setForm({ title: '', description: '', salary: 0, location: '' })
      alert('Job posted successfully!')
    }, 1000)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen p-6 bg-black text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Jobs</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            + Post New Job
          </button>
        </div>

        {jobs.length === 0 ? (
          <p className="text-gray-400">No jobs posted yet.</p>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-800 text-white p-4 rounded border border-gray-700 hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-gray-300">
                  {job.location} | ₹ {job.salary}
                </p>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white w-full max-w-lg p-6 rounded-lg shadow-xl relative border border-gray-700">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-gray-400 hover:text-white text-2xl font-bold"
              >
                &times;
              </button>

              <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
              <form onSubmit={handlePostJob} className="space-y-4">
                <input
                  className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded placeholder-gray-400"
                  placeholder="Job Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
                <textarea
                  className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded placeholder-gray-400"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded placeholder-gray-400"
                  placeholder="Salary"
                  value={form.salary}
                  onChange={(e) =>
                    setForm({ ...form, salary: Number(e.target.value) })
                  }
                  required
                  min={1}
                />
                <input
                  className="w-full bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded placeholder-gray-400"
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  required
                />

                {loading ? (
                  <Loader />
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
                  >
                    Submit Job
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
