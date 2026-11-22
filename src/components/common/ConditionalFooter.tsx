'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export const ConditionalFooter = () => {
  const pathname = usePathname();

  // Hide footer on all dashboard routes so the portal feels like a clean, full-height SaaS app
  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  return <Footer />;
};

export default ConditionalFooter;
