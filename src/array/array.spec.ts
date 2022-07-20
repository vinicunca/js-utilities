import { describe, expect, it } from 'vitest';

import * as arrayUtils from '.';

describe('uniqArray', () => {
  const inputs: any[] = [1, 2, 3, 3, 3, 4];
  const expects: any[] = [1, 2, 3, 4];

  it('uniqArray', () => {
    const uniqs = arrayUtils.uniqArray(inputs);

    expect(uniqs).toStrictEqual(expects);
  });
});

describe('sum', () => {
  const inputs = [1, 2, 3, 4];

  it('array of numbers', () => {
    const sums = arrayUtils.sum(inputs);

    expect(sums).toBe(10);
  });

  it('array of objects', () => {
    const _inputs = inputs.map((x) => ({
      age: x,
    }));
    const sums = arrayUtils.sum(_inputs, (x) => x.age);

    expect(sums).toBe(10);
  });
});

describe('sortBy', () => {
  const _inputs = [{ age: 2 }, { age: 1 }, { age: 3 }];

  it('sort by ASC', () => {
    const _expects = [{ age: 1 }, { age: 2 }, { age: 3 }];
    const results = arrayUtils.sortBy({
      array: _inputs,
      key: 'age',
    });

    expect(results).toStrictEqual(_expects);
  });

  it('sort by DESC', () => {
    const _expects = [{ age: 3 }, { age: 2 }, { age: 1 }];
    const results = arrayUtils.sortBy({
      array: _inputs,
      key: 'age',
      sortBy: 'DESC',
    });

    expect(results).toStrictEqual(_expects);
  });
});
