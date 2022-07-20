import { describe, expect, it } from 'vitest';

import { convertToUnit, humanReadableFileSize, isEqual, mergeDeep } from '.';

describe('deep equal comparison', () => {
  it('handle nulls and undefineds', () => {
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(null, undefined)).toBe(false);
    expect(isEqual(null, false)).toBe(false);
    expect(isEqual(null, 0)).toBe(false);
    expect(isEqual(null, '')).toBe(false);
    expect(isEqual(null, [])).toBe(false);
    expect(isEqual(null, {})).toBe(false);
    expect(isEqual([], null)).toBe(false);
    expect(isEqual(undefined, undefined)).toBe(true);
    expect(isEqual(undefined, null)).toBe(false);
    expect(isEqual(undefined, false)).toBe(false);
    expect(isEqual(undefined, 0)).toBe(false);
    expect(isEqual(undefined, '')).toBe(false);
    expect(isEqual(undefined, [])).toBe(false);
    expect(isEqual(undefined, {})).toBe(false);
  });

  it('handle booleans', () => {
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(true, undefined)).toBe(false);
    expect(isEqual(true, null)).toBe(false);
    expect(isEqual(true, 0)).toBe(false);
    expect(isEqual(true, 1)).toBe(false);
    expect(isEqual(true, '')).toBe(false);
    expect(isEqual(true, 'abc')).toBe(false);
    expect(isEqual(true, [1, 2])).toBe(false);
    expect(isEqual(true, { x: 1 })).toBe(false);
    expect(isEqual(false, false)).toBe(true);
    expect(isEqual(false, true)).toBe(false);
    expect(isEqual(false, undefined)).toBe(false);
    expect(isEqual(false, null)).toBe(false);
    expect(isEqual(false, 0)).toBe(false);
    expect(isEqual(false, 1)).toBe(false);
    expect(isEqual(false, '')).toBe(false);
    expect(isEqual(false, 'abc')).toBe(false);
    expect(isEqual(false, [1, 2])).toBe(false);
    expect(isEqual(false, { x: 1 })).toBe(false);
  });

  it('handle numbers', () => {
    expect(isEqual(5, 5)).toBe(true);
    expect(isEqual(8, 8.0)).toBe(true);
    expect(isEqual(8, '8')).toBe(false);
    expect(isEqual(-10, -10)).toBe(true);

    expect(isEqual(0, '')).toBe(false);
    expect(isEqual(0, false)).toBe(false);
    expect(isEqual(0, null)).toBe(false);
    expect(isEqual(0, undefined)).toBe(false);
  });

  it('handle strings', () => {
    expect(isEqual('', '')).toBe(true);
    expect(isEqual('a', 'a')).toBe(true);
    expect(isEqual('a', 'b')).toBe(false);
    expect(isEqual('a', 'A')).toBe(false);
    expect(isEqual('abc', 'abc')).toBe(true);
    expect(isEqual('Abc', 'abc')).toBe(false);
    expect(isEqual(' ', '')).toBe(false);
  });

  it('handle arrays', () => {
    expect(isEqual([], [])).toBe(true);
    expect(isEqual([1], [1.0])).toBe(true);
    expect(isEqual([1, '2'], [1, '2'])).toBe(true);
    expect(isEqual([1, { x: 1, y: 2 }], [1, { x: 1, y: 2 }])).toBe(true);
    expect(isEqual([1, { x: 1, y: null }], [1, { x: 1, y: false }])).toBe(false);
    expect(isEqual([1, [1, 2]], [1, [1, 2]])).toBe(true);
  });

  it('handle objects', () => {
    expect(isEqual({}, {})).toBe(true);
    expect(isEqual({ x: 1 }, { x: 1 })).toBe(true);
    expect(isEqual({ x: 1 }, {})).toBe(false);
    expect(isEqual({ x: { a: 1, b: 2 } }, { x: { a: 1, b: 2 } })).toBe(true);
  });

  it('handle circular objects', () => {
    const circular = {
      me: null as any,
    };
    circular.me = circular;

    expect(isEqual({ r: circular }, { r: circular })).toBe(true);
    expect(isEqual({ r: circular, x: 1 }, { r: circular, x: 2 })).toBe(false);
    expect(isEqual({ r: [circular] }, { r: [circular] })).toBe(true);
  });

  it('handle dates', () => {
    // Date
    const currentDate = new Date();
    const futureDate = new Date(1000);

    expect(isEqual(currentDate, currentDate)).toBe(true);
    expect(isEqual({ date: currentDate }, { date: currentDate })).toBe(true);
    expect(isEqual(currentDate, futureDate)).toBe(false);
    expect(isEqual({ date: currentDate }, { date: futureDate })).toBe(false);
  });
});

describe('helpers', () => {
  it('convert to css units', () => {
    expect(convertToUnit(undefined)).toBeUndefined();
    expect(convertToUnit(null)).toBeUndefined();
    expect(convertToUnit('')).toBeUndefined();

    expect(convertToUnit(0)).toBe('0px');
    expect(convertToUnit(3)).toBe('3px');
    expect(convertToUnit(3.14)).toBe('3.14px');

    expect(convertToUnit(0, 'em')).toBe('0em');
    expect(convertToUnit(3, 'em')).toBe('3em');
    expect(convertToUnit(3.14, 'em')).toBe('3.14em');

    expect(convertToUnit('0vw')).toBe('0vw');
    expect(convertToUnit('3vw')).toBe('3vw');
    expect(convertToUnit('3.14vw')).toBe('3.14vw');

    expect(convertToUnit('ayo')).toBe('ayo');
  });

  it('humanReadableFileSize should format file sizes with base 1024', () => {
    expect(humanReadableFileSize(0, 1024)).toBe('0 B');
    expect(humanReadableFileSize(512, 1024)).toBe('512 B');

    expect(humanReadableFileSize(1024, 1024)).toBe('1.0 KiB');
    expect(humanReadableFileSize(4096, 1024)).toBe('4.0 KiB');

    expect(humanReadableFileSize(1048576, 1024)).toBe('1.0 MiB');
    expect(humanReadableFileSize(2097152, 1024)).toBe('2.0 MiB');

    expect(humanReadableFileSize(1073741824, 1024)).toBe('1.0 GiB');
    expect(humanReadableFileSize(2147483648, 1024)).toBe('2.0 GiB');
  });

  it('humanReadableFileSize should format file sizes with base 1000', () => {
    expect(humanReadableFileSize(0, 1000)).toBe('0 B');
    expect(humanReadableFileSize(0)).toBe('0 B');
    expect(humanReadableFileSize(512)).toBe('512 B');

    expect(humanReadableFileSize(1000)).toBe('1.0 kB');
    expect(humanReadableFileSize(4000)).toBe('4.0 kB');

    expect(humanReadableFileSize(1000000)).toBe('1.0 MB');
    expect(humanReadableFileSize(2000000)).toBe('2.0 MB');

    expect(humanReadableFileSize(1000000000)).toBe('1.0 GB');
    expect(humanReadableFileSize(2000000000)).toBe('2.0 GB');
  });
});

describe('mergeDeep', () => {
  it('should include all properties from both source and target', () => {
    expect(mergeDeep({ a: 'foo' }, { b: 'bar' })).toEqual({ a: 'foo', b: 'bar' });
  });

  it('should not mutate source object', () => {
    const source = { a: 'foo' };
    const target = { b: 'bar' };
    const result = mergeDeep(source, target);

    expect(result).not.toBe(source);
    expect(source).not.toHaveProperty('b');
  });

  it('should overwrite source properties', () => {
    expect(mergeDeep({ a: 'foo' }, { a: 'bar' })).toEqual({ a: 'bar' });
  });

  it('should recursively merge', () => {
    expect(mergeDeep({ a: { b: 'foo' } }, { c: { d: 'bar' } })).toEqual({
      a: { b: 'foo' },
      c: { d: 'bar' },
    });
  });

  it('should not recursively merge arrays', () => {
    expect(mergeDeep({ a: ['foo'] }, { a: ['bar'] })).toEqual({ a: ['bar'] });
  });
});
