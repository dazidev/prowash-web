export function hasProperty<K extends string>(
  obj: unknown,
  property: K,
): obj is Record<K, unknown> {
  return typeof obj === "object" && obj !== null && property in obj;
}
