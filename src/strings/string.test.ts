/* eslint-disable no-restricted-syntax */
import { describe, expect, it } from 'vitest';

import * as stringUtils from '.';

const UNDEFINED_INPUT = 'undefined input';

describe('splitByCase', () => {
  const tests: any = {
    '': [],
    'foo': ['foo'],
    'fooBar': ['foo', 'Bar'],
    'FooBarBaz': ['Foo', 'Bar', 'Baz'],
    'foo_bar-baz/qux': ['foo', 'bar', 'baz', 'qux'],
    'foo--bar-Baz': ['foo', '', 'bar', 'Baz'],
    'FOOBar': ['FOO', 'Bar'],
    'ALink': ['A', 'Link'],
  };

  for (const input in tests) {
    it(`${input} => ${tests[input].join(', ')}`, () => {
      expect(stringUtils.splitByCase(input)).toMatchObject(tests[input]);
    });
  }
});

describe('pascalCase', () => {
  const tests: any = {
    'foo': 'Foo',
    'foo-bAr': 'FooBAr',
    'FooBARb': 'FooBARb',
    'foo_bar-baz/qux': 'FooBarBazQux',
    'foo--bar': 'FooBar',
  };

  for (const input in tests) {
    it(`${input} => ${tests[input]}`, () => {
      expect(stringUtils.toPascalCase(input)).toBe(tests[input]);
    });
  }

  it(UNDEFINED_INPUT, () => {
    expect(stringUtils.toPascalCase(undefined)).toBe('');
  });
});

describe('camelCase', () => {
  const tests: any = {
    FooBarBaz: 'fooBarBaz',
  };

  for (const input in tests) {
    it(`${input} => ${tests[input]}`, () => {
      expect(stringUtils.toCamelCase(input)).toBe(tests[input]);
    });
  }

  it(UNDEFINED_INPUT, () => {
    expect(stringUtils.toCamelCase(undefined)).toBe('');
  });
});

describe('kebabCase', () => {
  const tests: any = {
    'foo': 'foo',
    'foo/Bar': 'foo-bar',
    'foo-bAr': 'foo-b-ar',
    'foo--bar': 'foo--bar',
    'FooBAR': 'foo-bar',
    'ALink': 'a-link',
  };

  for (const input in tests) {
    it(`${input} => ${tests[input]}`, () => {
      expect(stringUtils.toKebabCase(input)).toBe(tests[input]);
    });
  }

  it(UNDEFINED_INPUT, () => {
    expect(stringUtils.toKebabCase(undefined)).toBe('');
  });
});

describe('snakeCase', () => {
  const tests: any = {
    FooBarBaz: 'foo_bar_baz',
  };

  for (const input in tests) {
    it(`${input} => ${tests[input]}`, () => {
      expect(stringUtils.toSnakeCase(input)).toBe(tests[input]);
    });
  }

  it(UNDEFINED_INPUT, () => {
    expect(stringUtils.toSnakeCase(undefined)).toBe('');
  });
});

describe('upperFirst', () => {
  const tests: any = {
    '': '',
    'foo': 'Foo',
    'Foo': 'Foo',
  };

  for (const input in tests) {
    it(`${input} => ${tests[input]}`, () => {
      expect(stringUtils.toUpperFirst(input)).toBe(tests[input]);
    });
  }
});

describe('lowerFirst', () => {
  const tests: any = {
    '': '',
    'foo': 'foo',
    'Foo': 'foo',
  };

  for (const input in tests) {
    it(`${input} => ${tests[input]}`, () => {
      expect(stringUtils.toLowerFirst(input)).toBe(tests[input]);
    });
  }
});

describe('isUppercase', () => {
  it('base', () => {
    expect(stringUtils.isUppercase('a')).toBe(false);
  });

  it(UNDEFINED_INPUT, () => {
    expect(stringUtils.isUppercase(undefined)).toBe(true);
  });
});
