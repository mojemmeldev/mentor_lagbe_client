/**
 * tokens-layout.test.mjs
 * Tier 1: Feature Coverage — Groups 1.1 & 1.2
 * Tests T1-TOK-01 through T1-TOK-05, T1-LAY-01 through T1-LAY-05
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource, getStaticCss } from '../utils/build-helper.mjs';
import { inspectSource, inspectCss } from '../utils/dom-inspector.mjs';

describe('Tier 1: Design Tokens, Typography & Layout Shell', () => {
  // T1-TOK-01: Warm Editorial Color Palette
  it('T1-TOK-01: should define warm editorial palette variables and theme colors', () => {
    const globalsCss = readSource('src/app/globals.css');
    const tailwindConfig = readSource('tailwind.config.ts');
    const cssInspector = inspectCss(globalsCss);
    const configInspector = inspectSource(tailwindConfig);

    // Light mode palette: Cream #FAF8F5, Forest #0F2922, Terracotta #E05A47, Amberwarm #F59E0B
    assert.ok(
      cssInspector.hasColor('#FAF8F5'),
      'globals.css must define cream background (#FAF8F5)'
    );
    assert.ok(
      cssInspector.hasColor('#0F2922'),
      'globals.css must define primary forest 900 text/color (#0F2922)'
    );
    assert.ok(
      cssInspector.hasColor('#E05A47'),
      'globals.css must define accent terracotta 500 (#E05A47)'
    );

    // Dark mode palette: Dark primary #081612, Dark surface #0F241E
    assert.ok(
      cssInspector.hasColor('#081612'),
      'globals.css must define dark mode background (#081612)'
    );
    assert.ok(
      cssInspector.hasColor('#0F241E'),
      'globals.css must define dark mode surface card (#0F241E)'
    );

    // tailwind.config.ts color extensions
    assert.ok(configInspector.hasToken('cream: \'#FAF8F5\'') || configInspector.hasToken('cream: "#FAF8F5"'),
      'tailwind.config.ts must declare cream color token');
    assert.ok(configInspector.hasToken('900: \'#0F2922\'') || configInspector.hasToken('900: "#0F2922"'),
      'tailwind.config.ts must declare forest 900 color token');
    assert.ok(configInspector.hasToken('500: \'#E05A47\'') || configInspector.hasToken('500: "#E05A47"'),
      'tailwind.config.ts must declare terracotta 500 color token');
    assert.ok(configInspector.hasToken('500: \'#F59E0B\'') || configInspector.hasToken('500: "#F59E0B"'),
      'tailwind.config.ts must declare amberwarm 500 color token');
  });

  // T1-TOK-02: Typography Fonts
  it('T1-TOK-02: should load and map Fraunces and Plus Jakarta Sans font families', () => {
    const layoutSource = readSource('src/app/layout.tsx');
    const tailwindConfig = readSource('tailwind.config.ts');
    const layoutInspector = inspectSource(layoutSource);
    const configInspector = inspectSource(tailwindConfig);

    // Root layout loads Fraunces and Plus_Jakarta_Sans
    assert.ok(
      layoutInspector.hasImport('next/font/google', 'Fraunces'),
      'layout.tsx must import Fraunces from next/font/google'
    );
    assert.ok(
      layoutInspector.hasImport('next/font/google', 'Plus_Jakarta_Sans'),
      'layout.tsx must import Plus_Jakarta_Sans from next/font/google'
    );
    assert.ok(
      layoutInspector.hasToken('--font-fraunces'),
      'layout.tsx must bind Fraunces to --font-fraunces variable'
    );
    assert.ok(
      layoutInspector.hasToken('--font-plus-jakarta'),
      'layout.tsx must bind Plus Jakarta Sans to --font-plus-jakarta variable'
    );

    // tailwind.config.ts maps font families
    assert.ok(
      configInspector.hasToken('var(--font-fraunces)'),
      'tailwind.config.ts must map serif to var(--font-fraunces)'
    );
    assert.ok(
      configInspector.hasToken('var(--font-plus-jakarta)'),
      'tailwind.config.ts must map sans to var(--font-plus-jakarta)'
    );
  });

  // T1-TOK-03: Button Component Variants
  it('T1-TOK-03: should provide Button primitive with terracotta, neo, pill radii and glow shadow', () => {
    const buttonSource = readSource('src/components/ui/button.tsx');
    const inspector = inspectSource(buttonSource);

    assert.ok(inspector.hasToken('terracotta:'), 'Button must declare terracotta variant');
    assert.ok(inspector.hasToken('shadow-glow'), 'Terracotta button variant must declare shadow-glow');
    assert.ok(inspector.hasToken('rounded-full'), 'Button sizes must support rounded-full pill shape');
    assert.ok(inspector.hasToken('secondary:'), 'Button must declare secondary variant');
    assert.ok(inspector.hasToken('neo:'), 'Button must declare neo variant');
    assert.ok(inspector.hasToken('outline:'), 'Button must declare outline variant');
    assert.ok(inspector.hasToken('ghost:'), 'Button must declare ghost variant');
  });

  // T1-TOK-04: Card Component & Shadows
  it('T1-TOK-04: should provide Card primitive with rounded-3xl and editorial shadow tokens', () => {
    const cardSource = readSource('src/components/ui/card.tsx');
    const tailwindConfig = readSource('tailwind.config.ts');
    const cardInspector = inspectSource(cardSource);
    const configInspector = inspectSource(tailwindConfig);

    assert.ok(cardInspector.hasToken('rounded-3xl'), 'Card must have rounded-3xl class');
    assert.ok(cardInspector.hasToken('shadow-card'), 'Card must have shadow-card class');
    assert.ok(configInspector.hasToken('shadow-card') || configInspector.hasToken('card: \'0 4px 20px -2px rgba(15, 41, 34, 0.05)\''),
      'tailwind.config.ts must define card shadow token');
    assert.ok(configInspector.hasToken('shadow-soft') || configInspector.hasToken('soft: \'0 10px 40px -10px rgba(15, 41, 34, 0.08)\''),
      'tailwind.config.ts must define soft shadow token');
  });

  // T1-TOK-05: Badge Component Variants
  it('T1-TOK-05: should provide Badge primitive with pro (amberwarm), terracotta, and success variants', () => {
    const badgeSource = readSource('src/components/ui/badge.tsx');
    const inspector = inspectSource(badgeSource);

    assert.ok(inspector.hasToken('pro:'), 'Badge must define pro variant');
    assert.ok(inspector.hasToken('amberwarm'), 'Pro badge must use amberwarm color token');
    assert.ok(inspector.hasToken('terracotta:'), 'Badge must define terracotta variant');
    assert.ok(inspector.hasToken('success:'), 'Badge must define success variant');
    assert.ok(inspector.hasToken('rounded-full'), 'Badge must feature rounded-full pill geometry');
  });

  // T1-LAY-01: Clean Flat Navbar
  it('T1-LAY-01: should render clean flat navbar with links and auth CTAs', () => {
    const navbarSource = readSource('src/components/common/Navbar.tsx');
    const inspector = inspectSource(navbarSource);

    assert.ok(inspector.hasToken('backdrop-blur-md'), 'Navbar must feature subtle backdrop blur');
    assert.ok(inspector.hasToken('border-b'), 'Navbar must use a flat bar with a bottom border');
    assert.ok(inspector.hasToken('/tuitions'), 'Navbar must contain link to tuitions');
    assert.ok(inspector.hasToken('/pricing'), 'Navbar must contain link to pricing');
    assert.ok(inspector.hasToken('/sign-in') || inspector.hasToken('getDashboardLink'), 'Navbar must handle auth links');
  });

  // T1-LAY-02: Architectural Editorial Footer
  it('T1-LAY-02: should render architectural footer with giant watermark, 4 columns, and no Twitter bird', () => {
    const footerSource = readSource('src/components/common/Footer.tsx');
    const inspector = inspectSource(footerSource);

    assert.ok(
      inspector.hasToken('footer-watermark-text') || inspector.hasToken('MentorLagbe'),
      'Footer must render giant MentorLagbe watermark'
    );
    assert.ok(inspector.hasToken('bg-forest-900'), 'Footer must use deep forest-900 background');
    assert.ok(inspector.hasToken('handleSubscribe') || inspector.hasInput('email') || inspector.hasToken('Newsletter'),
      'Footer must include newsletter subscribe functionality');
    assert.ok(inspector.hasToken('/tuitions'), 'Footer must link to tuitions');
    assert.ok(
      !inspector.hasToken('data-lucide="twitter"') && !inspector.hasToken('Twitter'),
      'DO_NOT_BREAK: Legacy Twitter bird must be absent from footer'
    );
    assert.ok(
      inspector.hasToken('aria-label') && (inspector.hasToken('wa.me') || inspector.hasToken('MessageCircle') || inspector.hasToken('Globe')),
      'Footer must render modern accessible social & communication channels'
    );
  });

  // T1-LAY-03: Floating Orbital Theme Dock
  it('T1-LAY-03: should render OrbitalThemeDock with theme toggle, scroll progress, and scroll-to-top', () => {
    const dockSource = readSource('src/components/common/OrbitalThemeDock.tsx');
    const inspector = inspectSource(dockSource);

    assert.ok(inspector.hasImport('@/context/ThemeContext', 'useTheme'), 'ThemeDock must consume useTheme');
    assert.ok(inspector.hasToken('toggleTheme'), 'ThemeDock must provide toggleTheme trigger');
    assert.ok(inspector.hasToken('scrollProgress'), 'ThemeDock must calculate scrollProgress');
    assert.ok(inspector.hasToken('scrollToTop'), 'ThemeDock must provide scrollToTop action');
  });

  // T1-LAY-04: Responsive Mobile Drawer
  it('T1-LAY-04: should provide mobile drawer toggle and responsive navigation links', () => {
    const navbarSource = readSource('src/components/common/Navbar.tsx');
    const inspector = inspectSource(navbarSource);

    assert.ok(
      inspector.hasToken('mobileMenuOpen') || inspector.hasToken('setMobileMenuOpen'),
      'Navbar must maintain mobile menu open/closed state'
    );
    assert.ok(
      inspector.hasToken('Menu') && inspector.hasToken('X'),
      'Navbar must provide mobile menu hamburger and close icons'
    );
    assert.ok(
      inspector.hasToken('navLinks.map'),
      'Mobile drawer must map through navigation links'
    );
  });

  // T1-LAY-05: Conditional Footer Exclusion
  it('T1-LAY-05: should suppress footer on /dashboard routes to preserve SaaS shell height', () => {
    const conditionalFooterSource = readSource('src/components/common/ConditionalFooter.tsx');
    const inspector = inspectSource(conditionalFooterSource);

    assert.ok(
      inspector.hasImport('next/navigation', 'usePathname'),
      'ConditionalFooter must inspect usePathname'
    );
    assert.ok(
      inspector.hasToken('pathname.startsWith(\'/dashboard\')') ||
      inspector.hasToken('pathname?.startsWith(\'/dashboard\')'),
      'ConditionalFooter must check if pathname starts with /dashboard'
    );
    assert.ok(
      inspector.hasToken('return null;'),
      'ConditionalFooter must return null when on dashboard paths'
    );
  });
});
