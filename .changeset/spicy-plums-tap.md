---
"any-ts": minor
---

feat: adds `has` module
- `has.oneProperty` lets you express a constraint that the input type contains exactly 1 property. For example:

  ```typescript
  /** 
   * @example
   *  const one = singleton({ a: 1 })       // ✅

   *  const zero = singleton({})            // 🚫
   *  //    ^? const zero: never
   *  const two = singleton({ a: 1, b: 2 }) // 🚫
   *  //    ^? const two: never
   */
  declare function singleton<const T extends has.oneProperty<T>>(objectWithExactlyOneProperty: T): T
  ```

  **Note:** `has.oneProperty` accepts 2 additional optional type parameters
  1. an invariant, which allows you to apply an additional constraint on the type of the property itself; and
  2. a "debug" flag, which, if non-never, changes the behavior of `has.oneProperty` to raise a custom `TypeError` if `T` fails to satisfy the constraint

- `has.oneElement`
  ```typescript

  /** 
   * @example
   *  const one = singleton([1])    // ✅
   *  //    ^? const one: readonly [1]
   * 
   *  const zero = singleton([])    // 🚫
   *  //    ^? const zero: never
   *  const two = singleton([1, 2]) // 🚫
   *  //    ^? const two: never
   */
  declare function oneNumber<const T extends has.oneElement<T, number>>(tupleContainingOneNumber: T): T
  ```

  **Note:** like `has.oneProperty`, `has.oneElement` also accepts 2 additional optional type parameters
  1. an invariant, which allows you to apply an additional constraint on the type of the element itself; and,
  2. a "debug" flag, which, if non-never, changes the behavior of `has.oneElement` to raise a custom `TypeError` if `T` fails to satisfy the constraint

