export {
  enforce,
}

import type * as any from "../any";

import type { Fn } from "../function/exports";
import type { Err, Err2, TypeError } from "./err";
import type { never } from "../semantic-never/exports";
import type { HasDiscriminant } from "../tag/tag";
import type { Union as U } from "../union/exports";
import { empty } from "../empty";
import { assert, expect } from "../exports";

declare namespace impl {
  type parseNumeric<type> = type extends `${infer x extends number}` ? x : never
  type extract<type, invariant> = [type] extends [invariant] ? type : never
  type getKeys<type>
    = [type] extends [any.entries] ? extract<{ [ix in keyof type]: type[ix][extract<0, keyof type[ix]>] }, any.array> : never

  type duplicateKeys<type extends any.array, seen extends any.object, duplicates extends any.array>
    = [type] extends [readonly []] ? 0 extends duplicates["length"] ? never : duplicates
    : [type] extends [readonly [any.index<infer head>, ...any.list<infer tail>]]
    ? [head] extends [keyof seen] ? impl.duplicateKeys<tail, seen, [...duplicates, head]>
    : impl.duplicateKeys<tail, seen & { [ix in head]: void }, duplicates>
    : never.illegal_state<"branch unreachable">
    ;

  type nonnumericIndex_<index extends any.index>
    = index extends number ? true : [parseNumeric<index>] extends [never] ? false : true

  type isNumeric<index extends any.index>
    = nonnumericIndex_<index> extends infer b
    ? [boolean] extends [b] ? true : [b] extends [true] ? true : false
    : never.close.inline_var<"b">
    ;

  type numericKeys<type extends any.array, numerics extends any.array>
    = [type] extends [readonly []] ? 0 extends numerics["length"] ? never : numerics
    : [type] extends [readonly [any.index<infer head>, ...infer tail]]
    ? impl.isNumeric<head> extends true ? impl.numericKeys<tail, [...numerics, head]>
    : impl.numericKeys<tail, numerics>
    : never.illegal_state<"branch unreachable">
    ;

  type nonnumericIndex<type extends any.array<any.two<any.index, unknown>>>
    = 0 extends type["length"] ? unknown
    : isNumeric<type[number][0]> extends false ? (unknown)
    : impl.numericKeys<impl.getKeys<type>, []>
    ;
}

declare namespace enforce {
  type nonobject<type>
    = [type] extends [any.array] ? (unknown)
    : [type] extends [any.object] ? Fn.return<typeof Err.NonObject<type>>
    : (unknown)
    ;

  type singleChar<type>
    = [string] extends [type] ? Fn.return<typeof Err.SingleCharGotUniversal<type>>
    : [type] extends [`${any}${infer rest}`]
    ? rest extends empty.string ? (unknown)
    : Fn.return<typeof Err.SingleCharGotLonger<type>>
    : Fn.return<typeof Err.SingleCharGotShorter<type>>
    ;

  // type arbitraryBranch

  type nonunion<type>
    = U.is<type> extends false ? (unknown)
    : Fn.return<typeof Err.NonUnion<type>>
    ;

  type singletonObject<type>
    = [type] extends [any.array] ? (unknown)
    : [type] extends [any.object]
    ? [keyof type] extends [never] ? (unknown)
    : U.is<keyof type> extends true ? Fn.return<typeof Err.MaxOneProp<type>>
    : type
    : (unknown)
    ;

  type nonnumericIndex<type extends any.array<any.two<any.index, unknown>>>
    = 0 extends type["length"] ? unknown
    : impl.isNumeric<type[number][0]> extends false ? (unknown)
    : Err2<"NonNumericIndex", impl.numericKeys<impl.getKeys<type>, []>>
    ;

  type uniqNonNumericIndex<type> =
    [type] extends [any.entries]
    ? impl.nonnumericIndex<type> extends any.arrayof<any.index, infer numerics> ? Err2<"NonNumericIndex", numerics>
    : enforce.uniqueness.ofEntries<type> extends infer dupes
    ? unknown extends dupes ? (unknown)
    : dupes
    : never.close.inline_var<"uniq">
    : never
    ;

  // : Fn.return<typeof Err.KeyUniqueness<duplicates>>
  //Err2<"UniqueNonNumericIndex", enforce.uniqueness.ofEntries<type>>

  type literal<type>
    = [string] extends [type] ? Fn.return<typeof Err.Literal<type>>
    : [number] extends [type] ? Fn.return<typeof Err.Literal<type>>
    : [boolean] extends [type] ? Fn.return<typeof Err.Literal<type>>
    : (unknown)
    ;

  type nonliteral<type>
    = [string] extends [type] ? (unknown)
    : [number] extends [type] ? (unknown)
    : [boolean] extends [type] ? (unknown)
    : Fn.return<typeof Err.MaxOneProp<type>>
    ;

  type isNotAssignableTo<type, disallow>
    = [type] extends [disallow] ? Fn.return<typeof Err.IsNotAssignableTo<type>>
    : (unknown)
    ;

  type nonEmptyString<type>
    = [type] extends [``]
    ? Fn.return<typeof Err.NonEmptyString<type>>
    : (unknown)
    ;

  type nonEmptyArray<type>
    = [type] extends readonly []
    ? Fn.return<typeof Err.NonEmptyString<type>>
    : (unknown)
    ;

  type shallowArray<type extends any.array> = U.exists<
    type[number],
    any.object,
    { onMatch: Fn.return<typeof Err.Shallow<type>>; onNoMatch: unknown }
  >

  type shallow<type>
    = [type] extends [any.primitive] ? (unknown)
    : [type] extends [HasDiscriminant] ? (unknown)
    : [type] extends [any.array] ? enforce.shallowArray<type>
    : [type] extends [any.object] ? Fn.return<typeof Err.Shallow<type>>
    : (unknown)
    ;

  namespace uniqueness {
    type ofEntries<type>
      = [impl.duplicateKeys<impl.getKeys<type>, {}, []>] extends [any.list<infer duplicates>]
      ? [duplicates] extends [never]
      ? (unknown)
      : Fn.return<typeof Err.KeyUniqueness<duplicates>>
      : (unknown)
      ;
  }
}

namespace __Spec__ {
  declare const testUniqNonNumericSignature
    /** 
     * TODO: see if you can remove the `any.array &` part -- that would clean up the output significantly
     */
    : <const type extends any.array & enforce.uniqNonNumericIndex<type>>(...type: type) => type

  const __testUniqNonNumericSignature__ = [
    testUniqNonNumericSignature(),
    testUniqNonNumericSignature(["abc", 123]),
    testUniqNonNumericSignature(["abc", 123], ["def", 456]),
    // @ts-expect-error: outputs 🡓🡓
    // 
    //   any.array & TypeError<[
    //     𝗺𝘀𝗴: "Expected keys to be unique, but encountered 1 or more duplicate keys", 
    //     𝗴𝗼𝘁: ["abc"]
    //   ]>
    //
    testUniqNonNumericSignature(["abc", 123], ["def", 456], ["abc", 789]),
    // @ts-expect-error: outputs 🡓🡓
    // 
    //   any.array & TypeError<[
    //     𝗺𝘀𝗴: "Expected keys to be unique, but encountered 1 or more duplicate keys", 
    //     𝗴𝗼𝘁: ["abc", "def"]
    //   ]> 
    //
    testUniqNonNumericSignature(["abc", 123], ["def", 456], ["abc", 789], ["def", 0]),
    // @ts-expect-error: outputs 🡓🡓
    //
    //   any.array & [0]
    // 
    testUniqNonNumericSignature([0, 123], ["def", 456], ["abc", 789]),
    // @ts-expect-error: outputs 🡓🡓
    //
    //   any.array & [0]
    // 
    testUniqNonNumericSignature(["def", 456], [0, 123], ["abc", 789]),
    // @ts-expect-error: outputs 🡓🡓
    //
    //   any.array & [0]
    // 
    testUniqNonNumericSignature(["def", 456], ["abc", 789], [0, 123]),
    // @ts-expect-error: outputs 🡓🡓
    //
    //   any.array & [0]
    // 
    testUniqNonNumericSignature([0, 123], [0, 456]),
    // @ts-expect-error: outputs 🡓🡓
    //
    //   any.array & [10, 10]
    // 
    testUniqNonNumericSignature(["abc", 123], ["def", 456], ["abc", 789], [10, 0], [10, 0]),
  ] as const
}

declare namespace __Spec__ {

  namespace uniqueness {
    type __ofEntries__ = [
      enforce.uniqueness.ofEntries<[]>,
      enforce.uniqueness.ofEntries<[["a", 1]]>,
      enforce.uniqueness.ofEntries<[["a", 1], ["b", 2]]>,
      enforce.uniqueness.ofEntries<[["a", 1], ["b", 2], ["c", 3]]>,
      enforce.uniqueness.ofEntries<[["a", 1], ["a", 2]]>,
      enforce.uniqueness.ofEntries<[["a", 1], ["b", 2], ["a", 2]]>,
      enforce.uniqueness.ofEntries<[["a", 1], ["a", 2], ["a", 2]]>,
    ]
  }

  namespace __impl__ {
    type __duplicateKeys__ = [
      impl.duplicateKeys<never, {}, []>,
      impl.duplicateKeys<any.array, {}, []>,
      impl.duplicateKeys<any.array<number>, {}, []>,
      impl.duplicateKeys<[], {}, []>,
      impl.duplicateKeys<["a"], {}, []>,
      impl.duplicateKeys<["a", "b"], {}, []>,
      impl.duplicateKeys<["a", "b", "c"], {}, []>,
      // duplicate(s) found
      impl.duplicateKeys<["a", "a"], {}, []>,
      impl.duplicateKeys<["a", "b", "c", "a"], {}, []>,
      impl.duplicateKeys<["a", "b", "a", "c"], {}, []>,
      impl.duplicateKeys<["a", "a", "a"], {}, []>,
      impl.duplicateKeys<["a", "c", "a", "c"], {}, []>,
    ]
  }

  type __getKeys__ = [
    // ^?
    expect<assert.equal<
      impl.getKeys<never>,
      never
    >>,
    expect<assert.equal<
      impl.getKeys<[]>,
      []
    >>,
    expect<assert.equal<
      impl.getKeys<[["abc", 123]]>,
      ["abc"]
    >>,
    expect<assert.equal<
      impl.getKeys<[["abc", 123], ["def", 456]]>,
      ["abc", "def"]
    >>,
    expect<assert.equal<
      impl.getKeys<[["abc", 123], ["def", 456], ["ghi", 789]]>,
      ["abc", "def", "ghi"]
    >>,
  ]

  type __singleChar__ = [
    // ^?
    // unhappy path 🡫🡫
    expect<assert.equal<
      enforce.singleChar<"">,
      TypeError<[𝗺𝘀𝗴: "Expected to receive a single-char string, but encountered an empty string instead", 𝗴𝗼𝘁: ""]>
    >>,
    expect<assert.equal<
      enforce.singleChar<string>,
      TypeError<[𝗺𝘀𝗴: "Expected to receive a single-char string, but encountered the universal string type instead", 𝗴𝗼𝘁: string]>
    >>,
    expect<assert.equal<
      enforce.singleChar<"ab">,
      TypeError<[𝗺𝘀𝗴: "Expected to receive a single-char string, but encountered a string containing more than 1 character instead", 𝗴𝗼𝘁: "ab"]>
    >>,
    expect<assert.equal<
      enforce.singleChar<"abc">,
      TypeError<[𝗺𝘀𝗴: "Expected to receive a single-char string, but encountered a string containing more than 1 character instead", 𝗴𝗼𝘁: "abc"]>
    >>,
    // happy path 🡫🡫
    expect<assert.equal<enforce.singleChar<"a">, unknown>>,
    // happy path 🡩🡩
  ]

}
