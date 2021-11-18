import {
  splitByCase,
  toPascalCase,
  toKebabCase,
  toCamelCase,
  toUpperFirst,
  toLowerFirst,
  toSnakeCase,
} from '.';

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

  // eslint-disable-next-line no-restricted-syntax
  for (const input in tests) {
    test(`${input} => ${tests[input].join(', ')}`, () => {
      expect(splitByCase(input)).toMatchObject(tests[input]);
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

  // eslint-disable-next-line no-restricted-syntax
  for (const input in tests) {
    test(`${input} => ${tests[input]}`, () => {
      expect(toPascalCase(input)).toBe(tests[input]);
    });
  }
});

describe('camelCase', () => {
  const tests: any = {
    FooBarBaz: 'fooBarBaz',
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const input in tests) {
    test(`${input} => ${tests[input]}`, () => {
      expect(toCamelCase(input)).toBe(tests[input]);
    });
  }
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

  // eslint-disable-next-line no-restricted-syntax
  for (const input in tests) {
    test(`${input} => ${tests[input]}`, () => {
      expect(toKebabCase(input)).toBe(tests[input]);
    });
  }
});

describe('snakeCase', () => {
  const tests: any = {
    FooBarBaz: 'foo_bar_baz',
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const input in tests) {
    test(`${input} => ${tests[input]}`, () => {
      expect(toSnakeCase(input)).toBe(tests[input]);
    });
  }
});

describe('upperFirst', () => {
  const tests: any = {
    '': '',
    'foo': 'Foo',
    'Foo': 'Foo',
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const input in tests) {
    test(`${input} => ${tests[input]}`, () => {
      expect(toUpperFirst(input)).toBe(tests[input]);
    });
  }
});

describe('lowerFirst', () => {
  const tests: any = {
    '': '',
    'foo': 'foo',
    'Foo': 'foo',
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const input in tests) {
    test(`${input} => ${tests[input]}`, () => {
      expect(toLowerFirst(input)).toBe(tests[input]);
    });
  }
});
