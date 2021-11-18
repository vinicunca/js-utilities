/**
 * Type guard to filter out null-ish values
 *
 * @category Guards
 * @example array.filter(stripNullish)
 */
export function stripNullish<TInput>(v: TInput | null | undefined): v is NonNullable<TInput> {
  return v != null;
}

/**
 * Type guard to filter out null values
 *
 * @category Guards
 * @example array.filter(stripNull)
 */
export function stripNull<TInput>(v: TInput | null): v is Exclude<TInput, null> {
  return v !== null;
}

/**
 * Type guard to filter out falsy values
 *
 * @category Guards
 * @example array.filter(isTruthy)
 */
export function isTruthy<TInput>(v: TInput): v is NonNullable<TInput> {
  return Boolean(v);
}
