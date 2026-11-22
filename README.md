# MentorLagbe

**MentorLagbe** is a tuition/mentor marketplace web application where students can discover verified tutors, browse tuition opportunities, apply to batches, and manage their learning journey. Tutors can publish tuition posts and manage applicants, while admins can moderate users, tuitions, and transactions.

## Live URL

- **Client Live Site:** [Add your deployed client URL here](https://your-live-site-url.com)
- **Server/API:** [Add your deployed server URL here](https://your-server-url.com)

> Replace the placeholder URLs before submission.

## Project Purpose

This project was built for **Assignment 9** to implement a modern tuition management/mentor-student connection platform with role-based dashboards, authentication, tuition browsing, application flow, and payment integration.

## Key Features

### Public Features
- **Responsive Navbar:** Sticky navigation with brand logo, Home, Browse Tuitions, Pricing/Pro Plans, How It Works/About, Sign In/Sign Up, and authenticated user dropdown.
- **Home Page:** Hero section with CTA to Browse Tuitions, featured tuitions, subjects/stats, how-it-works roadmap, pricing comparison, testimonials, and FAQ.
- **Browse Tuitions:** Search/filter tuition listings and view tuition cards with key details.
- **Tuition Details:** Detailed tuition page with tutor/info, requirements, schedule, and apply/review related actions.
- **Tutors:** Tutor listing and tutor profile pages.
- **Pricing:** Free vs Pro plan comparison with Stripe checkout flow.
- **Authentication:** Sign up and sign in with JWT-based authentication.
- **Payment Pages:** Payment success and cancel pages for Stripe flow.

### Student Dashboard
- **Overview:** Welcome banner, stats (Total Applied, Accepted, Pending Review, Current Plan), and quick actions.
- **My Applications:** Track application status, cancel pending applications, and submit review/rating for accepted applications.
- **Saved Tuitions:** Bookmark/save tuitions for quick access and remove bookmarks.

### Tutor Dashboard
- **Overview:** Tutor stats and dashboard summary.
- **Post a Tuition:** Create/post tuition opportunities.
- **My Created Tuitions:** Manage posted tuitions.
- **Manage Applicants:** Review and manage student applications.

### Admin Dashboard
- **Overview:** Admin summary metrics.
- **User Management:** Manage users/roles.
- **Tuition Moderation:** Review and moderate tuition posts.
- **Stripe Transactions:** View payment/transaction records.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, DaisyUI
- **UI/Animation:** Framer Motion, GSAP, Lucide React, Sonner
- **HTTP Client:** Axios
- **Auth:** JWT token-based auth (stored in localStorage)
- **Payment:** Stripe (`@stripe/stripe-js`)
- **Utilities:** date-fns, clsx, tailwind-merge, class-variance-authority

## NPM Packages Used

Main dependencies from `package.json`:

- `next`, `react`, `react-dom`
- `typescript`
- `tailwindcss`, `postcss`, `autoprefixer`, `daisyui`
- `axios`
- `framer-motion`, `gsap`
- `lucide-react`
- `sonner`
- `@stripe/stripe-js`
- `date-fns`
- `clsx`, `tailwind-merge`, `class-variance-authority`
- `@base-ui/react`, `@shadcn/react`, `@heroui/react` (UI ecosystem packages)

## Environment Variables

Create a `.env.local` file in the client root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> Use your deployed API URL in production.

## Getting Started (Local Setup)

1. **Clone the repository**
   ```bash
   git clone <your-client-repo-url>
   cd mentor_lagbe_client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add environment variables**
   - Create `.env.local`
   - Add `NEXT_PUBLIC_API_URL`

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```text
   http://localhost:3000
   ```

## Available Scripts

```bash
npm run dev     # Start development server
npm run build   # Create production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Important Routes

- `/` — Home
- `/tuitions` — Browse Tuitions
- `/tuitions/[id]` — Tuition Details
- `/tutors` — Tutors
- `/tutors/[id]` — Tutor Profile
- `/pricing` — Pricing / Pro Plans
- `/how-it-works` — How It Works
- `/become-a-tutor` — Become a Tutor
- `/contact` — Contact
- `/sign-in` — Sign In
- `/sign-up` — Sign Up
- `/dashboard/student` — Student Dashboard
- `/dashboard/tutor` — Tutor Dashboard
- `/dashboard/admin` — Admin Dashboard

## Deployment Notes

- Set `NEXT_PUBLIC_API_URL` to your deployed backend API.
- Ensure Stripe/payment backend endpoints are configured on the server.
- Add the final deployed live URL at the top of this README before submission.

## Author

- **Project:** MentorLagbe
- **Assignment:** Assignment 9
