export {
  eval,
  evaluate,
}

import type { any } from "../any/exports.js"

/**
 * @example
*  interface A { b: B }
*  interface B { a: A }
*  declare const A: A
* 
*  const b = evaluate(A)  
*  b // => const b: { b: A }
*  type b = evaluate<A>
*  //   ^? type b = { b: A }
* 
*  const ba = evaluate(A, 2)
*  ba // => const ba: { b: { a: A } }
*  type ba = evaluate<A, 2>
*  //   ^? type ba = { b: { a: A } }
* 
*  const bababababab = evaluate(A, -1) 
*  bababababab // => const bababababab: { b: { a: { b: { a: { b: { a: { b: { a: { b: { a: { b: any } } } } } } } } } } }
*  type bababababab = evaluate<A, -1>
*  //   ^? type bababababab = { b: { a: { b: { a: { b: { a: { b: { a: { b: { a: { b: any } } } } } } } } } } }
*/
function evaluate<const type>(type: type): eval<type>
function evaluate<const type, maxDepth extends number>(type: type, maxDepth: maxDepth): evaluate<type, maxDepth>
function evaluate<const type, maxDepth extends number>(type: type, _max?: maxDepth): unknown { return type }

/** 
 * {@link eval `eval`} is semantically equivalent to {@link evaluate `evaluate`} with
 * a hardcoded max-depth of 1.
 * 
 * In practice, you should use `eval` when you want a shallow evaluation, because 
 * TypeScript can make certain optimizations when it knows that an expression does
 * not contain any sub-expressions that require recursion.
 * 
 * @example
*  import type { eval } from "any-ts"
* 
*  interface Abc { abc: Def }
*  interface Def { def: Ghi }
*  interface Ghi { ghi: Abc }
* 
*  type Purdy = eval<Abc & Def & Ghi>
*  //   ^? type Purdy = { abc: 123, def: 456, ghi: 789 }
*/
type eval<type> = never | ({ [k in keyof type]: type[k] })

/** 
 * {@link evaluate `evaluate`} "evaluates" an expression.
 * 
 * In practice, you should use {@link eval `eval`} when you want a shallow 
 * evaluation, because TypeScript can make certain optimizations when it 
 * knows that an expression does not contain any sub-expressions that require recursion.
 */
type evaluate<type, maxDepth extends number = 2> = evaluate.go<type, [], maxDepth>
declare namespace evaluate {
  type go<type, currentDepth extends void[], maxDepth extends number>
    = maxDepth extends currentDepth["length"] ? type
    : type extends any.primitive | any.function ? type
    : { [ix in keyof type]: go<type[ix], [...currentDepth, void], maxDepth> }
    ;
}
