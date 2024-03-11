// import type { any, expect, assert, } from "any-ts"

// type indexedBy<
//   index extends globalThis.PropertyKey,
//   xs extends Semantic = 
// > = never | xs extends infer out ? out extends object ? Semantic<out> : never : never

// type id<type> = type
// type evaluate<type> = never | ({ [k in keyof type]: type[k] })
// type _53 = evaluate<globalThis.Record<"abc", 123>>




// type __order__ = [
//   // ^?
//   expect<assert.equal<order<[["a", 1], ["b", 2], ["c", 3]]>, ["a", "b", "c"]>>,
//   structured<[["a", 1], ["b", 2], ["c", 3]]>,
//   ordered<[["a", 1], ["b", 2], ["c", 3]]>,
//   struct<[["a", 1], ["b", 2], ["c", 3]]>,
// ]


// type assoc<entries extends any.entries> =

//   interface Record < key extends any.index = any.index, value = unknown > extends Semantic < { [ix in key]: value } > {}


// type _56 = Record<"abc", 123>



// type _5 = indexedBy<"key">
