/* eslint-disable
 @typescript-eslint/no-explicit-any,
 @typescript-eslint/no-unused-vars,
*/
export {
  Assoc as assoc,
  Tag as tag,
}

import * as any from "../any"
import { assert, describe, expect } from "../test/exports"
import { enforce } from "../err/enforce"
import { TypeError } from "../err/exports"
import { never } from "../semantic-never/exports"
import { Universal } from "../universal/exports"
import { assoc as _ } from "../associative/exports"

const len$: unique symbol = Symbol.for("TypeConstructor/assoc::len")
type len$ = typeof len$
const tag$: unique symbol = Symbol.for("TypeConstructor/assoc::tag")
type tag$ = typeof tag$


type Tag<type extends keyof typeof Tag = keyof typeof Tag> = typeof Tag[type]
declare namespace Tag {
  type any_ = typeof Tag[keyof typeof Tag]
  export { any_ as any }
  export type intersection = typeof Tag.intersection
  type object_ = typeof Tag.object
  export { object_ as object }
  export type union = typeof Tag.union
}
namespace Tag {
  export const intersection = "&"
  export const object = "{}"
  export const union = "|"
}

type is<type>
  = [type] extends [{ [len$]: number, [tag$]: Tag }]
  ? Exclude<type, any.array> extends infer nonArray
  ? [nonArray] extends [never] ? false
  : impl.is<type>
  : false
  : false
  ;

type index<acc extends any.array, type extends { [len$]: number }>
  = acc["length"] extends type[len$ & keyof type] ? acc
  : index<[
    ...acc,
    Extract<type, any.indexedby<acc["length"]>>[acc["length"]]],
    type
  >
  ;

const myassoc = Assoc("{}", ["abc", 123], ["def", 467])
type myassoc = typeof myassoc

type _00 = index<[], myassoc>

type separate<type extends { [len$]: number, [tag$]: Tag }>
  = index<[], type> extends infer index
  ? readonly [
    tag: type[tag$],
    order: { [ix in Extract<keyof index, `${number}`>]: index[ix] },
    object: { [ix in Exclude<keyof type, number | tag$ | len$>]: type[ix] },
  ]
  : never
  ;

declare const separate
  : <const type extends { [len$]: number, [tag$]: Tag }>(type: type) => separate<type>
  ;

declare const is
  : <const type>(type: type) => is<type>
  ;

const brandedString: "hey" & { [tag$]: "stuff" } = "hey" as never
type test = { [ix in typeof brandedString[tag$]]: ix }

declare namespace impl {
  type parseNumeric<type> = type extends `${infer x extends number}` ? x : never
  type range<acc extends any.array<number>, type extends number>
    = [type] extends [acc["length"]] ? acc
    : range<[...acc, acc["length"]], type>
    ;
  type is<type extends { [len$]: number, [tag$]: Tag }>
    = [separate<type>] extends [readonly [any, infer order, infer object_]]
    ? [
      extra_keys: (keyof order extends infer ord ? ord extends keyof order ? order[ord] extends keyof object_ ? never : ord : never : never),
      extra_values: Exclude<keyof type, Universal.values<order> | len$ | tag$ | number | `${number}`>
    ] extends [never, never]
    ? true : false : false
    ;
  type toEntries<type, order extends any.array<keyof type>>
    = never | { [ix in keyof order]: [order[ix], type[order[ix]]] }
    ;
  type asArraylike<type extends any.array> = never |
    { [ix in len$ | Extract<keyof type, `${number}`> as Universal.key<ix>]
      : ix extends keyof type ? type[ix]
      : ix extends len$ ? type["length"] & number
      : never }

  type __asArraylike__ = asArraylike<[1, 2, 3]>
    ;
  type of<type extends any.entries> = never | [
    { [e in type[number]as e[0]]: e[1] },
    Extract<{ -readonly [ix in keyof type]: type[ix][0] }, any.array>,
  ]
  type make<
    type,
    constraint,
    returns
  > = [type] extends [TypeError<any>]
    ? [type] extends [constraint & infer err] ? err
    : never : returns
    ;
}

namespace impl {
  const assoc_
    : new < const ns extends any.object, const ord extends any.indexedby<len$>>(named: ns, order: ord) => ns & ord
    = class {
      constructor(named: any.object, order: any.indexedby<len$>) {
        Object.assign(this, order, named);
      }
    } as never
  /* @ts-expect-error - internal use only */
  export class assoc<
    const named extends any.object,
    const order extends any.indexedby<len$>
  > extends assoc_<named, order> { }
}

class assoc<
  tag extends Tag,
  const named extends object, order extends any.indexedby<len$>
>
  extends impl.assoc<{ [tag$]: tag } & named, order>
  implements Tagged<tag> {
  constructor(named: named, order: order, tag: tag) {
    super({ ...named, [tag$]: tag }, order);
  }
}

type associative<type extends any.entries, tag extends Tag>
  = impl.of<type> extends infer Of
  ? Of extends readonly [any.object, any.array<any.index>]
  ? impl.make<type, any.entries, Assoc<[tag, Of[0], Of[1]]>>
  : never.close.unmatched_expr
  : never.close.inline_var<"Of">
  ;

type Assoc<inputs extends readonly [Tag, any.object, any.array<any.index>]>
  = never | assoc<inputs[0], inputs[1], impl.asArraylike<inputs[2]>>

declare function Assoc
  <tag extends Tag, const type extends any.entries & enforce.uniqNonNumericIndex<type>>(tag: tag, ...type: type): associative<type, tag>
declare function Assoc
  <tag extends Tag, const type extends any.object, const order extends any.array<keyof type>>(tag: tag, type: type, order: order): associative<impl.toEntries<type, order>, tag>

declare namespace Assoc {
  export {
    index,
    is,
    len$,
    separate,
    Tag as tag,
    tag$,
  }

}
namespace Assoc { }

interface Tagged<tag extends Tag> { [tag$]: tag }

namespace __Spec__ {
  const assoc_1 = Assoc("{}", { abc: 123, def: 456 }, ["abc", "def"])
  const assoc_2 = Assoc("{}", ["abc", 123], ["def", 456])

  const sep = separate({ [len$]: 2, [tag$]: "{}" })
  is({ [len$]: 2, [tag$]: "{}", abc: 123, 0: "abc" })

  describe("assoc", () => {
    // ^?
    return [
      describe("is", t => [
        //   ^?
        /* unhappy path */
        expect(t.assert.is.false(is({}))),
        expect(t.assert.is.false(is([]))),
        expect(t.assert.is.false(is({ 0: "abc", 1: "def" }))),
        expect(t.assert.is.false(is({ abc: 123, def: 456 }))),
        expect(t.assert.is.false(is({ [len$]: 1, [tag$]: "{}", abc: 123, 0: "abc", def: 456 }))),
        expect(t.assert.is.false(is({ [len$]: 2, [tag$]: "{}", abc: 123, def: 456, 0: "abc", 3: "def" }))),
        /** TODO: this is the only case I could find that gives a false positive (since `[len$]` chops off the `1` property) */
        // expect(t.assert.is.false(is({ [len$]: 10, [tag$]: "{}" }))),
        /** TODO: this is the only case I could find that gives a false positive (since `[len$]` chops off the `1` property) */
        // expect(t.assert.is.false(is({ [len$]: 2, [tag$]: "{}", abc: 123, 0: "abc" }))),
        /** TODO: this is the only case I could find that gives a false positive (since `[len$]` chops off the `1` property) */
        // is({ [len$]: 1, tag: "{}", abc: 123, 0: "abc", 1: "def" }),
        /* happy path */
        expect(t.assert.is.true(is(assoc_1))),
        expect(t.assert.is.true(is(assoc_2))),
      ]),



      describe("separate", t => [
        // ^?
        // expect(t.assert.equivalent(
        separate(Assoc("{}")),
        ["{}", {}, {}],
        // )),
        expect(t.assert.equivalent(
          separate(Assoc("|")),
          ["|", {}, {}],
        )),
        expect(t.assert.equivalent(
          separate(Assoc("&")),
          ["&", {}, {}],
        )),
        expect(t.assert.equivalent(
          separate(Assoc("&", ["abc", 123])),
          ["&", { 0: "abc" }, { abc: 123 }],
        )),
        expect(t.assert.equivalent(
          separate(Assoc("&", { abc: 123 }, ["abc"])),
          ["&", { 0: "abc" }, { abc: 123 }],
        )),
        expect(t.assert.equivalent(
          separate(Assoc("|", ["abc", 123])),
          ["|", { 0: "abc" }, { abc: 123 }],
        )),
        expect(t.assert.equivalent(
          separate(Assoc("{}", { abc: 123 }, ["abc"])),
          ["{}", { 0: "abc" }, { abc: 123 }],
        )),
        expect(t.assert.equivalent(
          separate(Assoc("|", { abc: 123, def: 456 }, ["abc"])),
          ["|", { 0: "abc" }, { abc: 123 }],
        )),
        expect(t.assert.equivalent(
          separate(Assoc("&", ["abc", 123], ["def", 456])),
          ["&", { 0: "abc", 1: "def" }, { abc: 123, def: 456 }],
        )),
        expect(t.assert.equivalent(
          separate(Assoc("{}", ["abc", 123], ["def", 456])),
          ["{}", { 0: "abc", 1: "def" }, { abc: 123, def: 456 }],
        )),
        // expect(t.assert.equivalent(
        //   separate({ [len$]: 2, [tag$]: "{}" }),
        //   ["{}", { 0: {} as never, 1: {} never }, {}],
        // )),
      ])
    ] as const
  })
}

declare namespace __Spec__ {
  type __tag__ = [
    // ^?
    expect<assert.equal<Tag<"union">, "|">>,
    expect<assert.equal<Tag<"object">, "{}">>,
    expect<assert.equal<Tag<"intersection">, "&">>,
    expect<assert.equal<Tag, "|" | "&" | "{}">>,
    expect<assert.equal<Tag<"object" | "union" | "intersection">, "|" | "&" | "{}">>,
  ]
}