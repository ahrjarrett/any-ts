---
"any-ts": patch
---

feat: adds `inline` type utility

### new features

- new [inline](https://github.com/ahrjarrett/any-ts/compare/%40ahrjarrett/v0.48.1?expand=1#diff-8f609800e1fe1486238044764d22867704573f7319ac89246dfcedfe9b3d7b68R9) utility

`inline` is basically a type-level identity function. 

like its runtime counterpart, it can be pretty useful.

the name `inline` refers to the particular use case that I personally usually use it for, 
which is for wrapping a type literal so that an interface can extend it.

```typescript
import type { inline } from "any-ts"

//////////////
/// example

/** 
 * did you know you can make an interface out of an array?
 * this can be useful when you want to preserve the
 * identifier:             vvvv   */
interface Numbers extends inline<number[]> {}

declare const numbers: Numbers
//            ^? const numbers: Numbers

// normal array behavior is preserved:
const copy = [...ex_01.numbers]
//    ^? const copy: number[]
```
