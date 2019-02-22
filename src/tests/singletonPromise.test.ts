import { SingletonPromise } from '../singletonPromise'

describe('SingletonPromise', () => {
  it('Should call async function only once', async () => {
    const asyncMock = jest.fn(() => new Promise((resolve) => setTimeout(() => resolve(20), 20)))

    const singletonePromise = new SingletonPromise()
    const promiseResults = []

    const promise1 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults.push(result))
    const promise2 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults.push(result))
    const promise3 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults.push(result))

    expect(asyncMock.mock.calls.length).toBe(1)
    expect(promiseResults.length).toBe(0)

    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(promiseResults.length).toBe(3)
    expect(asyncMock.mock.calls.length).toBe(1)
  })

  it('Should clear previous queue', async () => {
    const asyncMock = jest.fn(() => new Promise((resolve) => setTimeout(() => resolve(20), 20)))

    const singletonePromise = new SingletonPromise()
    const promiseResults = []

    const promise1 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults.push(result))
    const promise2 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults.push(result))
    const promise3 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults.push(result))

    expect(promiseResults.length).toBe(0)

    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(promiseResults.length).toBe(3)

    const promiseResults2 = []
    expect(promiseResults2.length).toBe(0)

    const promise4 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults2.push(result))
    const promise5 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults2.push(result))
    const promise6 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults2.push(result))

    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(promiseResults.length).toBe(3)
    expect(promiseResults2.length).toBe(3)
    expect(asyncMock.mock.calls.length).toBe(2)
  })

  it('Should rise errors', async () => {
    const asyncMock = jest.fn(() => new Promise((resolve, reject) => setTimeout(() => reject(Error('testError')), 20)))

    const singletonePromise = new SingletonPromise()
    const promiseResults = []
    const promiseErrors = []

    const promise1 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults.push(result)).catch((error) => promiseErrors.push(error))
    const promise2 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults.push(result)).catch((error) => promiseErrors.push(error))
    const promise3 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults.push(result)).catch((error) => promiseErrors.push(error))

    expect(asyncMock.mock.calls.length).toBe(1)
    expect(promiseResults.length).toBe(0)
    expect(promiseErrors.length).toBe(0)

    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(promiseResults.length).toBe(0)
    expect(promiseErrors.length).toBe(3)
    expect(asyncMock.mock.calls.length).toBe(1)
  })

  it('Should clear previous queue in case of errors', async () => {
    const asyncMock = jest.fn(() => new Promise((resolve, reject) => setTimeout(() => reject(Error('testError')), 20)))

    const singletonePromise = new SingletonPromise()
    const promiseResults = []
    const promiseErrors = []

    const promise1 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults.push(result)).catch((error) => promiseErrors.push(error))
    const promise2 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults.push(result)).catch((error) => promiseErrors.push(error))
    const promise3 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults.push(result)).catch((error) => promiseErrors.push(error))

    expect(promiseResults.length).toBe(0)

    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(promiseResults.length).toBe(0)
    expect(promiseErrors.length).toBe(3)

    const promiseResults2 = []
    expect(promiseResults2.length).toBe(0)

    asyncMock.mockReturnValueOnce(Promise.resolve(20))

    const promise4 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults2.push(result))
    const promise5 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults2.push(result))
    const promise6 = singletonePromise.callPromise(asyncMock).then((result) => promiseResults2.push(result))

    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(promiseResults.length).toBe(0)
    expect(promiseErrors.length).toBe(3)
    expect(promiseResults2.length).toBe(3)
    expect(asyncMock.mock.calls.length).toBe(2)
  })
})
