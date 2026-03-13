# majime

Collection of TypeScript utility functions. Zero production dependencies.

## Install

```bash
yarn add majime
# or
npm install majime
```

## Modules

| Module | Key exports |
|---|---|
| **standard** | `range`, `clamp`, `omit`, `delay`, `normalize`, `generateUUID`, `isNull`, `truncate`, `filterObject` |
| **array** | Array prototype extensions (`remove`, `flatten`, `unique`, `reversed`, `insert`) + `chunk`, `shuffle`, `sortedByProperty`, `flattenArray` |
| **dateTime** | `addDaysToDate`, `addHoursToDate`, `getDateDifference` + Date prototype extensions |
| **strings** | `upperFirst`, `lowerFirst`, `wordUpperFirst`, `mapWords` |
| **mapKeysValues** | `mapKeys`, `mapValues`, `mapKeysAndValues`, `invertObjectKeysAndValues` |
| **promise** | `promiseSequenceForEach`, `promiseSequenceMap`, `promiseWithTimeout` |
| **random** | `getRandom`, `getRandomWithExceptions`, `getRandomBoolean` |
| **weightedArray** | `getRandomWeightedElement` |
| **awaitLock** | `AwaitLock`, `wrapInLock` |

## Usage

```typescript
import { range, clamp, getRandom, chunk } from 'majime'

range(5)              // [0, 1, 2, 3, 4]
clamp(15, 0, 10)      // 10
getRandom(1, 6)        // random int 1–6
chunk([1,2,3,4,5], 2)  // [[1,2], [3,4], [5]]
```

## Development

```bash
yarn build    # Compile TypeScript
yarn test     # Run tests
```

## License

MIT
