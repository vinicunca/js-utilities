export function deepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  // If the values are Date, compare them as timestamps
  if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
    return false;
  }

  // If the values aren't objects, they were already checked for equality
  if (a !== Object(a) || b !== Object(b)) {
    return false;
  }

  const _keys = Object.keys(a);

  // Different number of properties
  if (_keys.length !== Object.keys(b).length) {
    return false;
  }

  return _keys.every((p) => deepEqual(a[p], b[p]));
}

export function convertToUnit(
  str: string | number | null | undefined,
  unit = 'px'
): string | undefined {
  if (str == null || str === '') {
    return undefined;
  } else if (isNaN(+str!)) {
    return String(str);
  } else if (!isFinite(+str!)) {
    return undefined;
  } else {
    return `${Number(str)}${unit}`;
  }
}

export function humanReadableFileSize(bytes: number, base: 1000 | 1024 = 1000): string {
  if (bytes < base) {
    return `${bytes} B`;
  }

  const prefix = base === 1024 ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
  let unit = -1;

  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }

  return `${bytes.toFixed(1)} ${prefix[unit]}B`;
}
