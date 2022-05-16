/**
 * Convert to an array
 *
 * @category Array
 */
export function toArray<T>(value: T | T[] = []): T[] {
  return Array.isArray(value) ? value : [value];
}

/**
 * Removes duplicates in an array
 *
 * @category Array
 */
export function uniqArray<TArray>(_array: readonly TArray[]): TArray[] {
  return Array.from(new Set(_array));
}

/**
 * Return the sum of an array
 *
 * @category Array
 *
 * @example
 * const totals = sum([1,2,3])
 * const totals = sum([
 *  { age: 1 },
 *  { age: 2 },
 * ], (x) => x.age);
 */
export function sum<TArray>(
  _array: readonly TArray[],
  callbackfn?: (value: TArray) => number,
): number {
  return _array.reduce<number>((acc, curr: any) => {
    if (callbackfn) {
      return acc + callbackfn(curr);
    }

    return acc + curr;
  }, 0);
}

/**
 * Sort an array of objects by a property
 *
 * @category Array
 *
 * @example
 * const totals = sortBy({
 *   array: [
 *     { age: 2 },
 *     { age: 1 },
 *     { age: 3 },
 *   ],
 *   key: 'age',
 * }
 */
export function sortBy<TArray>({
  array,
  key,
  sortBy = 'ASC',
}: {
  array: readonly TArray[];
  key: string;
  sortBy?: 'ASC' | 'DESC';
}): TArray[] {
  const _sortVal = sortBy === 'ASC' ? 1 : -1;

  return array.slice().sort((a: any, b: any) => {
    if (a[key] > b[key]) {
      return _sortVal;
    }

    return -_sortVal;
  });
}
