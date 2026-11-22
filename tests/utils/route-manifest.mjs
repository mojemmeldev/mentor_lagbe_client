/**
 * route-manifest.mjs
 * Route catalog and metadata helper for MentorLagbe E2E test suite.
 * Maps all App Router routes across public, auth, utility, and dashboard domains.
 */

export const ROUTE_DOMAINS = {
  PUBLIC: 'public',
  AUTH: 'auth',
  UTILITY: 'utility',
  DASHBOARD_STUDENT: 'student',
  DASHBOARD_TUTOR: 'tutor',
  DASHBOARD_ADMIN: 'admin',
  DASHBOARD_UNIVERSAL: 'universal',
};

export const ALL_ROUTES = [
  // Public Discovery Routes
  { path: '/', file: 'src/app/page.tsx', domain: ROUTE_DOMAINS.PUBLIC, protected: false, title: 'Home' },
  { path: '/tuitions', file: 'src/app/tuitions/page.tsx', domain: ROUTE_DOMAINS.PUBLIC, protected: false, title: 'Browse Tuitions' },
  { path: '/tuitions/[id]', file: 'src/app/tuitions/[id]/page.tsx', domain: ROUTE_DOMAINS.PUBLIC, protected: false, dynamic: true, title: 'Tuition Details' },
  { path: '/tutors', file: 'src/app/tutors/page.tsx', domain: ROUTE_DOMAINS.PUBLIC, protected: false, title: 'Top Educators Directory' },
  { path: '/tutors/[id]', file: 'src/app/tutors/[id]/page.tsx', domain: ROUTE_DOMAINS.PUBLIC, protected: false, dynamic: true, title: 'Tutor Public Profile' },
  { path: '/become-a-tutor', file: 'src/app/become-a-tutor/page.tsx', domain: ROUTE_DOMAINS.PUBLIC, protected: false, title: 'Become a Tutor' },
  { path: '/how-it-works', file: 'src/app/how-it-works/page.tsx', domain: ROUTE_DOMAINS.PUBLIC, protected: false, title: 'How It Works' },
  { path: '/contact', file: 'src/app/contact/page.tsx', domain: ROUTE_DOMAINS.PUBLIC, protected: false, title: 'Contact Support' },
  { path: '/pricing', file: 'src/app/pricing/page.tsx', domain: ROUTE_DOMAINS.PUBLIC, protected: false, title: 'Pricing & Pro Upgrade' },

  // Auth & Commerce Routes
  { path: '/sign-in', file: 'src/app/sign-in/page.tsx', domain: ROUTE_DOMAINS.AUTH, protected: false, title: 'Sign In' },
  { path: '/sign-up', file: 'src/app/sign-up/page.tsx', domain: ROUTE_DOMAINS.AUTH, protected: false, title: 'Sign Up' },
  { path: '/payment/success', file: 'src/app/payment/success/page.tsx', domain: ROUTE_DOMAINS.AUTH, protected: false, title: 'Payment Success' },
  { path: '/payment/cancel', file: 'src/app/payment/cancel/page.tsx', domain: ROUTE_DOMAINS.AUTH, protected: false, title: 'Payment Cancelled' },

  // System Utility Routes
  { path: '/_not-found', file: 'src/app/not-found.tsx', domain: ROUTE_DOMAINS.UTILITY, protected: false, title: '404 Not Found' },
  { path: '/error', file: 'src/app/error.tsx', domain: ROUTE_DOMAINS.UTILITY, protected: false, title: 'Error Boundary' },

  // Dashboard Shell & Role Portals
  { path: '/dashboard/layout', file: 'src/app/dashboard/layout.tsx', domain: ROUTE_DOMAINS.DASHBOARD_UNIVERSAL, protected: true, title: 'Dashboard Shell' },
  { path: '/dashboard/profile', file: 'src/app/dashboard/profile/page.tsx', domain: ROUTE_DOMAINS.DASHBOARD_UNIVERSAL, protected: true, title: 'Profile Settings' },

  // Student Dashboard
  { path: '/dashboard/student', file: 'src/app/dashboard/student/page.tsx', domain: ROUTE_DOMAINS.DASHBOARD_STUDENT, protected: true, role: 'student', title: 'Student Overview' },
  { path: '/dashboard/student/my-applications', file: 'src/app/dashboard/student/my-applications/page.tsx', domain: ROUTE_DOMAINS.DASHBOARD_STUDENT, protected: true, role: 'student', title: 'My Applications' },
  { path: '/dashboard/student/saved-tuitions', file: 'src/app/dashboard/student/saved-tuitions/page.tsx', domain: ROUTE_DOMAINS.DASHBOARD_STUDENT, protected: true, role: 'student', title: 'Saved Tuitions' },

  // Tutor Dashboard
  { path: '/dashboard/tutor', file: 'src/app/dashboard/tutor/page.tsx', domain: ROUTE_DOMAINS.DASHBOARD_TUTOR, protected: true, role: 'tutor', title: 'Tutor Overview' },
  { path: '/dashboard/tutor/post-tuition', file: 'src/app/dashboard/tutor/post-tuition/page.tsx', domain: ROUTE_DOMAINS.DASHBOARD_TUTOR, protected: true, role: 'tutor', title: 'Post Tuition' },
  { path: '/dashboard/tutor/my-tuitions', file: 'src/app/dashboard/tutor/my-tuitions/page.tsx', domain: ROUTE_DOMAINS.DASHBOARD_TUTOR, protected: true, role: 'tutor', title: 'My Tuitions' },
  { path: '/dashboard/tutor/applicants', file: 'src/app/dashboard/tutor/applicants/page.tsx', domain: ROUTE_DOMAINS.DASHBOARD_TUTOR, protected: true, role: 'tutor', title: 'Manage Applicants' },

  // Admin Dashboard
  { path: '/dashboard/admin', file: 'src/app/dashboard/admin/page.tsx', domain: ROUTE_DOMAINS.DASHBOARD_ADMIN, protected: true, role: 'admin', title: 'Admin Overview' },
  { path: '/dashboard/admin/users', file: 'src/app/dashboard/admin/users/page.tsx', domain: ROUTE_DOMAINS.DASHBOARD_ADMIN, protected: true, role: 'admin', title: 'User Management' },
  { path: '/dashboard/admin/tuitions', file: 'src/app/dashboard/admin/tuitions/page.tsx', domain: ROUTE_DOMAINS.DASHBOARD_ADMIN, protected: true, role: 'admin', title: 'Tuition Moderation' },
  { path: '/dashboard/admin/transactions', file: 'src/app/dashboard/admin/transactions/page.tsx', domain: ROUTE_DOMAINS.DASHBOARD_ADMIN, protected: true, role: 'admin', title: 'Stripe Ledger' },
];

export const PUBLIC_ROUTES = ALL_ROUTES.filter((r) => r.domain === ROUTE_DOMAINS.PUBLIC);
export const AUTH_ROUTES = ALL_ROUTES.filter((r) => r.domain === ROUTE_DOMAINS.AUTH);
export const DASHBOARD_ROUTES = ALL_ROUTES.filter((r) => r.domain.startsWith('dashboard') || r.protected);
export const UTILITY_ROUTES = ALL_ROUTES.filter((r) => r.domain === ROUTE_DOMAINS.UTILITY);

export function getRouteByPath(routePath) {
  return ALL_ROUTES.find((r) => r.path === routePath);
}

export function isProtectedRoute(routePath) {
  const route = getRouteByPath(routePath);
  return route ? route.protected : routePath.startsWith('/dashboard');
}

export function getRequiredRole(routePath) {
  const route = getRouteByPath(routePath);
  return route?.role || null;
}

export default {
  ALL_ROUTES,
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  DASHBOARD_ROUTES,
  UTILITY_ROUTES,
  getRouteByPath,
  isProtectedRoute,
  getRequiredRole,
};
