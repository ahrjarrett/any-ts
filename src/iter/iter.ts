export {
  iter,
}

import type { cache } from "../cache/cache"
import { describe, expect } from "../test/exports"

const mutable
  : <const type>(type: type) => { -readonly [ix in keyof type]: type[ix] }
  = (type) => type

type sizable =
  | number
  | bigint
  | `${bigint}`
  ;
type size<type extends sizable>
  = [`${type}`] extends [`${bigint}`]
  ? [`${type}`] extends [`${infer x extends number}`]
  ? x
  : never
  : never
  ;
declare const size
  : <type extends sizable>(size: type) => size<type>
  /** TODO: test this runtime implementation better */
  // = (size) => parseInt(`${size}`, 10) as never
  ;

type from<inclusiveMax extends sizable>
  = size<inclusiveMax> extends keyof cache.curr.curr
  ? cache.curr.curr[size<inclusiveMax>]
  : never
  ;
declare const from
  : <const length extends sizable>(length: length) => from<length>
  /** TODO: test this runtime implementation better */
  // = (length) => {
  //   let ix = 0;
  //   let max = parseInt(`${length}`);
  //   let out = [];
  //   while (ix++ < max) { out.push(ix) };
  //   return out
  // }
  ;

function iter() { }
interface iter {
  from<const inclusiveMax extends sizable>(inclusiveMax: inclusiveMax): iter.from<inclusiveMax>
}

namespace iter {
  iter.from = from
  iter.size = size
}
declare namespace iter {
  export {
    from,
    size,
    sizable,
  }
}

// // declare namespace Iter {
// //   export {
// //     yield_ as yield,
// //     return_ as return,
// //   }
// //   interface yield_<expr> { done?: false, value: expr }
// //   interface return_<expr> { done: true, value: expr }
// //   export type result<yields, returns = any> =
// //     | Iter.yield<yields>
// //     | Iter.return<returns>
// //     ;
// //   export interface iterable<yields> { [Symbol.iterator](): Iter.iterator<yields> }
// //   export interface iterator<yields, returns = any, next = undefined> {
// //     next(...args: [] | [next]): Iter.result<yields, returns>
// //     return?(value?: returns): Iter.result<yields, returns>
// //     throw?(e?: any): Iter.result<yields, returns>
// //   }
// // }

export namespace __spec__ {
  const _: unknown = {}
  describe("iter", () => [
    //                ^?
    describe("length", t => [
      //                 ^?
      expect(t.assert.equal(size(0), 0)),
      expect(t.assert.equal(size(1n), 1)),
      expect(t.assert.equal(size("2"), 2)),
      /** @ts-expect-error: passing a string that parses as a float raises a TypeError */
      expect(t.assert.is.never(size("3.0"))),
      expect(t.assert.equal(size(-4), -4)),
      /** TODO: Disallow negative numbers, too (only natural numbers should be allowed) */
      // expect(t.assert.is.never(size(-4))),
      expect(t.assert.equal(size("-5"), -5)),
      /** TODO: Disallow negative numbers, too (only natural numbers should be allowed) */
      // expect(t.assert.is.never(size("-5"))),
    ]),
    describe("from", t => [
      //               ^?
      expect(t.assert.equal(iter.from(0), mutable([]))),
      expect(t.assert.equal(iter.from(1n), mutable([_]))),
      expect(t.assert.equal(iter.from("2"), mutable([_, _]))),
      /** @ts-expect-error: passing a string that parses as a float raises a TypeError */
      expect(t.assert.is.never(iter.from("3.0"))),
      /** TODO: Disallow negative numbers, too (only natural numbers should be allowed) */
      expect(t.assert.is.never(iter.from(-4))),
      /** TODO: Disallow negative numbers, too (only natural numbers should be allowed) */
      expect(t.assert.is.never(iter.from("-5"))),
    ]),
  ])
}
