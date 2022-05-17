export const isBrowser = typeof window !== 'undefined';

export const isUndefined = (val: any): val is undefined => val === undefined;

export const isUnset = (input: unknown): boolean => input == null;

export const isSet = (input: unknown): boolean => !isUnset(input);

export const isDate = (val: unknown): val is Date => val instanceof Date;

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean';

export const isNumber = (val: any): val is number => typeof val === 'number';

export const isFunction = <T extends Function>(val: any): val is T => typeof val === 'function';

export const isString = (val: unknown): val is string => typeof val === 'string';

export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol';

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object' && !Array.isArray(val);

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const isWindow = (val: any): val is Window =>
  typeof window !== 'undefined' && toString.call(val) === '[object Window]';

export function isEmpty(value: any) {
  if (!value && value !== 0) {
    return true;
  }

  if (isObject(value)) {
    // eslint-disable-next-line no-unreachable-loop,no-restricted-syntax
    for (const _ in value) {
      return false;
    }

    return true;
  }

  return Array.isArray(value) && value.length === 0;
}

export const isElement = (el: unknown): el is Element => {
  if (typeof Element === 'undefined') {
    return false;
  }

  return el instanceof Element;
};

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (
  val: object,
  key: string | symbol,
): key is keyof typeof val => hasOwnProperty.call(val, key);

export function NOOP(): void {}

export function mutable<T extends readonly any[] | Record<string, unknown>>(val: T) {
  return val as Mutable<typeof val>;
}
