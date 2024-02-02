export {
  enforce,
  constrain,
}

import type * as any from "../any";

import type { Fn } from "../function/exports";
import type { Err, Err2, TypeError } from "./err";
import type { never } from "../semantic-never/exports";
import type { HasDiscriminant } from "../tag/tag";
import type { Union as U } from "../union/exports";
import { empty } from "../empty";
import { assert, expect } from "../exports";
import { number } from "../number/number";

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

  type bijection<left extends any.object, right extends any.object>
    = [Exclude<keyof left, keyof right>, Exclude<keyof right, keyof left>] extends infer out
    ? out extends [never, never]
    ? (unknown)
    : out
    : never.close.inline_var<"out">
    ;
}

type constrain<invariant, type> = type & invariant

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

  type noExcessProps<left extends any.object, right extends left>
    = impl.bijection<left, right> extends any.two<infer l, infer r>
    ? Fn.return<typeof Err.NoExcessProps<
      [...(
        | [l] extends [never] ? [𝐫𝐢𝐠𝐡𝐭: r]
        : [r] extends [never] ? [𝐥𝐞𝐟𝐭: l]
        : [𝐥𝐞𝐟𝐭: l, 𝐫𝐢𝐠𝐡𝐭: r]
      )]
    >>
    : (unknown)
    ;

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

  type uniqNonNumericIndex<type>
    = [type] extends [any.entries]
    ? impl.nonnumericIndex<type> extends any.arrayof<any.index, infer numerics> ? Err2<"NonNumericIndex", numerics>
    : enforce.uniqueness.ofEntries<type> extends infer dupes
    ? unknown extends dupes ? (unknown)
    : dupes
    : never.close.inline_var<"uniq">
    : never
    ;

  type literal<type>
    = [string] extends [type] ? Fn.return<typeof Err.Literal<type>>
    : [number] extends [type] ? Fn.return<typeof Err.Literal<type>>
    : [boolean] extends [type] ? Fn.return<typeof Err.Literal<type>>
    : (unknown)
    ;

  type integer<type>
    = number.is.integer<type> extends true ? (number)
    : Fn.return<typeof Err.Integer<type>>
    ;
  type natural<type>
    = number.is.natural<type> extends true ? (unknown)
    : Fn.return<typeof Err.Integer<type>>
    ;
  type negativeNumber<type>
    = number.is.negative<type> extends true ? (unknown)
    : Fn.return<typeof Err.Negative<type>>
    ;
  type positiveNumber<type>
    = number.is.positive<type> extends true ? (unknown)
    : Fn.return<typeof Err.Positive<type>>
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
      /* 𝖈𝖚𝖗𝖘𝖊𝖉 */
      enforce.uniqueness.ofEntries<[["a", 1], ["a", 2]]>,
      enforce.uniqueness.ofEntries<[["a", 1], ["b", 2], ["a", 2]]>,
      enforce.uniqueness.ofEntries<[["a", 1], ["a", 2], ["a", 2]]>,
      /* happy path */
      expect<assert.is.unknown<enforce.uniqueness.ofEntries<[]>>>,
      expect<assert.is.unknown<enforce.uniqueness.ofEntries<[["a", 1]]>>>,
      expect<assert.is.unknown<enforce.uniqueness.ofEntries<[["a", 1], ["b", 2]]>>>,
      expect<assert.is.unknown<enforce.uniqueness.ofEntries<[["a", 1], ["b", 2], ["c", 3]]>>>,
    ]
  }

  namespace __impl__ {
    type __duplicateKeys__ = [
      /* 𝖈𝖚𝖗𝖘𝖊𝖉: duplicate(s) found */
      impl.duplicateKeys<["a", "a"], {}, []>,
      impl.duplicateKeys<["a", "b", "c", "a"], {}, []>,
      impl.duplicateKeys<["a", "b", "a", "c"], {}, []>,
      impl.duplicateKeys<["a", "a", "a"], {}, []>,
      impl.duplicateKeys<["a", "c", "a", "c"], {}, []>,
      /* happy path */
      impl.duplicateKeys<never, {}, []>,
      impl.duplicateKeys<any.array, {}, []>,
      impl.duplicateKeys<any.array<number>, {}, []>,
      impl.duplicateKeys<[], {}, []>,
      impl.duplicateKeys<["a"], {}, []>,
      impl.duplicateKeys<["a", "b"], {}, []>,
      impl.duplicateKeys<["a", "b", "c"], {}, []>,
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
    /* 𝖈𝖚𝖗𝖘𝖊𝖉 */
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
    /* happy path */
    expect<assert.equal<enforce.singleChar<"a">, unknown>>,
  ]

  type __noExcessProps__ = [
    /* 𝖈𝖚𝖗𝖘𝖊𝖉 */
    expect<assert.equal<
      enforce.noExcessProps<
        { abc: number, def: string },
        /* @ts-expect-error: intentionally causing this type error to make sure the `TypeError` comes through */
        { abc: 123 }
      >,
      TypeError<[𝗺𝘀𝗴: "Expected inputs to share an index signature, but encountered excess props", 𝗴𝗼𝘁: [𝐥𝐞𝐟𝐭: "def"]]>
    >>,
    expect<assert.equal<
      enforce.noExcessProps<
        { abc: number },
        { abc: 123, def: 456 }
      >,
      TypeError<[𝗺𝘀𝗴: "Expected inputs to share an index signature, but encountered excess props", 𝗴𝗼𝘁: [𝐫𝐢𝐠𝐡𝐭: "def"]]>
    >>,
    expect<assert.equal<
      enforce.noExcessProps<
        { abc: number, def: 789 },
        /* @ts-expect-error: intentionally causing this type error to make sure the `TypeError` comes through */
        { abc: number, ghi: 456 }
      >,
      TypeError<[𝗺𝘀𝗴: "Expected inputs to share an index signature, but encountered excess props", 𝗴𝗼𝘁: [𝐥𝐞𝐟𝐭: "def", 𝐫𝐢𝐠𝐡𝐭: "ghi"]]>
    >>,
    /* happy path */

  ]

}
