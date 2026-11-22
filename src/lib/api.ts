import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const API_URL = API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('mentorlagbe_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Avoid redirecting on public pages
      const publicPaths = ['/', '/tuitions', '/tutors', '/become-a-tutor', '/how-it-works', '/contact', '/pricing', '/sign-in', '/sign-up'];
      if (!publicPaths.includes(window.location.pathname) && !window.location.pathname.startsWith('/tuitions/') && !window.location.pathname.startsWith('/tutors/')) {
        localStorage.removeItem('mentorlagbe_token');
        localStorage.removeItem('mentorlagbe_user');
        window.location.href = '/sign-in';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
