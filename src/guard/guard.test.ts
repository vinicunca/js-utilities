import { describe, expect, it } from 'vitest';
import * as guardUtils from '.';

describe('stripNullish', () => {
  const inputs: any[] = [1, null, 'a word', undefined];
  const expects: any[] = [1, 'a word'];

  it('stripNullish in arrays', () => {
    expect(inputs.filter(guardUtils.stripNullish)).toStrictEqual(expects);
  });
});

describe('stripNull', () => {
  const inputs: any[] = [1, null, 'a word', undefined];
  const expects: any[] = [1, 'a word', undefined];

  it('stripNull in arrays', () => {
    expect(inputs.filter(guardUtils.stripNull)).toStrictEqual(expects);
  });
});

describe('isTruthy', () => {
  const inputs: any[] = [1, null, 0, '', 'a word', undefined, false, true];
  const expects: any[] = [1, 'a word', true];

  it('filter isTruthy in arrays', () => {
    expect(inputs.filter(guardUtils.isTruthy)).toStrictEqual(expects);
  });
});
