import { enforce as _, internal } from "./enforce"
import type { any } from "../any";

import type { TypeError } from "./err";
import { assert, expect } from "../test/exports";

namespace __Spec__ {
  declare const testUniqNonNumericSignature
    /** 
     * TODO: see if you can remove the `any.array &` part -- that would clean up the output significantly
     */
    : <const type extends any.array & _.uniqNonNumericIndex<type>>(...type: type) => type

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
      /* unhappy path */
      _.uniqueness.ofEntries<[["a", 1], ["a", 2]]>,
      _.uniqueness.ofEntries<[["a", 1], ["b", 2], ["a", 2]]>,
      _.uniqueness.ofEntries<[["a", 1], ["a", 2], ["a", 2]]>,
      /* happy path */
      expect<assert.is.unknown<_.uniqueness.ofEntries<[]>>>,
      expect<assert.is.unknown<_.uniqueness.ofEntries<[["a", 1]]>>>,
      expect<assert.is.unknown<_.uniqueness.ofEntries<[["a", 1], ["b", 2]]>>>,
      expect<assert.is.unknown<_.uniqueness.ofEntries<[["a", 1], ["b", 2], ["c", 3]]>>>,
    ]
  }

  namespace __internal__ {
    type __duplicateKeys__ = [
      /* unhappy path: duplicate(s) found */
      internal.duplicateKeys<["a", "a"], {}, []>,
      internal.duplicateKeys<["a", "b", "c", "a"], {}, []>,
      internal.duplicateKeys<["a", "b", "a", "c"], {}, []>,
      internal.duplicateKeys<["a", "a", "a"], {}, []>,
      internal.duplicateKeys<["a", "c", "a", "c"], {}, []>,
      /* happy path */
      internal.duplicateKeys<never, {}, []>,
      internal.duplicateKeys<any.array, {}, []>,
      internal.duplicateKeys<any.array<number>, {}, []>,
      internal.duplicateKeys<[], {}, []>,
      internal.duplicateKeys<["a"], {}, []>,
      internal.duplicateKeys<["a", "b"], {}, []>,
      internal.duplicateKeys<["a", "b", "c"], {}, []>,
    ]
  }

  type __getKeys__ = [
    // ^?
    expect<assert.equal<
      internal.getKeys<never>,
      never
    >>,
    expect<assert.equal<
      internal.getKeys<[]>,
      []
    >>,
    expect<assert.equal<
      internal.getKeys<[["abc", 123]]>,
      ["abc"]
    >>,
    expect<assert.equal<
      internal.getKeys<[["abc", 123], ["def", 456]]>,
      ["abc", "def"]
    >>,
    expect<assert.equal<
      internal.getKeys<[["abc", 123], ["def", 456], ["ghi", 789]]>,
      ["abc", "def", "ghi"]
    >>,
  ]

  type __singleChar__ = [
    // ^?
    /* unhappy path */
    expect<assert.equal<
      _.singleChar<"">,
      TypeError<[msg: "Expected to receive a single-char string, but encountered an empty string instead", got: ""]>
    >>,
    expect<assert.equal<
      _.singleChar<string>,
      TypeError<[msg: "Expected to receive a single-char string, but encountered the universal string type instead", got: string]>
    >>,
    expect<assert.equal<
      _.singleChar<"ab">,
      TypeError<[msg: "Expected to receive a single-char string, but encountered a string containing more than 1 character instead", got: "ab"]>
    >>,
    expect<assert.equal<
      _.singleChar<"abc">,
      TypeError<[msg: "Expected to receive a single-char string, but encountered a string containing more than 1 character instead", got: "abc"]>
    >>,
    /* happy path */
    expect<assert.equal<_.singleChar<"a">, unknown>>,
  ]

  type __noExcessProps__ = [
    /* unhappy path */
    expect<assert.equal<
      _.noExcessProps<
        { abc: number, def: string },
        /* @ts-expect-error: intentionally causing this type error to make sure the `TypeError` comes through */
        { abc: 123 }
      >,
      TypeError<[𝗺𝘀𝗴: "Expected inputs to share an index signature, but encountered excess props", 𝗴𝗼𝘁: [𝐥𝐞𝐟𝐭: "def"]]>
    >>,
    expect<assert.equal<
      _.noExcessProps<
        { abc: number },
        { abc: 123, def: 456 }
      >,
      TypeError<[𝗺𝘀𝗴: "Expected inputs to share an index signature, but encountered excess props", 𝗴𝗼𝘁: [𝐫𝐢𝐠𝐡𝐭: "def"]]>
    >>,
    expect<assert.equal<
      _.noExcessProps<
        { abc: number, def: 789 },
        /* @ts-expect-error: intentionally causing this type error to make sure the `TypeError` comes through */
        { abc: number, ghi: 456 }
      >,
      TypeError<[𝗺𝘀𝗴: "Expected inputs to share an index signature, but encountered excess props", 𝗴𝗼𝘁: [𝐥𝐞𝐟𝐭: "def", 𝐫𝐢𝐠𝐡𝐭: "ghi"]]>
    >>,
  ]
}
