export const isBrowser = typeof window !== 'undefined';

export const isUndefined = (val: any): val is undefined => val === undefined;

export const isDefined = <T = any>(val?: T): val is T => typeof val !== 'undefined';

export const isUnset = (input: unknown): input is null | undefined => input == null;

export const isSet = (input: unknown): boolean => !isUnset(input);

export const isDate = (val: unknown): val is Date => val instanceof Date;

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean';

export const isNumber = (val: any): val is number => typeof val === 'number';

export const isFunction = <T extends Function>(val: any): val is T => typeof val === 'function';

export const isString = (val: unknown): val is string => typeof val === 'string';

export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol';

export const isObject = (val: unknown): val is Record<any, any> =>
  Object.prototype.toString.call(val) === '[object Object]';

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const isWindow = (val: any): val is Window =>
  typeof window !== 'undefined' && toString.call(val) === '[object Window]';

export function isEmpty(value: any) {
  const _type = typeof value;
  if (_type === 'number') {
    return false;
  }

  if (value === undefined || value === null) {
    return true;
  }

  if (_type === 'string') {
    return value === '';
  }

  if (isObject(value)) {
    if (value === null) {
      return true;
    }

    // eslint-disable-next-line no-unreachable-loop,no-restricted-syntax
    for (const _ in value) {
      return false;
    }

    return !(value instanceof RegExp || value instanceof Date);
  }

  return Array.isArray(value) && value.length === 0;
}

export const isElement = (el: unknown): el is Element => {
  if (typeof Element === 'undefined') {
    return false;
  }

  return el instanceof Element;
};

export function NOOP(): void {}

export function mutable<T extends readonly any[] | Dictionary<unknown>>(val: T) {
  return val as Mutable<typeof val>;
}
