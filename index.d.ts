import './dist/index.d.ts';
export * from './dist';

declare global {
  type Dictionary<T = unknown> = Record<string, T>;

  type TimeoutHandle = ReturnType<typeof global.setTimeout>;

  type IntervalHandle = ReturnType<typeof global.setInterval>;

  function parseInt(s: string | number, radix?: number): number;

  function parseFloat(string: string | number): number;
}
