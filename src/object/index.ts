import { isObject } from '../base';

/**
 * Strict typed `Object.keys`
 *
 * @category Object
 */
export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * Strict typed `Object.entries`
 *
 * @category Object
 */
export function objectEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

/**
 * Checks if the given property exists on the given object.
 */
export function hasOwn(
  value: object,
  key: string | symbol | number,
): key is keyof typeof value {
  return Object.prototype.hasOwnProperty.call(value, key);
}

/**
 * Get a specific value via dot notation.
 * @param object - An object to fetch data from
 * @param path - The path of the property to get in dot notation
 */
export function getProp(object: any, path: string): unknown {
  if (!object || typeof object !== 'object') {
    return null;
  }

  const segments = path.split('.');
  let _object = object;

  // eslint-disable-next-line no-restricted-syntax
  for (const i in segments) {
    const segment = segments[i];
    if (hasOwn(_object, segment)) {
      _object = _object[segment];
    }

    if (+i === segments.length - 1) {
      return _object;
    }

    if (!_object || typeof _object !== 'object') {
      return null;
    }
  }

  return null;
}

/**
 * Extracts a set of keys from a given object.
 * This will extract values even if they are not set on the original object
 * they will just have an undefined value.
 * The keys can be a string or an RegEx.
 * For more type safety and without using any RegEx
 * please @see pickProps
 * @param object - An object to extract values from
 * @param include - A set of keys to extract
 */
export function pickPropsRegex(
  object: Dictionary<any>,
  include: Array<string | RegExp>,
): Dictionary<any> {
  const clean: Dictionary<any> = {};
  const exps = include.filter((n) => n instanceof RegExp) as RegExp[];

  include.forEach((key) => {
    if (!(key instanceof RegExp)) {
      clean[key] = object[key];
    }
  });

  Object.keys(object).forEach((key) => {
    if (exps.some((exp) => exp.test(key))) {
      clean[key] = object[key];
    }
  });

  return clean;
}

/**
 * Extracts a set of keys from a given object.
 * @param object - An object to extract values from
 * @param keys - A set of keys to extract
 */
export function pickProps<T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K> {
  return Object.assign({}, ...keys.map((key) => ({ [key]: object[key] })));
}

/**
 * Extracts a set of keys from a given object.
 * This will extract values even if they are not set on the original object
 * they will just have an undefined value.
 * The keys can be a string or an RegEx.
 * For more type safety and without using any RegEx
 * please @see pickProps
 * @param obj - An object to extract values from
 * @param include - A set of keys to extract
 */

/**
 * Return a new (shallow) object with all properties from a given keys
 * that are present in the array.
 * The keys can be a string or an RegEx.
 * For more type safety and without using any RegEx
 * please @see omitProps
 * @param object - An object to omit values from
 * @param toRemove - An array of keys to remove
 * @public
 */
export function omitPropsRegex(
  object: Dictionary<any>,
  toRemove: Array<string | RegExp>,
): Dictionary<any> {
  const clean: Dictionary<any> = {};
  const exps = toRemove.filter((n) => n instanceof RegExp) as RegExp[];
  const keysToRemove = new Set(toRemove);
  for (const _key of Object.keys(object)) {
    if (!keysToRemove.has(_key) && !exps.some((_exp) => _exp.test(_key))) {
      clean[_key] = object[_key];
    }
  }

  return clean;
}

/**
 * Return a new (shallow) object with all properties from a given keys
 * that are present in the array.
 * @param object - An object to extract values from
 * @param keys - A set of keys to extract
 */
export function omitProps<T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K> {
  const _keys = objectKeys(object).filter((_key) => !keys.includes(_key as K));

  return Object.assign({}, ..._keys.map((key) => ({ [key]: object[key] })));
}

/**
 * Attempts to determine if an object is a plain object. Mostly lifted from
 * is-plain-object: https://github.com/jonschlinkert/is-plain-object
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * @param obj - any value
 * @returns
 * @public
 */
export function isPojo(obj: any): obj is Dictionary<any> {
  if (isObject(obj) === false) {
    return false;
  }

  const ctor = obj.constructor;
  if (ctor === undefined) {
    return true;
  }

  const prot = ctor.prototype;
  if (isObject(prot) === false) {
    return false;
  }

  // eslint-disable-next-line no-prototype-builtins
  return !prot.hasOwnProperty('isPrototypeOf') === false;
}

/**
 * Very shallowly clones the given object.
 * @param obj - The object to shallow clone
 */
export function shallowClone<T>(
  obj: T,
): T {
  if (obj !== null && typeof obj === 'object') {
    let returnObject: any[] | Dictionary<any> | undefined;

    if (Array.isArray(obj)) {
      returnObject = [...obj];
    } else if (isPojo(obj)) {
      returnObject = { ...obj };
    }

    if (returnObject) {
      return returnObject as T;
    }
  }

  return obj;
}

/**
 * Perform a recursive clone on a given object.
 * This only intended to be used
 * for simple objects like arrays and pojos.
 * @param object - Object to clone
 * @param explicit - keys to explicitly clone
 */
export function deepClone<T extends Record<string, unknown> | unknown[] | null>(
  object: T,
  explicit: string[] = [],
) {
  if (
    object === null
    || object instanceof RegExp
    || object instanceof Date
    || object instanceof Map
    || object instanceof Set
    || (typeof File === 'function' && object instanceof File)
  ) {
    return object;
  }

  let returnObject;

  if (Array.isArray(object)) {
    returnObject = object.map((_value) => {
      if (typeof _value === 'object') {
        return deepClone(_value as unknown[], explicit);
      }
      return _value;
    }) as T;
  } else {
    returnObject = Object.keys(object).reduce((newObj, key) => {
      const _value = typeof object[key] === 'object'
        ? deepClone(object[key] as unknown[], explicit)
        : object[key];

      newObj[key] = _value;

      return newObj;
    }, {} as Record<string, unknown>) as T;
  }

  for (const key of explicit) {
    if (key in object) {
      Object.defineProperty(returnObject, key, {
        enumerable: false,
        value: (object as any)[key],
      });
    }
  }

  return returnObject;
}

/**
 * Recursively merge data from additional into original returning a new object.
 * @param params - Options for extend
 * @param params.original - The object to extend
 * @param params.additional - An object to modify the original object with.
 * @param params.arrays - By default replaces arrays, but can also append to them.
 * @param params.ignoreUndefined - when true it treats undefined values as if they dont exist
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export function extendObject(
  { original, additional, extendArrays = false, ignoreUndefined = false }:
  {
    original: Dictionary<any>;
    additional: Dictionary<any> | string | null;
    extendArrays?: boolean;
    ignoreUndefined?: boolean;
  },
) {
  if (additional === null) {
    return null;
  }

  if (typeof additional === 'string') {
    return additional;
  }

  const merged: Dictionary<any> = {};

  for (const _key of Object.keys(original)) {
    const isAdditionalSet = additional[_key] !== undefined || !ignoreUndefined;
    const hasOwnKeys = hasOwn(additional, _key) && isAdditionalSet;
    if (hasOwnKeys) {
      const isExtendedArrays = extendArrays && Array.isArray(original[_key]) && Array.isArray(additional[_key]);
      if (isExtendedArrays) {
        merged[_key] = original[_key].concat(additional[_key]);
        continue;
      }

      if (additional[_key] === undefined) {
        continue;
      }

      if (isPojo(original[_key]) && isPojo(additional[_key])) {
        merged[_key] = extendObject({
          original: original[_key],
          additional: additional[_key],
          extendArrays,
          ignoreUndefined,
        });
      } else {
        merged[_key] = additional[_key];
      }
    } else {
      merged[_key] = original[_key];
    }
  }

  for (const _key of Object.keys(additional)) {
    if (!hasOwn(merged, _key) && additional[_key] !== undefined) {
      merged[_key] = additional[_key];
    }
  }

  return merged;
}
