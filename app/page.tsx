'use client'

import { useEffect, useState } from 'react'

type Job = {
  id: string
  title: string
  company: string
  salary: string
  location: string
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]')
    setJobs(storedJobs)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">All Job Listings</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-400">No jobs found.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-800 text-white p-4 rounded-lg border border-gray-700 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-300">{job.company} • {job.location}</p>
              <p className="text-green-400 font-semibold mt-1">₹ {job.salary}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
