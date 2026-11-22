/**
 * build-helper.mjs
 * Utilities to inspect Next.js build artifacts (.next/) and source files (src/).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root is `MentorLagbe` (parent of `tests`)
export const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
export const WORKSPACE_ROOT = path.resolve(PROJECT_ROOT, '..');
export const NEXT_DIR = path.join(PROJECT_ROOT, '.next');
export const SRC_DIR = path.join(PROJECT_ROOT, 'src');

/**
 * Checks if Next.js build artifacts exist (.next/app-path-routes-manifest.json)
 */
export function hasBuildArtifacts() {
  const manifestPath = path.join(NEXT_DIR, 'app-path-routes-manifest.json');
  return fs.existsSync(manifestPath);
}

/**
 * Reads and returns the app-path-routes-manifest.json parsed object
 */
export function getAppRoutesManifest() {
  const manifestPath = path.join(NEXT_DIR, 'app-path-routes-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    return null;
  }
  const content = fs.readFileSync(manifestPath, 'utf8');
  return JSON.parse(content);
}

/**
 * Retrieves compiled CSS content from .next/static/css/*.css
 */
export function getStaticCss() {
  const cssDir = path.join(NEXT_DIR, 'static', 'css');
  if (!fs.existsSync(cssDir)) {
    return '';
  }
  const files = fs.readdirSync(cssDir).filter((f) => f.endsWith('.css'));
  return files.map((f) => fs.readFileSync(path.join(cssDir, f), 'utf8')).join('\n');
}

/**
 * Retrieves prerendered HTML content for a given route (e.g. '/' -> index.html, '/tuitions' -> tuitions.html)
 */
export function getPrerenderHtml(routePath) {
  const serverAppDir = path.join(NEXT_DIR, 'server', 'app');
  if (!fs.existsSync(serverAppDir)) {
    return null;
  }

  let targetFile;
  if (routePath === '/' || routePath === '') {
    targetFile = path.join(serverAppDir, 'index.html');
  } else {
    // Normalise leading slash
    const cleanPath = routePath.replace(/^\//, '');
    const candidate1 = path.join(serverAppDir, `${cleanPath}.html`);
    const candidate2 = path.join(serverAppDir, cleanPath, 'index.html');
    if (fs.existsSync(candidate1)) {
      targetFile = candidate1;
    } else if (fs.existsSync(candidate2)) {
      targetFile = candidate2;
    }
  }

  if (targetFile && fs.existsSync(targetFile)) {
    return fs.readFileSync(targetFile, 'utf8');
  }
  return null;
}

/**
 * Reads any source file relative to `MentorLagbe`
 */
export function readSource(relativePath) {
  const fullPath = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(PROJECT_ROOT, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Source file not found: ${fullPath}`);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

/**
 * Reads the reference design HTML file from workspace root
 */
export function readRefDesignHtml() {
  const candidate1 = path.join(WORKSPACE_ROOT, 'mentorlagbe_teacher_student_mentorship_hub (1).html');
  const candidate2 = path.join(WORKSPACE_ROOT, 'mentorlagbe_teacher_student_mentorship_hub.html');
  const target = fs.existsSync(candidate1) ? candidate1 : candidate2;
  if (!fs.existsSync(target)) {
    throw new Error(`Reference HTML design file not found at: ${target}`);
  }
  return fs.readFileSync(target, 'utf8');
}

export default {
  PROJECT_ROOT,
  WORKSPACE_ROOT,
  NEXT_DIR,
  SRC_DIR,
  hasBuildArtifacts,
  getAppRoutesManifest,
  getStaticCss,
  getPrerenderHtml,
  readSource,
  readRefDesignHtml,
};
