/* eslint-disable
 @typescript-eslint/ban-types, 
 @typescript-eslint/no-explicit-any, 
 */



/* eslint-disable
 @typescript-eslint/ban-types, 
 @typescript-eslint/no-explicit-any, 
 */
export {
  Show
}

/** term-level import */ import { describe, expect } from "../test/exports.js"
/** term-level import */ import { assoc } from "./associative.js"

import type { any } from "../any/exports.js"
import type { empty, nonempty } from "../empty.js"
import type { never } from "../never/exports.js"



declare const concatall
  : <strings extends any.array<string>>(...s: strings) => concatall<strings>
type concatall<strings extends any.array<string>, acc extends string = ``>
  = strings extends empty.array ? acc
  : strings extends nonempty.arrayOf<string, infer head, infer tail>
  ? concatall<tail, `${acc}${head}`>
  : never.close.inline_var<"head" | "tail">
  ;

declare namespace Show {
  type any_assoc = assoc<[assoc.tag, any.dict<supported>, any.array<any.index>]>

  type supported =
    | any.primitive
    | readonly supported[]
    | assoc<[assoc.tag, any.dictionary<supported>, any.array<any.index>]>
    ;

  type show<type> = Show.go<``, type>

  type go<acc extends string, type>
    = [type] extends [any.primitive] ? showPrimitive<type>
    : [type, {}] extends [{}, type] ? `{}`
    : assoc.is<type> extends true
    ? type extends Show.any_assoc ? Show.showAssoc<type>
    : never.illegal_state
    : [type] extends [any.array] ? showList<acc, type>
    : never.illegal_state<"unhandled case in `Show.go`">
    ;

  type myassoc = typeof myassoc
  const myassoc: assoc<["{}", { abc: 123 }, ["abc"]]>
  type __showassoc__ = [
    // ^?
    showObject<myassoc>,
  ]

  type showObject<type extends Show.any_assoc>
    = never | assoc.index<[], type> extends infer ord
    ? { [ix in keyof ord]: [ord[ix], type[keyof type & ord[ix]]] } extends any.entries<infer entries>
    ? between.curlies<objectBody<empty.string, entries>>
    : never.close.inline_var<"entries">
    : never.close.inline_var<"ord">
    ;
  type objectBody<acc extends string, type extends any.array>
    = [type] extends [empty.array] ? acc
    : [type] extends [nonempty.arrayOf<any.entry, infer head, infer tail>]
    ? objectBody<
      between<
        between<
          acc
          , ", "
          , [head[0]] extends [string]
          ? head[0]
          : between.squares<showPrimitive<head[0]>>>
        , `: `
        , Show.go<empty.string, head[1]>
      >
      , tail
    >
    : never.close.inline_var<"head" | "tail">
    ;

  type showIntersection<type extends Show.any_assoc>
    = never | assoc.index<[], type> extends infer xsection
    ? { [ix in keyof xsection]: [xsection[ix], type[keyof type & xsection[ix]]] } extends any.entries<infer entries>
    ? intersectionBody<empty.string, entries>
    : never.close.inline_var<"entries">
    : never.close.inline_var<"xsection">
    ;
  type intersectionBody<acc extends string, type extends any.array>
    = [type] extends [empty.array] ? acc
    : [type] extends [nonempty.arrayOf<any.entry, infer head, infer tail>]
    ? intersectionBody<separated.by.ampersand<acc, Show.go<empty.string, head[1]>>, tail>
    : never.close.inline_var<"head" | "tail">
    ;

  type showUnion<type extends Show.any_assoc>
    = never | assoc.index<[], type> extends infer union
    ? { [ix in keyof union]: [union[ix], type[keyof type & union[ix]]] } extends any.entries<infer entries>
    ? unionBody<empty.string, entries>
    : never.close.inline_var<"entries">
    : never.close.inline_var<"union">
    ;
  type unionBody<acc extends string, type extends any.array>
    = [type] extends [empty.array] ? acc
    : [type] extends [nonempty.arrayOf<any.entry, infer head, infer tail>]
    ? unionBody<separated.by.pipe<acc, Show.go<empty.string, head[1]>>, tail>
    : never.close.inline_var<"head" | "tail">
    ;

  type showAssoc<type extends Show.any_assoc>
    = assoc.separate<type> extends readonly [infer tag, any, any]
    ? [tag] extends [assoc.tag.object] ? showObject<type>
    : [tag] extends [assoc.tag.union] ? showUnion<type>
    : [tag] extends [assoc.tag.intersection] ? showIntersection<type>
    : never.close.inline_var<"tag">
    : never.close.unmatched_expr
    ;

  type showPrimitive<type extends any.primitive>
    = [type] extends [never] ? "never"
    : [type] extends [boolean] ? [boolean] extends [type] ? "boolean" : `${type}`
    : [type] extends [symbol] ? [symbol] extends [type] ? `Symbol()` : `Symbol(unique)`
    : [type] extends [string] ? [string] extends [type] ? "string" : `"${type}"`
    : [type] extends [bigint] ? [bigint] extends [type] ? "bigint" : `${type}n`
    : [type] extends [number] ? [number] extends [type] ? "number" : `${type}`
    : `${Exclude<type, symbol>}`
    ;

  type between<left extends string, btwn extends any.showable, right extends string>
    = [left] extends [``] ? right : `${left}${btwn}${right}`
  namespace between {
    type spaces<type extends any.showable> = between<` `, type, ` `>
    type parens<type extends any.showable> = between<`(`, type, `)`>
    type squares<type extends any.showable> = between<`[`, type, `]`>
    type curlies<type extends any.showable> = between<`{ `, type, ` }`>
    type chevrons<type extends any.showable> = between<`<`, type, `>`>
  }

  namespace separated {
    namespace by {
      type comma<left extends string, right extends string> = between<left, `, `, right>
      type pipe<left extends string, right extends string> = between<left, ` | `, right>
      type ampersand<left extends string, right extends string> = between<left, ` & `, right>
    }
  }

  type showList<acc extends string, type extends any.array>
    = [type] extends [empty.array]
    ? ([acc] extends [empty.string] ? `[]` : between.squares<acc>)
    : [type] extends [nonempty.array<infer head, infer tail>]
    ? showList<separated.by.comma<acc, Show.go<empty.string, head>>, tail>
    : never.illegal_state<"unhandled case in `showList`">
    ;
}

namespace Show {
  export declare const showList
    : <const type extends any.array<Show.supported>>(...type: type) => Show.showList<``, type>

  export declare const showPrimitive
    : <const type extends any.primitive>(type: type) => Show.showPrimitive<type>

  export declare const showAssoc
    : <const type extends Show.any_assoc>(type: type) => Show.showAssoc<type>

  export declare const showUnion
    : <const type extends Show.any_assoc>(type: type) => Show.showUnion<type>

  export declare const showObject
    : <const type extends Show.any_assoc>(type: type) => Show.showObject<type>

  export declare const showIntersection
    : <const type extends Show.any_assoc>(type: type) => Show.showIntersection<type>

  export declare const show
    : <const type extends Show.supported | {}>(type: type) => Show.show<type>
}

namespace __Spec__ {
  const some_object = assoc("{}", { abc: 123, def: 456 }, ["abc", "def"])
  const some_xsection = assoc("&", { abc: 123, def: 456 }, ["abc", "def"])
  const some_union = assoc("|", { abc: 123, def: 456 }, ["abc", "def"])
  const some_nested_object = assoc("{}", ["abc", assoc("{}", ["ghi", 789])], ["def", assoc("{}", ["jkl", 0])])
  const some_nested_xsection = assoc("&", ["abc", assoc("{}", ["ghi", 789])], ["def", assoc("{}", ["jkl", 0])])
  const some_nested_union = assoc("|", ["abc", assoc("{}", ["tag", "A"])], ["def", assoc("{}", ["tag", "B"])])
  const boolean: boolean = false as boolean
  const symbol: symbol = void 0 as never
  const string: string = "" as string
  const number: number = 0 as number
  const bigint: bigint = 0n as bigint
  const never: never = void 0 as never
  const some_singleton = assoc("{}", ["tag", "A"])

  const expectedBigintputString = concatall(
    `{ `,
    `def: `,
    `{ tag: "one", one_prop: "prop from one", shared: ["same", "."] } `,
    `| `,
    `{ tag: "two", two_prop: "prop from two", shared: ["same", "."] } `,
    `| `,
    `{ tag: "three", three_prop: "prop from two", shared: ["same", "."] }, `,
    `abc: `,
    `{ k: string, j: number, l: boolean } `,
    `& { `,
    `M: { nine: "IX", eight: "VIII", seven: "VII", six: "VI" }, `,
    `N: { singular: 1, plural: number, dual: 2 }, `,
    `O: { inflection: ["positive", "comparative", "superlative"] } } `,
    `& `,
    `{ r: [-303n], q: [-20.2], p: [-101] } }`,
  )
  export declare const biginput: {
    [assoc.tag$]: "{}",
    [assoc.len$]: 2,
    0: "def",
    1: "abc",
    abc: {
      [assoc.tag$]: "&",
      [assoc.len$]: 3,
      0: "ghi",
      1: "mno",
      2: "pqr",
      ghi: {
        [assoc.tag$]: "{}",
        [assoc.len$]: 3,
        0: "k",
        1: "j",
        2: "l",
        j: number,
        k: string,
        l: boolean,
      },
      mno: {
        [assoc.tag$]: "{}",
        [assoc.len$]: 3,
        0: "M",
        1: "N",
        2: "O",
        M: {
          [assoc.tag$]: "{}",
          [assoc.len$]: 4,
          0: "nine",
          1: "eight",
          2: "seven",
          3: "six",
          six: "VI",
          seven: "VII",
          eight: "VIII",
          nine: "IX",
        },
        N: {
          [assoc.tag$]: "{}",
          [assoc.len$]: 3,
          0: "singular",
          1: "plural",
          2: "dual",
          singular: 1,
          dual: 2,
          plural: number,
        },
        O: {
          [assoc.tag$]: "{}",
          [assoc.len$]: 1,
          0: "inflection",
          inflection: [
            "positive",
            "comparative",
            "superlative",
          ],
        },
      },
      pqr: {
        [assoc.tag$]: "{}",
        [assoc.len$]: 3,
        0: "r",
        1: "q",
        2: "p",
        r: [-303n],
        p: [-101],
        q: [-20.2],
      },
    },
    def: {
      [assoc.tag$]: "|",
      [assoc.len$]: 3,
      0: "tagged_one",
      1: "tagged_two",
      2: "tagged_three",
      tagged_one: {
        [assoc.tag$]: "{}",
        [assoc.len$]: 3,
        0: "tag",
        1: "one_prop",
        2: "shared",
        tag: "one",
        one_prop: "prop from one",
        shared: ["same", "."],
      },
      tagged_two: {
        [assoc.tag$]: "{}"
        [assoc.len$]: 3,
        0: "tag",
        1: "two_prop",
        2: "shared",
        tag: "two",
        two_prop: "prop from two",
        shared: ["same", "."],
      },
      tagged_three: {
        [assoc.tag$]: "{}",
        [assoc.len$]: 3,
        0: "tag",
        1: "three_prop",
        2: "shared",
        tag: "three",
        three_prop: "prop from two",
        shared: ["same", "."],
      },
    }
  }

  describe("Show", () => {
    // ^?
    return [
      describe("show", t => [
        // ^?
        expect(t.assert.equal(Show.show(boolean), "boolean")),
        expect(t.assert.equal(Show.show(false), "false")),
        expect(t.assert.equal(Show.show(symbol), "Symbol()")),
        expect(t.assert.equal(Show.show(assoc.len$), "Symbol(unique)")),
        expect(t.assert.equal(Show.show(string), "string")),
        expect(t.assert.equal(Show.show("abc"), "\"abc\"")),
        expect(t.assert.equal(Show.show(bigint), "bigint")),
        expect(t.assert.equal(Show.show(100n), "100n")),
        expect(t.assert.equal(Show.show(number), "number")),
        expect(t.assert.equal(Show.show(100), "100")),
        expect(t.assert.equal(Show.show(-100), "-100")),
        expect(t.assert.equal(Show.show(0.5), "0.5")),
        expect(t.assert.equal(Show.show(-0.5), "-0.5")),
        expect(t.assert.equal(Show.show(100_000), "100000")),
        expect(t.assert.equal(Show.show(null), "null")),
        expect(t.assert.equal(Show.show(undefined), "undefined")),
        expect(t.assert.equal(Show.show(never), "never")),
        expect(t.assert.equal(Show.show(""), "\"\"")),
        expect(t.assert.equal(Show.show([]), "[]")),
        expect(t.assert.equal(Show.show([0]), "[0]")),
        expect(t.assert.equal(Show.show([0, [1, 2]]), "[0, [1, 2]]")),
        expect(t.assert.equal(Show.show({}), "{}")),
        expect(t.assert.equal(Show.show(123), "123")),
        expect(t.assert.equal(Show.show([1, 2, 3]), "[1, 2, 3]")),
        expect(t.assert.equal(Show.show(some_object), "{ abc: 123, def: 456 }")),
        expect(t.assert.equal(Show.show(some_xsection), "123 & 456")),
        expect(t.assert.equal(Show.show(some_singleton), "{ tag: \"A\" }")),
        expect(t.assert.equal(Show.show(some_union), "123 | 456")),
        expect(t.assert.equal(Show.show(some_nested_object), "{ abc: { ghi: 789 }, def: { jkl: 0 } }")),
        expect(t.assert.equal(Show.show(some_nested_xsection), "{ ghi: 789 } & { jkl: 0 }")),
        expect(t.assert.equal(Show.show(some_nested_union), "{ tag: \"A\" } | { tag: \"B\" }")),
        expect(t.assert.equal(Show.show(biginput), expectedBigintputString)),
      ] as const)
    ] as const
  })
}
