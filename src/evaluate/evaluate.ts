export {
  evaluate,
}

import type { any } from "../any";

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
function evaluate<const type>(type: type): evaluate<type, 1>
function evaluate<const type, maxDepth extends number>(type: type, maxDepth: maxDepth): evaluate<type, maxDepth>
function evaluate<const type, maxDepth extends number>(type: type, _max?: maxDepth): unknown { return type }

type evaluate<type, maxDepth extends number = 1> = evaluate.go<type, [], maxDepth>
declare namespace evaluate {
  type go<type, currentDepth extends void[], maxDepth extends number>
    = maxDepth extends currentDepth["length"] ? type
    : type extends any.primitive | any.function ? type
    : { [ix in keyof type]
      : go<type[ix], [...currentDepth, void], maxDepth> }
    ;
}
