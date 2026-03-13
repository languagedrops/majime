# Majime — TypeScript Utility Library

Zero production dependencies. Pure TypeScript utility functions and prototype extensions.

## Commands

```bash
yarn build          # Compile TypeScript (tsc) → dist/
yarn test           # Run all tests (Jest)
yarn test -- --testPathPattern=array   # Run a single test file
```

## Architecture

9 modules, barrel-exported via `src/index.ts` → compiled to `dist/` (CommonJS).

| Module | Purpose |
|---|---|
| `standard.ts` | Core utils: range, clamp, omit, delay, normalize, generateUUID, etc. |
| `array.ts` | Array prototype extensions + standalone helpers (chunk, shuffle, sortedByProperty) |
| `dateTime.ts` | Date arithmetic + Date prototype extensions |
| `strings.ts` | upperFirst, lowerFirst, wordUpperFirst, mapWords |
| `mapKeysValues.ts` | mapKeys, mapValues, invertObjectKeysAndValues |
| `promise.ts` | promiseSequenceForEach, promiseSequenceMap, promiseWithTimeout |
| `random.ts` | getRandom, getRandomWithExceptions, getRandomBoolean |
| `weightedArray.ts` | getRandomWeightedElement |
| `awaitLock.ts` | AwaitLock class, wrapInLock |

**Important:** `array.ts` and `dateTime.ts` mutate global prototypes (`Array.prototype`, `Date.prototype`). These are side effects on import.

## Code Style

- **No semicolons**
- **Single quotes**, 2-space indent
- **Arrow functions only** (no `function` keyword)
- camelCase for variables/functions, PascalCase for classes/types
- Trailing commas in multiline, no trailing commas in singleline
- Explicit return types on exported functions
- Strict TypeScript (noImplicitAny, strictNullChecks, noUnusedLocals, noUnusedParameters)
- Linter: TSLint (`tslint.json`), not ESLint

## Tests

Jest, files in `src/tests/*.test.ts`. Pattern: `describe`/`it` blocks with `expect`.

Not all modules have tests. Currently covered: array, dateTime, mapKeysValues, string, weightedArray.

## Versioning & Release

```bash
npm version patch   # or minor / major
```

`preversion` hook runs: `yarn build && git add -A dist && git commit -m "chore(Project): generate JS files"`

`dist/` is committed to git — always rebuild before versioning.

## Conventional Commits

Format: `type(scope): description`

- `fix(module):` — bug fix
- `feature(module):` — new feature
- `chore(Project):` — build/infra changes
