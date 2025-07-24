# 🧑‍💼 Job Portal App (Frontend Task)

This is a frontend-only Job Portal built using **Next.js 14 App Router**, **Tailwind CSS**, and **Context API (with Reducer)** for authentication and state management. The application allows users to log in, post jobs, and view listings.

---

## 🚀 How to Run the Project

```bash
# 1. Clone the repository
git clone https://github.com/itz-me-nvs/job-board-nextapp.git

# 2. Navigate into the project directory
cd job-portal-app

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev

# 5. Open in browser
Visit http://localhost:3000



✅ Features

    Login page with email/password (mock auth)

    Dashboard with job posting modal

    View all jobs globally (unauthenticated)

    Context API with reducer to manage auth state

    Persisted user and jobs via localStorage

    Responsive, dark-themed UI using Tailwind CSS


📌 Assumptions

    This is a single-user mock app using localStorage for persistence.

    No backend integration; authentication and job data are stored locally.

    Each user's jobs are scoped to their email ID.

    Token is hardcoded and only used to simulate auth logic.

    Modal form submission simulates an API with a short loading delay.    


🔐 Demo Credentials

Email	Password
john@example.com	123456
(Any valid format)	(any)    