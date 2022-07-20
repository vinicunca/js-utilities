export function isUppercase(char = '') {
  return char.toUpperCase() === char;
}

const STR_SPLITTERS = ['-', '_', '/', '.'];

export function splitByCase(str: string, splitters = STR_SPLITTERS): string[] {
  const parts: string[] = [];

  if (!str || typeof str !== 'string') {
    return parts;
  }

  let buff = '';

  let previusUpper = null;
  let previousSplitter = null;

  for (const char of str.split('')) {
    // Splitter
    const isSplitter = splitters.includes(char);

    if (isSplitter === true) {
      parts.push(buff);
      buff = '';
      previusUpper = null;
      continue;
    }

    const isUpper = isUppercase(char);

    if (previousSplitter === false) {
      // Case rising edge
      if (previusUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previusUpper = isUpper;
        continue;
      }

      // Case falling edge
      if (previusUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff[buff.length - 1];
        parts.push(buff.substring(0, buff.length - 1));
        buff = lastChar + char;
        previusUpper = isUpper;
        continue;
      }
    }

    // Normal char
    buff += char;
    previusUpper = isUpper;
    previousSplitter = isSplitter;
  }

  parts.push(buff);

  return parts;
}

export function toUpperFirst(str: string): string {
  if (!str) {
    return '';
  }

  return str[0].toUpperCase() + str.substring(1);
}

export function toLowerFirst(str: string): string {
  if (!str) {
    return '';
  }

  return str[0].toLocaleLowerCase() + str.substring(1);
}

export function toPascalCase(str: string | string[] = ''): string {
  return (Array.isArray(str) ? str : splitByCase(str)).map((p) => toUpperFirst(p)).join('');
}

export function toCamelCase(str: string | string[] = ''): string {
  return toLowerFirst(toPascalCase(str));
}

export function toKebabCase(str: string | string[] = '', joiner = '-'): string {
  return (Array.isArray(str) ? str : splitByCase(str))
    .map((p = '') => p.toLocaleLowerCase())
    .join(joiner);
}

export function toSnakeCase(str: string | string[] = '') {
  return toKebabCase(str, '_');
}

/**
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
*/
export function escapeStringRegexp(str = '') {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

/**
 * Remove extra escape characters.
 * @param str - A string to remove escape characters from.
 */
export function removeEscapeCharacters(str: string): string {
  if (!str.length) {
    return '';
  }

  let clean = '';
  let lastChar = '';

  for (let idx = 0; idx < str.length; idx++) {
    const char = str.charAt(idx);
    if (char !== '\\' || lastChar === '\\') {
      clean += char;
    }
    lastChar = char;
  }
  return clean;
}

/**
 * Turn any string into a URL/DOM safe string.
 */
export function slugify(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, '-');
}
