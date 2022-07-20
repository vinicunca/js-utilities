import { isObject } from '../base';

export function deepEqual(valA: any, valB: any): boolean {
  if (valA === valB) {
    return true;
  }

  if (typeof valB === 'object' && typeof valA === 'object') {
    if (valA instanceof Map) {
      return false;
    }

    if (valA instanceof Set) {
      return false;
    }

    if (valA instanceof Date) {
      return false;
    }

    if (valA === null || valB === null) {
      return false;
    }

    if (Object.keys(valA).length !== Object.keys(valB).length) {
      return false;
    }

    const _keys = Object.keys(valA);

    return _keys.every((_key) => deepEqual(valA[_key], valB[_key]));
  }

  return false;
}

export function convertToUnit(
  str: string | number | null | undefined,
  unit = 'px',
): string | undefined {
  if (str == null || str === '') {
    return undefined;
  } else if (Number.isNaN(+str!)) {
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

export function mergeDeep(source: Dictionary<any> = {}, target: Dictionary<any> = {}) {
  const out: Dictionary<any> = {};

  for (const key of Object.keys(source)) {
    out[key] = source[key];
  }

  for (const key of Object.keys(target)) {
    const sourceProperty = source[key];
    const targetProperty = target[key];

    // Only continue deep merging if both properties are objects
    if (isObject(sourceProperty) && isObject(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty);

      continue;
    }

    out[key] = targetProperty;
  }

  return out;
}
