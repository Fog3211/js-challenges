export function generateSingleRandomArray(length: number) {
  return Array.from({ length }).map((u, i) => i).sort(() => Math.random() - 0.5)
}

export function generateRandom(len = 10, min = 0, max = 100) {
  if (max - min < len) {
    return []
  }
  const hash: number[] = []
  const map = new Map()
  while (hash.length < len) {
    const num = Math.floor(Math.random() * max)
    if (num < min) {
      continue
    }
    if (!map.has(num)) {
      hash.push(num)
      map.set(num, true)
    }
  }
  return hash
}

// console.log(generateSingleRandomArray(20))

// console.log(generateRandom(50, 20, 100))
