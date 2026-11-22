/**
 * dom-inspector.mjs
 * Zero-overhead inspector for HTML, JSX/TSX source, and compiled CSS tokens.
 */

/**
 * Creates an inspector wrapper around an HTML string.
 */
export function inspectHtml(htmlString) {
  const content = String(htmlString || '');

  return {
    raw: content,

    /**
     * Checks if exact or normalized text exists in the HTML
     */
    hasText(text) {
      if (!text) return false;
      const cleanTarget = String(text).replace(/\s+/g, ' ').trim();
      const cleanContent = content.replace(/\s+/g, ' ');
      return cleanContent.includes(cleanTarget);
    },

    /**
     * Checks if a class is present in class or className attributes
     */
    hasClass(className) {
      const regex = new RegExp(`class(?:Name)?="[^"]*\\b${escapeRegExp(className)}\\b[^"]*"`, 'i');
      return regex.test(content);
    },

    /**
     * Checks if an HTML tag exists, optionally matching attribute substrings
     */
    hasTag(tagName, attributeSubstring = null) {
      if (!attributeSubstring) {
        const regex = new RegExp(`<${tagName}\\b[^>]*>`, 'i');
        return regex.test(content);
      }
      const regex = new RegExp(`<${tagName}\\b[^>]*${escapeRegExp(attributeSubstring)}[^>]*>`, 'i');
      return regex.test(content);
    },

    /**
     * Checks for a regex pattern match
     */
    matches(pattern) {
      const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, 'i');
      return regex.test(content);
    },

    /**
     * Extracts text content inside heading tags (h1-h6)
     */
    extractHeadings() {
      const headings = [];
      const regex = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const level = parseInt(match[1], 10);
        const text = match[2].replace(/<[^>]+>/g, '').trim();
        headings.push({ level, text });
      }
      return headings;
    },

    /**
     * Extracts all href attributes
     */
    extractLinks() {
      const links = [];
      const regex = /href="([^"]+)"/gi;
      let match;
      while ((match = regex.exec(content)) !== null) {
        links.push(match[1]);
      }
      return links;
    },
  };
}

/**
 * Creates an inspector wrapper around TSX/JSX source code.
 */
export function inspectSource(sourceString) {
  const code = String(sourceString || '');

  return {
    raw: code,

    /**
     * Checks if a module is imported
     */
    hasImport(moduleName, importedItem = null) {
      if (!importedItem) {
        const regex = new RegExp(`from\\s+['"]${escapeRegExp(moduleName)}['"]`, 'i');
        return regex.test(code);
      }
      const regex = new RegExp(
        `import\\s+[^'"]*\\b${escapeRegExp(importedItem)}\\b[^'"]*\\s+from\\s+['"]${escapeRegExp(moduleName)}['"]`,
        'i'
      );
      return regex.test(code);
    },

    /**
     * Checks if a string token or identifier exists
     */
    hasToken(token) {
      return code.includes(token);
    },

    /**
     * Checks if a regex pattern matches
     */
    matches(pattern) {
      const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);
      return regex.test(code);
    },

    /**
     * Checks if an API endpoint is referenced (e.g. '/tuitions', '/auth/profile')
     */
    callsEndpoint(endpoint) {
      const regex = new RegExp(`['"\`]${escapeRegExp(endpoint)}['"\`]`, 'i');
      return regex.test(code);
    },

    /**
     * Checks if a form input with given name or id attribute exists
     */
    hasInput(nameOrId) {
      const regex = new RegExp(
        `(name|id|htmlFor)=['"]${escapeRegExp(nameOrId)}['"]`,
        'i'
      );
      return regex.test(code);
    },

    /**
     * Checks if a role check or route guard is performed
     */
    hasRoleGuard(roleName) {
      const regex = new RegExp(`(role|user\\.role)\\s*===?\\s*['"]${escapeRegExp(roleName)}['"]`, 'i');
      return regex.test(code);
    },
  };
}

/**
 * Creates an inspector wrapper around CSS source or compiled CSS.
 */
export function inspectCss(cssString) {
  const css = String(cssString || '');

  return {
    raw: css,

    /**
     * Checks if a CSS variable name is declared
     */
    hasVariable(varName) {
      const regex = new RegExp(`--${escapeRegExp(varName.replace(/^--/, ''))}\\s*:`, 'i');
      return regex.test(css);
    },

    /**
     * Checks if a color value (HEX, HSL, or RGB) is present
     */
    hasColor(colorValue) {
      return css.toLowerCase().includes(colorValue.toLowerCase());
    },

    /**
     * Checks if a class or utility rule exists in compiled or source CSS
     */
    hasRule(selectorPart) {
      const regex = new RegExp(`${escapeRegExp(selectorPart)}`, 'i');
      return regex.test(css);
    },
  };
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default {
  inspectHtml,
  inspectSource,
  inspectCss,
};
