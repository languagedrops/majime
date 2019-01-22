export const getRandom = (floor: number, ceiling: number): number => {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor
}

export const getRandomWithExceptions = (floor: number, ceiling: number, exceptions: number[]): number | undefined => {
  const potentialExceptions = exceptions.filter((exception) => floor <= exception && exception <= ceiling)

  if (ceiling - floor <= potentialExceptions.length) {
    return undefined
  }

  const random = getRandom(floor, ceiling)
  if (exceptions.includes(random)) {
    return getRandomWithExceptions(floor, ceiling, exceptions)
  }
  return random
}

// expects a number between 0-1
export const getRandomBoolean = (weight?: number): boolean => {
  return getRandom(1, 10000) < (weight || 0.5) * 10000
}
