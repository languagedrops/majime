export class SingletonPromise<T> {
  // tslint:disable-next-line:readonly-keyword
  private inProgress = false
  // tslint:disable-next-line:readonly-keyword
  private resolveStack: Array<(value: T) => void> = []
  // tslint:disable-next-line:readonly-keyword
  private rejectStack: Array<(value: Error) => void> = []

  public readonly callPromise = (asyncAction: () => Promise<T>): Promise<T> => {
    if (this.inProgress) {
      return new Promise((resolve, reject) => {
        this.resolveStack.push(resolve)
        this.rejectStack.push(reject)
      })
    } else {
      this.inProgress = true
      return asyncAction()
        .then((result: T) => {
          this.inProgress = false
          this.resolveStack.forEach((resolve) => resolve(result))
          this.clearStacks()
          return result
        })
        .catch((error) => {
          this.inProgress = false
          this.rejectStack.forEach((reject) => reject(error))
          this.clearStacks()
          throw error
        })
    }
  }

  private readonly clearStacks = () => {
    this.resolveStack = []
    this.rejectStack = []
  }
}
