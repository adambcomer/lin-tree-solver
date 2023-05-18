export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object'
}
