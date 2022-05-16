import './dist/index.d.ts';
export * from './dist';

declare global {
  type Dictionary<T = unknown> = Record<string, T>;

  type TimeoutHandle = ReturnType<typeof global.setTimeout>;

  type IntervalHandle = ReturnType<typeof global.setInterval>;

  function parseInt(s: string | number, radix?: number): number;

  function parseFloat(string: string | number): number;

  type Arrayable<T> = T | T[];

  type Awaitable<T> = Promise<T> | T;

  type HTMLElementCustomized<T> = HTMLElement & T;

  type Mutable<T> = { -readonly [P in keyof T]: T[P] };
}
