
export const promiseSequenceForEach = async <T, R>(inputArray: T[], callback: (element: T, index: number, array: T[]) => Promise<R>) => {
  for (let i = 0; i < inputArray.length; i++) {
    await callback(inputArray[i], i, inputArray)
  }
}

export const promiseSequenceMap = async <T, R>(inputArray: T[], transformer: (element: T, index: number, array: T[]) => Promise<R>): Promise<R[]> => {
  const newArray: R[] = []
  for (let i = 0; i < inputArray.length; i++) {
    newArray[i] = await transformer(inputArray[i], i, inputArray)
  }
  return newArray
}
