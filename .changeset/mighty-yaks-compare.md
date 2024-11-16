---
"any-ts": patch
---

feat: adds `inline` type utility
    
`inline` is basically a type-level identity function. like its runtime counterpart,
it turns out to be pretty useful.

```typescript
import type { inline } from "any-ts"

interface MyTuple extends inline<number[]> {}

declare const myTuple: MyTuple

const copy = [...myTuple]
//     ^? const copy: number[]
```
