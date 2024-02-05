export function mapBy<T, K extends keyof T>(
  iterable: Iterable<T>,
  property: K,
) {
  const map = new Map<T[K], T>();

  for (const obj of iterable) {
    map.set(obj[property], obj);
  }

  return map;
}
