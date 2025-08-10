export const tryCatch = <T>(
  fn: () => T,
): [data: T | undefined, error: unknown] => {
  try {
    const result = fn();
    return [result, undefined];
  } catch (error: unknown) {
    return [undefined, error];
  }
};
