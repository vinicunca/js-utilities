import { describe, expect, it } from 'vitest';

import { isEmpty } from '.';

describe('is empty', () => {
  it('considers empty strings empty', () => expect(isEmpty('')).toBe(true));
  it('considers spaces not empty', () => expect(isEmpty('  ')).toBe(false));
  it('considers the string zero not empty', () =>
    expect(isEmpty('0')).toBe(false));
  it('considers the number zero not empty', () => expect(isEmpty(0)).toBe(false));
  it('considers empty arrays empty', () => expect(isEmpty([])).toBe(true));
  it('considers empty objects empty', () => expect(isEmpty({})).toBe(true));
  it('considers null empty', () => expect(isEmpty(null)).toBe(true));
  it('considers undefined empty', () => expect(isEmpty(undefined)).toBe(true));
  it('considers an array with value zero not empty', () =>
    expect(isEmpty(['a'])).toBe(false));
  it('considers an object with key not empty', () =>
    expect(isEmpty({ a: undefined })).toBe(false));
  it('considers regex not empty', () => expect(isEmpty(/^foo/)).toBe(false));
  it('considers a date object to not be empty', () =>
    expect(isEmpty(new Date())).toBe(false));
});
