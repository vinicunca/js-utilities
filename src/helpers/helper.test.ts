import { describe, expect, it } from 'vitest';

import * as helperUtils from '.';

describe('helpers', () => {
  it('', () => {
    const { deepEqual } = helperUtils;
    // Null
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
    expect(deepEqual(null, false)).toBe(false);
    expect(deepEqual(null, 0)).toBe(false);
    expect(deepEqual(null, '')).toBe(false);
    expect(deepEqual(null, [])).toBe(false);
    expect(deepEqual(null, {})).toBe(false);

    // Undefined
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(undefined, null)).toBe(false);
    expect(deepEqual(undefined, false)).toBe(false);
    expect(deepEqual(undefined, 0)).toBe(false);
    expect(deepEqual(undefined, '')).toBe(false);
    expect(deepEqual(undefined, [])).toBe(false);
    expect(deepEqual(undefined, {})).toBe(false);

    // Boolean
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(true, false)).toBe(false);
    expect(deepEqual(true, undefined)).toBe(false);
    expect(deepEqual(true, null)).toBe(false);
    expect(deepEqual(true, 0)).toBe(false);
    expect(deepEqual(true, 1)).toBe(false);
    expect(deepEqual(true, '')).toBe(false);
    expect(deepEqual(true, 'abc')).toBe(false);
    expect(deepEqual(true, [1, 2])).toBe(false);
    expect(deepEqual(true, { x: 1 })).toBe(false);

    expect(deepEqual(false, false)).toBe(true);
    expect(deepEqual(false, true)).toBe(false);
    expect(deepEqual(false, undefined)).toBe(false);
    expect(deepEqual(false, null)).toBe(false);
    expect(deepEqual(false, 0)).toBe(false);
    expect(deepEqual(false, 1)).toBe(false);
    expect(deepEqual(false, '')).toBe(false);
    expect(deepEqual(false, 'abc')).toBe(false);
    expect(deepEqual(false, [1, 2])).toBe(false);
    expect(deepEqual(false, { x: 1 })).toBe(false);

    // Number
    expect(deepEqual(5, 5)).toBe(true);
    expect(deepEqual(8, 8.0)).toBe(true);
    expect(deepEqual(8, '8')).toBe(false);
    expect(deepEqual(-10, -10)).toBe(true);

    expect(deepEqual(0, '')).toBe(false);
    expect(deepEqual(0, false)).toBe(false);
    expect(deepEqual(0, null)).toBe(false);
    expect(deepEqual(0, undefined)).toBe(false);

    // String
    expect(deepEqual('', '')).toBe(true);
    expect(deepEqual('a', 'a')).toBe(true);
    expect(deepEqual('a', 'b')).toBe(false);
    expect(deepEqual('a', 'A')).toBe(false);
    expect(deepEqual('abc', 'abc')).toBe(true);
    expect(deepEqual('Abc', 'abc')).toBe(false);
    expect(deepEqual(' ', '')).toBe(false);

    // Array
    expect(deepEqual([], [])).toBe(true);
    expect(deepEqual([1], [1.0])).toBe(true);
    expect(deepEqual([1, '2'], [1, '2'])).toBe(true);
    expect(deepEqual([1, { x: 1, y: 2 }], [1, { x: 1, y: 2 }])).toBe(true);
    expect(deepEqual([1, { x: 1, y: null }], [1, { x: 1, y: false }])).toBe(false);
    expect(deepEqual([1, [1, 2]], [1, [1, 2]])).toBe(true);

    // Object
    expect(deepEqual({}, {})).toBe(true);
    expect(deepEqual({ x: 1 }, { x: 1 })).toBe(true);
    expect(deepEqual({ x: 1 }, {})).toBe(false);
    expect(deepEqual({ x: { a: 1, b: 2 } }, { x: { a: 1, b: 2 } })).toBe(true);

    // Date
    const currentDate = new Date();
    const futureDate = new Date(1000);

    expect(deepEqual(currentDate, currentDate)).toBe(true);
    expect(deepEqual({ date: currentDate }, { date: currentDate })).toBe(true);
    expect(deepEqual(currentDate, futureDate)).toBe(false);
    expect(deepEqual({ date: currentDate }, { date: futureDate })).toBe(false);

    const circular = {
      me: null as any,
    };
    circular.me = circular;

    expect(deepEqual({ r: circular }, { r: circular })).toBe(true);
    expect(deepEqual({ r: circular, x: 1 }, { r: circular, x: 2 })).toBe(false);
    expect(deepEqual({ r: [circular] }, { r: [circular] })).toBe(true);
  });
});
