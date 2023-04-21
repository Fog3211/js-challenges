export function sleep<T>(ms: number, result?: T) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), ms)
  })
}
