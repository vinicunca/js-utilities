import { describe, expect, it } from 'vitest';

import { deepClone, extendObject, getProp, omitProps, omitPropsRegex, pickProps, pickPropsRegex, shallowClone } from '.';

describe('shallowClone', () => {
  it('returns a scalar value passed in', () => {
    expect(shallowClone('a')).toBe('a');
  });

  it('returns a new object when passed a pojo', () => {
    const x = { a: 123 };
    expect(shallowClone(x)).not.toBe(x);
    expect(shallowClone(x)).toStrictEqual({ a: 123 });
  });

  it('nested objects are left alone', () => {
    const z = { foo: 'bar' };
    const x = { a: z };
    expect(shallowClone(x).a).toBe(z);
  });

  it('returns new arrays', () => {
    const z = [1, 2, 3];
    expect(shallowClone(z)).not.toBe(z);
    expect(shallowClone(z)).toStrictEqual([1, 2, 3]);
  });
});

describe('extend object', () => {
  it('adds properties to objects as base depth', () =>
    expect(
      extendObject({
        original: { a: 123 },
        additional: { b: 123 },
      }),
    ).toEqual({ a: 123, b: 123 }));

  it('changes properties to objects as base depth', () =>
    expect(
      extendObject({
        original: { a: 123 },
        additional: { a: 345 },
      }),
    ).toEqual({ a: 345 }));

  it('removes properties to objects as base depth', () =>
    expect(
      extendObject({
        original: { a: 123 },
        additional: { a: undefined },
      }),
    ).toEqual({}));

  it('can preserve initial values against undefined values by setting ignoreUndefined to true', () =>
    expect(
      extendObject({
        original: { a: 123, b: 'foo' },
        additional: { a: undefined, b: 'bar' },
        ignoreUndefined: true,
      }),
    ).toStrictEqual({ a: 123, b: 'bar' }));

  it('replaces array values completely', () => {
    expect(
      extendObject({
        original: { a: ['first'] },
        additional: { a: ['second'] },
      },
      ),
    ).toEqual({ a: ['second'] });
  });

  it('can concatenate array values', () => {
    expect(
      extendObject({
        original: { a: ['first'] },
        additional: { a: ['second'] },
        extendArrays: true,
      }),
    ).toEqual({ a: ['first', 'second'] });
  });

  it('can change a property at depth', () => {
    expect(
      extendObject({
        original: {
          a: 123,
          b: {
            first: { third: 3 },
            second: { z: 'fire' },
          },
          c: 'boop',
        },
        additional: {
          b: { second: { z: 'ice' } },
        },
      }),
    ).toEqual({
      a: 123,
      b: {
        first: { third: 3 },
        second: { z: 'ice' },
      },
      c: 'boop',
    });
  });

  it('can completely replace with a string', () => {
    expect(
      extendObject({
        original: { foo: 123 },
        additional: 'bar',
      }),
    ).toBe('bar');
  });
});

describe('pick object properties', () => {
  it('can remove values from an object', () => {
    const foo = {
      a: 1,
      b: 5,
      c: 3,
    };

    expect(pickProps(foo, ['a', 'c'])).toEqual({
      a: 1,
      c: 3,
    });
  });

  it('preserves values that match a regex', () => {
    const bar = {
      foo: 123,
      faa: 456,
      bar: 'bar',
      boz: 'biz',
    };
    expect(pickPropsRegex(bar, ['faa', /^[bf]o/])).toEqual({
      foo: 123,
      faa: 456,
      boz: 'biz',
    });
  });
});

describe('exclude object properties', () => {
  it('can remove a simple string', () => {
    expect(omitProps({ a: 123, b: 456 }, ['b'])).toEqual({ a: 123 });
  });

  it('can remove nothing if the input is undefined', () => {
    expect(omitProps({ a: 123, b: 123 }, [])).toEqual({ a: 123, b: 123 });
  });

  it('can remove keys via regular expression', () => {
    expect(
      omitPropsRegex({ baa: 123, boo: 456, foo: 789, barFoo: 542 }, ['foo', /^ba/]),
    ).toEqual({ boo: 456 });
  });
});

describe('depp clone', () => {
  it('does not return the same object', () => {
    const arr = ['foo'];
    expect(deepClone(arr)).not.toBe(arr);
    expect(deepClone(arr)).toEqual(arr);
  });

  it('returns different nested array objects', () => {
    const arr = ['foo'];
    const bar = [arr];
    const postClone = deepClone(bar);
    expect(postClone[0]).not.toBe(arr);
    expect(postClone[0]).toEqual(arr);
  });

  it('return different nested objects', () => {
    const x = {
      a: 'b',
    };
    const z = {
      g: 'y',
      x,
    };
    expect(deepClone(z)).toEqual({
      g: 'y',
      x: {
        a: 'b',
      },
    });
    expect(deepClone(z)).not.toBe(z);
    expect(deepClone(z).x).not.toBe(x);
  });

  it('skips cloning regex', () => {
    const regex = /^a/;
    expect(deepClone({ regex }).regex).toBe(regex);
  });

  it('skips cloning dates', () => {
    const date = new Date();
    expect(deepClone({ date }).date).toBe(date);
  });

  it('clones explicitly named non enumerable properties', () => {
    const a: { a: number; __key?: string } = Object.defineProperty(
      { a: 123 },
      '__key',
      { value: 'yes' },
    );
    const cloned = deepClone(a, ['__key']);
    expect(cloned === a).toBe(false);
    expect(cloned.__key).toBe('yes');
  });

  it('does not clone standard non enumerable properties', () => {
    const a: { a: number; __foo?: string } = Object.defineProperty(
      { a: 123 },
      '__foo',
      { value: 'yes' },
    );
    const cloned = deepClone(a);
    expect(cloned === a).toBe(false);
    expect(cloned.__foo).toBe(undefined);
  });

  it('clones explicit properties on deep objects', () => {
    const world: { hello: string; planet: { a: 123; __init?: string } } = {
      hello: 'world',
      planet: Object.defineProperty({ a: 123 }, '__init', { value: 'yes' }),
    };
    const cloned = deepClone(world, ['__init']);
    expect(cloned === world).toBe(false);
    expect(cloned.planet.__init).toBe('yes');
  });

  it('clones explicit non-standard properties on deep objects', () => {
    const world: { hello: string; planet: { a: 123; __index?: number } } = {
      hello: 'world',
      planet: Object.defineProperty({ a: 123 }, '__index', { value: 456 }),
    };
    const cloned = deepClone(world, ['__index']);
    expect(cloned === world).toBe(false);
    expect(cloned.planet.__index).toBe(456);
  });
});

describe('get prop', () => {
  it('can access a single level deep', () => {
    expect(getProp({ a: 123 }, 'a')).toBe(123);
  });

  it('returns null when going too deep', () => {
    expect(getProp({ a: 123 }, 'a.b')).toBe(null);
  });

  it('returns null when first argument is not an object', () => {
    expect(getProp('foobar', 'a.b')).toBe(null);
  });

  it('can access array indexes', () => {
    expect(getProp({ a: ['foo', 'bar'] }, 'a.0')).toBe('foo');
    expect(getProp({ a: ['foo', 'bar'] }, 'a.1')).toBe('bar');
  });
});
