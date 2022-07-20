/* eslint-disable no-restricted-syntax */
import { describe, expect, it } from 'vitest';

import {
  escapeStringRegexp,
  isUppercase,
  removeEscapeCharacters,
  slugify,
  splitByCase,
  toCamelCase,
  toKebabCase,
  toLowerFirst,
  toPascalCase,
  toSnakeCase,
  toUpperFirst,
} from '.';

const UNDEFINED_INPUT = 'undefined input';

describe('Split by case', () => {
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
      expect(splitByCase(input)).toMatchObject(tests[input]);
    });
  }
});

describe('Pascal case', () => {
  const tests: any = {
    'foo': 'Foo',
    'foo-bAr': 'FooBAr',
    'FooBARb': 'FooBARb',
    'foo_bar-baz/qux': 'FooBarBazQux',
    'foo--bar': 'FooBar',
  };

  for (const input in tests) {
    it(`${input} => ${tests[input]}`, () => {
      expect(toPascalCase(input)).toBe(tests[input]);
    });
  }

  it(UNDEFINED_INPUT, () => {
    expect(toPascalCase(undefined)).toBe('');
  });
});

describe('Camel case', () => {
  const tests: any = {
    FooBarBaz: 'fooBarBaz',
  };

  for (const input in tests) {
    it(`${input} => ${tests[input]}`, () => {
      expect(toCamelCase(input)).toBe(tests[input]);
    });
  }

  it(UNDEFINED_INPUT, () => {
    expect(toCamelCase(undefined)).toBe('');
  });
});

describe('Kebab case', () => {
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
      expect(toKebabCase(input)).toBe(tests[input]);
    });
  }

  it(UNDEFINED_INPUT, () => {
    expect(toKebabCase(undefined)).toBe('');
  });
});

describe('Snake case', () => {
  const tests: any = {
    FooBarBaz: 'foo_bar_baz',
  };

  for (const input in tests) {
    it(`${input} => ${tests[input]}`, () => {
      expect(toSnakeCase(input)).toBe(tests[input]);
    });
  }

  it(UNDEFINED_INPUT, () => {
    expect(toSnakeCase(undefined)).toBe('');
  });
});

describe('Upper first', () => {
  const tests: any = {
    '': '',
    'foo': 'Foo',
    'Foo': 'Foo',
  };

  for (const input in tests) {
    it(`${input} => ${tests[input]}`, () => {
      expect(toUpperFirst(input)).toBe(tests[input]);
    });
  }
});

describe('Lower first', () => {
  const tests: any = {
    '': '',
    'foo': 'foo',
    'Foo': 'foo',
  };

  for (const input in tests) {
    it(`${input} => ${tests[input]}`, () => {
      expect(toLowerFirst(input)).toBe(tests[input]);
    });
  }
});

describe('Is uppercase', () => {
  it('base', () => {
    expect(isUppercase('a')).toBe(false);
  });

  it(UNDEFINED_INPUT, () => {
    expect(isUppercase(undefined)).toBe(true);
  });
});

describe('Escape regexp', () => {
  it('main', () => {
    expect(escapeStringRegexp('\\ ^ $ * + ? . ( ) | { } [ ]')).toMatchInlineSnapshot(
      '"\\\\\\\\ \\\\^ \\\\\$ \\\\* \\\\+ \\\\? \\\\. \\\\( \\\\) \\\\| \\\\{ \\\\} \\\\[ \\\\]"',
    );
    expect(escapeStringRegexp('**\\//aa^~#$')).toMatchInlineSnapshot(
      '"\\\\*\\\\*\\\\\\\\//aa\\\\^~#\\\\$"',
    );
  });

  it('escapes `-` in a way compatible with PCRE', () => {
    expect(escapeStringRegexp('foo - bar')).toBe('foo \\x2d bar');
  });
});

describe('Remove escape characters', () => {
  it('performs no operation on non escaped strings', () => {
    expect(removeEscapeCharacters('"Hello world"')).toBe('"Hello world"');
    expect(removeEscapeCharacters('*P(*&)*&^%*&\'$GJHASDFHKJ')).toBe(
      '*P(*&)*&^%*&\'$GJHASDFHKJ',
    );
  });
  it('removes extra escape characters that are in the string literal', () => {
    expect(removeEscapeCharacters('\\"Hello \\"world\\""')).toBe('"Hello "world""');
  });
  it('does not remove escape characters that are actually escaped', () => {
    expect(removeEscapeCharacters('\\\\"Hello \\"world\\""')).toBe('\\"Hello "world""');
  });
});

describe('slugify', () => {
  it('removes caps', () => expect(slugify('FooBar')).toBe('foobar'));
  it('removes spaces', () => expect(slugify('this That')).toBe('this-that'));
  it('removes symbols', () =>
    expect(slugify('This!-is*&%#@^up!')).toBe('this-is-up'));
  it('converts non-standard unicode', () =>
    expect(slugify('Woéédan')).toBe('woeedan'));
});
