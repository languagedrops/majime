export const getRandom = (floor: number, ceiling: number): number => {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor
}

// expects a number between 0-1
export const getRandomBoolean = (weight?: number): boolean => {
  return getRandom(1, 10000) < (weight || 0.5) * 10000
}
