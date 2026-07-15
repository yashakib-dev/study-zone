# 🎓 StudyZone

StudyZone is a modern, collaborative platform built for students to seamlessly share, discover, and organize study materials, lecture notes, academic guides, and learning resources. Featuring a premium dark-mode interface, interactive dashboards, and secure authentication, StudyZone makes peer-to-peer knowledge sharing beautiful and efficient.

---

## Live Website URL: https://study-zone-amber.vercel.app

## Demo Credentials : Email [demo@studyzone.dev], Password [demo12345]

---
## ✨ Features

- **🔒 Secure Authentication**: Robust session management and email/password login powered by [Better Auth](https://better-auth.com/) using MongoDB adapter.
- **📊 Interactive User Dashboard**: Visualize your contribution statistics, category distributions, and community reach with beautiful animated charts built using [Recharts](https://recharts.org/).
- **📚 Resource Exploration**: Browse and search a curated list of study materials categorized for easy access.
- **📤 Easy Uploads**: Effortlessly upload study resources, assign metadata (title, category, author), and share them instantly.
- **💎 Premium Design System**: Crafted with Tailwind CSS v4 and HeroUI components, featuring rich gradients, glassmorphism, responsive grids, custom hover states, and smooth micro-animations.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [HeroUI](https://heroui.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Charts/Data Visualization**: [Recharts](https://recharts.org/)
- **State/Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18.x or later) and a running [MongoDB](https://www.mongodb.com/) database cluster.

### 1. Clone & Install Dependencies

```bash
# Navigate to project directory
cd study-zone

# Install packages
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory (or update the existing one) with the following values:

```env
# Authentication secret (Generate a secure random string)
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000

# Database connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/studyZone

# Backend API server URL
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📁 Directory Structure

```text
study-zone/
├── src/
│   ├── app/                # Next.js App Router (pages and API routes)
│   │   ├── api/            # API endpoints (including Better Auth handlers)
│   │   ├── dashboard/      # User dashboard pages and metrics
│   │   ├── explore/        # Resource catalog search and filters
│   │   ├── upload/         # Upload panel for adding new resources
│   │   └── ...             # Static pages (about, blog, contact)
│   ├── components/         # Reusable React UI Components
│   │   ├── dashboard/      # Dashboard components (Sidebar, etc.)
│   │   ├── homepage/       # Landing page sections (Hero, FAQ, Stats)
│   │   └── shared/         # Shared layouts (Navbar, Footer)
│   ├── context/            # React Context providers
│   ├── lib/                # Shared utilities & configurations (auth-client, db)
│   └── proxy.ts            # Route proxying & authentication middleware helpers
├── public/                 # Static assets (images, icons)
├── package.json            # Scripts & dependencies
└── tsconfig.json           # TypeScript configuration
```

---

## 📝 Scripts

- `npm run dev`: Runs the Next.js development server.
- `npm run build`: Builds the production-ready build of the application.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint to check for code quality and style guidelines.
