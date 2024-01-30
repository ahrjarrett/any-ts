export {
  Assoc as assoc,
}

import * as any from "../any"
import { TypeError, assert, describe, empty, enforce, evaluate, expect, never, nonempty } from "../exports";

declare namespace impl {
  type parseNumeric<type> = type extends `${infer x extends number}` ? x : never
  type arrayIndex<acc extends any.array<any.number>, type>
    = Extract<keyof type, `${acc["length"]}`> extends any.string<infer ix>
    ? [ix] extends [never] ? acc
    : arrayIndex<[...acc, parseNumeric<ix>], type>
    : never.close.inline_var<"ix">
    ;

  type is_<ix extends void[], order, struct>
    = [order, []] extends [[], order]
    ? [struct, {}] extends [{}, struct]
    ? true
    : false
    : [struct, {}] extends [{}, struct] ? false
    : order extends empty.array ? [keyof struct] extends [never] ? true : false
    : order extends nonempty.array<infer head, infer tail>
    ? [head] extends [keyof struct]
    ? is_<[...ix, void], tail, Omit<struct, head>>
    : false
    : never.close.inline_var<"head" | "tail">
    ;
}

namespace impl {
  export const base = class {
    constructor(type: object) {
      Object.assign(this, type);
    }
  } as new <const type extends object>(type: type) => type;
}

declare const is
  : <const type>(type: type) => Assoc.is<type>
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

declare const indices
  : <const type>(type: type) => indices<type>
  ;
type indices<type> = impl.arrayIndex<[], type>

declare const separate
  : <const type>(type: type) => separate<type>
  ;
type separate<type>
  = indices<type> extends any.list<infer index>
  ? { [ix in keyof index]: type[ix & keyof type] } extends any.list<infer order>
  ? { [ix in Exclude<keyof type, keyof index>]: type[ix] } extends any.object<infer struct>
  ? [order: order, object: struct]
  : never.close.inline_var<"struct">
  : never.close.inline_var<"order">
  : never.close.inline_var<"index">
  ;

type is<type>
  = [type] extends [never] ? false
  : [Readonly<type>, empty.array] extends [empty.array, Readonly<type>] ? false
  : [type, []] extends [[], type] ? false
  : [type, {}] extends [{}, type] ? false
  : [any.array] extends [type] ? false
  : separate<type> extends [infer order, infer struct]
  ? impl.is_<[], order, struct>
  : never.close.inline_var<"order" | "struct">
  ;

/* @ts-expect-error - internal use only */
class assoc<const type extends object> extends impl.base<type> { }
type associative<type extends any.entries> = make<type, any.entries, Assoc<of<type>>>

type Assoc<type extends readonly [any.type, any.indexedby<number>]> = never | assoc<type[0] & type[1]>
declare function Assoc
  <const type extends any.entries & enforce.uniqNonNumericIndex<type>>(...type: type): associative<type>

declare namespace Assoc {
  export {
    is,
    separate,
    indices,
  }
}

namespace assoc {
  Assoc.is = is
  Assoc.separate = separate
  Assoc.indices = indices
}

type __is__ = [
  // ^?
  expect<assert.isFalse<Assoc.is<any.array>>>,
  expect<assert.isFalse<Assoc.is<[]>>>,
  expect<assert.isFalse<Assoc.is<{}>>>,
  expect<assert.isFalse<Assoc.is<[] & {}>>>,
  expect<assert.isFalse<Assoc.is<[1]>>>,
  expect<assert.isFalse<Assoc.is<[1] & { abc: 123 }>>>,
  expect<assert.isFalse<Assoc.is<[] & { abc: 123 }>>>,
  expect<assert.isFalse<Assoc.is<["abc", "def", "xyz"] & { abc: 123, def: 455, ghi: 789 }>>>,
  expect<assert.isFalse<Assoc.is<["abc", "def", "ghii"] & { abc: 123, def: 455, ghi: 789 }>>>,
  expect<assert.isFalse<Assoc.is<["abc", "def"] & { abc: 123, def: 455, ghi: 789 }>>>,
  // correct
  expect<assert.isTrue<Assoc.is<["abc"] & { abc: 123 }>>>,
  expect<assert.isTrue<Assoc.is<["abc", "def"] & { abc: 123, def: 455 }>>>,
  expect<assert.isTrue<Assoc.is<["abc", "def"] & { abc: 123, def: 455 }>>>,
]

namespace __Spec__ {
  declare const failureCases: [
    never,
    any,
    unknown,
    {},
    [],
    readonly [],
    {} & [],
    any.array,
    any.object,
    any.array & any.object,
    { abc: 123 } & ["xyz"],
    { abc: 1230 },
    { 0: 123, 1: 456 } & [0, 1],
  ]
  declare const happyPath: [
    { abc: 123 } & ["abc"],
    { abc: 123, def: 456 } & ["abc", "def"],
  ]
  declare const assoc1: assoc<{ abc: 123; def: 456; } & ["abc", "def"]>
  declare const err1: TypeError<[𝗺𝘀𝗴: "Expected keys to be unique, but encountered 1 or more duplicate keys", 𝗴𝗼𝘁: ["abc"]]>

  describe("Assoc", () => {
    // ^?
    return [
      describe("assoc", t => [
        expect(t.assert.equal(Assoc(["abc", 123], ["def", 456]), assoc1)),
        /* @ts-expect-error: this directive makes sure passing invalid input raises a TypeError */
        expect(t.assert.equal(assoc(["abc", 123], ["abc", 456]), err1)),
      ]),
      describe("is", t => [
        // ^?
        expect(t.assert.isTrue(is(happyPath[0]))),
        expect(t.assert.isTrue(is(happyPath[1]))),
      ]),
      describe("is (not)", t => [
        // ^?
        expect(t.assert.isFalse(is(failureCases[0]))),
        expect(t.assert.isFalse(is(failureCases[1]))),
        expect(t.assert.isFalse(is(failureCases[2]))),
        expect(t.assert.isFalse(is(failureCases[3]))),
        expect(t.assert.isFalse(is(failureCases[4]))),
        expect(t.assert.isFalse(is(failureCases[5]))),
        expect(t.assert.isFalse(is(failureCases[6]))),
        expect(t.assert.isFalse(is(failureCases[7]))),
        expect(t.assert.isFalse(is(failureCases[8]))),
        expect(t.assert.isFalse(is(failureCases[9]))),
        expect(t.assert.isFalse(is(failureCases[10]))),
      ]),
    ]
  })
}

