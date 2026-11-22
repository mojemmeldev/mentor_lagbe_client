#!/usr/bin/env node
/**
 * runner.mjs
 * Master E2E Test Runner for MentorLagbe Production Frontend Redesign.
 * Zero-dependency native Node 22 test runner orchestrating Tiers 1-4.
 *
 * Usage:
 *   node tests/runner.mjs            # Runs all tiers (Tiers 1-4, 69 tests)
 *   node tests/runner.mjs --tier=1   # Runs Tier 1 only
 *   node tests/runner.mjs --tier=2   # Runs Tier 2 only
 *   node tests/runner.mjs --tier=3   # Runs Tier 3 only
 *   node tests/runner.mjs --tier=4   # Runs Tier 4 only
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { run } from 'node:test';
import { spec } from 'node:test/reporters';
import { hasBuildArtifacts, getAppRoutesManifest } from './utils/build-helper.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TESTS_ROOT = __dirname;

// ANSI Colors
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';
const BG_GREEN = '\x1b[42m\x1b[30m';
const BG_RED = '\x1b[41m\x1b[37m';

// Parse CLI Arguments
const args = process.argv.slice(2);
let tierFilter = null;
for (const arg of args) {
  if (arg.startsWith('--tier=')) {
    const rawTier = arg.split('=')[1];
    const parsed = parseInt(rawTier, 10);
    if (![1, 2, 3, 4].includes(parsed) || String(parsed) !== rawTier.trim()) {
      console.error(`\n${RED}Error: Invalid tier '${rawTier}'. Must be 1, 2, 3, or 4.${RESET}\n`);
      process.exit(1);
    }
    tierFilter = parsed;
  } else if (arg.startsWith('--tier')) {
    console.error(`\n${RED}Error: Invalid argument '${arg}'. Use --tier=1, --tier=2, --tier=3, or --tier=4.${RESET}\n`);
    process.exit(1);
  }
}

// Suite Configuration across all 4 Tiers
const TEST_SUITES = [
  // Tier 1: Feature Coverage (38 tests)
  {
    tier: 1,
    name: 'Tier 1: Feature Coverage',
    files: [
      path.join(TESTS_ROOT, 'tier1-features', 'tokens-layout.test.mjs'),
      path.join(TESTS_ROOT, 'tier1-features', 'home-sections.test.mjs'),
      path.join(TESTS_ROOT, 'tier1-features', 'public-routes.test.mjs'),
      path.join(TESTS_ROOT, 'tier1-features', 'auth-utility.test.mjs'),
      path.join(TESTS_ROOT, 'tier1-features', 'dashboard.test.mjs'),
    ],
    expectedCount: 38,
  },
  // Tier 2: Boundary & Corner Cases (20 tests)
  {
    tier: 2,
    name: 'Tier 2: Boundary & Corner Cases',
    files: [
      path.join(TESTS_ROOT, 'tier2-boundaries', 'empty-states.test.mjs'),
      path.join(TESTS_ROOT, 'tier2-boundaries', 'role-guards.test.mjs'),
      path.join(TESTS_ROOT, 'tier2-boundaries', 'data-limits.test.mjs'),
    ],
    expectedCount: 20,
  },
  // Tier 3: Cross-Feature Combinations (8 tests)
  {
    tier: 3,
    name: 'Tier 3: Cross-Feature Combinations',
    files: [
      path.join(TESTS_ROOT, 'tier3-combinations', 'theme-nav.test.mjs'),
      path.join(TESTS_ROOT, 'tier3-combinations', 'role-session.test.mjs'),
      path.join(TESTS_ROOT, 'tier3-combinations', 'filter-paging.test.mjs'),
    ],
    expectedCount: 8,
  },
  // Tier 4: Real-World Workloads (5 tests)
  {
    tier: 4,
    name: 'Tier 4: Real-World Application Workloads',
    files: [
      path.join(TESTS_ROOT, 'tier4-workloads', 'student-journey.test.mjs'),
      path.join(TESTS_ROOT, 'tier4-workloads', 'tutor-journey.test.mjs'),
      path.join(TESTS_ROOT, 'tier4-workloads', 'admin-journey.test.mjs'),
    ],
    expectedCount: 5,
  },
];

console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
console.log(`${BOLD}${CYAN}   MENTORLAGBE PRODUCTION FRONTEND REDESIGN — E2E TEST RUNNER           ${RESET}`);
console.log(`${DIM}   Runtime: Node.js ${process.version} | Framework: Native node:test & assert${RESET}`);
console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

// 1. Pre-flight Verification Check
console.log(`${BOLD}[1/2] Pre-flight Environment & Build Inspection:${RESET}`);
const buildReady = hasBuildArtifacts();
if (buildReady) {
  const manifest = getAppRoutesManifest();
  const routeCount = manifest ? Object.keys(manifest).length : 0;
  console.log(`  ${GREEN}✔${RESET} Next.js build artifacts detected in .next/`);
  console.log(`  ${GREEN}✔${RESET} Route manifest loaded: ${CYAN}${routeCount}${RESET} client routes registered`);
} else {
  console.log(`  ${YELLOW}⚠${RESET} Next.js build artifacts not found in .next/ (evaluating source contracts)`);
}

// Determine active files to run
const activeSuites = tierFilter
  ? TEST_SUITES.filter((s) => s.tier === tierFilter)
  : TEST_SUITES;

const activeFiles = activeSuites.flatMap((s) => s.files);

const totalExpected = TEST_SUITES.reduce((sum, s) => sum + s.expectedCount, 0);

console.log(`\n${BOLD}[2/2] Executing 4-Tier Opaque-Box Test Suite:${RESET}`);
if (tierFilter) {
  console.log(`  Filtering: Tier ${tierFilter} only (${activeFiles.length} test files)`);
} else {
  console.log(`  Running all 4 tiers (${activeFiles.length} test files, ${totalExpected} test cases)\n`);
}

// Track results
let passCount = 0;
let failCount = 0;
const tierResults = {
  1: { passed: 0, failed: 0 },
  2: { passed: 0, failed: 0 },
  3: { passed: 0, failed: 0 },
  4: { passed: 0, failed: 0 },
};

function determineTierFromFile(filePath) {
  if (filePath.includes('tier1-features')) return 1;
  if (filePath.includes('tier2-boundaries')) return 2;
  if (filePath.includes('tier3-combinations')) return 3;
  if (filePath.includes('tier4-workloads')) return 4;
  return 1;
}

const startTime = Date.now();
const testStream = run({ files: activeFiles });

testStream.on('test:pass', (t) => {
  // Only count leaf tests, not describe suites
  if (t.nesting > 0) {
    passCount++;
    const tNum = determineTierFromFile(t.file || '');
    if (tierResults[tNum]) {
      tierResults[tNum].passed++;
    }
  }
});

testStream.on('test:fail', (t) => {
  if (t.nesting > 0) {
    failCount++;
    const tNum = determineTierFromFile(t.file || '');
    if (tierResults[tNum]) {
      tierResults[tNum].failed++;
    }
  } else {
    // Top-level failure handling: syntax/import errors, missing module, uncaught exception, or root-level test failure
    if (t.details?.failureType !== 'subtestsFailed' && t.details?.error?.failureType !== 'subtestsFailed') {
      failCount++;
      const tNum = determineTierFromFile(t.file || t.name || '');
      if (tierResults[tNum]) {
        tierResults[tNum].failed++;
      }
    }
  }
});

// Stream colorized output via built-in spec reporter
testStream.compose(new spec()).pipe(process.stdout);

testStream.on('end', () => {
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
  console.log(`${BOLD}${CYAN}   E2E TEST EXECUTION SUMMARY REPORT                                    ${RESET}`);
  console.log(`${BOLD}${CYAN}========================================================================${RESET}`);

  activeSuites.forEach((s) => {
    const res = tierResults[s.tier];
    const total = res.passed + res.failed;
    const status = res.failed === 0 && res.passed >= s.expectedCount
      ? `${GREEN}PASS${RESET}`
      : res.failed > 0
      ? `${RED}FAIL${RESET}`
      : `${YELLOW}INCOMPLETE${RESET}`;

    console.log(`  ${BOLD}${s.name.padEnd(42)}${RESET}: ${String(res.passed).padStart(2)}/${s.expectedCount} passed [${status}]`);
  });

  console.log(`${DIM}------------------------------------------------------------------------${RESET}`);
  console.log(`  ${BOLD}Total Tests Run:${RESET}  ${passCount + failCount} test cases`);
  console.log(`  ${BOLD}Total Passed:${RESET}    ${GREEN}${passCount}${RESET}`);
  console.log(`  ${BOLD}Total Failed:${RESET}    ${failCount > 0 ? `${RED}${failCount}${RESET}` : `0`}`);
  console.log(`  ${BOLD}Execution Time:${RESET}  ${duration}s`);
  console.log(`${BOLD}${CYAN}========================================================================${RESET}`);

  const allSuitesPassed = activeSuites.length > 0 && activeSuites.every((s) => {
    const res = tierResults[s.tier];
    return res && res.failed === 0 && res.passed >= s.expectedCount;
  });

  if (allSuitesPassed && failCount === 0) {
    console.log(`\n  ${BG_GREEN} ALL TESTS PASSED (100% SPEC CONFORMANCE) ${RESET}\n`);
    process.exit(0);
  } else {
    console.log(`\n  ${BG_RED} TEST SUITE FAILED WITH ${failCount} FAILURES OR INCOMPLETE SUITES ${RESET}\n`);
    process.exit(1);
  }
});
