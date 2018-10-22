export class AwaitLock {
  private isAcquired: boolean
  private waitingResolvers: Array<() => void>

  constructor() {
    this.isAcquired = false
    this.waitingResolvers = []
  }

  public acquireAsync(): Promise<void> {
    if (!this.isAcquired) {
      this.isAcquired = true
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      this.waitingResolvers.push(resolve)
    })
  }

  public release(): void {
    if (!this.isAcquired) {
      console.warn('Trying to release an unacquired lock')
    }
    if (this.waitingResolvers.length > 0) {
      const resolve = this.waitingResolvers.shift()!
      resolve()
    } else {
      this.isAcquired = false
    }
  }
}

export const wrapInLock = async <T>(lock: AwaitLock, promise: () => Promise<T>): Promise <T> => {
  await lock.acquireAsync()
  try {
    const value = await promise()
    lock.release()
    return value
  } catch (error) {
    lock.release()
    throw error
  }
}
