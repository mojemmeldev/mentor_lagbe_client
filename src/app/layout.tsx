import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { HeroUIProviderWrapper } from '@/components/providers/HeroUIProviderWrapper';
import { Toaster } from 'sonner';
import Navbar from '@/components/common/Navbar';
import ConditionalFooter from '@/components/common/ConditionalFooter';
import OrbitalThemeDock from '@/components/common/OrbitalThemeDock';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MentorLagbe | Where Mentors & Students Connect',
  description:
    'Find verified tutors by subject, class level, and mode. Secure tuition booking, role-based dashboards, and interactive learning in Bangladesh.',
  icons: {
    icon: '/logo-icon-new.svg',
    shortcut: '/logo-icon-new.svg',
    apple: '/logo-icon-new.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${plusJakartaSans.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Zero White Flash / Anti-FOUC Blocking Theme Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('mentorlagbe_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col antialiased relative">
        <ThemeProvider>
          <HeroUIProviderWrapper>
            <AuthProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <ConditionalFooter />
              <OrbitalThemeDock />
              <Toaster richColors position="top-right" closeButton />
            </AuthProvider>
          </HeroUIProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
