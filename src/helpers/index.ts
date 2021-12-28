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
