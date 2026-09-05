# StudyZone

> A modern, peer-to-peer learning platform where students share, discover, and organize academic resources — beautifully.

StudyZone is a full-stack Next.js application built for students to seamlessly share lecture notes, academic guides, and learning materials. It features a premium dark-mode interface with glassmorphism design, secure authentication, interactive dashboards, and edge-based route protection via proxy middleware.

---

**Live Demo**: [https://study-zone-amber.vercel.app](https://study-zone-amber.vercel.app)

**Demo Credentials**: `demo@studyzone.dev` / `demo12345`

---

## Features

| Feature | Details |
|---|---|
| **Authentication** | Secure email/password login, registration, and session management via [Better Auth](https://better-auth.com/) with MongoDB adapter |
| **Route Protection** | Edge-based proxy middleware protects all `/dashboard` routes; unauthenticated users are redirected to `/login` with the original URL memorized (`callbackUrl`) |
| **Interactive Dashboard** | Contribution stats, category distribution, and community reach charts powered by [Recharts](https://recharts.org/) |
| **Resource Exploration** | Browse and search a curated catalog of study materials with category filters |
| **Resource Uploads** | Upload notes, guides, or links; assign metadata (title, subject, category) and publish instantly |
| **User Profiles** | Avatar initials, display name, and email shown across Navbar and Sidebar |
| **Premium Design** | Midnight obsidian dark theme (`#08090C`), glassmorphism surfaces, electric cerulean accents (`#0084FF`), smooth micro-animations |
| **Fully Responsive** | Mobile drawer navigation, responsive dashboard layout with collapsible sidebar |
| **Toast Notifications** | Instant feedback for all user actions via [React Hot Toast](https://react-hot-toast.com/) |

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.10 | App Router, SSR, routing, proxy middleware |
| [React](https://react.dev/) | 19.2.4 | UI library |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Utility-first styling |
| [HeroUI](https://heroui.com/) | v3 | Accessible component primitives |
| [Recharts](https://recharts.org/) | v3 | Dashboard data visualizations |
| [React Hot Toast](https://react-hot-toast.com/) | v2 | Toast notifications |

### Backend & Data
| Technology | Version | Purpose |
|---|---|---|
| [Better Auth](https://better-auth.com/) | v1.6 | Authentication engine (sessions, cookies, JWT) |
| [MongoDB](https://www.mongodb.com/) | v7 (driver) | Primary database for users & resources |

### Tooling
| Tool | Purpose |
|---|---|
| TypeScript 5 | Type safety across the entire codebase |
| ESLint 9 | Code quality and style enforcement |
| Turbopack | Fast Next.js build system (used in dev & production) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.x or later
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local MongoDB instance)

### 1. Clone the Repository

```bash
git clone https://github.com/yashakib-dev/study-zone
cd study-zone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Authentication 
# Generate a secure random string (e.g. openssl rand -hex 32)
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000

# Database 
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/studyZone

# Public API 
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **Note**: Never commit your `.env` file. It is already listed in `.gitignore`.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
study-zone/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/
│   │   │   └── auth/[...all]/        # Better Auth catch-all API handler
│   │   ├── about/                    # About page
│   │   ├── blog/                     # Blog page
│   │   ├── careers/                  # Careers page
│   │   ├── contact/                  # Contact page
│   │   ├── dashboard/
│   │   │   └── user/                 # Protected user dashboard
│   │   │       ├── add/              # Upload a new resource
│   │   │       ├── manage/           # Manage existing resources
│   │   │       └── page.tsx          # Dashboard overview & charts
│   │   ├── explore/                  # Public resource catalog
│   │   ├── login/                    # Login page (with callbackUrl support)
│   │   ├── register/                 # Registration page
│   │   ├── resource-details/[id]/    # Dynamic resource detail view
│   │   ├── layout.tsx                # Root layout (Navbar + Footer)
│   │   └── page.tsx                  # Homepage
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   │   └── Sidebar.tsx           # Collapsible dashboard sidebar
│   │   ├── homepage/
│   │   │   ├── Hero.tsx              # Landing hero with CTA buttons
│   │   │   ├── CallToAction.tsx      # Bottom CTA section
│   │   │   ├── FAQ.tsx               # Accordion FAQ section
│   │   │   ├── FeaturedResources.tsx # Highlighted resource cards
│   │   │   ├── FeaturesList.tsx      # Feature highlights grid
│   │   │   ├── RecentAuthors.tsx     # Community contributors
│   │   │   ├── StatisticsChart.tsx   # Platform stats visualization
│   │   │   └── Testimonials.tsx      # Student testimonials
│   │   └── shared/
│   │       ├── Navbar.tsx            # Floating glass navbar
│   │       └── Footer.tsx            # Site footer with links & socials
│   │
│   ├── context/                      # React Context providers
│   ├── lib/
│   │   ├── auth.ts                   # Better Auth server config (MongoDB adapter, JWT plugin)
│   │   └── auth-client.ts            # Better Auth client (useSession, signIn, signOut)
│   └── proxy.ts                      # Next.js edge proxy (route protection middleware)
│
├── public/                           # Static assets
├── .env                              # Environment variables (not committed)
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Scripts & dependencies
```

---

## Authentication & Middleware Flow

StudyZone uses [Better Auth](https://better-auth.com/) with a MongoDB adapter and JWT-based cookie caching.

### How Route Protection Works (`src/proxy.ts`)

```
User visits /dashboard/user/manage
        │
        ▼
   proxy.ts runs (edge)
        │
   getSessionCookie() ──── No cookie? ──▶ Redirect to /login?callbackUrl=/dashboard/user/manage
        │
   Cookie found?
        │
        ▼
   Allow through → Page renders
```

- **Protected routes**: All paths starting with `/dashboard`
- **Auth routes**: `/login` and `/register` — authenticated users are redirected away from these
- **callbackUrl**: When redirected to `/login`, the original URL is stored as `?callbackUrl=...`. After login, the user is sent exactly where they tried to go.

### Session Cookie

Better Auth stores a `better-auth.session_token` cookie after sign-in. The proxy reads this cookie using `getSessionCookie()` from `better-auth/cookies` — a zero-DB-roundtrip check that runs at the edge for maximum performance.

---

## Dashboard

The user dashboard (`/dashboard/user`) provides:

- **Overview stats** — total resources uploaded, total views, and community engagement
- **Category chart** — Recharts pie/bar chart showing resource distribution by subject
- **Resource management** — Add new resources (`/dashboard/user/add`) or edit/delete existing ones (`/dashboard/user/manage`)
- **User profile card** — Avatar with initials, display name, and email in the sidebar

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Canvas Background | `#08090C` / `#0A0B10` | Page background |
| Glass Surfaces | `rgba(18, 21, 28, 0.75)` + `backdrop-blur-xl` | Navbar, cards, modals |
| Subtle Borders | `rgba(255, 255, 255, 0.08)` | Card outlines, dividers |
| Primary Accent | `#0084FF` / `#0D99FF` | Buttons, active links, logo |
| Glow Effect | `rgba(13, 153, 255, 0.40)` | Button shadows, highlights |
| Active Indicator | `#10B981` | Live status dot |
| Warning / Stars | `#FBBF24` | Rating elements |
| Muted Text | `#9CA3AF` | Secondary labels, placeholders |

**Typography**: System font stack with `font-black` for headings and `tracking-tight` for logo text.

---

## Available Scripts

```bash
npm run dev      # Start development server (Turbopack, hot reload)
npm run build    # Create optimized production build
npm run start    # Start production server
npm run lint     # Run ESLint across the codebase
```

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow the existing code style and run `npm run lint` before submitting.


