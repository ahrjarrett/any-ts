---
"any-ts": minor
---

### new features
- added `match`, a namespace for advanced pattern matching
- added `any.functions` to describe any array of functions

### breaking changes

a few members of the `some` namespace behave differently than before:

- `some.keyOf`: this change was made to support a homomorphic `object.map` function
  that operates on both arrays and objects, preserves structure in either case.

  An example implementation:

  ```typescript
  /** 
   * {@link map `map [overload 1/2]`} ("data-last")
   * 
   * [TypeScript playground](https://tsplay.dev/weA2Yw)
   * 
   * {@link map `map`} takes two arguments:
   * 1. a function
   * 2. a composite data structure that contains one or more targets to apply the function to
   * 
   * A unique feature of this implementation is its polymorphism: it doesn't care whether the
   * composite data structure is an array, or whether it's an object. It will apply the argument
   * to each of the children, and will preserve the structure of the original shape.
   * 
   * **Trade-off:** the data-last overload of {@link map `map`} is optimized for function composition. 
   * It works best when used inside a call to {@link fn.pipe `fn.pipe`} or {@link fn.flow `fn.flow`}.
   * It comes with greater potential for code re-use, at the cost of slightly slower performance.
   * 
   * **Ergonomics:** if you'd prefer to provide both arguments at the same time, see overload #2.
   */
  export function map<const xs, target>
    (fn: (x: xs[some.keyof<xs>], ix: some.keyof<xs>, xs: xs) => target): (xs: xs) => { [ix in keyof xs]: target }
  /** 
   * {@link map `map [overload 2/2]`} ("data-first")
   * 
   * [TypeScript playground](https://tsplay.dev/weA2Yw)
   *
   * {@link map `map`} is a polymorphic function that accepts a function and a data structure (such 
   * as an array or object) to apply the function to.
   * 
   * A unique feature of this implementation is its ability to abstract away the type of the data 
   * structure it maps the function over; whether you pass it an object or an array, it will handle 
   * applying the function to the data strucuture's values and returning a data structure whose type 
   * corresponds 1-1 with the type of input.
   * 
   * **Trade-off:** the data-first overload of {@link map `map`} evaluates eagerly. It comes with 
   * slightly better performance than the data-last overload, at the cost of reusability.
   * 
   * **Ergonomics:** if you'd prefer to use {@link map `map`} in a pipeline, see overload #1.
   */
  export function map<const xs, target>
    (xs: xs, fn: (x: xs[some.keyof<xs>], xs: xs) => target): { [ix in keyof xs]: target }
  // impl.
  export function map<const xs, target>(
    ...args:
      | [fn: (x: xs[some.keyof<xs>], ix: some.keyof<xs>, xs: xs) => target]
      | [xs: xs, fn: (x: xs[some.keyof<xs>], ix: some.keyof<xs>, xs: xs) => target]
  ) {
    if(args.length === 1) return (xs: xs) => map(xs, args[0]) 
    else {
      const [xs, fn] = args
      if(globalThis.Array.isArray(xs)) return xs.map(fn as never)
      else {
        let out: any.struct = {}
        for(const k in xs) 
          out[k] = fn(xs[k] as never, k as never, xs)
        return out
      }
    }
  }
  ```
  
- `some.entryOf`
  slightly different semantics to support a polymorphic `object.entries` function

- `some.valueOf`
  slightly different semantics to support a polymorphic `object.values` function
